import requests
from semantic_kernel.functions import kernel_function
import os
import time
from dotenv import load_dotenv
        
load_dotenv()

class AmadeusPlugin:
    def __init__(self):
        self.client_id = os.getenv('AMADEUS_API_KEY')
        self.client_secret = os.getenv('AMADEUS_API_SECRET')
        self.token_url = 'https://test.api.amadeus.com/v1/security/oauth2/token'
        self.access_token = None
        self.expiry_time = 0  # 紀錄 token 的過期時間 (epoch 秒數)

    def _fetch_token(self):
        headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        data = {
            'grant_type': 'client_credentials',
            'client_id': self.client_id,
            'client_secret': self.client_secret
        }

        response = requests.post(self.token_url, headers=headers, data=data)
        if response.status_code == 200:
            token_info = response.json()
            self.access_token = token_info.get('access_token')
            expires_in = token_info.get('expires_in', 1800)  # 預設為 30 分鐘
            self.expiry_time = time.time() + expires_in - 60  # 提前 1 分鐘過期以保險
        else:
            raise Exception(f"Failed to get token: {response.status_code} - {response.text}")

    def get_access_token(self):
        if not self.access_token or time.time() >= self.expiry_time:
            self._fetch_token()
        return self.access_token
    '''
    @kernel_function(
        description="""Search for information about cities or airports using a keyword that matches the beginning of a city or airport name or IATA code. 
                    Only locations in the United States, Spain, the United Kingdom, Germany, and India are supported.
                    Example: "MUC" would return information about Munich Airport.
                    Once the appropriate city or airport is found, use the `SearchFlightsOffers` function and ensure that the `departure` and `destination` fields are updated with the correct IATA codes.""",
        name="SearchLocation"
    )
    def search_locations(self, keyword, sub_type="AIRPORT,CITY"):
        token = self.get_access_token()
        url = "https://test.api.amadeus.com/v1/reference-data/locations"
        print(keyword, sub_type)
        headers = {
            "Authorization": f"Bearer {token}"
        }

        params = {
            "keyword": keyword,
            "subType": sub_type  # 可選 AIRPORT, CITY 或兩者
        }

        response = requests.get(url, headers=headers, params=params)
        if response.status_code == 200:
            return response.json()
        else:
            print("API Error:", response.status_code, response.text)
            return None
    '''
    @kernel_function(
        description="""查詢提供的航班資訊,
            目前只支援美國、西班牙、英國、德國和印度的城市或機場
            sub_type根據使用者輸入判斷是哪個城市或機場
            下面是使用範例，起始地區和目的地都是 IATA 代碼
            originLocationCode="NYC",String
            destinationLocationCode="PAR",String
            departureDate="2023-05-15",String
            adults、children、infants都是人數，integer
            nonStop="false"表示不限制中途轉機，"true"表示不允許中途轉機,String
            currencyCode="USD"表示回傳的價格是以美元計算的,String
            """,
        name="SearchFlightsOffers"
    )
    def flights_offers_search(self,
                            departure,
                            destination,
                            departuredate=time.strftime("%Y-%m-%d"),
                            returndate=None,
                            adults=1,children=0, infants=0,
                            nonStop="false",
                            currencyCode="USD"
                            ):
        
        token = self.get_access_token()
        url = "https://test.api.amadeus.com/v2/shopping/flight-offers"
        departure, destination, nonStop, currencyCode = departure.upper(), destination.upper(), str(nonStop).lower(), currencyCode.upper()

        print("\nA  ",departure, destination, departuredate,returndate, adults, children, infants, nonStop, currencyCode)   
        headers = {
            "Authorization": f"Bearer {token}"
        }
        if returndate and str(returndate).lower() != 'none':
            print("來回")
            parms = {
                "originLocationCode": departure,
                "destinationLocationCode": destination,
                "departureDate": departuredate,
                "returnDate": returndate,           # 可選：如果只查單程可移除
                "adults": adults,
                "children": children,                        # 可選：如無孩童可移除
                "infants": infants,                         # 可選
                "nonStop": nonStop,
                "currencyCode": currencyCode,               # 可選：例如 USD、EUR
                "maxPrice": 1000,                    # 可選：單位為旅客價格上限
                "max": 10                         # 可選：最多回傳幾筆航班結果
            }
        else:
            print("單程")
            parms = {
                    "originLocationCode": departure,
                    "destinationLocationCode": destination,
                    "departureDate":departuredate,
                    "adults": adults,
                    "children": children,                        # 可選：如無孩童可移除
                    "infants": infants,                         # 可選
                    "nonStop": nonStop,
                    "currencyCode": currencyCode,               # 可選：例如 USD、EUR
                    "maxPrice": 1000,                    # 可選：單位為旅客價格上限
                    "max": 10                        # 可選：最多回傳幾筆航班結果
                }

        response = requests.get(url, headers=headers, params=parms)
        if response.status_code == 200:
            return response.json()
        else:
            print("API Error:", response.status_code, response.text)
            return None

    
    def search_location(self, input: str) -> str:
        """
        用 Amadeus API 查詢符合關鍵字的城市或機場資訊。
        """

        token = self.get_access_token()
        url = "https://test.api.amadeus.com/v1/reference-data/locations"

        params = {
            "keyword": input,
            "subType": "AIRPORT,CITY"
        }

        headers = {
            "Authorization": f"Bearer {token}"
        }

        response = requests.get(url, headers=headers, params=params)

        if response.status_code != 200:
            return f"[查詢失敗] Status: {response.status_code} - {response.text}"

        data = response.json().get("data", [])
        if not data:
            return f"找不到關鍵字「{input}」相關的城市或機場。"

        # 只回傳前 1 筆簡要資訊
        top = data[0]
        name = top.get("name", "N/A")
        iata = top.get("iataCode", "N/A")
        country = top.get("address", {}).get("countryName", "N/A")
        detailed = top.get("detailedName", "N/A")

        return f"✅ 查詢結果：\n- 名稱：{name}\n- IATA代碼：{iata}\n- 國家：{country}\n- 詳細名稱：{detailed}"
'''
def main():
    amadeus_plugin = AmadeusPlugin()
    # 測試查詢城市或機場資訊
    result = amadeus_plugin.search_location("NYC")
    print(result)

    # 測試查詢航班資訊
    flight_result = amadeus_plugin.flights_offers_search("NYC", "PAR")
    print(flight_result)

if __name__ == "__main__":
    main()
'''