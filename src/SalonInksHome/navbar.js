import "./saloninkshome.css";

import { useState } from "react";

import Cookies from "js-cookie";

function NavBar(props) {
  const [showNavContents, setNavContents] = useState(false);

  const loggedInOrNOt = Cookies.get("jwt_admin");

  return (
    <>
      <section style={{ top: 0 }} className="saloninks-navbar-con">
        <img src="/saloninkslogo2.png" alt="logo" className="saloninkslogo" />
        <div className="nav-bar-section">
          <p>Home</p>
          <select>
            <option>Features</option>
          </select>
          <select>
            <option>Resources</option>
          </select>
          <p>Pricing</p>
          <p>Contact us</p>
        </div>
        <div className="navbar-buttons">
          {loggedInOrNOt === undefined ? (
            <button
              onClick={() => {
                props.props.history.replace("/loginadmin");
              }}
              type="button"
            >
              Sign In
            </button>
          ) : (
            <button
              onClick={() => {
                Cookies.remove("jwt_adminId");
                Cookies.remove("jwt_admin");
                Cookies.remove("jwt_userId");
                Cookies.remove("jwt_token");
                Cookies.remove("jwt_salonId");
                Cookies.remove("jwt_user");
                props.props.history.replace("/");
              }}
              type="button"
            >
              Log Out
            </button>
          )}
          {loggedInOrNOt === undefined && (
            <button
              onClick={() => {
                props.props.history.replace("/signupadmin");
              }}
              type="button"
            >
              Get Started
            </button>
          )}
        </div>
        <div
          onClick={() => {
            setNavContents(!showNavContents);
          }}
          className="ham-burger"
        >
          <div className={showNavContents ? "bar1" : "bar"}></div>
          <div className={showNavContents ? "bar2" : "bar"}></div>
          <div className={showNavContents ? "bar3" : "bar"}></div>
        </div>
      </section>
      {showNavContents && (
        <>
          <div className="nav-bar-blur-content"></div>
          <div className="nav-bar-content">
            <div className="nav-bar-section1">
              <p>Home</p>
              <select>
                <option>Features</option>
              </select>
              <select>
                <option>Resources</option>
              </select>
              <p>Pricing</p>
              <p>Contact us</p>
            </div>
            <div className="navbar-buttons2">
              {loggedInOrNOt === undefined ? (
                <button
                  onClick={() => {
                    props.props.history.replace("/loginadmin");
                  }}
                  type="button"
                >
                  Sign In
                </button>
              ) : (
                <button
                  onClick={() => {
                    Cookies.remove("jwt_admin");
                    props.props.history.replace("/");
                  }}
                  type="button"
                >
                  Log Out
                </button>
              )}
              {loggedInOrNOt === undefined && (
                <button
                  onClick={() => {
                    props.props.history.replace("/signupadmin");
                  }}
                  type="button"
                >
                  Get Started
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default NavBar;
