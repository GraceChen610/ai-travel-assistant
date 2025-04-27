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

const form2 = {
  departure_city: "SYD", //旅客出發的城市/機場 IATA 代碼，例如C，亦可可傳中文地名
  destination_city: "BKK", //旅客抵達的城市/機場 IATA 代碼，例如BKK
  departureDate: "2025-04-24T16:00:00.000Z", //出發日期(格式:2017-12-25)
  returnDate: "2025-04-29T16:00:00.000Z", //回程日期
  adults: 1, //成人數量
  children: 0,
  infants: 0, //嬰兒
  nonStop: false, // ✅ Boolean，非字串
  currencyCode: "USD",
  activity_preferences: [],
  notes: "",
};
export default function Itinerary({ data }) {
  const userFlight = !isEmptyObject(data.userFlight)
    ? data.userFlight
    : flightData;

  const form = data.form;
  console.log("data", data);
  console.log("userFlight", userFlight);

  const departureDate = formatDate(form.departureDate);
  const returnDate = formatDate(form.returnDate);
  const totalDuration = formatDuration(userFlight?.duration);
  const departureCity = `${userFlight.segments[0].departure.city}, ${userFlight.segments[0].departure.country}`;
  const departureAirport = userFlight.segments[0].departure.airline;
  const departureTerminal = userFlight.segments[0].departure.terminal
    ? ` , Terminal ${userFlight.segments[0].departure.terminal}`
    : "";
  const departureTime = formatDateTime(userFlight.segments[0].departure.at);

  const arrivalCity = `${userFlight.segments[1].arrival.city}, ${userFlight.segments[1].arrival.country}`;
  const arrivalAirport = userFlight.segments[1].arrival.airline;
  const arrivalTime = formatDateTime(userFlight.segments[1].arrival.at);
  const arrivalTerminal = userFlight.segments[1].arrival.terminal
    ? ` , Terminal ${userFlight.segments[1].arrival.terminal}`
    : "";
  const flightPrice = userFlight.price;

  return (
    <Container size="sm" pt="lg">
      {/* Title */}
      <Title order={2} color="orange.7" mb="xs">
        Travel Itinerary {isEmptyObject(data.userFlight) ? "(FakeData)" : ""}
      </Title>
      <Text size="lg" color="orange.6" mb="md">
        {departureDate} ~ {returnDate}
      </Text>

      {/* Flight Section */}
      <Group align="flex-start" spacing="md" noWrap mt="xl">
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
            Flight
          </Title>

          <Group spacing="xl" align="start" justify="space-between" mt="md">
            <Box>
              <Text fw={500}>{departureCity}</Text>
              <Text size="sm">Departure: {departureTime}</Text>
              <Text size="sm">
                {departureAirport}
                {departureTerminal}
              </Text>
              <Text size="sm">Flight Duration: {totalDuration}</Text>
            </Box>
            <Box>
              <Text fw={500}>{arrivalCity}</Text>
              <Text size="sm">Arrival: {arrivalTime}</Text>
              <Text size="sm">
                {arrivalAirport}
                {arrivalTerminal}
              </Text>
              <Text size="sm" color="orange.8">
                Ticket Fee: {form.currencyCode} {flightPrice}
              </Text>
            </Box>
          </Group>
        </Box>
      </Group>

      <Divider my="lg" />

      {/* Hotel Section */}
      <Group align="flex-start" spacing="md" noWrap mt="xl">
        <ThemeIcon variant="light" color="orange" size="lg">
          <BsFillHouseFill size={22} />
        </ThemeIcon>
        <Box>
          <Title order={4} color="orange.7">
            Hotel
          </Title>
          <Text size="sm">
            Central Hotel, 123 Main St, Los Angeles, CA 90012
          </Text>
          <Text size="sm">Contact: +1 213-555-1234</Text>
        </Box>
      </Group>

      <Divider my="lg" />

      {/* Itinerary */}
      <Group align="flex-start" spacing="md">
        <ThemeIcon variant="light" color="orange" size="lg">
          {/* <IconCalendarEvent /> */}
          <BsCalendar3 size={20} />
        </ThemeIcon>
        <Box>
          <Title order={4} color="orange.7">
            Itinerary
          </Title>
          <Text size="sm" color="gray.7" mb="xs">
            May 10
          </Text>
          <Timeline active={-1} bulletSize={18} lineWidth={2} color="orange">
            <Timeline.Item title="Local Eats">
              <Text size="sm">8:00 AM</Text>
            </Timeline.Item>
            <Timeline.Item title="Griffith Observatory">
              <Text size="sm">9:30 AM – Stay: 30 min</Text>
            </Timeline.Item>
            <Timeline.Item title="Hollywood Walk of Fame">
              <Text size="sm">11:30 AM – Check-in: 11 hours</Text>
            </Timeline.Item>
            <Timeline.Item title="Lunch at Mcy Bistro">
              <Text size="sm">—</Text>
            </Timeline.Item>
            <Timeline.Item title="Santa Monica Pier">
              <Text size="sm">11:30 PM – Stay: 2 hours</Text>
            </Timeline.Item>
            <Timeline.Item title="Return to Central Hotel">
              <Text size="sm">4:00 PM – 4 hours 30 min</Text>
            </Timeline.Item>
          </Timeline>
        </Box>
      </Group>
    </Container>
  );
}
