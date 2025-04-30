from semantic_kernel.functions import kernel_function
from typing import Dict, List
from datetime import datetime
import googlemaps
import os
from dotenv import load_dotenv

class TravelPlugin:
    def __init__(self):
        load_dotenv()
        api_key=os.getenv("GOOGLE_MAPS_API_KEY")
        self.gmaps = googlemaps.Client(key=api_key)
    
    @kernel_function(
        description="Find location(latitude longitude) by location name", 
        name="find_coordinates_from_location"
    )
    def get_coordinates_from_location(self, location_name: str) -> tuple:
        """
        Given a location name (city, address, landmark, etc.), returns the latitude and longitude.
        
        Args:
            location_name (str): Name of the location to geocode
        
        Returns:
            tuple: A tuple containing (latitude, longitude) if found, or None if not found
        """
        try:
            # 使用 geocode 方法獲取地理位置資訊
            geocode_result = self.gmaps.geocode(location_name)
            
            # 檢查是否找到結果
            if not geocode_result:
                print(f"Location not found: {location_name}")
                return None
            
            # 從結果中提取經緯度
            location = geocode_result[0]['geometry']['location']
            latitude = location['lat']
            longitude = location['lng']
            
            print(f"Found coordinates for {location_name}: {latitude}, {longitude}")
            return (latitude, longitude)
        
        except Exception as e:
            print(f"Error geocoding location '{location_name}': {e}")
            return None
    
    @kernel_function(
        description="Find nearby hotels by latitude and longitude", 
        name="find_hotels_nearby"
    )
    def find_hotels_nearby(self, lat: float, lng: float, radius: int = 5000) -> List[str]:
        """
        Given latitude and longitude, returns a list of nearby hotels within the specified radius (in meters).
        """
        location = (lat, lng)
        places_result = self.gmaps.places_nearby(
            location=location,
            radius=radius,
            type='lodging',
            #rank_by='prominence'
        )
        
        results = places_result.get('results', [])
        if not results:
            return [f"No hotels found near the specified location."]
        hotels_info = []
        for place in results:
            place_id = place['place_id']
            details = self.gmaps.place(place_id=place_id)
            result_details = details.get('result', {})
            name = result_details.get('name', 'No name available')
            address = result_details.get('formatted_address', 'No detailed address available')

            hotels_info.append(f"{name} ({address})")
        print(f"{hotels_info}")
        return hotels_info
    #search for popular tourist attractions within a specified distance from a given city
    @kernel_function(
        description="Searches for popular tourist attractions within a specified distance from the given city.",
        name="GetAttractionsByCity",
    )
    def find_nearby_attractions(self,city_name: str, radius: int = 10000) -> List[str]:
        """
        Given a city name and a search radius (in meters), returns a list of popular attractions with their names and addresses.
        """

        # search for the city using geocode
        geocode_result = self.gmaps.geocode(city_name)
        if not geocode_result:
            return [f"location not found：{city_name}"]

        location = geocode_result[0]['geometry']['location']
        latlng = (location['lat'], location['lng'])

        # search for nearby attractions using places_nearby
        places_result = self.gmaps.places_nearby(
            location=latlng,
            radius=radius,
            type='tourist_attraction',
            rank_by='prominence'
        )
        
        # return the results
        results = places_result.get('results', [])
        if not results:
            return [f"No attractions found near {city_name}."]
        attraction_info = []
        for place in results:
            place_id = place['place_id']
            details = self.gmaps.place(place_id=place_id)
            result_details = details.get('result', {})
            name = result_details.get('name', 'No name available')
            address = result_details.get('formatted_address', 'No detailed address available')

            attraction_info.append(f"{name} ({address})")
        
        print(attraction_info)
        return attraction_info

    

class AirlinePlugin:
    def __init__(self):
        load_dotenv()
        api_key=os.getenv("GOOGLE_MAPS_API_KEY")
        self.gmaps = googlemaps.Client(key=api_key)
    # search for the city and country using airline name
    @kernel_function(
        description="input the airline name, return the city and country", 
        name="airport_to_location"
    )
    def airport_to_location(self, airport_name: str) -> str:
        geo = self.gmaps.geocode(airport_name)
        if not geo:
            return "location not found"
        components = geo[0]["address_components"]
        city = next((c["long_name"] for c in components if "locality" in c["types"]), "")
        country = next((c["long_name"] for c in components if "country" in c["types"]), "")
        return f"{city}, {country}"
    
def main():
    
    travel_plugin = TravelPlugin()
    '''
    city_name = "Kyoto"
    radius = 15000  # 15 km
    attractions = travel_plugin.find_nearby_attractions(city_name, radius)
    
    print(f"Attractions near {city_name}:")
    for attraction in attractions:
        print(attraction)
    
    airline_plugin = AirlinePlugin()
    airport_name = "LAX"
    location = airline_plugin.airport_to_location(airport_name)
    print(f"Location for {airport_name}: {location}")
    
    print(travel_plugin.find_hotels_nearby(25.0375,121.5137))
if __name__ == "__main__":
    main()
'''