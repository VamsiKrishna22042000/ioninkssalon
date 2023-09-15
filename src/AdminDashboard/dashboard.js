import "./index.css";

import { withRouter } from "react-router-dom/cjs/react-router-dom.min";

const options = [
  {
    imgUrl: "Dashboard-icon.png",
    name: "Dashboard",
  },
  {
    imgUrl: "dashboard-customers.png",
    name: "Customers",
  },
  {
    imgUrl: "dashboard-appointment.png",
    name: "Appointments",
  },
  {
    imgUrl: "dashboard-services.png",
    name: "Services",
  },
  /**{
    imgUrl: "dashboard-products.png",
    name: "Products",
  },
  {
    imgUrl: "dashboard-orders.png",
    name: "Orders",
  },
  {
    imgUrl: "dashboard-events.png",
    name: "Events",
  },
  { imgUrl: "eventbooked.png", name: "Booking's" },*/
  { imgUrl: "slider.png", name: "Banner's" },
  {
    imgUrl: "youtube.png",
    name: "Videos",
  },
  { imgUrl: "CategoryEdit.png", name: "CategoryEdit" },
];

const DashboardMain = (props) => {
  const { selectedDashboard, settingDashboard } = props;

  const sendSelectedOption = (event) => {
    settingDashboard(event.target.id);
  };

  return (
    <div className="dash-board">
      <img
        className="main-head-dashboard"
        src="logo3.png"
        alt="Dashboardlogo"
        onClick={() => {
          window.location.href = "/";
        }}
      />
      <div className="dash-board-options">
        {options.map((each) => (
          <button
            type="button"
            onClick={sendSelectedOption}
            key={each.name}
            className={
              each.name === selectedDashboard
                ? "option-dashboard"
                : "option-dashboard2"
            }
          >
            <img
              onClick={sendSelectedOption}
              id={each.name}
              className="icons-dashboard"
              src={each.imgUrl}
              alt="Dashboard-icon"
            />
            <p onClick={sendSelectedOption} id={each.name}>
              {each.name}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};
export default withRouter(DashboardMain);
