from semantic_kernel.connectors.ai.open_ai import AzureChatCompletion,OpenAIChatCompletion
from semantic_kernel import Kernel
from semantic_kernel.agents import ChatCompletionAgent, ChatHistoryAgentThread
from plugins.amadeus_plugin import AmadeusPlugin
from plugins.google_map_plugin import AirlinePlugin, TravelPlugin
from plugins.google_mail_plugin import MailPlugin
from semantic_kernel.filters import FunctionInvocationContext
from dotenv import load_dotenv
import os
import re
import json
from typing import TypedDict, List, Dict

class FlightSearchService:
    def __init__(self):
        load_dotenv(override=True)
        self.log_dir = "search_logs"
        os.makedirs(self.log_dir, exist_ok=True)
        # Initialize kernel
        self.kernel = Kernel()
        
        # Initialize Azure OpenAI
        
        self.ai_chat = AzureChatCompletion(
            deployment_name=os.environ.get("AZURE_OPENAI_CHAT_DEPLOYMENT_NAME"),
            endpoint=os.environ.get("AZURE_OPENAI_ENDPOINT"),
            api_key=os.environ.get("AZURE_OPENAI_API_KEY"),
            api_version=os.environ.get("AZURE_OPENAI_API_VERSION"),
            service_id="chat"
        )

        '''
        # Initialize  OpenAI key
        self.openai_key = os.environ.get("OPENAI_KEY")
        self.ai_chat = OpenAIChatCompletion(
            api_key=self.openai_key,
            ai_model_id="gpt-4",
            service_id="default",
        )'''
        
        # Add function invocation filter
        self.kernel.add_filter("function_invocation", self.function_invocation_filter)
        
        # Initialize Amadeus Plugin
        try:
            self.amadeus_plugin = AmadeusPlugin()
            self.kernel.add_plugin(
                plugin=self.amadeus_plugin,
                plugin_name="amadeus_plugin",
                description="Amadeus API Plugin for flight search"
            )
            self.airport_plugin = AirlinePlugin()
            self.kernel.add_plugin(
                plugin=self.airport_plugin,
                plugin_name="airport_plugin",
                description="Google Map API Plugin for airport location"
            )
        except ValueError as e:
            raise Exception(f"Error initializing Amadeus plugin: {e}")
        
        normalization_agent=ChatCompletionAgent(
            service=self.ai_chat,
            name="NormalizationAgent",
            instructions=(
                """You are a strict parser. Your job is to extract and convert flight information from user input into the following exact format:
                <departure> <destination> <date> <adults> <children> <infants> <non-stop> <currency>

                Rules:
                - Use 3-letter IATA codes for departure and destination airports.
                - Date must be in YYYY-MM-DD format.
                - Output must be a single line of plain text, space-separated.
                - Only use lowercase `true` or `false` for non-stop.
                - If the user input is not in the correct format, convert it to the correct one.
                - Output ONLY the converted string in the format. Do NOT use JSON or keys.

                Example:
                User input: "help me find flights from 倫敦 to ニューヨーク on 2021-04-25T16:00:00.000Z for 2 adult, 0 children, and 0 infants, non-stop, in USD"
                Output: LHR NYC 2021-04-25 2 0 0 true USD"""
            )
        )
        
        
        # Initialize chat agent
        self.flights_search_agent = ChatCompletionAgent(
            service=self.ai_chat,
            name="FlightOffersSearch",
            instructions=(
                """
                You are a travel planning assistant.

                Your task is to help users find flight options using exact parameter formatting and strict JSON output.

                ### Instructions:
                1. If the user inputs city names in non-English (e.g., Chinese, Japanese, Korean), translate them into English first.
                2. For city names, use these examples for mapping:
                - 巴黎 → Paris → IATA: PAR
                - 東京 → Tokyo → IATA: TYO
                - 紐約 → New York → IATA: NYC

                3. Search the IATA code using `SearchLocation` before using `SearchFlightsOffers`.
                4. If the user does not specify `currencyCode`, use `"USD"` as the default.
                5. Use the following exact format for search parameters:
                departure='[IATA]', destination='[IATA]', departureDate='[YYYY-MM-DD]', returnDate='[YYYY-MM-DD]',adults=[int], children=[int], infants=[int], nonStop='[true/false]', currencyCode='[3-letter code]'



                ### Response Format (MANDATORY):
                You must return the results as a **valid JSON array**, following this structure exactly. Do NOT use Markdown, headings, bullets, or plain text. Only output valid JSON:
                [
                    {
                        "id": 1,
                        "airline": "Airline Name",
                        "price": 500.25,
                        "baggage": {
                            "includedCheckedBags": 1,
                            "additionalFee": 0.0,
                            "currency": "USD"
                        },
                        "duration": "PT12H20M",
                        "segments": [
                            {
                                "departure": {
                                    "airline": "Suvarnabhumi Airport",
                                    "iataCode": "BKK",
                                    "at": "2025-05-02T20:20:00",
                                    "country": "Thailand",
                                    "city": "Bangkok"
                                },
                                "arrival": {
                                    "airline": "Guangzhou Baiyun International Airport",
                                    "iataCode": "CAN",
                                    "terminal": "2",
                                    "at": "2025-05-03T00:05:00",
                                    "country": "China",
                                    "city": "Guangzhou"
                                },
                                "carrierCode": "CA"
                            },
                            {
                                "departure": {
                                    "airline": "Guangzhou Baiyun International Airport",
                                    "iataCode": "CAN",
                                    "terminal": "2",
                                    "at": "2025-05-03T08:05:00",
                                    "country": "China",
                                    "city": "Guangzhou",
                                },
                                "arrival": {
                                    "airline": "Sydney Airport",
                                    "iataCode": "SYD",
                                    "terminal": "1",
                                    "at": "2025-05-03T19:40:00",
                                    "country": "Australia",
                                    "city": "Mascot, New South Wales"
                                },
                                "carrierCode": "CA"
                            }
                        ]
                    },
                    {
                        "id": 2,
                        ...
                    }
                ]
                Output Rule:
                Your entire reply must be ONLY the JSON array above. Do not include any explanations, markdown formatting, or text outside of the JSON block. If any required input is missing or invalid, explain the issue and ask the user to re-enter the data using the required format.
                IMPORTANT: Your response MUST be valid JSON only. Do NOT include markdown code block formatting such as ```json or ``` at the beginning or end. Just output the JSON array directly.

                Your response must NOT contain any of the following:
                - Markdown formatting (like ###, -, *, **, ```).
                - Text before or after the JSON can be load by python.
                - Any explanations or comments.
                
                Sort the response flight data by price in ascending order.

                Only output valid JSON starting with `[` and ending with `]`.
                If possible, provide at least 10 flight entries in the result.
                Each flight should have no more than 3 stopovers (connections), not including round-trip flights.
                if user want to round-trip flights,you need to find two flights, one is departure flight, the other is return flight.
                """
            ),
            plugins=[
                normalization_agent,
                self.kernel.get_plugin("amadeus_plugin"),
                self.kernel.get_plugin("airport_plugin")
            ]
        )
        
        self.thread = None

    def _save_response(self, response: str) -> str:
        """Save search response to a text file."""
        filename = f"{self.log_dir}/flight_search.txt"
        with open(filename, "w", encoding="utf-8") as f:
            f.write(f"Response:\n{response}")
        
        return filename
    
    async def function_invocation_filter(self, context: FunctionInvocationContext, next):
        """A filter that will be called for each function call in the response."""
        if "messages" not in context.arguments:
            await next(context)
            return
        
        print(f"    Agent [{context.function.name}] called with messages: {context.arguments['messages']}")
        await next(context)
        print(f"    Response from agent [{context.function.name}]: {context.result.value}")
    '''
    def _validate_json(self, text: str) -> tuple[bool, str, any]:
        """Validate JSON and return detailed error information"""
        try:
            # Remove markdown if present
            if '```' in text:
                text = re.search(r'```(?:json)?\n(.*?)\n```', text, re.DOTALL)
                if text:
                    text = text.group(1)
            
            # Try to parse JSON
            data = json.loads(text)
            return True, "Success", data
        except json.JSONDecodeError as e:
            # Get the problematic portion of the text
            lines = text.split('\n')
            error_line = e.lineno - 1
            start_line = max(0, error_line - 2)
            end_line = min(len(lines), error_line + 3)
            
            context = "\n".join(
                f"{'>' if i == error_line else ' '} {i+1}: {lines[i]}"
                for i in range(start_line, end_line)
            )
            
            error_details = (
                f"JSON Error Details:\n"
                f"- Error type: {e.msg}\n"
                f"- Line number: {e.lineno}\n"
                f"- Column: {e.colno}\n"
                f"- Position in text: {e.pos}\n"
                f"- Problematic character: {text[e.pos] if e.pos < len(text) else 'EOF'}\n"
                f"Context:\n{context}"
            )
            return False, error_details, None
    '''
    async def search_flights(self, departure: str, destination: str, departureDate: str,returnDate: str = None,
                           adults: int = 1, children: int = 0, infants: int = 0,
                           nonStop: str = "false", currencyCode: str = "USD") -> dict:
        """Execute flight search with the given parameters."""
        '''#keep thread for each search
        if self.thread is None:
            self.thread = ChatHistoryAgentThread()
        '''
        #reset thread for each search
        self.thread = ChatHistoryAgentThread()
        query = (
            f"Help me find flights from '{departure}' to '{destination}', "
            f"departureDate='{departureDate}', returnDate='{returnDate}', adults={adults}, children={children}, "
            f"infants={infants}, nonStop='{nonStop}', "
            f"currencyCode='{currencyCode}'"
        )

        try:
            response = await self.flights_search_agent.get_response(
                messages=query,
                thread=self.thread
            )
            response_text = response.message.content
            self._save_response(response_text)

            # Remove markdown if present
            if '```' in response_text:
                lines = response_text.split('```')
                for line in lines:
                    if '[' in line and ']' in line:
                        response_text = line.strip()
                        break

            flights = []
            current_flight = None
            current_segment = None
            current_location = None
            location_type = None
            in_segments = False
            lines = response_text.split('\n')
            for line in lines:
                line = line.strip()
                if not line or line in '[]{}':
                    continue
                
                line = line.rstrip(',').replace('"', '')
                
                # New flight entry
                if 'id:' in line:
                    if current_flight:
                        flights.append(current_flight)
                    current_flight = {
                        'id': int(line.split(':')[1].strip()),
                        'segments': []
                    }
                    in_segments = False
                
                # Main flight info
                elif current_flight:
                    if 'airline:' in line and not current_segment:
                        current_flight['airline'] = line.split(':')[1].strip()
                    elif 'price:' in line:
                        current_flight['price'] = float(line.split(':')[1].strip())
                    elif 'duration:' in line:
                        current_flight['duration'] = line.split(':')[1].strip()
                    
                    # Baggage section
                    elif 'baggage:' in line:
                        current_flight['baggage'] = {}
                    elif current_flight.get('baggage') is not None:
                        if 'includedCheckedBags:' in line:
                            current_flight['baggage']['includedCheckedBags'] = float(line.split(':')[1].strip())
                        elif 'additionalFee:' in line:
                            current_flight['baggage']['additionalFee'] = float(line.split(':')[1].strip())
                        elif 'currency:' in line:
                            current_flight['baggage']['currency'] = line.split(':')[1].strip()
                    
                    # Segments section
                    if 'segments:' in line:
                        in_segments = True
                    elif in_segments:
                        if 'departure:' in line:
                            current_segment = {'departure': {}}
                        elif 'arrival:' in line and current_segment:
                            current_segment['arrival'] = {}
                        elif 'carrierCode:' in line and current_segment:
                            current_segment['carrierCode'] = line.split(':')[1].strip()
                            if current_segment.get('departure') and current_segment.get('arrival'):
                                current_flight['segments'].append(current_segment)
                                current_segment = None
                        elif ':' in line and current_segment:
                            key, value = line.split(':', 1)
                            key = key.strip()
                            value = value.strip()
                            
                            if current_segment.get('arrival') is None:
                                # Still processing departure
                                if key in ['airline', 'iataCode', 'at', 'country', 'city', 'terminal']:
                                    current_segment['departure'][key] = value
                            else:
                                # Processing arrival
                                if key in ['airline', 'iataCode', 'at', 'country', 'city', 'terminal']:
                                    current_segment['arrival'][key] = value

            # Add the last flight if exists
            if current_flight:
                if current_segment and current_segment.get('departure') and current_segment.get('arrival'):
                    current_flight['segments'].append(current_segment)
                flights.append(current_flight)

            # Sort flights by price
            flights.sort(key=lambda x: x.get('price', float('inf')))

            if flights:
                return {
                    "success": True,
                    "data": flights
                }
            else:
                return {
                    "success": False,
                    "error": "No valid flights found in response"
                }

        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }

