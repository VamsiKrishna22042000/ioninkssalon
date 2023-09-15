import "./index.css";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import {
  Redirect,
  withRouter,
} from "react-router-dom/cjs/react-router-dom.min";

import { ToastContainer, toast } from "react-toastify";

import ModalBox from "./modalbox.js";

import { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import Cookies from "js-cookie";

const Phonenumber = (props) => {
  const { phone, phonenumber, getOTP, history } = props;
  const [load, setLoad] = useState(true);

  const [show, setShow] = useState(false);

  const settingShow = () => {
    setShow(!show);
  };

  const getCookiesData = (data) => {
    Cookies.set("jwt_token", data.token, { expires: 30 });
    Cookies.set("jwt_user", data.userId, { expires: 30 });
    history.push("/");
  };

  const sendNumber = (value) => {
    phonenumber(value);
  };

  const sendOTP = async () => {
    const errorMsg = document.getElementById("error-message");
    setLoad(false);
    if (phone.length >= 12) {
      errorMsg.classList.add("error-disable");

      const url = `${process.env.REACT_APP_ROOT_URL}/api/otp/otpLogin`;

      const opitons = {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          mobileNumber: phone.slice(2, phone.length + 1),
        }),
      };

      const response = await fetch(url, opitons);
      const data = await response.json();

      if (response.ok) {
        console.log(data);
        setLoad(true);
        getOTP(1);
      } else {
        toast.error(`${data.message}`, {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "colored",
        });
        phonenumber("+91");
        setLoad(true);
      }
    } else {
      console.log("error");
      errorMsg.classList.remove("error-disable");
      setLoad(true);
    }
  };

  return (
    <>
      <ToastContainer />
      {show && (
        <ModalBox getCookiesData={getCookiesData} settingShow={settingShow} />
      )}
      <PhoneInput
        placeholder="Mobile number"
        className="phone-input"
        country={"in"}
        value={phone}
        onChange={sendNumber}
      />
      <p id="error-message" className="error-number error-disable">
        *Enter a valid number
      </p>
      {load ? (
        <button
          className={phone.length <= 3 ? "otp" : "otp-2"}
          type="button"
          onClick={sendOTP}
          style={{ cursor: "pointer" }}
        >
          Get OTP
        </button>
      ) : (
        <button
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
          className="otp-2"
          type="button"
        >
          <TailSpin height={20} width={20} color="#FFFFFF" />
        </button>
      )}
      <p className="signUp-phoneno">
        If not registered click
        <span
          onClick={settingShow}
          style={{ color: "#FFC300", cursor: "pointer" }}
        >
          {" "}
          SignUP
        </span>
      </p>
    </>
  );
};
export default withRouter(Phonenumber);
