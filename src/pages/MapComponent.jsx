import { useState, useRef } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { combineFlightInfo } from "../utils/function.js";
import { flightMockData } from "../mocks/flightMockData.js";



export const MapComponent = ({ data, calculateDays }) => {
  const mapRef = useRef(null);
  const [cityInputs, setCityInputs] = useState(
    Array.from({ length: calculateDays }, () => "")
  ); // 根據 calculateDays 初始化城市輸入框
  const [apiData, setApiData] = useState([]); // 新增 state 來儲存 API 回傳的資料
  const [flightInfo, setFlightInfo] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY, // 替換為您的 Google Maps API 金鑰
    libraries: ["places"],
  });

  const handleSearch = () => {
    if(cityInputs.some(city => city == "")) {
      alert("請填寫所有城市名稱！");
      return;
    }
    if (isLoaded && mapRef.current) {
      const geocoder = new window.google.maps.Geocoder();
      const groupedData = [];

      cityInputs.forEach((city, dayIndex) => {
        geocoder.geocode({ address: city }, async (results, status) => {
          if (status === window.google.maps.GeocoderStatus.OK) {
            const location = results[0].geometry.location;
            const map = new window.google.maps.Map(mapRef.current, {
              center: location,
              zoom: 13,
            });

            const service = new window.google.maps.places.PlacesService(map);
            const keywords = [...data.form.activity_preferences, "餐廳", "旅館"];
            const itineraryData = [];

            keywords.forEach((keyword) => {
              const request = {
                location,
                radius: 5000,
                keyword: `${city} ${keyword}`,
              };

              service.nearbySearch(request, (results, status) => {
                if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                  results.forEach((place) => {
                    console.log(place)
                    console.log(place.name)
                    const isDuplicate = itineraryData.some(
                      (item) => item.name === place.name
                    );

                    if (!isDuplicate) {
                      itineraryData.push({
                        name: place.name,
                        latitude: place.geometry.location.lat(),
                        longitude: place.geometry.location.lng(),
                      });
                    }
                  });

                  if (!groupedData.some((group) => group.day === dayIndex + 1)) {
                    groupedData.push({
                      day: dayIndex + 1,
                      itinerary: itineraryData,
                    });
                  }

                  if (groupedData.length === cityInputs.length) {
                    setApiData(groupedData);
                    console.log(groupedData);
                  }
                }
              });
            });
            // 打後端 查出AI推薦路線
            await recommendRoutes()
          }
        });
      });
    }
  };

  if (!isLoaded) {
    return <div>Loading Google Maps...</div>;
  }


  const setFlightData = ()=>{
    const userFlightData =
    data.userFlight?.segments ?? flightMockData.data[0].segments;
    
    // 取得使用者的往返航班資料，包含抵達時間、起降機場等資訊
    setFlightInfo(combineFlightInfo(
      userFlightData,
      data.form.departure_city,
      data.form.destination_city
    ));
  }


  const recommendRoutes = async () => {
    // 處理 API 資料
    await setFlightData();
    
    let arrivalFlight = {
      departure_flight: {
        name: flightInfo.arrival.iataCode, // 抵達機場代碼
        latitude: null,
        longitude: null,
        arrival_time: flightInfo.arrival.at, // 抵達時間
      },
    };

    let departureFlight ={}
    if(flightInfo.departure != 'noBackFlight'){
      departureFlight = {
        departure_flight: {
          name: flightInfo.departure.iataCode, // 離開機場代碼
          latitude: null,
          longitude: null,
          arrival_time: flightInfo.departure.at, // 抵達時間
        },
      };
    }

    let setApiData = [];

    apiData.forEach((data) => {
      //day = 1 時，加入航班資訊
      if(data.day == 1){
        setApiData.push({
          day: data.day,
          departure_flight : arrivalFlight,//抵達航班資訊
          itinerary: data.itinerary,
        });
      }
      //day = 最後時，加入航班資訊
      else if(data.dat == cityInputs && Object.keys(departureFlight).length === 0){
        setApiData.push({
          day: data.day,
          departure_flight : departureFlight, //離開航班資訊
          itinerary: data.itinerary,
        });
      }else {
        setApiData.push({
          day: data.day,
          itinerary: data.itinerary,
        });
      }
    })

    try {
      const response = await fetch(
        "https://tes-430078023071.asia-east1.run.app/plan_route",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ setApiData }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result)
    } catch (error) {
      console.error("Error planning route:", error);
      alert("無法獲取AI推薦路線，請稍後再試。");
    }
  };

  return (
    <div>
      {cityInputs.map((city, index) => (
        <input
          key={index}
          type="text"
          value={city}
          onChange={(e) => {
            const newCityInputs = [...cityInputs];
            newCityInputs[index] = e.target.value;
            setCityInputs(newCityInputs);
          }}
          placeholder={`第${index + 1}天城市名稱`}
          style={{ marginBottom: "10px", padding: "5px",marginRight: "10px" }}
        />
      ))}
      <div>
        <button
          onClick={handleSearch}
          style={{ marginLeft: "10px", padding: "10px 15px", backgroundColor: "#2dac2d",border:'none',color:'white',borderRadius:'5px',cursor:'pointer' }}
        >
          路線規劃
        </button>
      </div>
      <div ref={mapRef} style={{ height: "400px", width: "100%", display: "none" }}></div>
    </div>
  );
};
