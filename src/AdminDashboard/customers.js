import "./index.js";

import { useState, useEffect } from "react";

import Cookies from "js-cookie";

import { InfinitySpin } from "react-loader-spinner";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Customers = () => {
  const [customerData, setCustomerData] = useState([]);

  const [showAddCustomer, setAddCustomer] = useState(false);
  const [editCustomer, setEditCustomer] = useState("");
  const [deleteCustomer, setDeleteCustomer] = useState("");

  const [load, setLoad] = useState(false);

  useEffect(() => {
    getCustomerData();
  }, []);

  const ModalCustomer = () => {
    const [addCustomerLoad, setAddCustomerLoad] = useState(false);

    const adminId = Cookies.get("jwt_adminId");

    const [tobeAdded, setTobeAdded] = useState({
      email: "",
      mobileNumber: "",
      name: "",
      address: "",
      adminId,
    });

    let num = tobeAdded.mobileNumber.toString();

    const addingCustomer = async () => {
      if (tobeAdded.name === "") {
        toast.error("Please Enter Name", {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "colored",
        });
      } else if (tobeAdded.mobileNumber === "") {
        toast.error("Please Enter Mobile Number", {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "colored",
        });
      } else if (num.length < 9) {
        toast.error("Please Enter Valid Mobile Number", {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "colored",
        });
      } else if (tobeAdded.email === "") {
        toast.error("Please Enter Email", {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "colored",
        });
      } else if (
        !tobeAdded.email.endsWith(
          "@gmail.com" || "@hotmail.com" || "@outlook.com"
        )
      ) {
        toast.error("Please Enter correct email", {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "colored",
        });
      } else {
        setAddCustomerLoad(true);
        const url = `${process.env.REACT_APP_ROOT_URL}/api/admin/user/addUser`;
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(tobeAdded),
        };

        const response = await fetch(url, options);
        if (response.ok) {
          toast.success("Added", {
            position: "top-center",
            autoClose: 2000,
            pauseOnHover: true,
            closeOnClick: true,
            theme: "colored",
          });
          setTimeout(() => {
            setAddCustomer(false);
            getCustomerData();
          }, 2000);
        } else {
          setAddCustomerLoad(false);
          toast.error("Mobile number already exists", {
            position: "top-center",
            autoClose: 2000,
            pauseOnHover: true,
            closeOnClick: true,
            theme: "colored",
          });
        }
      }
    };

    return (
      <>
        <ToastContainer />
        <div className="modal-boxcon"></div>
        {addCustomerLoad ? (
          <div style={{ height: 250, width: 410 }} className="modal-Customer">
            <div className="spinner-edit">
              <InfinitySpin color={"#4444D5"} height={150} width={150} />
            </div>
          </div>
        ) : (
          <form style={{ height: 250, width: 410 }} className="modal-Customer">
            <h1 style={{ marginBottom: 10, color: "#3E3E3E", fontSize: 20 }}>
              Add New Customer
            </h1>
            <lable htmlFor="service-name-admin">Customer Name</lable>
            <input
              value={tobeAdded.name}
              placeholder="Enter Customer Name"
              className="service-admin-input"
              id="service-name-admin"
              type="text"
              style={{ height: 25, marginBottom: 10 }}
              onChange={(event) => {
                const inputValue = event.target.value;

                // Use a regular expression to check if the input contains only letters
                if (/^[A-Za-z]+$/.test(inputValue) || inputValue === "") {
                  setTobeAdded((prevAdd) => ({
                    ...prevAdd,
                    name: inputValue,
                  }));
                }
              }}
            />
            <lable htmlFor="service-num-admin">Customer Mobile Number</lable>
            <input
              placeholder="Enter Mobile Number"
              value={tobeAdded.mobileNumber}
              className="service-admin-input"
              id="service-num-admin"
              maxLength={10}
              type="text"
              style={{ height: 25, marginBottom: 10 }}
              onChange={(event) => {
                const inputValue = event.target.value;
                if (/^[0-9]+$/.test(inputValue) || inputValue === "") {
                  setTobeAdded((prevAdd) => ({
                    ...prevAdd,
                    mobileNumber: parseInt(inputValue) || "",
                  }));
                }
              }}
            />
            <lable htmlFor="service-email-admin">Customer Email</lable>
            <input
              placeholder="Enter Customer Email"
              value={tobeAdded.email}
              className="service-admin-input"
              id="service-email-admin"
              type="email"
              style={{ height: 25, marginBottom: 10 }}
              onChange={(event) => {
                setTobeAdded((prevAdd) => ({
                  ...prevAdd,
                  email: event.target.value,
                }));
              }}
            />
            <div className="service-button-admin-con-event">
              <button
                style={{ padding: 3, fontSize: 15, cursor: "pointer" }}
                className="service-button-admin"
                type="button"
                onClick={addingCustomer}
              >
                Add
              </button>
              <button
                onClick={() => {
                  setAddCustomer(false);
                }}
                style={{ padding: 3, fontSize: 15, cursor: "pointer" }}
                className="service-button-admin"
                type="button"
              >
                Close
              </button>
            </div>
          </form>
        )}
      </>
    );
  };

  const ModalEditCustomer = () => {
    const [modalLoad, setModalLoad] = useState(false);

    const filteredCustomer = customerData.filter(
      (each) => each._id === editCustomer
    );

    const [tobeEdited, setTobeEdited] = useState({
      userId: `${editCustomer}`,
      email: filteredCustomer[0].email,
      mobileNumber: parseInt(filteredCustomer[0].mobileNumber),
      name: filteredCustomer[0].name,
    });

    const editUser = async () => {
      const alreadyPresent = customerData.filter(
        (each) => each.mobileNumber === tobeEdited.mobileNumber
      );
      console.log(alreadyPresent);
      if (
        filteredCustomer[0].email === tobeEdited.email &&
        filteredCustomer[0].mobileNumber === tobeEdited.mobileNumber &&
        filteredCustomer[0].email === tobeEdited.email
      ) {
        toast.error("No changes Made", {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "colored",
        });
      } else if (
        alreadyPresent.length > 0 &&
        editCustomer !== alreadyPresent[0]._id
      ) {
        toast.error("Mobile Number already present", {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "colored",
        });
      } else {
        setModalLoad(true);
        const url = `${process.env.REACT_APP_ROOT_URL}/api/admin/editUser`;

        const reqConfigure = {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(tobeEdited),
        };

        const response = await fetch(url, reqConfigure);

        if (response.ok) {
          toast.success("Edited", {
            position: "top-center",
            autoClose: 2000,
            pauseOnHover: true,
            closeOnClick: true,
            theme: "colored",
          });
          setTimeout(() => {
            setModalLoad(false);
            setEditCustomer("");
            getCustomerData();
          }, 2000);
        }
      }
    };

    return (
      <>
        <ToastContainer />
        <div className="modal-boxcon"></div>
        {modalLoad ? (
          <div style={{ height: 250, width: 410 }} className="modal-Customer">
            <div className="spinner-edit">
              <InfinitySpin color={"#4444D5"} height={150} width={150} />
            </div>
          </div>
        ) : (
          <form style={{ height: 250, width: 410 }} className="modal-Customer">
            <h1 style={{ marginBottom: 10, color: "#3E3E3E", fontSize: 20 }}>
              Edit Existing Customer
            </h1>
            <lable htmlFor="service-name-admin">Event Name</lable>
            <input
              value={tobeEdited.name}
              className="service-admin-input"
              id="service-name-admin"
              type="text"
              style={{
                height: 25,
                marginBottom: 10,
                textTransform: "capitalize",
              }}
              onChange={(event) => {
                setTobeEdited((prevEdit) => ({
                  ...prevEdit,
                  name: event.target.value,
                }));
              }}
            />
            <lable htmlFor="service-num-admin">Event Mobile Number</lable>
            <input
              maxLength={10}
              value={tobeEdited.mobileNumber}
              className="service-admin-input"
              id="service-num-admin"
              type="number"
              style={{ height: 25, marginBottom: 10 }}
              onChange={(event) => {
                setTobeEdited((prevEdit) => ({
                  ...prevEdit,
                  mobileNumber: parseInt(event.target.value),
                }));
              }}
            />
            <lable htmlFor="service-email-admin">Event Email</lable>
            <input
              value={tobeEdited.email}
              className="service-admin-input"
              id="service-email-admin"
              type="text"
              style={{ height: 25, marginBottom: 10 }}
              onChange={(event) => {
                setTobeEdited((prevEdit) => ({
                  ...prevEdit,
                  email: event.target.value,
                }));
              }}
            />
            <div className="service-button-admin-con-event">
              <button
                style={{ padding: 3, fontSize: 15, cursor: "pointer" }}
                className="service-button-admin"
                type="button"
                onClick={editUser}
              >
                Edit
              </button>
              <button
                onClick={() => {
                  setEditCustomer("");
                }}
                style={{ padding: 3, fontSize: 15, cursor: "pointer" }}
                className="service-button-admin"
                type="button"
              >
                Close
              </button>
            </div>
          </form>
        )}
      </>
    );
  };

  const ModalDeleteCustomer = () => {
    const [loadingDelete, setLoadingDelete] = useState(false);

    const deletingCust = async () => {
      setLoadingDelete(true);
      const url = `${process.env.REACT_APP_ROOT_URL}/api/admin/deleteUser/${deleteCustomer}`;

      const requestConfigure = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
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
          setLoadingDelete(false);
          getCustomerData();
          setDeleteCustomer("");
        }, 2000);
      }
    };

    return (
      <>
        <ToastContainer />
        <div className="modal-boxcon"></div>
        {loadingDelete ? (
          <div
            style={{ width: "20rem", height: "10rem" }}
            className="modal-delete"
          >
            <div className="spinner-edit">
              <InfinitySpin color={"#4444D5"} height={150} width={150} />
            </div>
          </div>
        ) : (
          <div
            style={{ width: "20rem", height: "10rem" }}
            className="modal-delete"
          >
            <p style={{ fontSize: "1.5rem" }}>
              Are you sure you want to delete ?
            </p>
            <div
              style={{
                width: 200,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignSelf: "center",
                marginTop: "2rem",
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
                  cursor: "pointer",
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

  const getCustomerData = async () => {
    setLoad(true);
    const adminId = Cookies.get("jwt_adminId");
    console.log(adminId);
    const url = `${process.env.REACT_APP_ROOT_URL}/api/admin/getUsersByAdminId/${adminId}`;
    const response = await fetch(url);
    const data = await response.json();
    if (response.ok) {
      setLoad(false);
      setCustomerData(data.data);
    }
  };

  return (
    <>
      {showAddCustomer && <ModalCustomer />}
      {!load ? (
        customerData.length > 0 ? (
          <div className="dashboard-component">
            <button
              onClick={() => {
                setAddCustomer(true);
              }}
              className="add-service"
              type="button"
              style={{ cursor: "pointer" }}
            >
              + Add Customer
            </button>
            <div className="avialable-products-head">
              <div className="product-box">
                <p className="product-heads"></p>
              </div>
              <div className="product-box2">
                <p className="product-heads">Name</p>
              </div>
              <div className="product-box3">
                <p className="product-heads">Mobile Number</p>
              </div>
              <div className="product-box4">
                <p className="product-heads">Email</p>
              </div>
              <div className="product-box5">
                <p className="product-heads">Address</p>
              </div>
              <div className="product-box6">
                <p className="product-heads">Action</p>
                <img src="./updown.png" className="updown" alt="updown" />
              </div>
            </div>
            {customerData.map((each) => (
              <div className="avialable-products-head">
                <div className="product-box">
                  <img
                    style={{ height: 20, width: 22 }}
                    className="productimage"
                    src="/user.png"
                    alt="serviceimage"
                  />
                </div>
                <div className="product-box2">
                  <p>{each.name}</p>
                </div>
                <div className="product-box3">
                  <p>{each.mobileNumber}</p>
                </div>
                <div className="product-box4">
                  <p>{each.email}</p>
                </div>

                <div className="product-box5">
                  <p>{each.address}</p>
                </div>
                <div className="product-box6">
                  <div className="actions-con">
                    <button
                      onClick={() => {
                        setEditCustomer(each._id);
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
                      onClick={() => {
                        setDeleteCustomer(each._id);
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
            ))}
          </div>
        ) : (
          <div className="dashboard-component">
            <button
              onClick={() => {
                setAddCustomer(true);
              }}
              className="add-service"
              type="button"
              style={{ cursor: "pointer" }}
            >
              + Add Customer
            </button>
            You Have No Customers
          </div>
        )
      ) : (
        <div className="loader-spinner-admin">
          <InfinitySpin color={"#4444D5"} height={150} width={150} />
        </div>
      )}
      {editCustomer !== "" && <ModalEditCustomer />}
      {deleteCustomer !== "" && <ModalDeleteCustomer />}
    </>
  );
};

export default Customers;
