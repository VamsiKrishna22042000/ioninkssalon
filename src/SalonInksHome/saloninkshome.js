import "./saloninkshome.css";

import Wave from "react-wavify";

import NavBar from "./navbar";

import Cookies from "js-cookie";

import ComprehensiveData from "./comprehensiveData";

import { HiOutlineMail } from "react-icons/hi";

import React, { useReducer, useState } from "react";

import SimpleSlider from "./salonslider";
import TestimonialSlider from "./testimonial-slider";

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

const Plans = [
  {
    plan: "Monthly",
    plantype: "BASIC PLAN",
    price: "FreeTrial",
    about:
      "The ideal plan for someone who wants to find all the best features for free.",
    facilitesIncluded: [
      {
        img_url: "/facilitesIncluded.png",
        facility: "Access basic dashboard and reporting",
      },
      {
        img_url: "/facilitesIncluded.png",
        facility: "Misscall Booking option",
      },
      {
        img_url: "/facilitesIncluded.png",
        facility: "Accept payments online, mobile, or in-store",
      },
      {
        img_url: "/facilitesNotIncluded.png",
        facility: "Not included in the plan",
      },
      {
        img_url: "/facilitesNotIncluded.png",
        facility: "Not included in the plan",
      },
      {
        img_url: "/facilitesNotIncluded.png",
        facility: "Not included in the plan",
      },
      {
        img_url: "/facilitesNotIncluded.png",
        facility: "Not included in the plan",
      },
    ],
  },
  {
    plan: "Monthly",
    plantype: "PRO PLAN",
    price: "₹ 1,599/month",
    about:
      "The ideal plan for someone who wants to find all the best features for free.",
    facilitesIncluded: [
      {
        img_url: "/facilitesIncluded.png",
        facility: "Access basic dashboard and reporting",
      },
      {
        img_url: "/facilitesIncluded.png",
        facility: "Misscall Booking option",
      },
      {
        img_url: "/facilitesIncluded.png",
        facility: "Accept payments online, mobile, or in-store",
      },
      {
        img_url: "/facilitesNotIncluded.png",
        facility: "Not included in the plan",
      },
      {
        img_url: "/facilitesNotIncluded.png",
        facility: "Not included in the plan",
      },
      {
        img_url: "/facilitesNotIncluded.png",
        facility: "Not included in the plan",
      },
      {
        img_url: "/facilitesNotIncluded.png",
        facility: "Not included in the plan",
      },
    ],
  },
  {
    plan: "Monthly",
    plantype: "PREMIUM PLAN",
    price: "₹ 2,999/month",
    about:
      "The ideal plan for someone who wants to find all the best features for free.",
    facilitesIncluded: [
      {
        img_url: "/facilitesIncluded.png",
        facility: "Access basic dashboard and reporting",
      },
      {
        img_url: "/facilitesIncluded.png",
        facility: "Misscall Booking option",
      },
      {
        img_url: "/facilitesIncluded.png",
        facility: "Accept payments online, mobile, or in-store",
      },
      {
        img_url: "/facilitesNotIncluded.png",
        facility: "Not included in the plan",
      },
      {
        img_url: "/facilitesNotIncluded.png",
        facility: "Not included in the plan",
      },
      {
        img_url: "/facilitesNotIncluded.png",
        facility: "Not included in the plan",
      },
      {
        img_url: "/facilitesNotIncluded.png",
        facility: "Not included in the plan",
      },
    ],
  },
  {
    plan: "Yearly",
    plantype: "BASIC PLAN",
    price: "FreeTrial",
    about:
      "The ideal plan for someone who wants to find all the best features for free.",
    facilitesIncluded: [
      {
        img_url: "/facilitesIncluded.png",
        facility: "Access basic dashboard and reporting",
      },
      {
        img_url: "/facilitesIncluded.png",
        facility: "Misscall Booking option",
      },
      {
        img_url: "/facilitesIncluded.png",
        facility: "Accept payments online, mobile, or in-store",
      },
      {
        img_url: "/facilitesNotIncluded.png",
        facility: "Not included in the plan",
      },
      {
        img_url: "/facilitesNotIncluded.png",
        facility: "Not included in the plan",
      },
      {
        img_url: "/facilitesNotIncluded.png",
        facility: "Not included in the plan",
      },
      {
        img_url: "/facilitesNotIncluded.png",
        facility: "Not included in the plan",
      },
    ],
  },
  {
    plan: "Yearly",
    plantype: "PRO PLAN",
    price: "₹ 19,000/year",
    about:
      "The ideal plan for someone who wants to find all the best features for free.",
    facilitesIncluded: [
      {
        img_url: "/facilitesIncluded.png",
        facility: "Access basic dashboard and reporting",
      },
      {
        img_url: "/facilitesIncluded.png",
        facility: "Misscall Booking option",
      },
      {
        img_url: "/facilitesIncluded.png",
        facility: "Accept payments online, mobile, or in-store",
      },
      {
        img_url: "/facilitesNotIncluded.png",
        facility: "Not included in the plan",
      },
      {
        img_url: "/facilitesNotIncluded.png",
        facility: "Not included in the plan",
      },
      {
        img_url: "/facilitesNotIncluded.png",
        facility: "Not included in the plan",
      },
      {
        img_url: "/facilitesNotIncluded.png",
        facility: "Not included in the plan",
      },
    ],
  },
  {
    plan: "Yearly",
    plantype: "PREMIUM PLAN",
    price: "₹ 35,900/year",
    about:
      "The ideal plan for someone who wants to find all the best features for free.",
    facilitesIncluded: [
      {
        img_url: "/facilitesIncluded.png",
        facility: "Access basic dashboard and reporting",
      },
      {
        img_url: "/facilitesIncluded.png",
        facility: "Misscall Booking option",
      },
      {
        img_url: "/facilitesIncluded.png",
        facility: "Accept payments online, mobile, or in-store",
      },
      {
        img_url: "/facilitesNotIncluded.png",
        facility: "Not included in the plan",
      },
      {
        img_url: "/facilitesNotIncluded.png",
        facility: "Not included in the plan",
      },
      {
        img_url: "/facilitesNotIncluded.png",
        facility: "Not included in the plan",
      },
      {
        img_url: "/facilitesNotIncluded.png",
        facility: "Not included in the plan",
      },
    ],
  },
];