class TravelService:
    def __init__(self):
        load_dotenv(override=True)
        self.log_dir = "travelservice_logs"
        os.makedirs(self.log_dir, exist_ok=True)
        # Initialize kernel
        self.kernel = Kernel()
        
        # Initialize Azure OpenAI
        self.ai_chat = AzureChatCompletion(
            deployment_name=os.environ.get("AZURE_OPENAI_CHAT_DEPLOYMENT_NAME"),
            endpoint=os.environ.get("AZURE_OPENAI_ENDPOINT"),
            api_key=os.environ.get("AZURE_OPENAI_API_KEY"),
            api_version=os.environ.get("AZURE_OPENAI_API_VERSION"),
            service_id="chat"
        )

        try:
            self.travel_plugin = TravelPlugin()
            self.kernel.add_plugin(
                plugin=self.travel_plugin,
                plugin_name="travel_plugin",
                description="Google Map API Plugin for travel services"
            )
        except ValueError as e:
            raise Exception(f"Error initializing travel plugin: {e}")
        
        self.thread = None
        self.travel_plan_agent = ChatCompletionAgent(
            service=self.ai_chat,
            name="TravelAgent",
            instructions=(
                """
                You are an itinerary planner.
                The input is a list of multiple days. Each day's plan is a list.
                Only the first day will include flight information; the following days will not.
                Each day provides multiple options for planning the itinerary.
                Each attraction includes a type field indicating its category, such as restaurant, hotel, etc.
                You need to use this information to arrange the itinerary.
                If any location lacks latitude or longitude, you must attempt to find them yourself (if unavailable, set as None).
                Input:
                    The input is a list of daily plans.
                    Each day includes:
                        1.day (integer) — day number
                        2.itinerary — list of attractions, each with:
                            2-1 name
                            2-2 latitude
                            2-3 longitude
                            2-4 type (e.g., restaurant,lodging, etc.)
                    departure_flight only exists in the first day, with the following fields:
                        departure_flight  — arrival flight information, including:
                            2-1 name (airport code)
                            2-2 arrival_time (ISO 8601 datetime string)
                Your task:
                    For each day's itinerary:
                        If departure_flight is present:
                            Wait 1 hour after arrival_time before starting the first activity (for immigration and transportation).
                            Use the adjusted start time as the day's beginning.
                        If departure_flight is absent:
                            Arrange your travel time according to your ideas
                        For each attraction, add two new fields:
                            start_time (24-hour HH:MM format)
                            end_time (24-hour HH:MM format)
                            order (0, 1, 2...)
                        After the last attraction of each day, you need to help the user find a hotel.
                        the hotel information should be added to the end of the itinerary list.
                        The hotel information should include:
                            1.name(hotel name)
                            2.latitude
                            3.longitude
                            4.order (the order of the hotel in the itinerary list)
                            5.start_time (24-hour HH:MM format)
                            6.end_time (23:59)
                            7.address (hotel formatted address)
                            8.contact (hotel contact number,if you can find it)
                        - After the last attraction of the day, you MUST find a hotel.
                        - If no hotel is found within 3 km, expand the search radius to 5 km, 10 km, etc., until a hotel is found.
                        - If still not found, select any hotel within the city.
                        - It is not acceptable to return "No hotels found" — you must provide a hotel entry.
                Output format:
                    ##Only output valid JSON starting with `[` and ending with `]`.
                    For each day's list, return the updated attractions with:
                        1.name
                        2.latitude
                        3.longitude
                        4.order
                        5.start_time
                        6.end_time
                        7.address

                Keep the multi-day list structure identical to the input.

                Omit the flight information in the output; only attractions should be listed with scheduled times.
                
                Example Output Format:
                [
                    {
                        "day": 1,
                        "itinerary": [
                        {
                            "name": "Taipei 101",
                            "latitude": 25.033964,
                            "longitude": 121.564468,
                            "order": 1,
                            "start_time": "11:00",
                            "end_time": "12:30",
                            "address":"No. 7, Section 5, Xinyi Road, Xinyi District, Taipei City, 110, Taiwan"
                        },
                        {
                            "name": "Chiang Kai-shek Memorial Hall",
                            "latitude": 25.034153,
                            "longitude": 121.521698,
                            "order": 2,
                            "start_time": "13:00",
                            "end_time": "14:30",
                            "address":"Zhongzheng District, Taipei City 100, Taiwan"
                        },
                        {
                            "name": "Shilin Night Market",
                            "latitude": 25.087450,
                            "longitude": 121.525005,
                            "order": 3,
                            "start_time": "15:00",
                            "end_time": "16:30",
                            "address": "No. 101, Jihé Road, Shilin District, Taipei City, 111, Taiwan"
                        },
                        {
                            (hotel's information)
                        }
                        ]
                    },
                    {
                        "day": 2,
                        "itinerary": [...]
                    },
                    {
                        "day": 3,
                        "itinerary": [...]
                    }
                ]

                #Important Rules:
                    If a flight exists, wait 1 hour after arrival_time before the first attraction.
                    Time format: 24-hour clock, HH:MM.
                    Output must not contain departure_flight fields.
                    Keep the same day structure in the output.
                    After the last attraction of each day,You need to help the user find a hotel.
                    ##Only output valid JSON starting with `[` and ending with `]`.
                    
                    You must ONLY output the final valid JSON result. 
                    Do not explain, comment, apologize, or describe your process. 
                    Do not output any text before or after the JSON block.
                """
            
            ),
            plugins=[
                self.kernel.get_plugin("travel_plugin")
            ]
        )
    



    
    def _save_response(self, response: str) -> str:
        """Save search response to a text file."""
        filename = f"{self.log_dir}/attractions_plan.txt"
        with open(filename, "w", encoding="utf-8") as f:
            f.write(f"Response:\n{response}")
        
        return filename
    
    async def plan_route_attraction(self, attraction: dict) -> dict:
        '''
        {
            "departure_flight": {
                "name": "TPE",
                "latitude": 25.0804902,
                "longitude": 121.2311589,
                "arrival_time": "07:00"
            },
            "attractions": [
                {
                    "name": "Taipei 101",
                    "latitude": 25.033964,
                    "longitude": 121.564468
                },
                {
                    "name": "Chiang Kai-shek Memorial Hall",
                    "latitude": 25.034153,
                    "longitude": 121.521698
                }
                // ... more attractions
            ]
        }
        '''
        self.thread = ChatHistoryAgentThread()
        query = (
            f"Help me plan a travel route based on the following attractions: {attraction}"
        )
        try:
            response = await self.travel_plan_agent.get_response(
                messages=query,
                thread=self.thread
            )
            # Extract text content from AgentResponseItem.
            response_text = response.message.content
            # Save response to file
            log_file = self._save_response(response_text)


            # Clean up and parse the response text
            days = []
            current_day = None
            current_item = None
            in_itinerary = False
            
            lines = response_text.split('\n')
            for line in lines:
                line = line.strip()
                if not line or line in '[]{}':
                    continue
                    
                line = line.rstrip(',').replace('"', '')
                
                # process day entries
                if 'day:' in line:
                    if current_day:
                        if current_item:
                            current_day['itinerary'].append(current_item)
                            current_item = None
                        days.append(current_day)

                    current_day = {
                        'day': int(line.split(':')[1].strip()),
                        'itinerary': []
                    }
                    
                # Process itinerary items
                elif current_day and 'itinerary:' in line:
                    in_itinerary = True
                elif in_itinerary and ':' in line:
                    key, value = line.split(':', 1)
                    key = key.strip()
                    value = value.strip()
                    
                    # new itinerary
                    if key == 'name':
                        if current_item:
                            current_day['itinerary'].append(current_item)
                        current_item = {'name': value}
                    elif current_item:
                        # process item attributes
                        if key in ['latitude', 'longitude']:
                            try:
                                # Skip null values or invalid numbers
                                if value.lower() != 'null' and value:
                                    current_item[key] = float(value)
                                else:
                                    current_item[key] = 0.0  # or some default value
                            except ValueError:
                                current_item[key] = 0.0  # or some default value
                        elif key == 'order':
                            current_item[key] = int(value)
                        elif key in ['start_time', 'end_time', 'address']:
                            current_item[key] = value

            # Add the last item and day if they exist
            if current_item:
                current_day['itinerary'].append(current_item)
            if current_day:
                days.append(current_day)

            # Check if any days were found
            if not days:
                return {
                    "success": False,
                    "error": "No valid data found in response"
                }

            # Check if any required fields are missing in each itinerary item
            for day in days:
                for item in day['itinerary']:
                    required_fields = ['name', 'latitude', 'longitude', 
                                    'order', 'start_time', 'end_time']
                    missing_fields = [field for field in required_fields 
                                    if field not in item]
                    if missing_fields:
                        return {
                            "success": False,
                            "error": f"Missing required fields in itinerary item: {missing_fields}"
                        }

            return {
                "success": True,
                "data": days
            }

        except Exception as e:
            return {
                "success": False,
                "error": str(e),
                "raw_response": str(response_text) if 'response' in locals() else None
            }

