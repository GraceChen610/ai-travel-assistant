import { useState, useRef } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { combineFlightInfo, addDays } from "../utils/function.js";
import { flightMockData } from "../mocks/flightMockData.js";
import { itineraryMockData } from "../mocks/itineraryMockData.js";
const BASEURL = import.meta.env.VITE_BASEURL;

export const MapComponent = ({ userFlight, calculateDays, form, setData }) => {
  const mapRef = useRef(null);
  const [cityInputs, setCityInputs] = useState(
    Array.from({ length: calculateDays }, () => "")
  ); // 根據 calculateDays 初始化城市輸入框

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY, // 替換為您的 Google Maps API 金鑰
    libraries: ["places"],
  });

  const handleSearch = async () => {
    if (cityInputs.some((city) => city === "")) {
      alert("請填寫所有城市名稱！");
      return;
    }

    if (isLoaded && mapRef.current) {
      const geocoder = new window.google.maps.Geocoder();
      const groupedData = [];

      try {
        // Create a promise for each city to handle all async operations
        const cityPromises = cityInputs.map((city, dayIndex) => {
          return new Promise((resolve, reject) => {
            geocoder.geocode({ address: city }, (results, status) => {
              if (status === window.google.maps.GeocoderStatus.OK) {
                const location = results[0].geometry.location;
                const map = new window.google.maps.Map(mapRef.current, {
                  center: location,
                  zoom: 13,
                });

                const service = new window.google.maps.places.PlacesService(
                  map
                );
                const keywords = [...form.activity_preferences, "餐廳", "旅館"];
                const itineraryData = [];

                // Track all search promises for this city
                const searchPromises = keywords.map((keyword) => {
                  return new Promise((resolveSearch, rejectSearch) => {
                    const request = {
                      location,
                      radius: 5000,
                      keyword: `${city} ${keyword}`,
                    };

                    service.nearbySearch(request, (results, status) => {
                      if (
                        status ===
                        window.google.maps.places.PlacesServiceStatus.OK
                      ) {
                        results.forEach((place) => {
                          const isDuplicate = itineraryData.some(
                            (item) => item.name === place.name
                          );

                          if (!isDuplicate) {
                            itineraryData.push({
                              name: place.name,
                              latitude: place.geometry.location.lat(),
                              longitude: place.geometry.location.lng(),
                              types: setTag(place.types),
                            });
                          }
                        });
                        resolveSearch();
                      } else {
                        // Even if search fails, we should resolve to continue
                        console.warn(
                          `Places search failed for ${keyword} in ${city}: ${status}`
                        );
                        resolveSearch();
                      }
                    });
                  });
                });

                // Wait for all keyword searches to complete for this city
                Promise.all(searchPromises)
                  .then(() => {
                    groupedData.push({
                      day: dayIndex + 1,
                      itinerary: itineraryData,
                    });
                    resolve();
                  })
                  .catch((error) => {
                    console.error(`Error in searches for ${city}:`, error);
                    resolve(); // Still resolve so other cities can continue
                  });
              } else {
                console.error(`Geocoding failed for ${city}: ${status}`);
                resolve(); // Still resolve so other cities can continue
              }
            });
          });
        });

        // Wait for all cities to be processed
        await Promise.all(cityPromises);

        // Now that all cities are processed, call recommendRoutes
        await recommendRoutes(groupedData);
      } catch (error) {
        console.error("Error in handleSearch:", error);
        alert("搜尋過程中發生錯誤，請再試一次。");
      }
    }
  };

  if (!isLoaded) {
    return <div>Loading Google Maps...</div>;
  }

  const setTag = (types) => {
    if (types.includes("lodging")) {
      //住宿
      return "lodging";
    } else if (types.includes("restaurant")) {
      //餐廳
      return "restaurant";
    } else {
      return "attractions"; //景點
    }
  };

  const recommendRoutes = async (apiData) => {
    // 處理 API 資料
    //  await setFlightData();
    const userFlightData =
      userFlight?.segments ?? flightMockData.data[0].segments;
    // 取得使用者的往返航班資料，包含抵達時間、起降機場等資訊

    const flightInfo = await combineFlightInfo(
      userFlightData,
      form.departure_city,
      form.destination_city
    );
    const arrivalLocation = await getFlightInfo(flightInfo?.arrival?.iataCode);

    let arrivalFlight = {
      name: flightInfo.arrival.iataCode, // 抵達機場代碼
      latitude: arrivalLocation?.lat,
      longitude: arrivalLocation?.lng,
      arrival_time: flightInfo.arrival.at, // 抵達時間
    };

    let departureFlight = {};
    if (flightInfo.departure != "noBackFlight") {
      const departureLocation = await getFlightInfo(
        flightInfo?.departure?.iataCode || "noBackFlight"
      );
      departureFlight = {
        name: flightInfo.departure.iataCode, // 離開機場代碼
        latitude: departureLocation?.lat,
        longitude: departureLocation?.lng,
        arrival_time: flightInfo.departure.at, // 抵達時間
      };
    }

    let postData = [];
    apiData.forEach((data) => {
      //day = 1 時，加入航班資訊
      if (data.day == 1) {
        postData.push({
          day: data.day,
          departure_flight: arrivalFlight, //抵達航班資訊
          itinerary: data.itinerary,
        });
      }
      //day = 最後時，加入航班資訊
      else if (
        data.dat == cityInputs &&
        Object.keys(departureFlight).length === 0
      ) {
        postData.push({
          day: data.day,
          departure_flight: departureFlight, //離開航班資訊
          itinerary: data.itinerary,
        });
      } else {
        postData.push({
          day: data.day,
          itinerary: data.itinerary,
        });
      }
    });

    try {
      const response = await fetch(`${BASEURL}plan_route`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ notes: form.notes, data: [...postData] }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);

      const itinerary = result.data.map((day, index) => {
        day.date = addDays(form.departureDate, index); // index從0開始，所以第一天是+0，第二天是+1...
        return day;
      });

      setData((prev) => ({
        ...prev,
        itinerary: itinerary,
      })); // 更新狀態
    } catch (error) {
      console.error("Error planning route:", error);
      alert(
        "Unable to fetch AI-recommended routes. Please try again later. Now the screen will be rendered using fake data"
      );

      const itinerary = itineraryMockData.map((day, index) => {
        day.date = addDays(form.departureDate, index); // index從0開始，所以第一天是+0，第二天是+1...
        return day;
      });
      setData((prev) => ({ ...prev, itinerary: itinerary }));
    }
  };

  const getFlightInfo = async (iataCode) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      iataCode + "機場"
    )}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.status !== "OK") {
        return null; // 如果狀態不是 OK，返回 null
      } else {
        return data.results[0].geometry.location; // 返回結果
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error; // 確保錯誤被傳遞
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
          placeholder={`City name for day ${index + 1}`}
          style={{ marginBottom: "10px", padding: "5px", marginRight: "10px" }}
        />
      ))}
      <div>
        {calculateDays > 0 && (
          <button
            onClick={handleSearch}
            style={{
              marginLeft: "10px",
              padding: "10px 15px",
              backgroundColor: "#2dac2d",
              border: "none",
              color: "white",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Plan Route
          </button>
        )}
      </div>
      <div
        ref={mapRef}
        style={{ height: "400px", width: "100%", display: "none" }}
      ></div>
    </div>
  );
};
