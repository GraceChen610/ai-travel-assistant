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
                timeZone: event.timeZone || "Asia/Taipei",
              },
              end: {
                dateTime: event.endDateTime,
                timeZone: event.timeZone || "Asia/Taipei",
              },
            }),
          }
        );


        if (!response.ok) {
          const errorData = await response.json();
          console.error(
            "Failed to add calendar events：",
            event.title,
            errorData
          );
          continue; // 不中斷，繼續處理下一筆
        }

        await response.json(); // 解析 API 回應（可以加紀錄）
      }

      setSuccess(true);
      showNotification({
        title: "Success",
        message: "All calendar events have been successfully added! 🎉",
        color: "green",
      });
    } catch (err) {
      console.error("An unexpected error occurred:", event.title, err);
      setError(err.message);
      showNotification({
        title: "Error",
        message: err.message || "Failed to add calendar events",
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
