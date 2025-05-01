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
import { itineraryMockData } from "../mocks/itineraryMockData.js";

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
  const [email, setEmail] = useState("");
  const [form, setForm] = useState({
    departure_city: "LON", //旅客出發的城市/機場 IATA 代碼，例如SYD，亦可可傳中文地名
    destination_city: "LAX", //旅客抵達的城市/機場 IATA 代碼，例如BKK
    departureDate: null, //出發日期(格式:2017-12-25)
    returnDate: null, //回程日期
    adults: 1, //成人數量
    children: 0,
    infants: 0, //嬰兒
    nonStop: false, // ✅ Boolean，非字串
    currencyCode: "USD",
    activity_preferences: [],
    notes: "",
    email: email,
  });

  const [data, setData] = useState({
    form: form,
    userFlight: {},
    itinerary: {},
  }); // 用于存储行程数据
  const [flightSearchResults, setFlightSearchResults] = useState([]);

  const activityOptions = [
    {
      label: "Natural Scenery (Mountains, Lakes, Beaches)",
      type: ["natural_feature", "beach"],
    },
    {
      label: "Indoor Attractions (Museums, Art Galleries, Exhibition Halls)",
      type: ["museum", "art_gallery", "establishment"],
    },
    {
      label: "Historical and Cultural Sites (Monuments, Temples)",
      type: ["monument", "temple", "church"],
    },
    {
      label: "Shopping (Department Stores, Outlets, Shopping Streets)",
      type: ["department_store", "shopping_mall", "store"],
    },
    {
      label: "movie theater",
      type: ["movie_theater"],
    },
    {
      label: "Family-Friendly (Theme Parks / Zoos / Aquariums)",
      type: ["amusement_park", "aquarium", "zoo", "park"],
    },
  ];

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
      // console.log("Flight search result:", result);
      if (result.data.length > 1) {
        setFlightSearchResults(result.data);
      } else {
        alert("Data error, rendering the page with mock data.");
        setFlightSearchResults(flightMockData.data);
      }
    } catch (error) {
      console.error("Error fetching flight data:", error);
      alert("Unable to fetch flight data, rendering the page with mock data.");
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
      const valueString = JSON.stringify(value);

      const isPresent = current.some(
        (item) => JSON.stringify(item) === valueString
      );

      return {
        ...prev,
        [type]: isPresent
          ? current.filter((item) => JSON.stringify(item) !== valueString)
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
    <Paper p="md" radius="xl" shadow="md" withBorder bg="#fffffc" w={330}>
      <Title order={4} mb="sm" color="pink.6" style={{ color: themeColor }}>
        📋 Summary
      </Title>
      <Divider mb="sm" />

      <Group spacing="xs" mb={6}>
        <ThemeIcon variant="light" color={themeColor} radius="xl">
          <FaPlaneDeparture size={22} />
        </ThemeIcon>
        <Text size="sm">
          <strong>Departure Airport：</strong>
          {form.departure_city || "未填寫"}
        </Text>
      </Group>

      <Group spacing="xs" mb={6}>
        <ThemeIcon variant="light" color={themeColor} radius="xl">
          <MdOutlineMyLocation size={20} />
        </ThemeIcon>
        <Text size="sm">
          <strong>Arrival airport：</strong>
          {form.destination_city || "未填寫"}
        </Text>
      </Group>

      <Group spacing="xs" mb={6}>
        <ThemeIcon variant="light" color="#2e9aff" radius="xl">
          <MdOutlineEventAvailable size={22} />
        </ThemeIcon>
        <Text size="sm">
          <strong>travel date：</strong>
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
              <strong>Journey duration：</strong>
              {calculateDays()} Days
            </Text>
          </Group>
        )}

      <Group spacing="xs" mt="xs">
        <ThemeIcon variant="light" color="#70d573" radius="xl">
          <FaTasks size={20} />
        </ThemeIcon>
        <Text size="sm">
          <strong>Activity Preferences：</strong>
        </Text>
        <Text size="sm">{form.activity_preferences.join("、") || "none"}</Text>
      </Group>

      <Group spacing="xs" mt="xs">
        <ThemeIcon variant="light" color="pink" radius="xl">
          <IoChatboxEllipsesOutline size={20} />
        </ThemeIcon>
        <Text size="sm">
          <strong>Notes：</strong>
          {form.notes || "none"}
        </Text>
      </Group>
    </Paper>
  );

  // 修改 EmailPanel 組件
  const EmailPanel = () => {
    // 使用本地狀態來處理 email 輸入
    const [localEmail, setLocalEmail] = useState(form.email);

    // 只在點擊發送按鈕時才更新父組件的 form 狀態
    const handleSendEmail = async () => {
      // 更新 form 狀態
      setForm((prev) => ({ ...prev, email: localEmail }));
      // 執行發送操作
      await captureAndDownload();
    };

    return (
      <Paper p="md" radius="xl" shadow="md" withBorder bg="#fffffc" w={310}>
        <Title order={4} mb="sm" color="pink.6" style={{ color: themeColor }}>
          📋 Send the itinerary to the email address
        </Title>
        <Divider mb="sm" />

        <Group spacing="xs" mb={6} justify="center">
          <TextInput
            label="Please enter your email."
            size="xs"
            value={localEmail}
            onChange={(e) => setLocalEmail(e.target.value)}
            w={260}
            styles={{
              input: { borderRadius: "6px" },
            }}
          />

          <Button
            onClick={handleSendEmail}
            color={themeColor}
            variant="outline"
          >
            Send & Download
          </Button>
        </Group>
      </Paper>
    );
  };

  const captureAndDownload = async () => {
    const element = document.getElementById("itinerary"); // 行程表的 DOM 元素
    const canvas = await html2canvas(element);
    const dataUrl = canvas.toDataURL("image/png");

    // 只有當 email 存在時才發送
    if (form.email) {
      const formData = new FormData();
      formData.append("image", dataUrl); // 傳 base64 字串
      formData.append("email", form.email);

      try {
        // 上傳到後端寄信
        const response = await fetch(`${BASEURL}send_mail`, {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          alert("Email sent successfully!");
        } else {
          alert("Failed to send email. Please try again.");
        }
      } catch (error) {
        console.error("Error sending email:", error);
        alert("Error sending email: " + error.message);
      }
    }

    // 下載
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "itinerary.png";
    link.click();
  };

  /**API */
  const url = `${BASEURL}search_flights`;

  const headers = {
    "Content-Type": "application/json",
  };

  function CustomGoogleLoginButton({ data }) {
    const { createEvents, isLoading } = useCalendar();
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const login = useGoogleLogin({
      onSuccess: async (tokenResponse) => {
        const accessToken = tokenResponse.access_token;
        const calendarData = data.itinerary
          ? data.itinerary
          : itineraryMockData;
        const calendarEvents = calendarData?.flatMap((day, dayIndex) => {
          // 確保day.itinerary存在
          if (!day.itinerary || !Array.isArray(day.itinerary)) {
            return [];
          }

          return day.itinerary.map((event) => {
            // 建立動態的標題
            const title = `${form.destination_city} Free travel - Day ${
              dayIndex + 1
            }`;

            // 事件起始時間和結束時間
            const startDateTime = `${day.date}T${event.start_time}:00`;
            const endDateTime = `${day.date}T${event.end_time}:00`;

            return {
              title: title,
              description: event.name || event.description || "",
              location: event.address || event.location || "",
              startDateTime: startDateTime,
              endDateTime: endDateTime,
              timeZone: timeZone,
            };
          });
        });

        // console.log("Calendar events:", calendarEvents);

        await createEvents(accessToken, calendarEvents);
      },
      onError: () => {
        console.error("Login Failed");
      },
      scope: "https://www.googleapis.com/auth/calendar.events",
    });

    return (
      <Button onClick={() => login()} color={themeColor} loading={isLoading}>
        Add to Google Calendar
      </Button>
    );
  }

  return (
    <Box
      maw={1200}
      mx="auto"
      mih="90vh"
      p="xl"
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
            label="Basic Information"
            description="Departure and destination"
          />
          <Stepper.Step
            style={{ outline: "none" }}
            label="Aviation Information"
            description="Flight Selection"
          />
          <Stepper.Step
            style={{ outline: "none" }}
            label="Travel Preferences"
            description="Activity Preferences"
          />
          {/* <Stepper.Step
            style={{ outline: "none" }}
            label="行程規劃"
            description="調整行程"
          /> */}
          <Stepper.Step
            style={{ outline: "none" }}
            label="Complete"
            description="Confirm and produce itinerary"
          />
        </Stepper>
        <Group align="flex-start" justify="space-between" spacing="xl" mt="xl">
          <Box style={{ flex: 1 }}>
            {active === 0 && (
              <Stack mt="xl">
                <Stack align="center" justify="center" gap="md">
                  <TextInput
                    label="Departure Airport"
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
                    label="Arrival airport"
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
                    **Currently only supports search countries: United States,
                    Spain, United Kingdom, Germany and India
                  </Text>
                  <Stack>
                    <Text color="#2e9aff">
                      <strong>Please select the travel date: </strong>
                      <br />
                      *can be single day or interval
                    </Text>
                    <DatePicker
                      type="range"
                      label="Travel Date"
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
                  </Stack>
                  <div>
                    <Text color="#2e9aff">
                      <strong>
                        Planned travel days：
                        {(form.departureDate &&
                          form.returnDate &&
                          calculateDays()) ??
                          0}{" "}
                        Days
                      </strong>
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
                    <strong> Activity Preferences</strong>
                  </Text>
                  {activityOptions.map((option) => (
                    <Checkbox
                      key={option.label}
                      label={option.label}
                      checked={form.activity_preferences.some(
                        (selectedType) =>
                          JSON.stringify(selectedType) ===
                          JSON.stringify(option.type)
                      )}
                      onChange={() =>
                        togglePreference("activity_preferences", option.type)
                      } // 傳遞 type (陣列)
                      color={themeColor}
                    />
                  ))}
                </div>
                <div>
                  <Textarea
                    label="📝 Notes"
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
                <Stack mt="xl">
                  <MapComponent
                    userFlight={
                      flightSearchResults[
                        selectedId ? Number(selectedId) - 1 : null
                      ]
                    }
                    calculateDays={calculateDays()}
                    form={form}
                    setData={setData}
                  />
                </Stack>
              </Stack>
            )}

            {/* {active === 3 && (
              <Stack mt="xl">
                <MapComponent data={data} calculateDays={calculateDays()} />
              </Stack>
            )} */}

            {active === 3 && (
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
                Prev step
              </Button>
              {active !== 3 && (
                <Button
                  onClick={nextStep}
                  disabled={active === 3 || loading}
                  color={themeColor}
                >
                  Next step
                </Button>
              )}
              {active === 3 && (
                <GoogleOAuthProvider clientId={CLIENT_ID}>
                  <CustomGoogleLoginButton data={data} />
                </GoogleOAuthProvider>
              )}
            </Group>
          </Box>
          {!isMobile && active !== 2 && active !== 3 && (
            <Box mt="xl">
              <SummaryPanel />
            </Box>
          )}
          {active === 3 && (
            <Box mt="xl">
              <EmailPanel />
            </Box>
          )}
        </Group>
      </Box>
    </Box>
  );
}
