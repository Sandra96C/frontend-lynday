// src/components/Layout.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";

function LayoutDashboard() {
  return (
    <div className="main-dashboard-layout">
      <Sidebar />

      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
}

export default LayoutDashboard;
