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

export default function Itinerary({ data }) {
  return (
    <Container size="sm" pt="lg">
      {/* Title */}
      <Title order={2} color="orange.7" mb="xs">
        Travel Itinerary
      </Title>
      <Text size="lg" color="orange.6" mb="md">
        May 10, 2024 – May 14, 2024
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
              <Text fw={500}>Tokyo, Japan</Text>
              <Text size="sm">Departure: 10:30 AM, May 10</Text>
              <Text size="sm">Narita International Airport, Terminal 1</Text>
              <Text size="sm">Flight Duration: 10 hours</Text>
            </Box>
            <Box>
              <Text fw={500}>Los Angeles, USA</Text>
              <Text size="sm">Arrival: 4:30 AM, May 10</Text>
              <Text size="sm">Los Angeles International Airport</Text>
              <Text size="sm">Ticket Fee: $0 tta</Text>
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
