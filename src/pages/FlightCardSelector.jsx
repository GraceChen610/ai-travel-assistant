import { useState } from "react";
import {
  Card,
  Group,
  Text,
  Box,
  Badge,
  Stack,
  useMantineTheme,
  ActionIcon,
} from "@mantine/core";
import { FaCheck } from "react-icons/fa";
import dayjs from "dayjs";

export default function FlightCardSelector({ flights }) {
  const theme = useMantineTheme();
  const [selectedId, setSelectedId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  const formatTime = (dt) => dayjs(dt).format("HH:mm");
  const formatDate = (dt) => dayjs(dt).format("YYYY-MM-DD");

  const formatDuration = (pt) => {
    const match = pt.match(/PT(\d+H)?(\d+M)?/);
    const h = match[1] ? match[1].replace("H", "hr ") : "";
    const m = match[2] ? match[2].replace("M", "min") : "";
    return h + m;
  };

  const getStopDuration = (arrival, nextDeparture) => {
    const diff = dayjs(nextDeparture).diff(dayjs(arrival), "minute");
    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;
    return `${hours}hr ${minutes}min`;
  };

  return (
    <Stack spacing="md">
      {flights.map((flight) => {
        const segments = flight.segments;
        const firstSegment = segments[0];
        const lastSegment = segments[segments.length - 1];

        const depTerm = firstSegment.departure.terminal
          ? ` T${firstSegment.departure.terminal}`
          : "";
        const arrTerm = lastSegment.arrival.terminal
          ? ` T${lastSegment.arrival.terminal}`
          : "";

        const departureAirport = `${firstSegment.departure.iataCode}${depTerm}`;
        const arrivalAirport = `${lastSegment.arrival.iataCode}${arrTerm}`;

        const departureTime = formatTime(firstSegment.departure.at);
        const arrivalTime = formatTime(lastSegment.arrival.at);
        const crossesDay = dayjs(lastSegment.arrival.at).isAfter(
          dayjs(firstSegment.departure.at),
          "day"
        );
        const totalDuration = formatDuration(flight.duration);

        const isDirect = segments.length === 1;
        const price = `USD ${flight.price.toFixed(2)}`;
        const airlineName = flight.airline;
        const isSelected = selectedId === flight.id;
        const isExpanded = expandedId === flight.id;

        return (
          <Box key={flight.id}>
            <Card
              withBorder
              shadow={isSelected ? "md" : "xs"}
              radius="md"
              padding="md"
              onClick={() => {
                setSelectedId(flight.id);
                setExpandedId((prev) =>
                  prev === flight.id ? null : flight.id
                );
              }}
              style={{
                cursor: "pointer",
                backgroundColor: isSelected
                  ? theme.colors.orange[0]
                  : theme.white,
                borderColor: isSelected
                  ? theme.colors.orange[5]
                  : theme.colors.gray[3],
                position: "relative",
              }}
            >
              {isSelected && (
                <ActionIcon
                  color="green"
                  variant="light"
                  radius="xl"
                  size="md"
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    zIndex: 1,
                  }}
                >
                  <FaCheck />
                </ActionIcon>
              )}

              <Group
                position="apart"
                justify="space-between"
                align="center"
                noWrap
              >
                <Box>
                  <Text fw={500} size="md">
                    {departureAirport} ➜ {arrivalAirport}
                  </Text>
                  <Text size="sm" color="dimmed">
                    {departureTime} → {arrivalTime}
                    {crossesDay ? " (+1日)" : ""}
                  </Text>
                  <Text size="xs" mt={4} color="gray">
                    {airlineName}
                  </Text>
                </Box>

                <Stack spacing={4} align="center">
                  <Badge color={isDirect ? "green" : "blue"} variant="light">
                    {isDirect
                      ? "Non-stop"
                      : `${segments.length - 1} Stop${
                          segments.length - 1 > 1 ? "s" : ""
                        }`}
                  </Badge>
                  <Text color="dimmed" size="lg">
                    {totalDuration}
                  </Text>
                </Stack>

                <Text fw={700} size="lg" color="orange.7">
                  {price}
                </Text>
              </Group>
            </Card>

            {isExpanded && segments.length > 1 && (
              <Stack spacing="xs" mt="xs">
                {segments.slice(1).map((seg, idx) => {
                  const prev = segments[idx];
                  const stopDuration = getStopDuration(
                    prev.arrival.at,
                    seg.departure.at
                  );

                  const prevDepTerm = prev.departure.terminal
                    ? ` T${prev.departure.terminal}`
                    : "";
                  const prevArrTerm = prev.arrival.terminal
                    ? ` T${prev.arrival.terminal}`
                    : "";
                  const depTerm = seg.departure.terminal
                    ? ` T${seg.departure.terminal}`
                    : "";
                  const arrTerm = seg.arrival.terminal
                    ? ` T${seg.arrival.terminal}`
                    : "";

                  return (
                    <Card
                      key={`${flight.id}-${idx}`}
                      withBorder
                      radius="md"
                      padding="sm"
                      shadow="md"
                      style={{
                        backgroundColor: theme.colors.orange[0],
                        borderColor: theme.colors.orange[5],
                      }}
                    >
                      <Stack spacing={4}>
                        <Group justify="space-evenly" position="apart" noWrap>
                          <Text fw={500}>
                            {prev.departure.iataCode} {prevDepTerm} →{" "}
                            {prev.arrival.iataCode} {prevArrTerm}
                          </Text>
                          <Text fw={500}>
                            Layover Duration: <br />
                            {stopDuration}
                          </Text>
                          <Text fw={500}>
                            {seg.departure.iataCode} {depTerm} →{" "}
                            {seg.arrival.iataCode} {arrTerm}
                          </Text>
                        </Group>

                        <Group justify="space-evenly" position="apart" noWrap>
                          <Text size="sm" color="dimmed">
                            {formatDate(prev.arrival.at)} <br />
                            {formatTime(prev.arrival.at)} <br />
                            {airlineName}
                          </Text>
                          <Text size="xl" color="dimmed">
                            →
                          </Text>
                          <Text size="sm" color="dimmed">
                            {formatDate(seg.arrival.at)} <br />
                            {formatTime(seg.arrival.at)} <br />
                            {airlineName}
                          </Text>
                        </Group>
                      </Stack>
                    </Card>
                  );
                })}
              </Stack>
            )}
          </Box>
        );
      })}
    </Stack>
  );
}