const footerData = [
  ["About", ["About", "Blog", "Careers", "Jobs", "InPress"]],
  [
    "Support",
    ["Contact us", "Online Chat", "Whatsapp", "Telegram", "Ticketing"],
  ],
  ["FAQ", ["Account", "Manage Deliveries", "Orders", "Payments", "Returns"]],
  ["About", ["About", "Blog", "Careers", "Jobs", "InPress"]],
  [
    "Support",
    ["Contact us", "Online Chat", "Whatsapp", "Telegram", "Ticketing"],
  ],
  ["FAQ", ["Account", "Manage Deliveries", "Orders", "Payments", "Returns"]],
];

const SalonInksHome = (props) => {
  const loggedInOrNOt = Cookies.get("jwt_admin");

  const [selectedPricing, setSelectedPricing] = useState("Monthly");

  const inititalState = {
    q1: false,
    q2: false,
    q3: false,
    q4: false,
    q5: false,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "q1":
        return { ...state, q1: !state.q1 };
        break;
      case "q2":
        return { ...state, q2: !state.q2 };
        break;
      case "q3":
        return { ...state, q3: !state.q3 };
        break;
      case "q4":
        return { ...state, q4: !state.q4 };
        break;
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, inititalState);

  let contactPage = {
    firstName: "",
    lastName: "",
    companyName: "",
    emailAddress: "",
    city: "",
    State: "",
    description: "",
  };

  const reducerfunc = (state, action) => {
    switch (action.type) {
      case "firstName":
        return { ...state, firstName: action.payload };
        break;
      case "lastName":
        return { ...state, lastName: action.payload };
        break;
      case "companyName":
        return { ...state, companyName: action.payload };
        break;
      case "emailAddress":
        return { ...state, emailAddress: action.payload };
        break;
      case "city":
        return { ...state, city: action.payload };
        break;
      case "State":
        return { ...state, State: action.payload };
        break;
      case "description":
        return { ...state, description: action.payload };
        break;

      default:
        return contactPage;
    }
  };

  const [state2, dispatch2] = useReducer(reducerfunc, contactPage);

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
      <div style={{ position: "relative" }} className="testimonials">
        <Wave
          className="wave-5"
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
        <div className="test-div1">
          <h4>What people Say</h4>
          <p className="testimonials-para1">
            Read some awesome feedback from our Customers all over the India. we
            are giving the best to our Clients.
          </p>
        </div>
        <div className="test-div2">
          <div>
            <h4 style={{ fontSize: "7rem", margin: 0 }}>&#8220;</h4>
            <p className="testimonials-para2">
              what they say about SalonInks Booking Services
            </p>
          </div>
          <div className="carousel">
            <TestimonialSlider />
          </div>
        </div>
      </div>
      <div className="Faq-section">
        <h1>Sign up and get started.</h1>
        <button type="button">Get Started for free</button>
        <div className="Faq-subsection">
          <h1>Frequent ask qustions</h1>
          <p>
            Find answers to their most common questions about SalonInks quickly
            and easily.
          </p>
          <div className="faq-s">
            <h5>What is SalonInks and how does it work ?</h5>
            <p
              onClick={() => dispatch({ type: "q1" })}
              className={state.q1 ? "faq-s-up" : "faq-s-down"}
            >
              ❮
            </p>
          </div>
          <div className={state.q1 ? "ans" : "ans-done "}>
            SalonInks is a SaaS platform that helps you accept, process, and
            manage laundry orders from your customers across various channels,
            such as online, mobile, or in-store. You can sign up for SalonInks
            and choose a pricing plan that suits your business needs and budget.
            You can then integrate.
          </div>

          <div className="faq-s">
            <h5>What Pickup & Delivery methods does Saloninks support?</h5>
            <p
              onClick={() => dispatch({ type: "q2" })}
              className={state.q2 ? "faq-s-up" : "faq-s-down"}
            >
              ❮
            </p>
          </div>
          <div className={state.q2 ? "ans" : "ans-done "}>
            Saloninks offers you a number of benefits for your Laundry solution,
            such as:
            <ul>
              <li>
                A simple and transparent pricing model with no hidden fees or
                contracts
              </li>
              <li>
                A flexible and customizable laundry solution that can adapt to
                any business model or industry
              </li>

              <li>
                A comprehensive and intuitive dashboard that provides real-time
                insights and analytics on your laundry performance
              </li>
            </ul>
          </div>
          <div className="faq-s">
            <h5>How secure is Saloninks?</h5>
            <p
              onClick={() => dispatch({ type: "q3" })}
              className={state.q3 ? "faq-s-up" : "faq-s-down"}
            >
              ❮
            </p>
          </div>
          <div className={state.q3 ? "ans" : "ans-done "}>
            SalonInks is a SaaS platform that helps you accept, process, and
            manage laundry orders from your customers across various channels,
            such as online, mobile, or in-store. You can sign up for SalonInks
            and choose a pricing plan that suits your business needs and budget.
            You can then integrate.
          </div>
          <div className="faq-s">
            <h5>How can I get started with Saloninks?</h5>
            <p
              onClick={() => dispatch({ type: "q4" })}
              className={state.q4 ? "faq-s-up" : "faq-s-down"}
            >
              ❮
            </p>
          </div>
          <div className={state.q4 ? "ans" : "ans-done "}>
            SalonInks is a SaaS platform that helps you accept, process, and
            manage laundry orders from your customers across various channels,
            such as online, mobile, or in-store. You can sign up for SalonInks
            and choose a pricing plan that suits your business needs and budget.
            You can then integrate.
          </div>
        </div>
      </div>
      <div className="pricing-page">
        <div className="pricings">
          <h1>The Right Plan for Your Business</h1>
          <p>
            We have several powerful plans to showcase your business. Take a
            look at our prices, we’re the best in the business!
          </p>
          <div className="button-change">
            <button
              value={selectedPricing}
              onClick={() => {
                selectedPricing === "Yearly" && setSelectedPricing("Monthly");
              }}
              className={selectedPricing === "Monthly" && "set-to-black"}
              type="button"
            >
              Monthly
            </button>
            <button
              value={selectedPricing}
              onClick={() => {
                selectedPricing === "Monthly" && setSelectedPricing("Yearly");
              }}
              className={selectedPricing === "Yearly" && "set-to-black"}
              type="button"
            >
              Yearly
            </button>
          </div>
          <button className="pricing-button" type="button">
            Recommended
          </button>
          <div className="Plans">
            {Plans.map(
              (each) =>
                selectedPricing === each.plan && (
                  <div className="each-plan-box">
                    <h6>{each.plantype}</h6>
                    <h3>{each.price}</h3>
                    <p>{each.about}</p>
                    <hr />
                    {each.facilitesIncluded.map((e) => (
                      <div className="facilities-box">
                        <img src={e.img_url} />
                        <p>{e.facility}</p>
                      </div>
                    ))}
                    <hr />
                    <button type="button">Choose Plan</button>
                  </div>
                )
            )}
          </div>
        </div>
      </div>
      <div className="contact-page">
        <div className="contact-page-first-child">
          <h2>Connect with our Sales associates</h2>
          <p>
            Find out how SalonInks can help you streamline your payment
            processing
          </p>
          <img src="/mission-statement.png" alt="contact-image" />
        </div>
        <form className="contact-page-second-child">
          <input
            className="text-box-contact"
            value={state2.firstName}
            onChange={(e) =>
              dispatch2({ type: "firstName", payload: e.target.value })
            }
            type="text"
            placeholder="First Name"
          />
          <input
            className="text-box-contact"
            onChange={(e) =>
              dispatch2({ type: "lastName", payload: e.target.value })
            }
            value={state2.lastName}
            type="text"
            placeholder="Last Name"
          />
          <input
            className="text-box-contact"
            onChange={(e) =>
              dispatch2({ type: "companyName", payload: e.target.value })
            }
            value={state2.companyName}
            type="text"
            placeholder="Company Name"
          />
          <input
            className="text-box-contact"
            onChange={(e) =>
              dispatch2({ type: "emailAddress", payload: e.target.value })
            }
            value={state2.emailAddress}
            type="email"
            placeholder="Email Address"
          />
          <input
            className="text-box-contact"
            onChange={(e) =>
              dispatch2({ type: "city", payload: e.target.value })
            }
            value={state2.city}
            type="text"
            placeholder="City"
          />
          <input
            className="text-box-contact"
            onChange={(e) =>
              dispatch2({ type: "State", payload: e.target.value })
            }
            value={state2.State}
            type="text"
            placeholder="State"
          />
          <textarea
            onChange={(e) =>
              dispatch2({ type: "description", payload: e.target.value })
            }
            value={state2.description}
            rows={5}
            cols={5}
            placeholder="Description"
          ></textarea>
          <button type="button">Submit</button>
          <div className="check-box">
            <input type="checkbox" />
            <p>
              I agree that Saloninks may contact me via my email address or
              phone number.
            </p>
          </div>
          <p>
            By completing this form, I have read and acknowledged the
            <span>Privacy Statement</span> and agree that SalonInks may contact
            me via my email address or phone number.
          </p>
        </form>
      </div>
      <div className="footer-sections">
        <img src="./saloninkslogo2.png" alt="logo" />
        <p>The smart choice for your Salon Business.</p>
        <div className="footer-sub-section">
          <div>
            <h5>Newsletter</h5>
            <p>Be the first one to know about discounts, offers and events</p>
          </div>
          <div className="child2">
            <HiOutlineMail className="mail-icon" />
            <input
              className="text-box-contact"
              type="email"
              placeholder="Enter Your Email"
            />
            <button type="button">Submit</button>
          </div>
        </div>
        <div className="last-sections">
          {footerData.map((each) => (
            <div>
              <h5>{each[0]}</h5>
              {each[1].map((e) => (
                <p>{e}</p>
              ))}
            </div>
          ))}
        </div>
        <hr />
        <div className="copy-right">
          <div className="first-copy">
            <p>About us</p>
            <p>Contact</p>
            <p>Privacy policy</p>
            <p>Sitemap</p>
            <p>Terms of Use</p>
          </div>
          <div className="second-copy">
            <p>&copy; 2023-2024, All Rights Reserved</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalonInksHome;