class MailService:
    def __init__(self):
        load_dotenv(override=True)
        self.log_dir = "mailservice_logs"
        os.makedirs(self.log_dir, exist_ok=True)
        # Initialize kernel
        self.kernel = Kernel()
        
        # Initialize Azure OpenAI
        self.ai_chat = AzureChatCompletion(
            deployment_name=os.environ.get("AZURE_OPENAI_CHAT_DEPLOYMENT_NAME"),
            endpoint=os.environ.get("AZURE_OPENAI_ENDPOINT"),
            api_key=os.environ.get("AZURE_OPENAI_API_KEY"),
            api_version=os.environ.get("AZURE_OPENAI_API_VERSION"),
            service_id="chat"
        )

        try:
            self.mail_plugin = MailPlugin()
            self.kernel.add_plugin(
                plugin=self.mail_plugin,
                plugin_name="mail_plugin",
                description="Google Mail API Plugin for sending email"
            )
        except ValueError as e:
            raise Exception(f"Error initializing mail plugin: {e}")
        
        self.thread = None
        self.send_mail_agent = ChatCompletionAgent(
            service=self.ai_chat,
            name="MailAgent",
            instructions=(
                """
                You are a smart email assistant.
                You will receive a image path and the receiver's email address.
                Your task is to send an email with the image embedded in the email body.
                """
            ),
            plugins=[
                self.kernel.get_plugin("mail_plugin")
            ]
        )
    
    def _save_response(self, response: str) -> str:
        """Save search response to a text file."""
        filename = f"{self.log_dir}/mail.txt"
        with open(filename, "w", encoding="utf-8") as f:
            f.write(f"Response:\n{response}")
        
        return filename

    async def send_mail(self, usermail: str,file_name:str) -> dict:
        self.thread = ChatHistoryAgentThread()
        query = (
            f"you are the best mail writer and travel planner\n"
            f"Help me send mail to {usermail} with image\n"
            f"this is my file name {file_name}\n"
            f"this image contain the travel plan\n"
            f"Make sure your email is clear and friendly\n"
        )
        try:
            response = await self.send_mail_agent.get_response(
                messages=query,
                thread=self.thread
            )
            # 從 AgentResponseItem 中提取文本內容
            response_text = response.message.content
            # 保存響應到文件
            log_file = self._save_response(response_text)

            return {
                "success": True,
            }

        except Exception as e:
            return {
                "success": False,
                "error": str(e),
            }
    