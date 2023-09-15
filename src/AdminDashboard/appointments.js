import "./index.css";

import { TailSpin } from "react-loader-spinner";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import moment from "moment";

import { useState, useEffect } from "react";

const Appointments = () => {
  const [myorders, setOrders] = useState([]);

  const [load, setLoad] = useState(false);
  const [showMode, setMode] = useState(false);
  const [customerData, setCustomerData] = useState([]);
  const [availableServices, setavailServices] = useState([]);
  const [appTodelete, setAppToDelete] = useState({ userId: "", orderId: "" });
  const [lo, setAppDel] = useState(true);

  useEffect(() => {
    getMyOrders();
  }, []);

  useEffect(() => {
    getCustomerData();
  }, []);

  useEffect(() => {
    getAllServices();
  }, []);

  const getAllServices = async () => {
    const url = `${process.env.REACT_APP_ROOT_URL}/api/admin/getAllServices`;

    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      /*console.log(data.allServices);*/
      setavailServices(data.allServices);
    }
  };

  const getCustomerData = async () => {
    const url = `${process.env.REACT_APP_ROOT_URL}/api/admin/getAllUsers`;
    const response = await fetch(url);
    const data = await response.json();
    if (response.ok) {
      setCustomerData(data.users);
    }
  };

  const getMyOrders = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_ROOT_URL}/api/admin/appoinments`
    );
    const data = await response.json();
    if (response.ok) {
      const filterdProducts = data.salons.filter(
        (each) => each["serviceId"] !== undefined
      );
      setOrders(filterdProducts);
      setLoad(true);
    }
  };

  const Mode = (props) => {
    const { customerData } = props;
    const [userSelected, setUserSelected] = useState("");
    const [selectedUser, setUser] = useState({ name: "Select User", id: "" });
    const [slots, setSlots] = useState([]);
    const [dateTime, setDateTime] = useState({
      date: "",
      time: "",
      serviceId: "",
    });

    const [loadB, setLoadB] = useState(false);

    const [bookingArr, setBookArr] = useState([]);
    const [aboutToBook, setAboutToBook] = useState([]);

    const getAvailableSlots = (booked) => {
      const timesAvailable = [
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
      ];

      if (booked.length === 0) {
        return timesAvailable;
      } else {
        const notBookedSlots = timesAvailable.filter(
          (each) => !booked.includes(each)
        );
        return notBookedSlots;
      }
    };

    const getTheTimeSlots = async (id, date) => {
      const url = `${process.env.REACT_APP_ROOT_URL}/api/salon/getAllBookedSlots`;

      const tobeSent = {
        salonId: "64c1e5b880e7fc21fb096a71",
        serviceId: id,
        date: date,
      };

      /*console.log(tobeSent)*/
      const detials = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tobeSent),
      };

      const response = await fetch(url, detials);
      const data = await response.json();

      if (response.ok) {
        /*console.log(data)*/
        setSlots(getAvailableSlots(data.bookedSlots));
      }
    };

    const generateDateRange = (startDate) => {
      const dates = [];
      for (let i = 0; i < 7; i++) {
        dates.push(startDate.clone().add(i, "days").format("DD-MM-YY"));
      }
      if (getCurrentTime() >= "21:00") {
        return dates.slice(1, dates.length + 1);
      } else {
        return dates;
      }
    };

    function getCurrentTime() {
      const date = new Date();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const formattedHours = hours.toString().padStart(2, "0");
      const formattedMinutes = minutes.toString().padStart(2, "0");
      const timeString = `${formattedHours}:${formattedMinutes}`;
      return timeString;
    }

    const currentDate = moment(); // Get the current date
    const dateRange = generateDateRange(currentDate);

    const filteredUsers = customerData.filter((each) => {
      return each["mobileNumber"].toString().startsWith(userSelected);
    });

    const addToBook = () => {
      if (selectedUser.id === "") {
        toast.error(`Select User`, {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "colored",
        });
      } else if (dateTime.date === "") {
        toast.error(`Select Date`, {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "colored",
        });
      } else if (dateTime.time === "") {
        toast.error(`Select Time`, {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "colored",
        });
      } else {
        toast.success(`Added`, {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "colored",
        });
        const serviceToBook = {
          userId: selectedUser.id,
          salonId: "64c1e5b880e7fc21fb096a71",
          serviceId: dateTime.serviceId,
          time: dateTime.time,
          date: dateTime.date,
        };
        setBookArr((prevArr) => [...prevArr, serviceToBook]);
        setAboutToBook((prevB) => [...prevB, dateTime.serviceId]);
      }
    };

    const bookTheServices = () => {
      const url = `${process.env.REACT_APP_ROOT_URL}/api/receptionist/bookSalonByAdmin`;

      bookingArr.map(async (each) => {
        setLoadB(true);
        const reqConfigure = {
          method: "POST",

          headers: { "Content-Type": "application/json" },

          body: JSON.stringify(each),
        };

        console.log(each);

        const res = await fetch(url, reqConfigure);

        if (res.ok) {
          toast.success(`Booked`, {
            position: "top-center",
            autoClose: 1000,
            pauseOnHover: true,
            closeOnClick: true,
            theme: "colored",
          });
          setTimeout(() => {
            setLoadB(false);
            settinMode();
            getMyOrders();
          }, 2000);
        }
      });
    };

    return (
      <>
        <ToastContainer />
        <div className="modal-boxcon"></div>
        {loadB ? (
          <div className="modal-box-appointment">
            <div className="spinner-edit">
              <TailSpin color={"#F4BD18"} height={50} width={50} />
            </div>
          </div>
        ) : (
          <div className="modal-box-appointment">
            <h1
              style={{
                marginBottom: 5,
                marginTop: 0,
                color: "#3E3E3E",
                fontSize: 20,
              }}
            >
              Add Appointment
            </h1>
            <lable htmlFor="service-name-admin">Search User By Number</lable>
            <input
              value={userSelected}
              className="phone-search-api"
              type="number"
              placeholder="Enter User Number"
              autoFocus
              style={{ marginBottom: 10, marginTop: 5 }}
              onChange={(event) => {
                setUserSelected(event.target.value);
              }}
            />
            <p className="user-name-app">Selected User : {selectedUser.name}</p>
            <p className="user-name-book">
              Selected Book Count :
              <span style={{ color: "green", fontWeight: "bold" }}>
                {aboutToBook.length}
              </span>
            </p>
            {userSelected !== "" ? (
              <div className="phone-search-a">
                {filteredUsers.map((each) => (
                  <div
                    onClick={() => {
                      setUser({ name: each.name, id: each._id });
                      setUserSelected("");
                    }}
                    style={{
                      marginTop: 15,
                      marginBottom: 15,
                      cursor: "pointer",
                    }}
                    key={each._id}
                    id={each._id}
                  >
                    <p style={{ cursor: "pointer" }}>
                      {each.name} {each.mobileNumber}
                    </p>
                  </div>
                ))}
              </div>
            ) : null}
            <h1
              style={{
                marginBottom: 5,
                marginTop: 0,
                color: "#3E3E3E",
                fontSize: 15,
                marginLeft: 5,
              }}
            >
              Our Services
            </h1>
            <div className="services-inside">
              {availableServices.map((each) => (
                <>
                  <div
                    id={each._id}
                    key={each._id}
                    className="services-appointment"
                  >
                    <img
                      className="appointment-service-img"
                      src={each.image[0]}
                      alt={each._id}
                    />
                    <div className="appointmnet-service-content">
                      <img
                        src="/yes.png"
                        style={{ marginTop: 20, height: 50, width: 50 }}
                      />
                      <p style={{ fontSize: 18, marginTop: 5, color: "green" }}>
                        Selected
                      </p>
                    </div>
                    <div
                      id={each._id}
                      className={
                        aboutToBook.includes(each._id)
                          ? "appointment-service-content3"
                          : "appointment-service-content2"
                      }
                    >
                      <p
                        style={{
                          marginTop: 5,
                          marginBottom: 10,
                          marginLeft: 5,
                          textTransform: "capitalize",
                          fontWeight: "bold",
                          display: "-webkit-box",
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          width: "90%",
                        }}
                      >
                        {each.service}
                      </p>
                      <p
                        style={{
                          marginTop: 5,
                          marginBottom: 10,
                          marginLeft: 5,
                          textTransform: "capitalize",
                          fontWeight: "bold",
                        }}
                      >
                        Price : ₹ {each.price}
                      </p>
                      <p
                        className="time-app"
                        style={{
                          marginTop: 5,
                          marginBottom: 10,
                          marginLeft: 5,
                          textTransform: "capitalize",
                          fontWeight: "bold",
                        }}
                      >
                        Time : {each.time} min
                      </p>
                      <p
                        className="p-none"
                        style={{
                          marginTop: -5,
                          marginLeft: 5,
                          textTransform: "capitalize",
                          fontWeight: "bold",
                        }}
                      >
                        Select Date
                      </p>
                      <select
                        id={each._id}
                        onChange={(e) => {
                          setDateTime({
                            date: e.target.value,
                            time: "",
                            serviceId: e.target.id,
                          });
                          getTheTimeSlots(e.target.id, e.target.value);
                        }}
                        style={{
                          marginTop: 25,
                          marginLeft: 5,
                          textTransform: "capitalize",
                        }}
                      >
                        <option>Select</option>
                        {dateRange.map((each) => (
                          <option>{each}</option>
                        ))}
                      </select>
                      {dateTime.date !== "" &&
                        dateTime.serviceId === each._id && (
                          <p
                            style={{
                              marginTop: -10,
                              marginLeft: 5,
                              textTransform: "capitalize",
                              fontWeight: "bold",
                            }}
                          >
                            Select Time
                          </p>
                        )}
                      {dateTime.date !== "" &&
                        dateTime.serviceId === each._id &&
                        (slots.length > 0 ? (
                          <select
                            style={{
                              marginTop: 25,
                              marginLeft: 5,
                              textTransform: "capitalize",
                            }}
                            onChange={(e) => {
                              setDateTime((prevDateTime) => ({
                                ...prevDateTime,
                                time: e.target.value,
                              }));
                            }}
                          >
                            <option>Select</option>
                            {slots.map((each) => (
                              <option>{each}</option>
                            ))}
                          </select>
                        ) : (
                          <div
                            style={{ marginTop: 25 }}
                            className="spin-height"
                          >
                            <TailSpin color={"red"} height={20} width={20} />
                          </div>
                        ))}
                      {dateTime.date !== "" &&
                        dateTime.serviceId === each._id && (
                          <button
                            type="button"
                            className="service-appointment-book"
                            onClick={addToBook}
                          >
                            Add to book
                          </button>
                        )}
                    </div>
                  </div>
                </>
              ))}
            </div>
            <button
              style={{
                color: "#fff",
                backgroundColor: " #ffc300",
                alignSelf: "flex-start",
                borderWidth: 0,
                fontSize: 16,
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 3,
                paddingBottom: 3,
                marginTop: 15,
                marginBottom: 10,
                borderRadius: 5,
              }}
              onClick={settinMode}
              type="button"
            >
              Close
            </button>
            <button
              className={aboutToBook.length > 0 ? "bookapp2" : "bookapp1"}
              style={{
                color: "white",
                alignSelf: "flex-end",
                borderWidth: 0,
                fontSize: 16,
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 3,
                paddingBottom: 3,
                marginTop: 15,
                marginBottom: 10,
                borderRadius: 5,
                position: "absolute",
                bottom: 15,
                right: 40,
              }}
              onClick={bookTheServices}
              type="button"
            >
              Book
            </button>
          </div>
        )}
      </>
    );
  };

  const ModalDeleteApp = () => {
    const deleteApp = async () => {
      setAppDel(false);
      console.log(appTodelete);
      const url = `${process.env.REACT_APP_ROOT_URL}/api/admin/dashboard/deleteAppoinments`;

      const ops = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appTodelete),
      };

      const res = await fetch(url, ops);
      if (res.ok) {
        toast.error("Deleted", {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "colored",
        });

        setTimeout(() => {
          setAppDel(true);
          setAppToDelete({ userId: "", orderId: "" });
          getMyOrders();
        }, 1500);
      }
    };

    return (
      <>
        <ToastContainer />
        <div className="modal-boxcon"></div>
        {lo ? (
          <div style={{ width: 250, height: 100 }} className="modal-delete">
            <p style={{ fontSize: 20 }}>Are you sure you want to delete ?</p>
            <div
              style={{
                width: 200,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignSelf: "center",
              }}
            >
              <button
                style={{
                  padding: 5,
                  backgroundColor: "#ffc720",
                  color: "#FFFFFF",
                  borderWidth: 0,
                  borderRadius: 5,
                }}
                type="button"
                onClick={() => {
                  setAppToDelete({ userId: "", orderId: "" });
                }}
              >
                Cancel
              </button>
              <button
                onClick={deleteApp}
                style={{
                  padding: 5,
                  backgroundColor: "Red",
                  color: "#FFFFFF",
                  borderWidth: 0,
                  borderRadius: 5,
                }}
                type="button"
              >
                Delete
              </button>
            </div>
          </div>
        ) : (
          <div style={{ width: 250, height: 100 }} className="modal-delete">
            <div className="spinner-edit">
              <TailSpin color={"#F4BD18"} height={50} width={50} />
            </div>
          </div>
        )}
      </>
    );
  };

  const settinMode = () => {
    setMode(!showMode);
  };

  return load ? (
    <>
      {showMode && <Mode customerData={customerData} />}
      <div className="dashboard-component2">
        <button onClick={settinMode} className="add-service" type="button">
          + Book an appoinment
        </button>
        <div className="avialable-products-head">
          <div className="product-image">
            <p className="product-heads">Image</p>
          </div>

          <div className="product-name">
            <p className="product-heads">Name</p>
          </div>
          <div className="product-toggle">
            <p className="product-heads">Price</p>
          </div>
          <div className="product-category">
            <p className="product-heads">Category</p>
          </div>
          <div className="product-toggle">
            <p className="product-heads">User Name</p>
          </div>
          <div className="product-toggle">
            <p className="product-heads">Date</p>
          </div>
          <div className="product-toggle">
            <p className="product-heads">Time</p>
          </div>
          <div className="product-action">
            <p className="product-heads">Action</p>
            <img src="./updown.png" className="updown" alt="updown" />
          </div>
        </div>
        {myorders.map((each) => (
          <div key={each._id} id={each._id} className="avialable-products">
            <div className="product-image">
              <img
                className="productimage"
                src={each.photos[0]}
                alt="productimage"
              />
            </div>

            <div className="product-name">
              <p
                style={{
                  textTransform: "capitalize",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {each.name}
              </p>
            </div>
            <div id={each._id} className="product-toggle">
              <p style={{ textTransform: "capitalize" }}>₹ {each.price}</p>
            </div>
            <div className="product-category">
              <p
                style={{
                  textTransform: "capitalize",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {each.category}
              </p>
            </div>
            <div className="product-toggle">
              <p style={{ fontWeight: 400 }} className="product-heads">
                {each.userName}
              </p>
            </div>
            <div className="product-toggle">
              <p style={{ fontWeight: 400 }} className="product-heads">
                {each.date}
              </p>
            </div>
            <div className="product-toggle">
              <p style={{ fontWeight: 400 }} className="product-heads">
                {each.time}
              </p>
            </div>

            <div className="product-action">
              <div className="actions-con">
                <button
                  onClick={() => {
                    setAppToDelete({
                      userId: each.userId,
                      orderId: each._id,
                    });
                  }}
                  type="button"
                  className="actions-button"
                >
                  <img
                    className="actions-img"
                    src="./delete-fill.png"
                    alt="delete"
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {appTodelete.userId !== "" && <ModalDeleteApp />}
    </>
  ) : (
    <div className="loader-spinner-admin">
      <TailSpin color={"#F4BD18"} height={70} width={70} />
    </div>
  );
};

export default Appointments;
