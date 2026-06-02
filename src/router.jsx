import { createBrowserRouter } from "react-router-dom";
import Login from "./components/dashboard/Login.jsx";

export const router = createBrowserRouter([
  {
    path: "/admin",
    element: <Login />,
  },
]);
