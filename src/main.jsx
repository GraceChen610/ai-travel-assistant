import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MantineProvider, createTheme } from "@mantine/core";
import "./index.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import App from "./App.jsx";

const theme = createTheme({
  fontFamily: "Fredoka, sans-serif",
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <App />
    </MantineProvider>
  </StrictMode>
);
