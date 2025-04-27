import { useState, useEffect } from "react";
import {
  Stepper,
  Button,
  Group,
  TextInput,
  Textarea,
  Checkbox,
  Stack,
  Box,
  Title,
  Paper,
  Divider,
  ThemeIcon,
  Text,
} from "@mantine/core";

import {
  MdOutlineMyLocation,
  MdOutlineEventAvailable,
  MdAccessTime,
} from "react-icons/md";
import { FaPlaneDeparture, FaTasks } from "react-icons/fa";
import { IoChatboxEllipsesOutline } from "react-icons/io5";

import { DatePicker } from "@mantine/dates";
import { useMediaQuery } from "@mantine/hooks";
import dayjs from "dayjs";

import { flightMockData } from "../mocks/flightMockData.js";
// import { fakedata } from "./fakeData_10";

import Itinerary from "./Itinerary";
import FlightCardSelector from "./FlightCardSelector";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { useCalendar } from "../utils/useCalendar";

const BASEURL = import.meta.env.VITE_BASEURL;
const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const themeColor = "#ff672b"; // 主题颜色

import {
  GoogleMap,
  LoadScript,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";

const MapComponent = () => {
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
          alert(
            `經緯度資訊: ${JSON.stringify(Array.from(coordinates))}` // 將 Set 轉為 Array 顯示
          );
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
      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "400px" }}
          center={{ lat: 25.033964, lng: 121.564468 }}
          zoom={10}
        >
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default function TravelPlanner() {
  const [active, setActive] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state

  const [form, setForm] = useState({
    departure_city: "SYD", //旅客出發的城市/機場 IATA 代碼，例如C，亦可可傳中文地名
    destination_city: "BKK", //旅客抵達的城市/機場 IATA 代碼，例如BKK
    departureDate: null, //出發日期(格式:2017-12-25)
    returnDate: null, //回程日期
    adults: 1, //成人數量
    children: 0,
    infants: 0, //嬰兒
    nonStop: false, // ✅ Boolean，非字串
    currencyCode: "USD",
    activity_preferences: [],
    notes: "",
  });

  const [data, setData] = useState({
    form: form,
    userFlight: {},
    hotel: {},
  }); // 用于存储行程数据
  const [flightSearchResults, setFlightSearchResults] = useState([]);
  const [accessToken, setAccessToken] = useState(null); // 用于存储访问令牌
  const { createEvent, isLoading, error, success } = useCalendar(accessToken);

  const fetchData = async () => {
    setLoading(true); // Set loading to true before fetching
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      console.log("Flight search result:", result);
      if (result.data.length > 1) {
        setFlightSearchResults(result.data);
      } else {
        alert("資料異常，將使用假資料渲染畫面。");
        setFlightSearchResults(flightMockData.data);
      }
    } catch (error) {
      console.error("Error fetching flight data:", error);
      alert("無法獲取航班資料，將使用假資料渲染畫面。");
      setFlightSearchResults(flightMockData.data);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  const isMobile = useMediaQuery("(max-width: 768px)");

  const nextStep = () => {
    const selectedFlightIndex = selectedId ? Number(selectedId) - 1 : null;
    setActive((current) => (current < 5 ? current + 1 : current));
    if (active === 0) {
      fetchData();
      setActive(1);
    }
    if (active === 1) {
      console.log(
        "選擇",
        selectedFlightIndex,
        flightSearchResults[selectedFlightIndex]
      );
      setData((prev) => {
        return {
          ...prev,
          userFlight: flightSearchResults[selectedFlightIndex],
          form,
        };
      });
    } else {
      setData((prev) => {
        return { ...prev, form };
      });
    }
  };

  console.log("data.userFlight", data.userFlight);

  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const togglePreference = (type, value) => {
    setForm((prev) => {
      const current = prev[type];
      return {
        ...prev,
        [type]: current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value],
      };
    });
  };

  const calculateDays = () => {
    const start = dayjs(form.departureDate);
    const end = dayjs(form.returnDate);
    if (!start.isValid() || !end.isValid()) return null;
    return end.diff(start, "day") + 1;
  };

  // 添加自定义动画
  useEffect(() => {
    // 创建带有特定ID的样式元素，确保不会重复添加
    const styleId = "custom-pulse-animation";
    if (!document.getElementById(styleId)) {
      const styleElement = document.createElement("style");
      styleElement.id = styleId;
      styleElement.innerHTML = `
        @keyframes customPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
        
        /* 提高选择器优先级 */
        body .mantine-Stepper-stepIcon[data-active="true"],
        body .mantine-Stepper-stepIcon[data-progress="true"] {
          animation: customPulse 1.5s infinite ease-in-out !important;
        }
      `;
      document.head.appendChild(styleElement);
    }

    return () => {
      const existingStyle = document.getElementById(styleId);
      if (existingStyle) {
        document.head.removeChild(existingStyle);
      }
    };
  }, []);

  const SummaryPanel = () => (
    <Paper p="md" radius="xl" shadow="md" withBorder bg="#fffffc" w={310}>
      <Title order={4} mb="sm" color="pink.6" style={{ color: themeColor }}>
        📋 Summary
      </Title>
      <Divider mb="sm" />

      <Group spacing="xs" mb={6}>
        <ThemeIcon variant="light" color={themeColor} radius="xl">
          <FaPlaneDeparture size={22} />
        </ThemeIcon>
        <Text size="sm">
          <strong>出發機場：</strong>
          {form.departure_city || "未填寫"}
        </Text>
      </Group>

      <Group spacing="xs" mb={6}>
        <ThemeIcon variant="light" color={themeColor} radius="xl">
          <MdOutlineMyLocation size={20} />
        </ThemeIcon>
        <Text size="sm">
          <strong>抵達機場：</strong>
          {form.destination_city || "未填寫"}
        </Text>
      </Group>

      <Group spacing="xs" mb={6}>
        <ThemeIcon variant="light" color="#2e9aff" radius="xl">
          <MdOutlineEventAvailable size={22} />
        </ThemeIcon>
        <Text size="sm">
          <strong>旅行日期：</strong>
          {dayjs(form.departureDate).isValid()
            ? dayjs(form.departureDate).format("YYYY-MM-DD")
            : ""}
          {` ~ `}
          {dayjs(form.returnDate).isValid()
            ? dayjs(form.returnDate).format("YYYY-MM-DD")
            : ""}
        </Text>
      </Group>

      {dayjs(form.departureDate).isValid() &&
        dayjs(form.returnDate).isValid() && (
          <Group spacing="xs" mb={6}>
            <ThemeIcon variant="light" color="#2e9aff" radius="xl">
              {/* <IconClock stroke={2} /> */}
              <MdAccessTime size={22} />
            </ThemeIcon>
            <Text size="sm">
              <strong>旅程天數：</strong>
              {calculateDays()} 天
            </Text>
          </Group>
        )}

      <Group spacing="xs" mt="xs">
        <ThemeIcon variant="light" color="#70d573" radius="xl">
          <FaTasks size={20} />
        </ThemeIcon>
        <Text size="sm">
          <strong>活動偏好：</strong>
        </Text>
        <Text size="sm">
          {form.activity_preferences.join("、") || "未選擇"}
        </Text>
      </Group>

      <Group spacing="xs" mt="xs">
        <ThemeIcon variant="light" color="pink" radius="xl">
          <IoChatboxEllipsesOutline size={20} />
        </ThemeIcon>
        <Text size="sm">
          <strong>備註：</strong>
          {form.notes || "無"}
        </Text>
      </Group>
    </Paper>
  );

  /**API */
  const url = `${BASEURL}search_flights`;

  const headers = {
    "Content-Type": "application/json",
  };

  // const payload = {
  //   departure: "SYD", // 可傳中文地名，但需後端處理轉為 IATA 代碼
  //   destination: "BKK",
  //   date: "2025-04-25",
  //   adults: 1,
  //   children: 0,
  //   infants: 0, //嬰兒
  //   nonStop: false, // ✅ Boolean，非字串
  //   currencyCode: "USD",
  // };

  //! 國家地點的日期需要校正

  function CustomGoogleLoginButton() {
    const { createEvents, isLoading } = useCalendar();

    const login = useGoogleLogin({
      onSuccess: async (tokenResponse) => {
        const accessToken = tokenResponse.access_token;
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        console.log(timeZone); 


        await createEvents(accessToken, [
          {
            title: "東京自由行 Day 1",
            description: "抵達成田機場，入住飯店",
            location: "東京都新宿區",
            startDateTime: "2025-05-10T10:00:00",
            endDateTime: "2025-05-10T18:00:00",
            timeZone: timeZone,
          },
          {
            title: "東京自由行 Day 2",
            description: "淺草寺、晴空塔觀光",
            location: "東京都墨田區",
            startDateTime: "2025-05-11T09:00:00",
            endDateTime: "2025-05-11T17:00:00",
            timeZone: timeZone,
          },
        ]);
      },
      onError: () => {
        console.error("Login Failed");
      },
      scope: "https://www.googleapis.com/auth/calendar.events",
    });


    return (
      <Button onClick={() => login()} color={themeColor} loading={isLoading}>
        加入 Google 行事曆
      </Button>
    );
  }

  return (
    <Box
      maw={1200}
      mx="auto"
      mih="90vh"
      miw={900}
      px="xl"
      py="xl"
      style={{
        borderRadius: "30px",
        backgroundColor: "fffaf2",
        border: "1px solid rgba(0, 0, 0, 0.1)",
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
      }}
    >
      <Box style={{ flex: 2 }}>
        <Stepper
          active={active}
          onStepClick={setActive}
          orientation={isMobile ? "vertical" : "horizontal"}
          color={themeColor}
        >
          <Stepper.Step label="基本資訊" description="出發地與抵達" />
          <Stepper.Step label="航空資訊" description="航班選擇" />
          <Stepper.Step label="旅遊偏好" description="美食與活動" />
          <Stepper.Step label="行程規劃" description="調整行程" />
          <Stepper.Step label="完成" description="確認與產出行程" />
        </Stepper>
        <Group align="flex-start" justify="space-between" spacing="xl" mt="xl">
          <Box style={{ flex: 1 }}>
            {active === 0 && (
              <Stack mt="xl">
                <Stack align="center" justify="center" gap="md">
                  <TextInput
                    label="出發機場"
                    size="md"
                    value={form.departure_city}
                    onChange={(e) =>
                      setForm({ ...form, departure_city: e.target.value })
                    }
                    w={260}
                    styles={{
                      label: { color: themeColor },
                      input: { borderRadius: "6px" },
                    }}
                  />
                  <TextInput
                    label="抵達機場"
                    size="md"
                    value={form.destination_city}
                    onChange={(e) =>
                      setForm({ ...form, destination_city: e.target.value })
                    }
                    w={260}
                    styles={{
                      label: { color: themeColor },
                      input: { borderRadius: "6px" },
                    }}
                  />
                  <Text color={themeColor} size="sm">
                    *目前僅支援部分國家:美國、西班牙、英國、德國和印度
                  </Text>
                  <div>
                    <Text color="#2e9aff">
                      <strong>請選擇旅行日期:</strong>
                    </Text>
                    <DatePicker
                      type="range"
                      label="旅行日期"
                      value={[form.departureDate, form.returnDate]}
                      onChange={([start, end]) =>
                        setForm({
                          ...form,
                          departureDate: start,
                          returnDate: end,
                        })
                      }
                      // 設置最小日期為今天，過去日期不可選
                      allowSingleDateInRange
                      mx="auto"
                      color={themeColor}
                    />
                  </div>
                  <div>
                    <Text color="#2e9aff">
                      <strong>計畫旅程天數：</strong>
                      {(form.departureDate &&
                        form.returnDate &&
                        calculateDays()) ??
                        0}{" "}
                      天
                    </Text>
                  </div>
                </Stack>
              </Stack>
            )}

            {active === 1 && (
              <Stack mt="xl">
                {loading ? (
                  <Text>Loading flights...</Text>
                ) : (
                  <FlightCardSelector
                    flights={flightSearchResults}
                    selectedId={selectedId}
                    setSelectedId={setSelectedId}
                  />
                )}
              </Stack>
            )}

            {active === 2 && (
              <Stack mt="xl">
                <div>
                  <Text color="#59a803" mb="sm">
                    <strong> 活動偏好</strong>
                  </Text>
                  {[
                    "自然景觀（山岳、湖泊、沙灘）",
                    "室內景點（博物館、美術館、展覽館）",
                    "歷史文化（古蹟、寺廟）",
                    "百貨公司 / outlet / 購物街",
                    "主題樂園 / 動物園 / 水族館",
                    "當地市集 / 跳蚤市場",
                    "夜景 / 夜間打卡景點",
                    "親子友善",
                  ].map((item) => (
                    <Checkbox
                      key={item}
                      label={item}
                      checked={form.activity_preferences.includes(item)}
                      onChange={() =>
                        togglePreference("activity_preferences", item)
                      }
                      color={themeColor}
                    />
                  ))}
                </div>
                <div>
                  <Textarea
                    label="📝 需求備註"
                    value={form.notes}
                    onChange={(e) =>
                      setForm({ ...form, notes: e.target.value })
                    }
                    resize="vertical"
                    maxRows={10}
                    rows="9"
                    styles={{
                      label: { color: "#e64980" },
                      input: { borderRadius: "6px" },
                    }}
                  />
                </div>
              </Stack>
            )}

            {active === 3 && (
              <Stack mt="xl">
                <MapComponent />
              </Stack>
            )}

            {active === 4 && (
              <Box mt="xl">
                <Itinerary data={data} />
              </Box>
            )}

            <Group mt="xl" position="apart" justify="space-between">
              <Button
                onClick={prevStep}
                disabled={active === 0}
                color={themeColor}
              >
                上一步
              </Button>
              {active !== 4 && (
                <Button
                  onClick={nextStep}
                  disabled={active === 4}
                  color={themeColor}
                >
                  {active === 3 ? "產生行程" : "下一步"}
                </Button>
              )}
              {active === 4 && (
                <GoogleOAuthProvider clientId={CLIENT_ID}>
                  <CustomGoogleLoginButton />
                </GoogleOAuthProvider>
              )}
            </Group>
          </Box>
          {!isMobile && active !== 3 && (
            <Box mt="xl">
              <SummaryPanel />
            </Box>
          )}
        </Group>
      </Box>
    </Box>
  );
}
