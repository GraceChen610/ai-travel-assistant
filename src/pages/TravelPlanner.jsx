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
  IconMapPin,
  IconPlaneDeparture,
  IconCalendar,
  IconListCheck,
  IconMessageDots,
  IconToolsKitchen3,
  IconClock,
} from "@tabler/icons-react";
import { DatePicker } from "@mantine/dates";
import { useMediaQuery } from "@mantine/hooks";
import dayjs from "dayjs";

const themeColor = "#ff672b"; // 主题颜色

export default function TravelPlanner() {
  const [active, setActive] = useState(0);
  const [form, setForm] = useState({
    departure_city: "",
    destination_city: "",
    start_date: null,
    end_date: null,
    food_preferences: [],
    activity_preferences: [],
    notes: "",
  });

  const isMobile = useMediaQuery("(max-width: 768px)");

  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
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
    const start = dayjs(form.start_date);
    const end = dayjs(form.end_date);
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
          <IconMapPin stroke={2} />
        </ThemeIcon>
        <Text size="sm">
          <strong>出發機場：</strong>
          {form.departure_city || "未填寫"}
        </Text>
      </Group>

      <Group spacing="xs" mb={6}>
        <ThemeIcon variant="light" color={themeColor} radius="xl">
          <IconPlaneDeparture stroke={2} />
        </ThemeIcon>
        <Text size="sm">
          <strong>抵達機場：</strong>
          {form.destination_city || "未填寫"}
        </Text>
      </Group>

      <Group spacing="xs" mb={6}>
        <ThemeIcon variant="light" color="#2e9aff" radius="xl">
          <IconCalendar stroke={2} />
        </ThemeIcon>
        <Text size="sm">
          <strong>旅行日期：</strong>
          {dayjs(form.start_date).isValid()
            ? dayjs(form.start_date).format("YYYY-MM-DD")
            : ""}
          {` ~ `}
          {dayjs(form.end_date).isValid()
            ? dayjs(form.end_date).format("YYYY-MM-DD")
            : ""}
        </Text>
      </Group>

      {dayjs(form.start_date).isValid() && dayjs(form.end_date).isValid() && (
        <Group spacing="xs" mb={6}>
          <ThemeIcon variant="light" color="#2e9aff" radius="xl">
            <IconClock stroke={2} />
          </ThemeIcon>
          <Text size="sm">
            <strong>旅程天數：</strong>
            {calculateDays()} 天
          </Text>
        </Group>
      )}

      {/* <Group spacing="xs" mt="xs" justify="flex-start" align="center">
        <ThemeIcon variant="light" color="#70d573" radius="xl">
          <IconToolsKitchen3 stroke={2} />
        </ThemeIcon>
        <Text size="sm">
          <strong>飲食偏好：</strong>
        </Text>
        <Text size="sm">{form.food_preferences.join("、") || "未選擇"}</Text>
      </Group> */}

      <Group spacing="xs" mt="xs">
        <ThemeIcon variant="light" color="#70d573" radius="xl">
          <IconListCheck stroke={2} />
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
          <IconMessageDots stroke={2} />
        </ThemeIcon>
        <Text size="sm">
          <strong>備註：</strong>
          {form.notes || "無"}
        </Text>
      </Group>
    </Paper>
  );

  return (
    <Box
      maw={1200}
      mx="auto"
      h="90vh"
      hx="auto"
      w={900}
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
                  <div>
                    <Text color="#2e9aff">
                      <strong>請選擇旅行日期:</strong>
                    </Text>
                    <DatePicker
                      type="range"
                      label="旅行日期"
                      value={[form.start_date, form.end_date]}
                      onChange={([start, end]) =>
                        setForm({ ...form, start_date: start, end_date: end })
                      }
                      allowSingleDateInRange
                      mx="auto"
                      color={themeColor}
                    />
                  </div>
                  <div>
                    <Text color="#2e9aff">
                      <strong>計畫旅程天數：</strong>
                      {(form.start_date && form.end_date && calculateDays()) ??
                        0}{" "}
                      天
                    </Text>
                  </div>
                </Stack>
              </Stack>
            )}

            {active === 1 && (
              <Stack mt="xl">
                {/* <div>
                  <Text color="#59a803">
                    <strong> 飲食偏好</strong>
                  </Text>
                  {[
                    "在地小吃",
                    "高級料理（米其林)",
                    "異國料理（義式、日式、韓式等）",
                    "路邊攤 / 夜市",
                    "特色咖啡廳 / 甜點",
                    "素食 / 特殊飲食（gluten-free、vegan）",
                  ].map((item) => (
                    <Checkbox
                      key={item}
                      label={item}
                      checked={form.food_preferences.includes(item)}
                      onChange={() =>
                        togglePreference("food_preferences", item)
                      }
                      color={themeColor}
                    />
                  ))}
                </div> */}
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

            {active === 2 && <Stack mt="xl">塞地圖</Stack>}

            {active === 3 && (
              <Box mt="xl">
                <pre>{JSON.stringify(form, null, 2)}</pre>
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
              {active !== 3 && (
                <Button
                  onClick={nextStep}
                  disabled={active === 3}
                  color={themeColor}
                >
                  {active === 2 ? "產生行程" : "下一步"}
                </Button>
              )}
            </Group>
          </Box>
          {!isMobile && (
            <Box mt="xl">
              <SummaryPanel />
            </Box>
          )}
        </Group>
      </Box>
    </Box>
  );
}
