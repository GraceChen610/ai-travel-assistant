import {
  Box,
  Title,
  Text,
  Group,
  Divider,
  Stack,
  ThemeIcon,
  Timeline,
  Container,
} from "@mantine/core";

import { BsCalendar3, BsAirplaneFill, BsFillHouseFill } from "react-icons/bs";
import {
  formatDuration,
  formatDateTime,
  formatDate,
  isEmptyObject,
} from "../utils/function";

import { itineraryMockData } from "../mocks/itineraryMockData";
import { addStayTimeToItineraries } from "../utils/function";
import dayjs from "dayjs";

const flightData = {
  id: 1,
  airline: "XIAMEN AIRLINES",
  price: 247.4,
  baggage: {
    includedCheckedBags: 1,
    additionalFee: 0,
    currency: "USD",
  },
  duration: "PT16H25M",
  segments: [
    {
      departure: {
        airline: "Sydney Airport",
        iataCode: "SYD",
        at: "2025-05-02T11:25:00",
        country: "Australia",
        city: "Sydney",
      },
      arrival: {
        airline: "Xiamen Airport",
        iataCode: "XMN",
        terminal: "3",
        at: "2025-05-02T18:50:00",
        country: "China",
        city: "Xiamen",
      },
      carrierCode: "MF",
    },
    {
      departure: {
        airline: "Xiamen Airport",
        iataCode: "XMN",
        terminal: "3",
        at: "2025-05-02T22:20:00",
        country: "China",
        city: "Xiamen",
      },
      arrival: {
        airline: "Suvarnabhumi Airport",
        iataCode: "BKK",
        at: "2025-05-03T00:50:00",
        country: "Thailand",
        city: "Bangkok",
      },
      carrierCode: "MF",
    },
  ],
};

function ItineraryTimeline({ userItinerary }) {
  return (
    <Box>
      <Title order={4} color="orange.7" mb="md">
        Itinerary
      </Title>

      {userItinerary.map((day, index) => {
        const formattedDate = dayjs()
          .add(day.day - 1, "day")
          .format("MMMM D");

        return (
          <Box key={day.day} mb="lg">
            {/* 日期標題 */}
            <Text size="sm" color="gray.7" mb="xs">
              {formattedDate}
            </Text>

            <Timeline active={-1} bulletSize={18} lineWidth={2} color="orange">
              {day.itinerary.map((item) => {
                const stayTime = item.stay_time || 0; // 預設為 0
                return (
                  <Timeline.Item key={item.order} title={item.name}>
                    <Text size="sm">
                      {item.start_time} – Stay:{" "}
                      {stayTime >= 60
                        ? `${Math.floor(stayTime / 60)} hr ${stayTime % 60} min`
                        : `${stayTime} min`}
                    </Text>
                  </Timeline.Item>
                );
              })}
            </Timeline>

            {/* 天與天之間的分隔線（非最後一天才顯示） */}
            {index !== userItinerary.length - 1 && (
              <Divider my="lg" variant="dashed" />
            )}
          </Box>
        );
      })}
    </Box>
  );
}

