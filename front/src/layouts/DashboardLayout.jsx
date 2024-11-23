import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import "./DashboardLayout.css";

const DashboardLayout = ({ children }) => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main>{children}</main>
    </div>
  );
};

export default DashboardLayout;
