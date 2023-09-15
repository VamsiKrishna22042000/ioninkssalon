// Training.js

import React from "react";
import "./training.css";

import Footer from "../footer/footer.js";

const Training = () => {
  return (
    <>
      <div className="training-container">
        <h1
          onClick={() => {
            window.location.href = "/";
          }}
          className="arrow-style-training"
        >
          ‹
        </h1>
        <h2
          style={{
            marginLeft: "8%",
            paddingLeft: "3%",
            paddingTop: "3%",
          }}
          className="style-training"
        >
          Training
        </h2>
        <div className="course">
          <img
            className="training1-image"
            style={{ borderRadius: "10px" }}
            src="/training1.jpg"
            alt="Basic Course"
          />
          <div className="course-details">
            <h3>Unisex Basic Beautician Course</h3>
            <p
              style={{ marginLeft: "46%", marginTop: "5%", color: "goldenrod" }}
            >
              Duration: 3 Months
            </p>
            <p
              style={{
                marginLeft: "46%",
                marginBottom: "5%",
                color: "goldenrod",
              }}
            >
              Price: ₹34,999
            </p>
            <ul>
              <li>
                Includes:
                <ul>
                  <li>
                    Makeup techniques: Foundation, eye makeup, contouring.
                  </li>
                  <li>
                    Skincare basics: Cleansing, exfoliation, basic facials.
                  </li>
                  <li>Manicure/pedicure: Nail care, hand & foot massage.</li>
                  <li>
                    Hair styling fundamentals: Blow-drying, basic braids, simple
                    updos.
                  </li>
                  <li>Industry insights and hands-on practice.</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div className="course">
          <img
            className="training1-image"
            style={{ borderRadius: "10px", order: 2 }}
            src="/training2.jpeg"
            alt="Advanced Course"
          />
          <div className="course-details">
            <h3>Unisex Beautician Advanced Course</h3>
            <p
              style={{ marginLeft: "47%", marginTop: "5%", color: "goldenrod" }}
            >
              Duration: Depends
            </p>
            <p
              style={{
                marginLeft: "47%",
                marginBottom: "5%",
                color: "goldenrod",
              }}
            >
              Price: Depends
            </p>
            <ul>
              <li>
                Includes:
                <ul>
                  <li>
                    Advanced makeup artistry: Special effects, creative designs.
                  </li>
                  <li>
                    Spa treatments: Aromatherapy, body scrubs, hot stone
                    massage.
                  </li>
                  <li>
                    Bridal styling: Bridal makeup, hairdos, theme-based looks.
                  </li>
                  <li>
                    Creative hair design: Styling wigs, hair extensions,
                    advanced updos.
                  </li>
                  <li>Professional portfolio development.</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <h1
        style={{
          textAlign: "center",
          fontSize: "3vw",
          color: "red",
          margin: "2%",
        }}
      >
        Member ship Customers will get 15% Special Disocunt
      </h1>
      <Footer />
    </>
  );
};

export default Training;
