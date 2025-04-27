import { useState } from "react";
import { showNotification } from "@mantine/notifications";

export function useCalendar() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const createEvents = async (accessToken, events = []) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      for (const event of events) {
        const response = await fetch(
          "https://www.googleapis.com/calendar/v3/calendars/primary/events",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              summary: event.title,
              location: event.location,
              description: event.description,
              start: {
                dateTime: event.startDateTime,
                timeZone: event.timeZone || "Asia/Tokyo",
              },
              end: {
                dateTime: event.endDateTime,
                timeZone: event.timeZone || "Asia/Tokyo",
              },
            }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error.message || "Failed to create event");
        }

        await response.json(); // 解析 API 回應（可以加紀錄）
      }

      setSuccess(true);
      showNotification({
        title: "成功",
        message: "所有行事曆活動已成功新增！🎉",
        color: "green",
      });
    } catch (err) {
      console.error("Error creating calendar events:", err);
      setError(err.message);
      showNotification({
        title: "錯誤",
        message: err.message || "新增行事曆失敗",
        color: "red",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createEvents,
    isLoading,
    error,
    success,
  };
}
