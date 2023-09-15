import "./index.js";

import { TailSpin } from "react-loader-spinner";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useState, useEffect } from "react";

const Events = () => {
  const [eventServices, setEventServices] = useState([]);
  const [showDelete, setDeleteCustomer] = useState("");
  const [load, setLoad] = useState(false);
  const [showModal, setModal] = useState(false);

  useEffect(() => {
    getAllEventsServices();
  }, []);

  const getAllEventsServices = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_ROOT_URL}/api/admin/getAllEventServices`
    );
    const data = await response.json();
    if (response.ok) {
      setEventServices(data.events);
      setLoad(true);
    }
  };

  const settingModal = () => {
    setModal(!showModal);
  };

  const Modal = () => {
    const [dataTobeSent, setData] = useState({ name: "", image: "" });
    const [eventLoad, setEventLoad] = useState(true);

    const addingEvent = (event) => {
      if (event.target.id === "service-name-admin") {
        setData((prevData) => ({ ...prevData, name: event.target.value }));
      } else if (event.target.id === "file") {
        setData((prevData) => ({ ...prevData, image: event.target.files[0] }));
      }
    };

    const updatingEvent = async () => {
      if (dataTobeSent.name === "") {
        toast.error("Please Enter Event Name", {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "colored",
        });
      } else if (dataTobeSent.image === "") {
        toast.error("Please upload Image", {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "colored",
        });
      } else {
        setEventLoad(false);
        const fd = new FormData();

        for (var key in dataTobeSent) {
          fd.append(`${key}`, dataTobeSent[key]);
        }

        try {
          const reqConfigure = {
            method: "POST",
            body: fd,
          };

          const res = await fetch(
            `${process.env.REACT_APP_ROOT_URL}/api/admin/addEventServices`,
            reqConfigure
          );

          if (res.ok) {
            toast.success("Added", {
              position: "top-center",
              autoClose: 2000,
              pauseOnHover: true,
              closeOnClick: true,
              theme: "colored",
            });
            setTimeout(() => {
              setEventLoad(true);
              settingModal();
              getAllEventsServices();
            }, 2000);
          }
        } catch (err) {
          console.log(err);
        }
      }
    };

    return eventLoad ? (
      <>
        <ToastContainer />
        <div className="modal-boxcon"></div>
        <form className="modal-box3">
          <h1 style={{ marginBottom: 10, color: "#3E3E3E", fontSize: 20 }}>
            Add New Event
          </h1>
          <lable htmlFor="service-name-admin">Event Title</lable>
          <input
            className="service-admin-input"
            id="service-name-admin"
            type="text"
            style={{ height: 25, marginBottom: 10 }}
            onChange={addingEvent}
          />
          <label htmlFor="service-image-admin">Upload Image for service</label>
          <input id="file" onChange={addingEvent} type="file" />
          <div className="service-button-admin-con-event">
            <button
              className="service-button-admin"
              onClick={updatingEvent}
              type="button"
            >
              Add
            </button>
            <button
              className="service-button-admin"
              onClick={settingModal}
              type="button"
            >
              close
            </button>
          </div>
        </form>
      </>
    ) : (
      <>
        <ToastContainer />
        <div className="modal-boxcon"></div>
        <div className="modal-box3">
          <div className="spinner-edit">
            <TailSpin color={"#F4BD18"} height={50} width={50} />
          </div>
        </div>
      </>
    );
  };

  const Deletemodal = () => {
    const [loadingDelete, setLoadingDelete] = useState(false);

    const deletingCust = async () => {
      setLoadingDelete(true);
      const url = `${process.env.REACT_APP_ROOT_URL}/api/admin/event/deleteEventByAdmin/${showDelete}`;

      const options = {
        method: "DELETE",
      };

      const response = await fetch(url, options);
      if (response.ok) {
        toast.error("Deleted", {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "colored",
        });
        setTimeout(() => {
          setLoadingDelete(false);
          setDeleteCustomer("");
          getAllEventsServices();
        }, 2000);
      } else {
        setLoadingDelete(false);
      }
    };

    return (
      <>
        <ToastContainer />
        <div className="modal-boxcon"></div>
        {loadingDelete ? (
          <div style={{ width: 250, height: 100 }} className="modal-delete">
            <div className="spinner-edit">
              <TailSpin color={"#F4BD18"} height={50} width={50} />
            </div>
          </div>
        ) : (
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
                  setDeleteCustomer("");
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deletingCust();
                }}
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
        )}
      </>
    );
  };

  return load ? (
    <>
      {showModal && <Modal />}
      <div className="dashboard-component2">
        <button onClick={settingModal} className="add-service" type="button">
          + Add new Event
        </button>
        <div className="avialable-products-head">
          <div className="product-image">
            <p className="product-heads">Image</p>
          </div>

          <div className="product-name">
            <p className="product-heads">Name</p>
          </div>
          <div className="product-id">
            <p className="product-heads">Id</p>
            <img src="./updown.png" className="updown" alt="updown" />
          </div>
          <div className="product-action">
            <p className="product-heads">Action</p>
            <img src="./updown.png" className="updown" alt="updown" />
          </div>
        </div>
        {eventServices.map((each) => (
          <div key={each._id} id={each._id} className="avialable-products">
            <div className="product-image">
              <img
                className="productimage"
                src={each.image}
                alt="productimage"
              />
            </div>

            <div className="product-name">
              <p
                style={{
                  textTransform: "capitalize",
                  textTransform: "capitalize",

                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {each.name}
              </p>
            </div>
            <div className="product-id">
              <p>{each._id}</p>
            </div>
            <div className="product-action">
              <div className="actions-con">
                <button
                  onClick={() => {
                    setDeleteCustomer(each._id);
                  }}
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
      {showDelete && <Deletemodal />}
    </>
  ) : (
    <div className="loader-spinner-admin">
      <TailSpin color={"#F4BD18"} height={70} width={70} />
    </div>
  );
};

export default Events;
