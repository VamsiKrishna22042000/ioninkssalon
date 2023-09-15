import "./saloninkshome.css";

import NavBar from "./navbar";

import Cookies from "js-cookie";

const SalonInksHome = (props) => {
  const loggedInOrNOt = Cookies.get("jwt_admin");

  return (
    <div className="saloninks-home-con">
      <NavBar props={props} />
      <div className="head-page-con">
        <div className="saloninks-head-page">
          <h1>Salon Business made simple.</h1>
          <p>
            SalonInks lets you customize your Salon Business Online. Choose
            Services, Product and languages. No hidden fees or contracts fees.
          </p>
          <div className="salonink-head-page-button-con">
            {loggedInOrNOt === undefined ? (
              <button
                onClick={() => {
                  window.location.href = "/signupadmin";
                }}
                type="button"
              >
                Get Started ❯
              </button>
            ) : (
              <button
                onClick={() => {
                  window.location.href = "/admindashboard";
                }}
                type="button"
              >
                Go To Dashboard ❯
              </button>
            )}
            <button type="button">Learn More ❯</button>
          </div>
        </div>
        <img
          className="home-inks-main-image"
          src="/main-page-image.png"
          alt="home-page-image"
        />
      </div>
      <div className="brand-con"></div>
    </div>
  );
};

export default SalonInksHome;
