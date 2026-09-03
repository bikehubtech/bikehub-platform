import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { applyGnexisTheme } from "./config/theme";
import { AuthProvider, ToastProvider } from "./contexts";
import "./styles/global.css";

applyGnexisTheme();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </AuthProvider>
  </React.StrictMode>
);
