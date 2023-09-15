import "./index.css";

import { useState, useEffect } from "react";

import { TailSpin } from "react-loader-spinner";

const Maindashboard = () => {
  const [dashboarddata, setDashboardData] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    getDashboardData();
  }, []);

  const getDashboardData = async () => {
    const url = `${process.env.REACT_APP_ROOT_URL}/api/admin/dashBoardDetaiils`;

    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      setDashboardData(data.user);
      setLoad(true);
    }
  };

  return load ? (
    <div className="dashboard-component">
      <div className="dashboard-data">
        {/**<div className="dashboard-data-content">
        <div className="dash-board-img-con">
            <img
              src="/dashboard-orders.png"
              className="dash-board-data-img"
              alt="dashboard-icons"
            />
          </div>
          <div className="dashboard-data-numbers">
            <h1 style={{ margin: 0, color: "#4e4e4e" }}>
              {dashboarddata[2].totalProductOrders}
            </h1>
            <p style={{ margin: 0, paddingLeft: 1 }}>Orders</p>
          </div>
        </div>*/}
        <div className="dashboard-data-content">
          <div className="dash-board-img-con">
            <img
              src="/dashboard-appointment.png"
              className="dash-board-data-img"
              alt="dashboard-icons"
            />
          </div>
          <div className="dashboard-data-numbers">
            <h1 style={{ margin: 0, color: "#4e4e4e" }}>
              {dashboarddata[1].totalOrders}
            </h1>
            <p style={{ margin: 0, paddingLeft: 1 }}>Appointments</p>
          </div>
        </div>
        <div className="dashboard-data-content">
          <div className="dash-board-img-con">
            <img
              src="/dashboard-customers.png"
              className="dash-board-data-img"
              alt="dashboard-icons"
            />
          </div>
          <div className="dashboard-data-numbers">
            <h1 style={{ margin: 0, color: "#4e4e4e" }}>
              {dashboarddata[0].totalUsers}
            </h1>
            <p style={{ margin: 0, paddingLeft: 1 }}>Customers</p>
          </div>
        </div>
        <div className="dashboard-data-content">
          <div className="dash-board-img-con">
            <img
              src="/dashboard-services.png"
              className="dash-board-data-img"
              alt="dashboard-icons"
            />
          </div>
          <div className="dashboard-data-numbers">
            <h1 style={{ margin: 0, color: "#4e4e4e" }}>
              {dashboarddata[6].totalServices}
            </h1>
            <p style={{ margin: 0, paddingLeft: 1 }}>Services</p>
          </div>
        </div>
        {/**<div className="dashboard-data-content">
          <div className="dash-board-img-con">
            <img
              src="/dashboard-products.png"
              className="dash-board-data-img"
              alt="dashboard-icons"
            />
          </div>
          <div className="dashboard-data-numbers">
            <h1 style={{ margin: 0, color: "#4e4e4e" }}>
              {dashboarddata[4].totalProducts}
            </h1>
            <p style={{ margin: 0, paddingLeft: 1 }}>Products</p>
          </div>
        </div>
        <div className="dashboard-data-content">
          <div className="dash-board-img-con">
            <img
              src="/dashboard-events.png"
              className="dash-board-data-img"
              alt="dashboard-icons"
            />
          </div>
          <div className="dashboard-data-numbers">
            <h1 style={{ margin: 0, color: "#4e4e4e" }}>
              {dashboarddata[5].totalEvents}
            </h1>
            <p style={{ margin: 0, paddingLeft: 1 }}>Events</p>
          </div>
        </div>
        <div className="dashboard-data-content">
          <div className="dash-board-img-con">
            <img
              src="/eventbooked.png"
              className="dash-board-data-img"
              alt="dashboard-icons"
            />
          </div>
          <div className="dashboard-data-numbers">
            <h1 style={{ margin: 0, color: "#4e4e4e" }}>
              {dashboarddata[3].totalEventLength}
            </h1>
            <p style={{ margin: 0, paddingLeft: 1 }}>Booking's</p>
          </div>
        </div>*/}
      </div>
    </div>
  ) : (
    <div className="loader-spinner-admin">
      <TailSpin color={"#F4BD18"} height={70} width={70} />
    </div>
  );
};

export default Maindashboard;
