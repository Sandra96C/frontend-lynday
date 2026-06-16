// src/components/Layout.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";

function LayoutDashboard() {
  return (
    <div className="main-dashboard-layout">
      <Sidebar />

      <Outlet />
    </div>
  );
}

export default LayoutDashboard;
