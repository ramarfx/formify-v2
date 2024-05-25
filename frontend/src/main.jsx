import React from "react";
import ReactDOM from "react-dom/client";
import StateContextProvider from "./context/StateContext.jsx";
import { RouterProvider } from "react-router-dom";
import { router } from "./router.jsx";
import "./css/bootstrap.css";
import "./css/style.css";
import "./css/bootstrap.js";
import "./css/popper.js";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/api/v1";
axios.defaults.headers.common["Accept"] = "Application/json";
axios.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${sessionStorage.getItem("token")}`;

    return config;
});

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <StateContextProvider>
            <RouterProvider router={router} />
        </StateContextProvider>
    </React.StrictMode>
);
