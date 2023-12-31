import "./index.js";
import Maindashboard from "./maindashboard.js";

import Customers from "./customers.js";

import Services from "./services.js";

import Products from "./products.js";

import Appointments from "./appointments.js";

import Orders from "./orders.js";

import Events from "./events.js";

import Bookings from "./bookings.js";

import Banners from "./banners.js";

import Videos from "./videos.js";

import Staff from "./staff.js";

import CategoryEdit from "./categoryedit.js";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const DashboardContent = (props) => {
  const { selectedDashboard } = props;

  const [admin, setAdmin] = useState([]);

  useEffect(() => {
    getCustomerData();
  }, []);

  const getCustomerData = async () => {
    const adminId = Cookies.get("jwt_adminId");

    const url = `${process.env.REACT_APP_ROOT_URL}/api/admin/getUsersByAdminId/${adminId}`;
    const response = await fetch(url);
    const data = await response.json();
    if (response.ok) {
      console.log(data);
      setAdmin(Cookies.get("jwt_user").replace("@gmail.com", ""));
    }
  };

  console.log(admin);

  return (
    <div className="dashboard-content">
      <div className="dashboard-header">
        <div className="header-content">
          <p style={{ marginBottom: 0 }}>Hello,</p>
          <h1
            style={{ marginTop: 5, fontSize: 20, textTransform: "capitalize" }}
          >
            {admin}
          </h1>
        </div>
        <div className="header-content">
          <p style={{ marginBottom: 0 }}>User</p>
          <h1 style={{ marginTop: 5, fontSize: 20 }}>Administrator</h1>
        </div>
      </div>
      {selectedDashboard === "Dashboard" ? (
        <Maindashboard />
      ) : selectedDashboard === "Customers" ? (
        <Customers />
      ) : selectedDashboard === "Appointments" ? (
        <Appointments />
      ) : selectedDashboard === "Services" ? (
        <Services />
      ) : selectedDashboard === "Products" ? (
        <Products />
      ) : selectedDashboard === "Orders" ? (
        <Orders />
      ) : selectedDashboard === "Events" ? (
        <Events />
      ) : selectedDashboard === "Booking's" ? (
        <Bookings />
      ) : selectedDashboard === "Banner's" ? (
        <Banners />
      ) : selectedDashboard === "Videos" ? (
        <Videos />
      ) : selectedDashboard === "Staff" ? (
        <Staff />
      ) : (
        <CategoryEdit />
      )}
    </div>
  );
};
export default DashboardContent;
