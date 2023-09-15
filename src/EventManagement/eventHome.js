import "./index.css";

import { useState, useEffect } from "react";

import Cookies from "js-cookie";

import { Link, withRouter } from "react-router-dom";

import { TailSpin } from "react-loader-spinner";

import EventManagementCarousel from "../EventManagementCarousel";

import Footer from "../footer/footer";

const EventHome = (props) => {
  const { settingPage, settingEvent } = props;
  const [eventServices, setEventServices] = useState([]);
  const [load, setLoad] = useState(false);
  const [displayProfile, setProfile] = useState(false);

  useEffect(() => {
    getAllEventsServices();
  }, []);

  const getAllEventsServices = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_ROOT_URL}/api//admin/getAllEventServices`
    );
    const data = await response.json();
    if (response.ok) {
      setEventServices(data.events);
      setLoad(true);
    }
  };

  const sendPage = (event) => {
    settingEvent(event.target.getAttribute("program"));
    settingPage(event.target.id);
  };

  const gobackTo = () => {
    const { history } = props;
    history.push("/");
  };

  const deleteCookie = () => {
    /* deleteCookie was integrated with both searchIcons*/
    Cookies.remove("jwt_token");
    Cookies.remove("jwt_user");
  };

  const settingProfile = () => {
    setProfile(!displayProfile);
  };

  const goToSelectCategory = () => {
    const { history } = props;
    history.push("/");
  };

  /*console.log(eventServices)*/ return load ? (
    <>
      <div className="sukras-header-fashionzone">
        <img
          className="sukraslogosukras diable-logo"
          src="./logo3.png"
          alt="Logo Space"
          onClick={goToSelectCategory}
        />
        <img
          style={{
            position: "absolute",
            marginLeft: "5.5%",
            marginBottom: "1.5%",
          }}
          onClick={goToSelectCategory}
          className="sukraslogobeauty"
          src="./sukraslogo.png"
          alt="Logo Space"
        />
        <button
          onClick={gobackTo}
          className="leftevent-arrow-btn"
          type="button"
        >
          <img className="left-arrow-mobile" src="./backarrow.png" />
        </button>
        <button className="location-btnn" type="button">
          <img className="location-mobilee" src="./location-icon.png" />
        </button>
        <select className="dropdown-container">
          <option>Vizianagaram</option>
        </select>

        <button className="user-btn" type="button">
          <img className="user" src="./user.png" />
        </button>
        <button
          onClick={settingProfile}
          className="arrowdown-btn"
          type="button"
        >
          <img className="arrow" src="./arrowdown.png" />
        </button>
      </div>
      <div className="sukras-main-beauty">
        <div className={displayProfile ? "profile-block" : "profile-display"}>
          {Cookies.get("jwt_user") === undefined ? (
            <button
              className="log-btn"
              type="button"
              onClick={() => {
                window.location.href = "/login";
              }}
              style={{ marginTop: 5 }}
            >
              Log In
            </button>
          ) : (
            <button
              className="log-btn"
              type="button"
              onClick={deleteCookie}
              style={{ marginTop: 5 }}
            >
              Log Out
            </button>
          )}
          <Link
            className="log-btn"
            style={{ textDecoration: "none" }}
            to={`/myorders/myorders/myorders/beautyzone`}
          >
            My Orders
          </Link>
        </div>
        <div className="beautyzone-body">
          <EventManagementCarousel />
        </div>
        <div className="event-points">
          <h1>You know events,we know you</h1>
          <p>
            Managing & booking events is stressful, here we help you to <br />
            book venue within minutes
          </p>
          <div className="points-con">
            <img className="pointImg" src="./points.png" />
            <p>Best of deals only on Sukra’sBest of deals only on Sukra’s</p>
          </div>
          <div className="points-con">
            <img className="pointImg" src="./points.png" />
            <p>Get resaonable rates</p>
          </div>
          <div className="points-con">
            <img className="pointImg" src="./points.png" />
            <p>Easy to book an event</p>
          </div>
          <div className="points-con">
            <img className="pointImg" src="./points.png" />
            <p>Just one click and book an event</p>
          </div>
        </div>
      </div>
      <div className="beautyzone-body-2">
        {eventServices === "" ? (
          <div className="service-spinner">
            <TailSpin color={"#F4BD18"} height={70} width={70} />
          </div>
        ) : (
          <div className="our-services">
            <p className="our-services-head">Our Event Services</p>
            {eventServices.map((each) => (
              <button
                onClick={sendPage}
                key={each._id}
                className="event-our-services-btn"
                id={each.name}
                type="button"
              >
                <img
                  program={each._id}
                  id={each.name}
                  className="our-services-img"
                  src={`${each.image}`}
                  alt={each.name}
                />
                <p
                  style={{ textTransform: "capitalize" }}
                  className="event-our-services-name"
                >
                  {each.name}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  ) : (
    <div className="service-spinner">
      <TailSpin color={"#F4BD18"} height={70} width={70} />
    </div>
  );
};
export default withRouter(EventHome);
