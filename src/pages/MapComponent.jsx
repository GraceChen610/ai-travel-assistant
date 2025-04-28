import { useState } from "react";

import {
  GoogleMap,
  LoadScript,
  DirectionsService,
  DirectionsRenderer,
  useJsApiLoader,
} from "@react-google-maps/api";


import {
  Stepper,
  Button,
} from "@mantine/core";

import { flightMockData } from "../mocks/flightMockData.js";
import { combineFlightInfo } from "../utils/function.js";

export const MapComponent = ({data}) => {
  const [locations, setLocations] = useState([""]);
  const [directions, setDirections] = useState(null);
  const [totalDistance, setTotalDistance] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [routes, setRoutes] = useState([]);

  const handleAddLocation = () => {
    setLocations([...locations, ""]);
  };

  const handleLocationChange = (index, value) => {
    const updatedLocations = [...locations];
    updatedLocations[index] = value;
    setLocations(updatedLocations);
  };

  const handleCalculateRoute = () => {
    if (locations.length < 2) {
      alert("請輸入至少兩個地點。");
      return;
    }

    if (locations.some((loc) => !loc.trim())) {
      alert("所有地點欄位都必須填寫。");
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: locations[0],
        destination: locations[locations.length - 1],
        waypoints: locations
          .slice(1, -1)
          .map((loc) => ({ location: loc, stopover: true })),
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      async (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);

          // 提取距離、時間和經緯度
          const legs = result.routes[0].legs;
          //初始化距離和時間
          setTotalDistance(0);
          setTotalDuration(0);
          let coordinates = []; // 使用 Set 來避免重複

          legs.forEach((leg) => {
            setTotalDistance(
              (prevDistance) => prevDistance + leg.distance.value
            ); // 距離（公尺）
            setTotalDuration(
              (prevDuration) => prevDuration + leg.duration.value
            ); // 時間（秒）

            // 提取起點和終點的經緯度，並以物件形式存入陣列
            coordinates.push({
              latitude: leg.start_location.lat(),
              longitude: leg.start_location.lng(),
            });
            coordinates.push({
              latitude: leg.end_location.lat(),
              longitude: leg.end_location.lng(),
            });
          });

          // 去除重複
          coordinates = coordinates.filter(
            (item, index, self) =>
              index ===
              self.findIndex(
                (t) =>
                  t.latitude === item.latitude && t.longitude === item.longitude
              )
          );
          locations.forEach((location, index) => {
            if (location) {
              coordinates[index].name = location; // 將地點名稱添加到經緯度物件中
            }
          });
          // alert(
          //   `經緯度資訊: ${JSON.stringify(Array.from(coordinates))}` // 將 Set 轉為 Array 顯示
          // )

          const userFlightData =
            data.userFlight?.segments ?? flightMockData.data[0].segments;

          // 取得使用者的往返航班資料，包含抵達時間、起降機場等資訊
          const flightInfo = combineFlightInfo(
            userFlightData,
            data.form.departure_city,
            data.form.destination_city
          );

          console.log("flightInfo", flightInfo);
          // 在陣列最前面加入航班資訊
          coordinates.unshift({
            departure_flight: {
              name: flightInfo.arrival.iataCode, // 抵達機場代碼
              latitude: null,
              longitude: null,
              arrival_time: flightInfo.arrival.at, // 抵達時間
            },
          });

          // ! 返程的航班資訊，如果沒有訂返程航班就不需要這個資訊
          // departure_flight: {
          //     name: flightInfo.arrival.iataCode, // 抵達機場代碼
          //     latitude: null,
          //     longitude: null,
          //     arrival_time: flightInfo.arrival.at, // 抵達時間
          //   },
          await recommendRoutes(coordinates);
        } else {
          console.error(`Error fetching directions: ${status}`);
          alert(`無法計算路線，請檢查地點是否正確。錯誤代碼: ${status}`);
        }
      }
    );
  };

  const handleRemoveLocation = () => {
    if (locations.length > 1) {
      setLocations(locations.slice(0, -1));
    } else {
      alert("至少需要保留一個地點。");
    }
  };
  const recommendRoutes = async (route) => {
    if (route == null) {
      return;
    }
    try {
      const response = await fetch(
        "https://tes-430078023071.asia-east1.run.app/plan_route",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ route }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setRoutes([]); // 清空之前的路線
      result.data
        .sort((a, b) => a.order - b.order)
        .forEach((item) => {
          setRoutes((prevRoutes) => [...prevRoutes, item]);
        });
    } catch (error) {
      console.error("Error planning route:", error);
      alert("無法獲取AI推薦路線，請稍後再試。");
    }
  };
  return (
    <div>
      <h3>路線規劃</h3>
      {locations.map((location, index) => (
        <input
          style={{ marginRight: "10px", marginBottom: "8px" }}
          key={index}
          type="text"
          value={location}
          onChange={(e) => handleLocationChange(index, e.target.value)}
          placeholder={`地點 ${index + 1}`}
        />
      ))}
      <div style={{ marginTop: "16px", marginBottom: "16px" }}>
        <Button style={{ marginRight: "10px" }} onClick={handleAddLocation}>
          新增地點
        </Button>
        <Button style={{ marginRight: "10px" }} onClick={handleRemoveLocation}>
          刪除地點
        </Button>
        <Button
          style={{ marginRight: "10px", backgroundColor: "#158328" }}
          onClick={handleCalculateRoute}
        >
          計算路線
        </Button>
      </div>

      <div>
        <p>
          全部距離：
          <span style={{ fontWeight: "bold", color: "#ff672b" }}>
            {(totalDistance / 1000).toFixed(2)}
          </span>
        </p>
        <p>
          全部車程時間：
          <span style={{ fontWeight: "bold", color: "#ff672b" }}>
            {Math.floor(totalDuration / 3600)} 小時{" "}
            {Math.floor((totalDuration % 3600) / 60)} 分鐘
          </span>
        </p>
        <p>
          AI推薦路線：
          <span style={{ fontWeight: "bold", color: "#ff672b" }}>
            {routes.map((route, index) => (
              <span key={index}>
                {route.name}
                {index < routes.length - 1 && " > "}
              </span>
            ))}
          </span>
        </p>
      </div>
      {useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
      }).isLoaded ? (
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "400px" }}
          center={{ lat: 25.033964, lng: 121.564468 }}
          zoom={10}
        >
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      ) : (
        <p>Loading map...</p>
      )}
    </div>
  );
};
