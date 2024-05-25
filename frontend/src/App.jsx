import { useState } from "react";
import "./App.css";
import { Navigate, Outlet } from "react-router-dom";
import TopBar from "./components/Topbar";
import { useStateContext } from "./context/StateContext";

function App() {
    const { token } = useStateContext();
    return (
        <>
            <TopBar />

            {token ? <Outlet /> : <Navigate to={"/login"} />}
        </>
    );
}

export default App;
