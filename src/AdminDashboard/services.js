import "./index.css";

import { InfinitySpin } from "react-loader-spinner";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import Cookies from "js-cookie";

import ModalBoxEdit from "./modalboxEdit";

import { useState, useEffect } from "react";

const Services = () => {
  const [load, setLoad] = useState(false);
  const [availableServices, setavailServices] = useState([]);

  const [availableCategories, setCategories] = useState([]);

  const [showModal, setModal] = useState(false);

  const [showServiceCategory, setServiceCategory] = useState(true);

  const [showDeleteModal, setDeleteModal] = useState(false);

  const [serviceTobeDeleted, setServiceToDelete] = useState("");

  const [showEditModal, setEditModel] = useState(false);

  const [serviceTobeEdited, setServiceToEdit] = useState("");

  /**const [toggleUser, setToggleUser] = useState("");*/

  useEffect(() => {
    getAllServices();
  }, []);

  const getAllServices = async () => {
    const adminId = Cookies.get("jwt_adminId");
    const url = `${process.env.REACT_APP_ROOT_URL}/api/admin/getAllServices`;

    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      /**console.log(data.allServices);*/
      setavailServices(data.allServices);
      setLoad(true);
    }
  };

  const getallCategories = async () => {
    const url = `${process.env.REACT_APP_ROOT_URL}/api/admin/getAllSalon`;
    const response = await fetch(url);
    const data = await response.json();
    if (response.ok) {
      /*console.log(data.salons[0].categories);*/
      setCategories(data.salons[0].categories);
    }
  };

  const settingModal = () => {
    setModal(!showModal);
    getallCategories();
  };

  const Modal = () => {
    const [load, setLoad] = useState(true);

    const [showfaq, setfaq] = useState(false);

    const adminId = Cookies.get("jwt_adminId");

    const [dataToBe, setData] = useState({
      salonId: Cookies.get("jwt_salonId"),
      category: "",
      service: "",
      availableSlotCount: "",
      price: "",
      time: "",
      description: "",
      photos: "",
      image: "",
      whatsIncluded: "",
      que1: "",
      ans1: "",
      que2: "",
      ans2: "",
      que3: "",
      ans3: "",
      adminId,
    });

    useEffect(() => {
      if (availableCategories[0] !== undefined) {
        setData((prevData) => ({
          ...prevData,
          category: availableCategories[0].category,
        }));
      }
    }, []);

    const addService = (event) => {
      if (event.target.id === "service-name-admin") {
        setData((prevData) => ({ ...prevData, service: event.target.value }));
      } else if (event.target.id === "service-slot-admin") {
        setData((prevData) => ({
          ...prevData,
          availableSlotCount: event.target.value,
        }));
      } else if (event.target.id === "service-category-admit") {
        setData((prevData) => ({ ...prevData, category: event.target.value }));
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
      } else if (event.target.id === "file-image") {
        setData((prevData) => ({ ...prevData, image: event.target.files[0] }));
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

    const updatingServices = async () => {
      setLoad(true);
      if (dataToBe.service === "") {
        toast.error("Please Enter your service", {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "colored",
        });
      } else if (dataToBe.availableSlotCount === "") {
        toast.error("Please Enter Available Slots count", {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "colored",
        });
      } else if (dataToBe.category === "") {
        toast.error("Please Select Category or Add New Category", {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "colored",
        });
      } else if (dataToBe.price === "") {
        toast.error("Please Enter Price", {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "colored",
        });
      } else if (dataToBe.time === "") {
        toast.error("Please Enter Time of Service", {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "colored",
        });
      } else if (dataToBe.description === "") {
        toast.error("Please Describe About service", {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "colored",
        });
      } else if (dataToBe.photos === "") {
        toast.error("Please Upload Image for the service", {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "colored",
        });
      } else if (dataToBe.whatsIncluded === "") {
        toast.error("Please Enter What's Included", {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "colored",
        });
        toast.info("Click on Add FAQ's", {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "colored",
        });
      } else if (dataToBe.que1 === "") {
        toast.error("Please Enter Question 1", {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "colored",
        });
      } else if (dataToBe.ans1 === "") {
        toast.error("Please Enter Answer 1", {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "colored",
        });
      } else if (dataToBe.que2 === "") {
        toast.error("Please Enter Question 2", {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "colored",
        });
      } else if (dataToBe.ans2 === "") {
        toast.error("Please Enter Answer 2", {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "colored",
        });
      } else if (dataToBe.que3 === "") {
        toast.error("Please Enter Question 3", {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "colored",
        });
      } else if (dataToBe.ans3 === "") {
        toast.error("Please Enter Answer 3", {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "colored",
        });
      } else {
        const filterdCategory = availableCategories.map(
          (each) => each.category
        );
        if (filterdCategory.includes(dataToBe.category)) {
          setLoad(false);
          const fd = new FormData();

          for (var key in dataToBe) {
            fd.append(`${key}`, dataToBe[key]);
          }

          const url = `${process.env.REACT_APP_ROOT_URL}/api/salon/addServices`;

          const reqConfigure = {
            method: "POST",
            body: fd,
          };

          console.log(Object.fromEntries(fd.entries()));

          const response = await fetch(url, reqConfigure);

          if (response.ok) {
            toast.success("Added", {
              position: "top-center",
              autoClose: 2000,
              pauseOnHover: true,
              closeOnClick: true,
              theme: "colored",
            });
            setTimeout(() => {
              setLoad(true);
              /*console.log(data);*/
              setData({
                salonId: Cookies.get("jwt_salonId"),
                category: "",
                service: "",
                availableSlotCount: "",
                price: "",
                time: "",
                description: "",
                photos: "",
                image: "",
              });
              settingModal();
              getAllServices();
            }, 2000);
          }
        } else if (!filterdCategory.includes(dataToBe.category)) {
          if (dataToBe.image === "") {
            toast.error("Please Upload Image for the New category", {
              position: "top-center",
              autoClose: 2000,
              pauseOnHover: true,
              closeOnClick: true,
              theme: "colored",
            });
          } else {
            setLoad(false);
            const fd = new FormData();

            for (var key in dataToBe) {
              fd.append(`${key}`, dataToBe[key]);
            }

            const url = `${process.env.REACT_APP_ROOT_URL}/api/salon/addServices`;

            const reqConfigure = {
              method: "POST",
              body: fd,
            };

            const response = await fetch(url, reqConfigure);

            if (response.ok) {
              toast.success("Added", {
                position: "top-center",
                autoClose: 2000,
                pauseOnHover: true,
                closeOnClick: true,
                theme: "colored",
              });
              setTimeout(() => {
                setLoad(true);
                /*console.log(data);*/
                setData({
                  salonId: Cookies.get("jwt_salonId"),
                  category: "",
                  service: "",
                  availableSlotCount: "",
                  price: "",
                  time: "",
                  description: "",
                  photos: "",
                  image: "",
                });
                settingModal();
                getAllServices();
              }, 2000);
            }
          }
        }
      }
    };

    return (
      <>
        <ToastContainer />
        <div className="modal-boxcon"></div>
        {load ? (
          <form className="modal-box-service-con">
            {!showfaq ? (
              <>
                <h1
                  style={{ marginBottom: 10, color: "#3E3E3E", fontSize: 20 }}
                >
                  Add New Service
                </h1>
                <lable htmlFor="service-name-admin">Service Title</lable>
                <input
                  onChange={addService}
                  className="service-admin-input"
                  id="service-name-admin"
                  type="text"
                  value={dataToBe.service}
                />
                <lable htmlFor="service-name-admin">Available Slot count</lable>
                <input
                  onChange={addService}
                  className="service-admin-input"
                  id="service-slot-admin"
                  type="number"
                  value={dataToBe.availableSlotCount}
                />
                {showServiceCategory && (
                  <label htmlFor="service-category-admit">
                    Select Category of the service
                  </label>
                )}
                {showServiceCategory && (
                  <select
                    style={{ textTransform: "capitalize" }}
                    onChange={addService}
                    id="service-category-admit"
                    className="service-admin-input"
                    value={dataToBe.category}
                  >
                    {availableCategories.map((each) => (
                      <option
                        key={each._id}
                        style={{ textTransform: "capitalize" }}
                        id={each._id}
                      >
                        {each.category}
                      </option>
                    ))}
                  </select>
                )}
                {!showServiceCategory && (
                  <button
                    onClick={() => {
                      setServiceCategory(true);
                    }}
                    type="button"
                    className="service-button-admin-category1"
                    style={{ cursor: "pointer" }}
                  >
                    Click here to get available categories back
                  </button>
                )}
                <lable htmlFor="service-price-admin">Service Price</lable>
                <input
                  className="service-admin-input"
                  onChange={addService}
                  id="service-price-admin"
                  type="text"
                  value={dataToBe.price}
                />
                <lable htmlFor="service-time-admin">Service Time</lable>
                <input
                  className="service-admin-input"
                  onChange={addService}
                  id="service-time-admin"
                  type="text"
                  value={dataToBe.time}
                />
                <lable htmlFor="service-description-admin">
                  Describe about service
                </lable>
                <textarea
                  className="service-admin-text-area"
                  onChange={addService}
                  id="service-description-admin"
                  type="text"
                  value={dataToBe.description}
                />
                <label
                  style={{ marginTop: 10, marginBottom: 10 }}
                  htmlFor="service-image-admin"
                >
                  Upload Image for service
                </label>
                <input id="file" onChange={addService} type="file" />
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
                    value={dataToBe.whatsIncluded}
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
                    value={dataToBe.que1}
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
                    value={dataToBe.ans1}
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
                    value={dataToBe.que2}
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
                    value={dataToBe.ans2}
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
                    value={dataToBe.que3}
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
                    value={dataToBe.ans3}
                  />
                </div>
                <div className="service-button-admin-con">
                  <button
                    style={{
                      paddingTop: "2%",
                      paddingBottom: "2%",
                      cursor: "pointer",
                    }}
                    onClick={updatingServices}
                    className="service-button-admin"
                    type="button"
                  >
                    Add
                  </button>
                  <button
                    style={{
                      paddingTop: "2%",
                      paddingBottom: "2%",
                      cursor: "pointer",
                    }}
                    className="service-button-admin"
                    onClick={settingModal}
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
            <div className="service-button-admin-con">
              <button
                style={{ cursor: "pointer" }}
                onClick={updatingServices}
                className="service-button-admin"
                type="button"
              >
                Add
              </button>
              <button
                style={{ cursor: "pointer" }}
                className="service-button-admin"
                onClick={settingModal}
                type="button"
              >
                Close
              </button>
              <button
                className="service-button-admin-faq"
                style={{
                  borderRadius: ".3rem",
                  width: "5rem",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setfaq(!showfaq);
                }}
                type="button"
              >
                Add FAQ
              </button>
            </div>
            {!showfaq && (
              <form className="modal-box2">
                <h1 style={{ margin: 0, color: "#3E3E3E", fontSize: 20 }}>
                  Add New Category
                </h1>
                <p>New category name</p>
                <input
                  type="text"
                  id="service-category-admit"
                  onFocusCapture={() => {
                    setServiceCategory(false);
                  }}
                  onChange={addService}
                  value={dataToBe.category}
                />
                <p style={{ color: "red", fontSize: 10 }}>
                  *Please double click and type to add new category <br /> else
                  leave it blank.
                </p>
                <label
                  style={{ marginTop: 10, marginBottom: 10 }}
                  htmlFor="service-image-admin"
                >
                  Upload Image for category
                </label>
                <input id="file-image" onChange={addService} type="file" />
              </form>
            )}
          </form>
        ) : (
          <div className="modal-box-service-con">
            <div className="spinner-edit">
              <InfinitySpin color={"#4444D5"} height={150} width={150} />
            </div>
          </div>
        )}
      </>
    );
  };

  const ModalDelete = () => {
    const [loading, setLoad] = useState(true);
    const deleteService = async () => {
      setLoad(false);
      const url = `${process.env.REACT_APP_ROOT_URL}/api/salon/deleteService`;

      const requestConfigure = {
        method: "DELETE",
        headers: { "Content-Type": "Application/json" },
        body: JSON.stringify({
          salonId: Cookies.get("jwt_salonId"),
          serviceId: `${serviceTobeDeleted}`,
        }),
      };

      const response = await fetch(url, requestConfigure);
      if (response.ok) {
        toast.error("Deleted", {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "colored",
        });
        setTimeout(() => {
          setLoad(true);
          getAllServices();
          setDeleteModal(false);
        }, 2000);
      }
    };

    return (
      <>
        <ToastContainer />
        <div className="modal-boxcon"></div>
        {loading ? (
          <div
            style={{ width: "20rem", height: "10rem" }}
            className="modal-delete"
          >
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
                  backgroundColor: "#4444D5",
                  color: "#FFFFFF",
                  borderWidth: 0,
                  borderRadius: 5,
                  cursor: "pointer",
                }}
                type="button"
                onClick={() => {
                  setServiceToDelete("");
                  setDeleteModal(false);
                }}
              >
                Cancel
              </button>
              <button
                onClick={deleteService}
                style={{
                  padding: 5,
                  backgroundColor: "Red",
                  color: "#FFFFFF",
                  borderWidth: 0,
                  borderRadius: 5,
                  cursor: "pointer",
                }}
                type="button"
              >
                Delete
              </button>
            </div>
          </div>
        ) : (
          <div
            style={{ width: "20rem", height: "10rem" }}
            className="modal-delete"
          >
            <div className="spinner-edit">
              <InfinitySpin color={"#4444D5"} height={150} width={150} />
            </div>
          </div>
        )}
      </>
    );
  };

  {
    /* const toggle = async (event) => {
    setToggleUser(event.target.id);
    const url = `${process.env.REACT_APP_ROOT_URL}/api/admin/salon/serviceToggle`;

    const reqConfigure = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        salonId:Cookies.get("jwt_salonId")
        serviceId: `${event.target.id}`,
      }),
    };

    const response = await fetch(url, reqConfigure);

    const data = await response.json();
    if (response.ok) {
      setToggleUser("");
      getAllServices();
    }
  };*/
  }

  return load ? (
    <>
      {showModal && <Modal />}
      <div className="dashboard-component2">
        <button
          onClick={settingModal}
          className="add-service"
          type="button"
          style={{ cursor: "pointer" }}
        >
          + Add new service
        </button>
        {availableServices.length > 0 && (
          <div className="avialable-products-head">
            <div className="product-box7">
              <p className="product-heads">Image</p>
            </div>
            {/*<div className="product-box8">
            <p className="product-heads">Enable/Disable</p>
           </div>*/}
            <div className="product-box7">
              <p className="product-heads">Name</p>
            </div>
            <div className="product-box7">
              <p className="product-heads">Price</p>
            </div>
            <div className="product-box7">
              <p className="product-heads">Category</p>
            </div>
            <div className="product-box7">
              <p className="product-heads">Time</p>
            </div>
            <div className="product-box7">
              <p className="product-heads">Rating</p>
            </div>
            <div className="product-box7">
              <p className="product-heads">Reviews</p>
            </div>
            <div className="product-box7">
              <p className="product-heads">Slots</p>
            </div>
            <div className="product-box7">
              <p className="product-heads">Action</p>
              <img src="./updown.png" className="updown" alt="updown" />
            </div>
          </div>
        )}
        {availableServices.length > 0 ? (
          availableServices.map((each) => (
            <div key={each._id} id={each._id} className="avialable-products">
              <div className="product-box7">
                <img
                  className="productimage"
                  src={each.image[0]}
                  alt="serviceimage"
                />
              </div>
              {/*<div id={each._id} className="product-box9">
              {each._id === toggleUser ? (
                <div style={{ position: "absolute", left: 0 }}>
                  <InfinitySpin color={"#4444D5"} height={60} width={60} />
                </div>
              ) : (
                <div className={each.active ? "toggle-con3" : "toggle-con4"}>
                  <button
                    id={each._id}
                    onClick={toggle}
                    type="button"
                    className={each.active ? "togglebutton2" : "togglebutton1"}
                    style={{ cursor: "pointer" }}
                  ></button>
                </div>
              )}
            </div>*/}
              <div className="product-box7">
                <p>{each.service}</p>
              </div>
              <div id={each._id} className="product-box7">
                <p style={{ textTransform: "capitalize" }}>₹ {each.price}</p>
              </div>
              <div className="product-box7">
                <p>{each.category}</p>
              </div>
              <div className="product-box7">
                <p>{each.time} min</p>
              </div>
              <div className="product-box7">
                <p>{each.rating}</p>
              </div>
              <div className="product-box7">
                <p>{each.reviews.length}</p>
              </div>
              <div className="product-box7">
                <p>{each.availableSlotCount}</p>
              </div>
              <div className="product-box7">
                <div className="actions-con">
                  <button
                    onClick={() => {
                      setEditModel(true);
                      setServiceToEdit(each._id);
                    }}
                    className="actions-button"
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      id={each._id}
                      className="actions-img"
                      src="./edit.png"
                      alt="edit"
                    />
                  </button>
                  <button
                    id={each._id}
                    onClick={() => {
                      setDeleteModal(true);
                      setServiceToDelete(each._id);
                    }}
                    type="button"
                    className="actions-button"
                    style={{ cursor: "pointer" }}
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
          ))
        ) : (
          <div>There Are No Services Added Yet.</div>
        )}
      </div>
      {showDeleteModal && <ModalDelete />}
      {showEditModal && (
        <ModalBoxEdit
          serviceTobeEdited={serviceTobeEdited}
          availableServices={availableServices}
          getAllServices={getAllServices}
          setEditModelFunc={() => {
            setEditModel(false);
          }}
        />
      )}
    </>
  ) : (
    <div className="loader-spinner-admin">
      <InfinitySpin color={"#4444D5"} height={150} width={150} />
    </div>
  );
};
export default Services;
