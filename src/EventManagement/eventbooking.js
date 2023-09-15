import { useState } from "react";
import "./index.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { TailSpin } from "react-loader-spinner";

import { withRouter } from "react-router-dom/cjs/react-router-dom.min";

import Cookies from "js-cookie";

const categories = [
  { name: "birthday celebration" },
  { name: "cocktail party" },
  { name: "marriage events" },
  { name: "farewell party" },
  { name: "anniversary celebrations" },
];

const EventBooking = (props) => {
  const { pageStage, settingPage, eventId } = props;

  const [button, setButton] = useState(false);

  const [book, setBook] = useState({
    name: "",
    eventId,
    eventname: "",
    category: pageStage,
    date: "",
    guest: "",
    state: "",
    country: "",
  });

  const gobackTo = () => {
    settingPage("Home");
  };

  const settingvalues = (event) => {
    const value = event.target.value;
    const id = event.target.id;
    if (id === "name") {
      setBook((prevbook) => ({ ...prevbook, name: value }));
    } else if (id === "eventname") {
      setBook((prevbook) => ({ ...prevbook, eventname: value }));
    } else if (id === "category") {
      setBook((prevbook) => ({ ...prevbook, category: value }));
    } else if (id === "date") {
      setBook((prevbook) => ({ ...prevbook, date: value }));
    } else if (id === "guest") {
      setBook((prevbook) => ({ ...prevbook, guest: value }));
    } else if (id === "state") {
      setBook((prevbook) => ({ ...prevbook, state: value }));
    } else if (id === "country") {
      setBook((prevbook) => ({ ...prevbook, country: value }));
    }
  };

  const booking = async (event) => {
    event.preventDefault();
    if (
      Cookies.get("jwt_user") === undefined &&
      Cookies.get("jwt_token") === undefined
    ) {
      window.location.href = "/login";
    } else {
      if (book.name === "") {
        toast.info("Please Enter Name", {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "colored",
        });
      } else if (book.eventname === "") {
        toast.info("Please Enter Event Name", {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "colored",
        });
      } else if (book.category === "") {
        toast.info("Please Enter Category", {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "colored",
        });
      } else if (book.date === "") {
        toast.info("Please Enter Date", {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "colored",
        });
      } else if (book.guest === "") {
        toast.info("Enter No of Guest", {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "colored",
        });
      } else if (book.state === "") {
        toast.info("Please Enter State", {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "colored",
        });
      } else if (book.country === "") {
        toast.info("Please Enter Country", {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "colored",
        });
      } else {
        setButton(true);
        document.getElementById("name").value = "";
        document.getElementById("eventname").value = "";
        document.getElementById("category").value = "";
        document.getElementById("date").value = "";
        document.getElementById("guest").value = "";
        document.getElementById("state").value = "";
        document.getElementById("country").value = "";

        const url = `${process.env.REACT_APP_ROOT_URL}/api/user/bookEvent`;
        const details = {
          userId: Cookies.get("jwt_user"),
          eventId: book.eventId,
          yourName: book.name,
          eventName: book.eventname,
          categories: book.category,
          date: book.date,
          NumberOfGuest: book.guest,
          state: book.state,
          country: book.country,
        };
        console.log(details);
        const options = {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(details),
        };

        const response = await fetch(url, options);

        if (response.ok) {
          const { history } = props;
          history.push("/successEvent");
        }
      }
    }
  };

  const deleteCookie = () => {
    /* deleteCookie was integrated with both searchIcons*/
    Cookies.remove("jwt_token");
    Cookies.remove("jwt_user");
  };

  const goToSelectCategory = () => {
    const { history } = props;
    history.push("/");
  };

  return (
    <>
      <div className="sukras-header-fashionzone">
        <ToastContainer />
        <img
          style={{
            position: "absolute",
            marginLeft: "1.5%",
            zIndex: 5,
          }}
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
          <img className="leftevent-arrow-mobile" src="./backarrow.png" />
        </button>
      </div>
      <form className="booking-con">
        <h1 className="booking-head">Create Event</h1>
        <div className="items-con-booking">
          <lable style={{ marginBottom: 5, marginTop: 5 }} htmlFor="name">
            Name
          </lable>
          <input
            onChange={settingvalues}
            className="booking-input"
            id="name"
            type="text"
            placeholder="Enter your name"
          />
        </div>
        <div className="items-con-booking">
          <lable style={{ marginBottom: 5, marginTop: 5 }} htmlFor="event-name">
            Event Name
          </lable>
          <input
            onChange={settingvalues}
            className="booking-input"
            id="eventname"
            type="text"
            placeholder="Enter your event name"
          />
        </div>
        <div className="items-con-booking">
          <lable style={{ marginBottom: 5, marginTop: 5 }} htmlFor="category">
            Categories
          </lable>
          <select
            onChange={settingvalues}
            className="booking-input-select"
            id="category"
            style={{ textTransform: "capitalize" }}
            placeholder="Select Category"
          >
            {categories.map((each) => (
              <option selected={pageStage === each.name ? true : false}>
                {each.name}
              </option>
            ))}
          </select>
        </div>
        <div className="items-con-booking">
          <lable style={{ marginBottom: 5, marginTop: 5 }} htmlFor="date">
            Date
          </lable>
          <input
            onChange={settingvalues}
            className="booking-input-date"
            id="date"
            placeholder="Select Date"
            type="date"
          />
        </div>
        <div className="items-con-booking">
          <lable style={{ marginBottom: 5, marginTop: 5 }} htmlFor="guest">
            Number of Guest
          </lable>
          <input
            onChange={settingvalues}
            className="booking-input"
            id="guest"
            type="text"
            placeholder="Number of Guest"
          />
        </div>
        <div className="items-con-booking">
          <lable style={{ marginBottom: 5, marginTop: 5 }} htmlFor="state">
            State
          </lable>
          <input
            onChange={settingvalues}
            className="booking-input"
            id="state"
            type="text"
            placeholder="State Name"
          />
        </div>
        <div className="items-con-booking">
          <lable style={{ marginBottom: 5, marginTop: 5 }} htmlFor="country">
            Country
          </lable>
          <input
            onChange={settingvalues}
            className="booking-input"
            id="country"
            type="text"
            placeholder="Country Name"
          />
        </div>
      </form>
      {button ? (
        <div className="button-container-booking">
          <div className="proceed-btn" type="submit">
            <TailSpin
              wrapperStyle={{ alignSelf: "center", justifyContent: "center" }}
              color={"white"}
              height={30}
              width={25}
            />
          </div>
        </div>
      ) : (
        <div className="button-container-booking">
          <button onClick={booking} className="proceed-btn" type="submit">
            Proceed
          </button>
        </div>
      )}
    </>
  );
};
export default withRouter(EventBooking);
