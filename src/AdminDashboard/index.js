import "./index.css";

import DashboardMain from "./dashboard";

import DashboardContent from "./dashboardcontent";

import { useState } from "react";

const Dashboard = () => {
  const [selectedDashboard, setBoard] = useState("Dashboard");

  const settingDashboard = (value) => {
    setBoard(value);
  };

  return (
    <div className="admin-total-container">
      <DashboardMain
        selectedDashboard={selectedDashboard}
        settingDashboard={settingDashboard}
      />
      <DashboardContent selectedDashboard={selectedDashboard} />
    </div>
  );
};
export default Dashboard;
