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
import html2canvas from "html2canvas";

import { flightMockData } from "../mocks/flightMockData.js";
// import { fakedata } from "./fakeData_10";

import Itinerary from "./Itinerary";
import FlightCardSelector from "./FlightCardSelector";
import { MapComponent } from "./MapComponent";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { useCalendar } from "../utils/useCalendar";

const BASEURL = import.meta.env.VITE_BASEURL;
const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const themeColor = "#ff672b"; // 主题颜色

export default function TravelPlanner() {
  const [active, setActive] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state

  const [form, setForm] = useState({
    departure_city: "SYD", //旅客出發的城市/機場 IATA 代碼，例如SYD，亦可可傳中文地名
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
    email: "",
  });

  const [data, setData] = useState({
    form: form,
    userFlight: {},
    hotel: {},
  }); // 用于存储行程数据
  const [flightSearchResults, setFlightSearchResults] = useState([]);

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

  const EmailPanel = () => (
    <Paper p="md" radius="xl" shadow="md" withBorder bg="#fffffc" w={310}>
      <Title order={4} mb="sm" color="pink.6" style={{ color: themeColor }}>
        📋 Send the itinerary to the email address
      </Title>
      <Divider mb="sm" />

      <Group spacing="xs" mb={6} justify="center">
        <TextInput
          label="Please enter your email."
          size="xs"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          w={260}
          styles={{
            input: { borderRadius: "6px" },
          }}
        />

        <Button
          onClick={captureAndDownload}
          color={themeColor}
          variant="outline"
        >
          Send & Download
        </Button>
      </Group>
    </Paper>
  );

  const captureAndDownload = async () => {
    const element = document.getElementById("itinerary"); // 行程表的 DOM 元素
    const canvas = await html2canvas(element);
    const dataUrl = canvas.toDataURL("image/png");

    // 可選：下載
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "itinerary.png";
    link.click();

    const formData = new FormData();
    formData.append("image", dataUrl); // 傳 base64 字串
    formData.append("email", form.email);

    // 或：上傳到後端寄信
    await fetch(`${BASEURL}send_mail`, {
      method: "POST",
      body: formData,
    });
  };

  /**API */
  const url = `${BASEURL}search_flights`;

  const headers = {
    "Content-Type": "application/json",
  };

  function CustomGoogleLoginButton() {
    const { createEvents, isLoading } = useCalendar();

    const login = useGoogleLogin({
      onSuccess: async (tokenResponse) => {
        const accessToken = tokenResponse.access_token;
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

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
          <Stepper.Step
            style={{ outline: "none" }}
            label="基本資訊"
            description="出發地與抵達"
          />
          <Stepper.Step
            style={{ outline: "none" }}
            label="航空資訊"
            description="航班選擇"
          />
          <Stepper.Step
            style={{ outline: "none" }}
            label="旅遊偏好"
            description="美食與活動"
          />
          <Stepper.Step
            style={{ outline: "none" }}
            label="行程規劃"
            description="調整行程"
          />
          <Stepper.Step
            style={{ outline: "none" }}
            label="完成"
            description="確認與產出行程"
          />
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
                      onChange={([start, end]) => {
                        // 使用當地午夜12點而不是0點，避免時區轉換問題
                        const localStart = start
                          ? new Date(
                              Date.UTC(
                                start.getFullYear(),
                                start.getMonth(),
                                start.getDate(),
                                12, // 使用中午12點 (UTC)，確保不會因時區跨日
                                0,
                                0
                              )
                            )
                          : null;

                        const localEnd = end
                          ? new Date(
                              Date.UTC(
                                end.getFullYear(),
                                end.getMonth(),
                                end.getDate(),
                                12, // 使用中午12點 (UTC)，確保不會因時區跨日
                                0,
                                0
                              )
                            )
                          : null;

                        setForm({
                          ...form,
                          departureDate: localStart,
                          returnDate: localEnd,
                        });
                      }}
                      minDate={new Date()} // 設置最小日期為今天，過去日期不可選
                      allowSingleDateInRange
                      mx="auto"
                      color={themeColor}
                      timezone={
                        Intl.DateTimeFormat().resolvedOptions().timeZone
                      } // 使用當地時區
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
                <MapComponent data={data} calculateDays={calculateDays()} />
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
          {!isMobile && active !== 3 && active !== 4 && (
            <Box mt="xl">
              <SummaryPanel />
            </Box>
          )}
          {active === 4 && (
            <Box mt="xl">
              <EmailPanel />
            </Box>
          )}
        </Group>
      </Box>
    </Box>
  );
}
