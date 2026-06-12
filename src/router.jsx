import { createBrowserRouter } from "react-router-dom";
import Login from "./components/dashboard/Login.jsx";
import Layout from "./components/Layout.jsx";
import Home from "./components/dashboard/Home.jsx";
import { requiredAuth } from "./loaders/requiredAuth.js";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "admin",
        element: <Login />,
      },
      {
        path: "admin/home",
        element: <Home />,
        loader: requiredAuth,
      },
    ],
  },
]);
