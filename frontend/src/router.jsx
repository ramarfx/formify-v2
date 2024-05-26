import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreateForm from "./pages/Form/CreateForm";
import DetailForm from "./pages/Form/DetailForm";
import SubmitForm from "./pages/Form/SubmitForm";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/form/create",
                element: <CreateForm />,
            },
            {
                path: "/form/:slug",
                element: <DetailForm />,
            },
            {
                path: "form/:slug/submit",
                element: <SubmitForm />,
            },
        ],
    },
    {
        path: "/login",
        element: <Login />,
    },
]);
