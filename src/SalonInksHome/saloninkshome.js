import "./saloninkshome.css";

import Wave from "react-wavify";

import NavBar from "./navbar";

import Cookies from "js-cookie";

import ComprehensiveData from "./comprehensiveData";

import React from "react";

import SimpleSlider from "./salonslider";

const brands = [
  "brand1",
  "brand2",
  "brand3",
  "brand4",
  "brand5",
  "brand6",
  "brand7",
];

const comprehensiveData = [
  {
    head: "Advance booking via MISSCALL",
    data: "SalonInks allow you to book customer waiting number ia Misscall. Customer just need to call your allotted number as soon as customer dail your number he/she will receive Current Running number and your allotted number. This will help you in reducing inhouse waiting.",
  },
  {
    head: "Simple and transparent charges",
    data: "SalonInks charges a flat fee per transaction, regardless of the payment method, currency, or location. There are no hidden fees, contracts, or minimums. You only pay for what you use.",
  },
  {
    head: "Lorem Ipsum",
    data: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugia",
  },
];

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
      <h4>Working with top Brands From all over India</h4>
      <ul className="brand-con">
        {brands.map((each) => (
          <li key={each} className="brands">
            <img src={`/${each}.png`} />
          </li>
        ))}
      </ul>
      <div className="con-comprehensive">
        <Wave
          className="wave"
          fill="#ffffff"
          paused={false}
          style={{ display: "flex" }}
          options={{
            height: 50,
            amplitude: 50,
            speed: 0.15,
            points: 6,
          }}
        />
        <Wave
          className="wave2"
          fill="#ffffff"
          paused={false}
          style={{ display: "flex" }}
          options={{
            height: 50,
            amplitude: 50,
            speed: 0.15,
            points: 6,
          }}
        />
        <h1>Comprehensive and intuitive dashboard</h1>
        <p>
          SalonInks provides you with a powerful and user-friendly dashboard
          that gives you real-time insights and analytics on your Business
          performance. You can also manage your customers, Products, refunds,
          disputes, and reports from one place.
        </p>
        <img src="/main-page-image.png" alt="comprehensive-img" />
        <ComprehensiveData comprehensiveData={comprehensiveData} />
      </div>
      <div className="mission-statement">
        <h3>Mission statement</h3>
        <p>
          Our mission at SalonInks is to empower small & medium businesses with
          seamless Salon solutions that enhance their growth and success. We
          strive to simplify the process for salon customer, providing them with
          one tap solution to book every service. With a commitment to
          excellence and innovation, we aim to be the trusted partner that
          enables businesses to thrive in the digital age.
        </p>

        <img src="/mission-statement.png" />
      </div>
      <div className="ourTeam">
        <Wave
          className="wave-3"
          fill="#ffffff"
          paused={false}
          style={{ display: "flex" }}
          options={{
            height: 50,
            amplitude: 50,
            speed: 0.15,
            points: 6,
          }}
        />
        <Wave
          className="wave-4"
          fill="#ffffff"
          paused={false}
          style={{ display: "flex" }}
          options={{
            height: 50,
            amplitude: 50,
            speed: 0.15,
            points: 6,
          }}
        />

        <h3>Our Team</h3>
        <p>
          At SalonInks, our team of dedicated professionals is committed to
          providing top-notch salon service booking solutions and exceptional
          service to salon businesses worldwide, helping them thrive in the
          digital age.
        </p>
        <div className="slider-con">
          <SimpleSlider />
        </div>
      </div>
      <div className="securebooking">
        <div>
          <h3>Secure your Booking with us</h3>
          <p>
            Our booking service uses a world-class technology and support teams,
            ensuring your customer booking are always delivered on time.
          </p>
          <button type="button">Check Out Now ›</button>
        </div>

        <div className="secure-2">
          <img className="secure-img" src="booking.png" alt="secure image" />
          <img className="blob" src="/blob.png" alt="secure image" />
        </div>
      </div>
    </div>
  );
};

export default SalonInksHome;
