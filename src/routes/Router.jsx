import { createBrowserRouter } from "react-router-dom";
import Home from "../components/Home";
import Login from "../components/Auth/Login";
import Layout from "./Layout";
import Songs from "../components/Songs";
import ProtectedRoute from "./ProtectedRoute";
import Profile from "../components/Profile";
import ErrorNotFound from "../components/ErrorNotFound";

const Router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "songs",
                children: [
                    {
                        index: true,
                        element: <Songs />
                    },
                    {
                        path: "add",
                        element: (
                            <ProtectedRoute>
                                <Songs />
                            </ProtectedRoute>
                        ),
                    },
                ],
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "profile",
                element: (
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                ),
            },
        ],
    },
    {
        path: "*",
        element: <ErrorNotFound />,
    },
],
    {
        basename: "/Proyecto_Workbot_HarmonyHub/",
    }
);

export { Router };
