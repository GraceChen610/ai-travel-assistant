import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MantineProvider, createTheme } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import "./index.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import App from "./App.jsx";

const theme = createTheme({
  fontFamily: "Poppins, sans-serif",
  components: {
    Notifications: {
      styles: {
        root: {
          position: "fixed",
          bottom: "16px",
          right: "16px",
          margin: 0,
        },
      },
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <Notifications position="bottom-right" zIndex={2077} />
      <App />
    </MantineProvider>
  </StrictMode>
);
