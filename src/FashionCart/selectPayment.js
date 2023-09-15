import "./index.css";

import { withRouter } from "react-router-dom";

import { TailSpin } from "react-loader-spinner";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useEffect, useState } from "react";

import Cookies from "js-cookie";

const paymentMethodArr = [
  {
    imgUrl: "CashafterPayment",
    mode: "Cash On Delivery",
  },
  {
    imgUrl: "UPi",
    mode: "Pay Using UPI",
  },
  {
    imgUrl: "Paytm",
    mode: "Pay Using Payment",
  },
  {
    imgUrl: "Creditdebitcards",
    mode: "Credit/Debit Cards",
  },
];

const SelectPayment = (props) => {
  const { updateProgress, progress, cartItems } = props;

  const [buttonSelected, setUpbutton] = useState("");
  const [address, setAddress] = useState("");
  const [customerData, setCustomerData] = useState([]);
  const [show, setShow] = useState(true);
  const [button, setbutton] = useState(false);

  const setUpSuccessfull = () => {
    setbutton(true);
    if (address === "") {
      toast.error("Please enter address", {
        position: "top-center",
        autoClose: 2000,
        pauseOnHover: true,
        closeOnClick: true,
        theme: "colored",
      });
    } else {
      if (buttonSelected !== "") {
        cartItems.map(async (each) => {
          const details = {
            userId: Cookies.get("jwt_user"),
            productId: each.productId,
            cartId: each._id,
            count: each.count,
            address: address,
            size: each.size,
          };
          const url = `${process.env.REACT_APP_ROOT_URL}/api/product/bookProduct`;
          const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(details),
          };
          const response = await fetch(url, options);
          if (response.ok) {
            updateProgress("PaymentDone");
          }
        });
      } else {
        toast.info("Please select Cash On Delivery", {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "colored",
        });
      }
    }
  };

  useEffect(() => {
    getCustomerData();
  }, []);

  const getCustomerData = async () => {
    const url = `${process.env.REACT_APP_ROOT_URL}/api/admin/getAllUsers`;
    const response = await fetch(url);
    const data = await response.json();
    if (response.ok) {
      console.log(data.users);
      setCustomerData(data.users);

      const filteredU = data.users.filter(
        (each) => each._id === Cookies.get("jwt_user")
      );

      if (filteredU[0] && filteredU[0].address !== undefined) {
        setAddress(filteredU[0].address);
      }
    }
  };

  const selectButton = () => {
    setUpbutton("Cash On Delivery");
  };

  const filteredUser = customerData.filter(
    (each) => each._id === Cookies.get("jwt_user")
  );

  const settingShow = () => {
    if (filteredUser[0] && filteredUser[0].address !== undefined) {
      setAddress(filteredUser[0].address);
    }
    setShow(!show);
  };

  return (
    <div className="payment-mode-fashion">
      <ToastContainer />
      <h1 className="fashion-paymentmode-head">Payment Mode</h1>
      {filteredUser[0] && filteredUser[0].address === undefined && (
        <div className="fashion-address">
          <h4 style={{ fontSize: 15 }}>Enter Address</h4>
          <textarea
            value={address}
            placeholder="Enter Address"
            autoFocus
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            type="text"
            className="input-address"
          />
        </div>
      )}
      {filteredUser[0] &&
        filteredUser[0].address !== undefined &&
        show === true && (
          <button
            style={{
              alignSelf: "flex-end",
              backgroundColor: "#f4bd18",
              color: "white",
              borderWidth: 0,
              padding: 5,
            }}
            type="button"
            className="button"
            onClick={settingShow}
          >
            Change Address
          </button>
        )}
      {show === false && (
        <div className="fashion-address">
          <h4 style={{ fontSize: 15 }}>Enter Address</h4>
          <textarea
            value={address}
            placeholder="Enter Address"
            autoFocus
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            type="text"
            className="input-address"
          />
        </div>
      )}
      {filteredUser[0] &&
        filteredUser[0].address !== undefined &&
        show === false && (
          <button
            style={{
              alignSelf: "flex-end",
              backgroundColor: "#f4bd18",
              color: "white",
              borderWidth: 0,
              padding: 5,
            }}
            type="button"
            className="button"
            onClick={settingShow}
          >
            Close
          </button>
        )}
      <div className="fashion-buttons">
        {paymentMethodArr.map((each) => (
          <button
            onClick={selectButton}
            className={
              each.mode !== "Cash On Delivery"
                ? "fashion-payment-modebutton2"
                : buttonSelected === ""
                ? "fashion-payment-modebutton1"
                : "fashion-payment-modebutton3"
            }
            type="button"
          >
            <img
              className="paymentmode-image"
              src={`/${each.imgUrl}.png`}
              alt={each.mode}
            />
            <p>{each.mode}</p>
            <img
              className={
                each.mode !== "Cash On Delivery"
                  ? "yes-disable"
                  : buttonSelected === ""
                  ? "yes-disable"
                  : "yes-enable"
              }
              src={`/yes.png`}
              alt={each.yes}
            />
          </button>
        ))}
      </div>
      {button ? (
        <div className="fashion-proceed-to-schedule">
          <TailSpin
            wrapperStyle={{ alignSelf: "center", justifyContent: "center" }}
            color={"white"}
            height={23}
            width={23}
          />
        </div>
      ) : (
        <button
          onClick={setUpSuccessfull}
          className={
            progress === "Cart"
              ? "fashion-proceed-button-disable"
              : "fashion-proceed-to-schedule"
          }
          type="button"
        >
          Proceed
        </button>
      )}
    </div>
  );
};

export default withRouter(SelectPayment);
