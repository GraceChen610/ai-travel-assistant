# Travel Assistant API Service

## Overview
This project is a Flask-based REST API service that provides travel-related functionalities using Azure OpenAI and various travel APIs. The service includes flight search, travel planning, and email notification features.

## Features
- **Flight Search**: Search for flights using Amadeus API
- **Travel Planning**: Create travel itineraries with Google Maps integration
- **Email Service**: Send travel plans via email with image attachments
- **Location Services**: Find hotels, attractions, and airport information

## Prerequisites
- Python 3.10+
- Flask
- Azure OpenAI API access or OpenAI
- Amadeus API credentials
- Google Maps API key

[Azure OpenAI API](https://azure.microsoft.com/zh-tw/products/ai-services/openai-service)
[OpenAI](https://openai.com/)
[Amadeus API](https://developers.amadeus.com/)
[Google Map Api](https://developers.google.com/maps?hl=zh-tw)
[Google App Key](https://myaccount.google.com/apppasswords?rapt=AEjHL4Ozyu2Iza2ENkEZtwnQvIFLYbnqKmQ0Dei6QKlr7rElW9ZZmxkToNqx7CG0dvGlv6QGKcQ4phjI7FgEGxWvGK6QfBStXrtSl5Rt5mBfbw4r23vP2vY)
## Environment Variables
Create a `.env` file with the following variables:
```
#AZURE_OPENAI setting
AZURE_OPENAI_CHAT_DEPLOYMENT_NAME=your_deployment_name
AZURE_OPENAI_ENDPOINT=your_endpoint
AZURE_OPENAI_API_KEY=your_api_key
AZURE_OPENAI_API_VERSION=your_api_version
#or OPENAI setting
OPENAI_KEY=""

#amadeus plugin 
AMADEUS_API_KEY=your_amadeus_key
AMADEUS_API_SECRET=your_amadeus_secret

#google map plugin
GOOGLE_MAPS_API_KEY=your_google_maps_key

#mail plugin
GOOGLE_APP_ID=your_google_app_key
GOOGLE_PLANNER_MAIL=your_mail_sender
```

## Installation
1. Clone the repository
2. Install dependencies:
```bash
pip install -r requirements.txt
```

## API Endpoints

### Flight Search
- `POST /search_flights`
  - Search for available flights
  - Parameters:
    ```json
    {
        "departure_city": "string",
        "destination_city": "string",
        "departureDate": "YYYY-MM-DD",
        "returnDate": "YYYY-MM-DD",
        "adults": integer,
        "children": integer,
        "infants": integer,
        "nonStop": "true/false",
        "currencyCode": "string"
    }
    ```

### Travel Planning
- `POST /plan_route`
  - Create a travel itinerary
  - Parameters: List of attractions with coordinates

### Email Service
- `POST /send_mail`
  - Send travel plan via email
  - Parameters:
    - `email`: Recipient email address
    - `image`: Base64 encoded image

### Health Check
- `GET /health`
  - Check service health status

## Project Structure
```
.
├── main.py              # Flask application entry point
├── main_agent.py        # Core service implementations
├── plugins/
│   ├── amadeus_plugin.py     # Amadeus API integration
│   ├── google_map_plugin.py  # Google Maps API integration
│   └── google_mail_plugin.py  # Gmail API integration
└── templates/           # HTML templates for web interface
```

## Running the Application
```bash
python main.py
```
The server will start on `http://localhost:5000`

## License
MIT License