export default function Itinerary({ data }) {
  const userFlight = !isEmptyObject(data.userFlight)
    ? data.userFlight
    : flightData;

  const form = data.form;
  console.log("data", data);
  console.log("userFlight", userFlight);

  const itineraryData = !isEmptyObject(data?.itinerary)
    ? data.itinerary
    : itineraryMockData;
  console.log("itineraryData", itineraryData);
  const userItinerary = addStayTimeToItineraries(itineraryData);

  const departureDate = formatDate(form?.departureDate);
  const returnDate = formatDate(form.returnDate);
  const totalDuration = formatDuration(userFlight?.duration);
  const flightPrice = userFlight.price;
  const fristDayHotel = userItinerary[0].itinerary.at(-1);

  return (
    <Container size="sm" pt="lg" id="itinerary">
      {/* Title */}
      <Title order={2} color="orange.7" mb="xs">
        Travel Itinerary {isEmptyObject(data.userFlight) ? "(FakeData)" : ""}
      </Title>
      <Text size="lg" color="orange.6" mb="md">
        {departureDate !== "Invalid Date" ? departureDate : ""} ~{" "}
        {returnDate !== "Invalid Date" ? returnDate : ""}
      </Text>

      {/* Flight Section */}
      <Group align="flex-start" spacing="md" mt="xl">
        <ThemeIcon variant="light" color="orange" size="lg">
          <BsAirplaneFill size={20} style={{ transform: "rotate(90deg)" }} />
        </ThemeIcon>

        <Box style={{ flex: 1 }}>
          <Title
            order={4}
            align="center"
            color="orange.8"
            style={{ fontWeight: 700 }}
          >
            Flight{" "}
            {userFlight.segments.length > 1
              ? `(${userFlight.segments.length} segments)`
              : ""}
          </Title>

          <Stack spacing="md">
            {userFlight.segments.map((segment, index) => (
              <Box key={index}>
                {index > 0 && (
                  <Divider
                    label={`Transit at ${
                      segment.departure.city || segment.departure.iataCode
                    }`}
                    labelPosition="center"
                    my="sm"
                    color="orange.3"
                  />
                )}

                <Group
                  spacing="xl"
                  align="start"
                  justify="space-between"
                  mt="md"
                >
                  {/* 出發資訊 */}
                  <Box>
                    <Text fw={500}>
                      {segment.departure.city
                        ? `${segment.departure.city}, ${
                            segment.departure.country || ""
                          }`
                        : `${segment.departure.iataCode}`}
                    </Text>
                    <Text size="sm">
                      Departure: {formatDateTime(segment.departure.at)}
                    </Text>
                    <Text size="sm">
                      {segment.departure.airline}
                      {segment.departure.terminal
                        ? `, Terminal ${segment.departure.terminal}`
                        : ""}
                    </Text>
                  </Box>

                  {/* 抵達資訊 */}
                  <Box>
                    <Text fw={500}>
                      {segment.arrival.city
                        ? `${segment.arrival.city}, ${
                            segment.arrival.country || ""
                          }`
                        : `${segment.arrival.iataCode}`}
                    </Text>
                    <Text size="sm">
                      Arrival: {formatDateTime(segment.arrival.at)}
                    </Text>
                    <Text size="sm">
                      {segment.arrival.airline}
                      {segment.arrival.terminal
                        ? `, Terminal ${segment.arrival.terminal}`
                        : ""}
                    </Text>
                  </Box>
                  {index === userFlight.segments.length - 1 && (
                    <>
                      <Text size="sm" color="orange.8">
                        Total Flight Duration: {totalDuration}
                      </Text>
                      <Text size="sm" color="orange.8" mr="30">
                        Ticket Fee: {form.currencyCode} {flightPrice}
                      </Text>
                    </>
                  )}
                </Group>
              </Box>
            ))}
          </Stack>
        </Box>
      </Group>

      <Divider my="lg" />

      {/* Hotel Section */}
      <Group align="flex-start" spacing="md" mt="xl">
        <ThemeIcon variant="light" color="orange" size="lg">
          <BsFillHouseFill size={22} />
        </ThemeIcon>
        <Box mx="auto">
          <Title order={4} color="orange.7">
            Hotel
          </Title>
          <Text size="sm">{fristDayHotel.name}</Text>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              fristDayHotel.address
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Text size="sm" className="text-blue-600">
              {fristDayHotel.address}
            </Text>
          </a>

          {/* <Text size="sm">Contact: +1 213-555-1234</Text> */}
        </Box>
      </Group>

      <Divider my="lg" />

      {/* Itinerary */}
      <Group justify="flex-start" spacing="md">
        <ThemeIcon variant="light" color="orange" size="lg">
          <BsCalendar3 size={20} />
        </ThemeIcon>
        <Title order={4} color="orange.7" mb="md" mx="auto">
          Itinerary
        </Title>
        <Box w="100%">
          {userItinerary.map((day, index) => {
            const formattedDate = dayjs()
              .add(day.day - 1, "day")
              .format("MMMM D");

            return (
              <Box key={day.day} mb="lg" ml="40">
                {/* 日期標題 */}
                <Text size="sm" color="#ff672b" mb="xs">
                  {/* {formattedDate} */}
                  Day {day.day}
                </Text>

                <Timeline
                  active={-1}
                  bulletSize={18}
                  lineWidth={2}
                  color="#ff672b"
                >
                  {day.itinerary.map((item) => {
                    const stayTime = item.stay_time || 0; // 預設為 0
                    return (
                      <Timeline.Item key={item.order} title={item.name}>
                        <Text size="sm">
                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                              item.address
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {item.address}
                          </a>
                          <br />
                          {item.start_time} – Stay:{" "}
                          {stayTime >= 60
                            ? `${Math.floor(stayTime / 60)} hr ${
                                stayTime % 60
                              } min`
                            : `${stayTime} min`}
                        </Text>
                      </Timeline.Item>
                    );
                  })}
                </Timeline>

                {/* 天與天之間的分隔線（非最後一天才顯示） */}
                {index !== userItinerary.length - 1 && (
                  <Divider my="lg" variant="dashed" />
                )}
              </Box>
            );
          })}
        </Box>
      </Group>
    </Container>
  );
}
