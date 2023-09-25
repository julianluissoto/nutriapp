import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { UserProvider } from "./context/nutritionistContext"; // Import your UserProvider
import "./index.css";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
);
