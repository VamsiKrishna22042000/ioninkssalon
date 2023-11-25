import { useState } from "react";
import "./index.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Cookies from "js-cookie";

import { InfinitySpin } from "react-loader-spinner";

const timeArray = [
  "00:10",
  "00:20",
  "00:30",
  "00:40",
  "00:50",
  "01:00",
  "01:10",
  "01:20",
  "01:30",
  "01:40",
  "01:50",
  "02:00",
  "02:10",
  "02:20",
  "02:30",
  "02:40",
  "02:50",
  "03:00",
  "03:10",
  "03:20",
  "03:30",
  "03:40",
  "03:50",
  "04:00",
  "04:10",
  "04:20",
  "04:30",
  "04:40",
  "04:50",
  "05:00",
];

const ModalBoxEdit = (props) => {
  const {
    availableServices,
    setEditModelFunc,
    serviceTobeEdited,
    getAllServices,
  } = props;

  const [loading, setLoad] = useState(true);

  const [showfaq, setfaq] = useState(false);

  const filteredService = availableServices.filter(
    (each) => each._id === serviceTobeEdited
  );

  const [demoedit, demosetData] = useState({
    salonId: Cookies.get("jwt_salonId"),
    serviceId: serviceTobeEdited,
    updatedName: filteredService[0].service,
    availableSlotCount: filteredService[0].availableSlotCount,
    price: filteredService[0].price,
    time: filteredService[0].time,
    description: filteredService[0].description,
    photos: filteredService[0].image,
    whatsIncluded: filteredService[0].whatsIncluded,
    que1: filteredService[0].faq1.que1,
    ans1: filteredService[0].faq1.ans1,
    que2: filteredService[0].faq2.que2,
    ans2: filteredService[0].faq2.ans2,
    que3: filteredService[0].faq3.que3,
    ans3: filteredService[0].faq3.ans3,
  });

  const [edit, setData] = useState({
    salonId: Cookies.get("jwt_salonId"),
    serviceId: serviceTobeEdited,
    updatedName: filteredService[0].service,
    availableSlotCount: filteredService[0].availableSlotCount,
    price: filteredService[0].price,
    time: filteredService[0].time,
    description: filteredService[0].description,
    photos: filteredService[0].image,
    whatsIncluded: filteredService[0].whatsIncluded,
    que1: filteredService[0].faq1.que1,
    ans1: filteredService[0].faq1.ans1,
    que2: filteredService[0].faq2.que2,
    ans2: filteredService[0].faq2.ans2,
    que3: filteredService[0].faq3.que3,
    ans3: filteredService[0].faq3.ans3,
  });

  const addService = (event) => {
    if (event.target.id === "service-name-admin") {
      setData((prevData) => ({ ...prevData, updatedName: event.target.value }));
    } else if (event.target.id === "service-slot-admin") {
      setData((prevData) => ({
        ...prevData,
        availableSlotCount: event.target.value,
      }));
    } else if (event.target.id === "service-category-admit") {
      setData((prevData) => ({
        ...prevData,
        categoryName: event.target.value,
      }));
    } else if (event.target.id === "service-price-admin") {
      setData((prevData) => ({ ...prevData, price: event.target.value }));
    } else if (event.target.id === "service-time-admin") {
      setData((prevData) => ({ ...prevData, time: event.target.value }));
    } else if (event.target.id === "service-description-admin") {
      setData((prevData) => ({
        ...prevData,
        description: event.target.value,
      }));
    } else if (event.target.id === "file") {
      setData((prevData) => ({ ...prevData, photos: event.target.files[0] }));
    } else if (event.target.id === "service-description-what") {
      setData((prevData) => ({
        ...prevData,
        whatsIncluded: event.target.value,
      }));
    } else if (event.target.id === "service-description-q1") {
      setData((prevData) => ({ ...prevData, que1: event.target.value }));
    } else if (event.target.id === "service-description-q2") {
      setData((prevData) => ({ ...prevData, que2: event.target.value }));
    } else if (event.target.id === "service-description-q3") {
      setData((prevData) => ({ ...prevData, que3: event.target.value }));
    } else if (event.target.id === "service-description-ans1") {
      setData((prevData) => ({ ...prevData, ans1: event.target.value }));
    } else if (event.target.id === "service-description-ans2") {
      setData((prevData) => ({ ...prevData, ans2: event.target.value }));
    } else if (event.target.id === "service-description-ans3") {
      setData((prevData) => ({ ...prevData, ans3: event.target.value }));
    }
  };

  const updatingServices = () => {
    const sendEditedData = async () => {
      const url = `${process.env.REACT_APP_ROOT_URL}/api/salon/editService`;

      const reqConfigure = {
        method: "PUT",
        body: fd,
      };

      const response = await fetch(url, reqConfigure);

      if (response.ok) {
        toast.success("Successfully Edited", {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "colored",
        });
        setLoad(true);
        setEditModelFunc();
        getAllServices();
      }
    };

    const fd = new FormData();

    if (edit.updatedName !== demoedit.updatedName) {
      fd.append("updatedName", edit.updatedName);
    }
    if (edit.availableSlotCount !== demoedit.availableSlotCount) {
      fd.append("availableSlotCount", edit.availableSlotCount);
    }
    if (edit.price !== demoedit.price) {
      fd.append("price", edit.price);
    }
    if (edit.time !== demoedit.time) {
      fd.append("time", edit.time);
    }
    if (edit.description !== demoedit.description) {
      fd.append("description", edit.description);
    }
    if (edit.photos !== demoedit.photos) {
      fd.append("photos", edit.photos);
    }
    if (edit.whatsIncluded !== demoedit.whatsIncluded) {
      fd.append("whatsIncluded", edit.whatsIncluded);
    }
    if (edit.que1 !== demoedit.que1) {
      fd.append("que1", edit.que1);
    }
    if (edit.ans1 !== demoedit.ans1) {
      fd.append("ans1", edit.ans1);
    }
    if (edit.que2 !== demoedit.que2) {
      fd.append("que2", edit.que2);
    }
    if (edit.ans2 !== demoedit.ans2) {
      fd.append("ans2", edit.ans2);
    }
    if (edit.que3 !== demoedit.que3) {
      fd.append("que3", edit.que3);
    }
    if (edit.ans3 !== demoedit.ans3) {
      fd.append("ans3", edit.ans3);
    }

    const editedData = Object.fromEntries(fd.entries());
    let count = 0;

    for (var len in editedData) {
      count = count + 1;
    }

    if (count > 0) {
      setLoad(false);
      fd.append("salonId", "6515a80d54e9fd108dcc4254");
      fd.append("serviceId", `${serviceTobeEdited}`);
      sendEditedData();
      console.log(Object.fromEntries(fd.entries()));
    } else {
      toast.error("No changes made", {
        position: "top-center",
        autoClose: 2000,
        pauseOnHover: true,
        closeOnClick: true,
        theme: "colored",
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="modal-boxcon"></div>
      {loading ? (
        <form className="modal-box-service-con-faq">
          {!showfaq ? (
            <>
              <>
                <h1
                  style={{ marginBottom: 10, color: "#3E3E3E", fontSize: 20 }}
                >
                  Edit Service
                </h1>
                <lable htmlFor="service-name-admin">Service Title</lable>
                <input
                  style={{ textTransform: "capitalize" }}
                  className="service-admin-input"
                  id="service-name-admin"
                  type="text"
                  value={edit.updatedName}
                  onChange={addService}
                />
                <lable htmlFor="service-name-admin">Available Slot count</lable>
                <input
                  value={edit.availableSlotCount}
                  className="service-admin-input"
                  id="service-slot-admin"
                  type="number"
                  onChange={addService}
                />
                <lable htmlFor="service-price-admin">Service Price</lable>
                <input
                  value={edit.price}
                  className="service-admin-input"
                  id="service-price-admin"
                  type="text"
                  onChange={addService}
                />
                <lable htmlFor="service-time-admin">Service Time</lable>
                <select
                  value={edit.time}
                  className="service-admin-input"
                  id="service-time-admin"
                  type="text"
                  onChange={addService}
                >
                  {timeArray.map((each) => (
                    <option>{each}</option>
                  ))}
                </select>
                <lable htmlFor="service-description-admin">
                  Describe about service
                </lable>
                <textarea
                  style={{ textTransform: "capitalize" }}
                  value={edit.description}
                  className="service-admin-text-area"
                  id="service-description-admin"
                  type="text"
                  onChange={addService}
                />
                <label
                  style={{ marginTop: 10, marginBottom: 10 }}
                  htmlFor="service-image-admin"
                >
                  Upload Image for service
                </label>
                <input onChange={addService} id="file" type="file" />
              </>
              <div className="service-button-admin-con">
                <button
                  onClick={updatingServices}
                  className="service-button-admin"
                  type="button"
                >
                  Edit
                </button>
                <button
                  className="service-button-admin"
                  onClick={setEditModelFunc}
                  type="button"
                >
                  Close
                </button>

                <button
                  style={{
                    bottom: "25%",
                    borderRadius: ".3rem",
                    width: "5rem",
                    cursor: "pointer",
                  }}
                  className="service-button-admin-faq"
                  onClick={() => {
                    setfaq(!showfaq);
                  }}
                  type="button"
                >
                  AddFAQ
                </button>
              </div>
            </>
          ) : (
            <div className="modal-box-service-con-faq">
              <div
                style={{
                  paddingTop: 300,
                  width: "100%",
                }}
              >
                <h1
                  style={{
                    marginTop: 100,
                    marginBottom: 10,
                    color: "#3E3E3E",
                    fontSize: 20,
                  }}
                >
                  What's Included
                </h1>
                <textarea
                  className="service-admin-text-area1"
                  onChange={addService}
                  id="service-description-what"
                  type="text"
                  value={edit.whatsIncluded}
                />

                <h1
                  style={{ marginBottom: 10, color: "#3E3E3E", fontSize: 20 }}
                >
                  Add FAQ's
                </h1>
                <lable
                  style={{ display: "block", width: "100%" }}
                  htmlFor="service-description-q1"
                >
                  Question 1
                </lable>
                <input
                  className="service-admin-input1"
                  onChange={addService}
                  id="service-description-q1"
                  type="text"
                  value={edit.que1}
                />
                <lable
                  style={{ display: "block", width: "100%" }}
                  htmlFor="service-description-ans1"
                >
                  Answer 1
                </lable>
                <textarea
                  className="service-admin-text-area1"
                  onChange={addService}
                  id="service-description-ans1"
                  type="text"
                  value={edit.ans1}
                />
                <lable
                  style={{ display: "block", width: "100%" }}
                  htmlFor="service-description-q2"
                >
                  Question 2
                </lable>
                <input
                  className="service-admin-input1"
                  onChange={addService}
                  id="service-description-q2"
                  type="text"
                  value={edit.que2}
                />
                <lable
                  style={{ display: "block", width: "100%" }}
                  htmlFor="service-description-ans2"
                >
                  Answer 2
                </lable>
                <textarea
                  className="service-admin-text-area1"
                  onChange={addService}
                  id="service-description-ans2"
                  type="text"
                  value={edit.ans2}
                />
                <lable
                  style={{ display: "block", width: "100%" }}
                  htmlFor="service-description-q3"
                >
                  Question 3
                </lable>
                <input
                  className="service-admin-input1"
                  onChange={addService}
                  id="service-description-q3"
                  type="text"
                  value={edit.que3}
                />
                <lable
                  style={{ display: "block", width: "100%" }}
                  htmlFor="service-description-ans3"
                >
                  Answer 3
                </lable>
                <textarea
                  className="service-admin-text-area1"
                  onChange={addService}
                  id="service-description-ans3"
                  type="text"
                  value={edit.ans3}
                />
              </div>
              <div className="service-button-admin-con">
                <button
                  style={{ paddingTop: "2%", paddingBottom: "2%" }}
                  onClick={updatingServices}
                  className="service-button-admin"
                  type="button"
                >
                  Edit
                </button>
                <button
                  style={{ paddingTop: "2%", paddingBottom: "2%" }}
                  className="service-button-admin"
                  onClick={setEditModelFunc}
                  type="button"
                >
                  Close
                </button>

                <button
                  style={{
                    bottom: "-50%",
                    borderRadius: ".3rem",
                    width: "5rem",
                    cursor: "pointer",
                  }}
                  className="service-button-admin-faq"
                  onClick={() => {
                    setfaq(!showfaq);
                  }}
                  type="button"
                >
                  Back
                </button>
              </div>
            </div>
          )}
        </form>
      ) : (
        <div className="modal-box">
          <div className="spinner-edit">
            <InfinitySpin color={"#4444D5"} height={150} width={150} />
          </div>
        </div>
      )}
    </>
  );
};

export default ModalBoxEdit;
