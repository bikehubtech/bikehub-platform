import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { applyBikeHubTheme } from "./config/theme";
import "./styles/global.css";

applyBikeHubTheme();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
