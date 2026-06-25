import { createBrowserRouter } from "react-router-dom";
import Login from "./components/dashboard/Login.jsx";
import Layout from "./components/Layout.jsx";
import Home from "./components/dashboard/Home.jsx";
import Orders from "./components/dashboard/Orders.jsx";
import Users from "./components/dashboard/Users.jsx";
import Products from "./components/dashboard/Products.jsx";
import {
  requiredAuth,
  requiredAdminAuth,
  redirectIfAuth,
} from "./loaders/requiredAuth.js";
import LayoutDashboard from "./components/dashboard/LayoutDashboard.jsx";
import Categories from "./components/dashboard/Categories.jsx";
import ProductDetail from "./components/dashboard/ProductDetail.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "login",
        loader: redirectIfAuth,
        element: <Login />,
      },
    ],
  },
  {
    path: "admin",
    loader: requiredAuth,
    element: <LayoutDashboard />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      // {
      //   path: "orders",
      //   element: <Orders />,
      // },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "products/:id",
        element: <ProductDetail />,
      },
      {
        path: "users",
        loader: requiredAdminAuth,
        element: <Users />,
      },
    ],
  },
]);
