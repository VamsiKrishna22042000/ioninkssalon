import "./index.css";

import { withRouter } from "react-router-dom/cjs/react-router-dom.min";

import { TailSpin } from "react-loader-spinner";

import { useState } from "react";

import { ToastContainer, toast } from "react-toastify";

import Cookies from "js-cookie";

import "react-toastify/dist/ReactToastify.css";

const Verification = (props) => {
  const { phone } = props;
  const [obtainedOTP, setOTP] = useState({ index: 0, OTP: "" });
  const [load, setLoad] = useState(true);

  const obtainOtp = (event) => {
    console.log(event.target.value);
    if (event.target.value === "") {
      const myotp = document.querySelectorAll(".otp-input");
      const { index, OTP } = obtainedOTP;
      console.log(OTP);
      if (index === 1) {
        setOTP((prevOTP) => ({
          index: prevOTP.index - 1,
          OTP: prevOTP.OTP.slice(0, OTP.length - 1),
        }));
        myotp[index - 1].focus();
      } else {
        setOTP((prevOTP) => ({
          index: prevOTP.index - 1,
          OTP: prevOTP.OTP.slice(0, OTP.length - 1),
        }));
        myotp[index - 2].focus();
      }
    } else {
      const myotp = document.querySelectorAll(".otp-input");
      const numArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
      const { index, OTP } = obtainedOTP;
      console.log(OTP);
      if (numArray.includes(myotp[index].value) && index <= myotp.length - 2) {
        setOTP((prevOTP) => ({
          index: prevOTP.index + 1,
          OTP: prevOTP.OTP + event.target.value,
        }));
        myotp[index + 1].focus();
      } else if (
        numArray.includes(myotp[index].value) &&
        index <= myotp.length - 1
      ) {
        setOTP((prevOTP) => ({
          index: prevOTP.index + 1,
          OTP: prevOTP.OTP + event.target.value,
        }));
        myotp[index].focus();
      } else {
        myotp[index].focus();
        myotp[index].value = "";
      }
    }
  };

  const resendotp = async () => {
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
      toast.success(`${data.message}`, {
        position: "top-center",
        autoClose: 2000,
        pauseOnHover: true,
        closeOnClick: true,
        theme: "colored",
      });
    }
  };

  const verifyOTP = async () => {
    const { OTP } = obtainedOTP;
    setLoad(false);
    if (OTP.length >= 4) {
      const { phone, history } = props;

      const details = {
        mobileNumber: parseInt(phone.slice(2, phone.length + 1)),
        otp: parseInt(OTP),
      };

      const url = `${process.env.REACT_APP_ROOT_URL}/api/otp/verifyLoginOTP`;

      const requestConfiger = {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(details),
      };

      console.log(requestConfiger);
      const res = await fetch(url, requestConfiger);
      const data = await res.json();

      if (res.ok) {
        console.log(data);
        setOTP((prevOTP) => ({ ...prevOTP, OTP: "" }));
        Cookies.set("jwt_token", data.token, { expires: 30 });
        Cookies.set("jwt_user", data.data[0]._id, { expires: 30 });
        toast.success(`Logged In`, {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "colored",
        });
        setLoad(true);
        history.push("/");
      } else {
        setLoad(true);
        toast.error(`${data.message}`, {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "colored",
        });
        document.getElementById("input1").value = "";
        document.getElementById("input2").value = "";
        document.getElementById("input3").value = "";
        document.getElementById("input4").value = "";
        setOTP({ index: 0, OTP: "" });
      }
    } else {
      toast.error("Enter OTP", {
        position: "top-center",
        autoClose: 2000,
        pauseOnHover: true,
        closeOnClick: true,
        theme: "colored",
      });
      setLoad(true);
    }
  };

  const changeFocus = (event) => {
    event.target.classList.add("otp-input2");
  };

  const changeBlur = (event) => {
    event.target.classList.remove("otp-input2");
  };

  return (
    <>
      <ToastContainer />
      <div className="otp-box">
        <input
          id="input1"
          className="otp-input"
          autoFocus
          type="tel"
          maxLength={1}
          onFocus={changeFocus}
          onBlur={changeBlur}
          onChange={obtainOtp}
        />
        <input
          id="input2"
          className="otp-input"
          type="tel"
          maxLength={1}
          onFocus={changeFocus}
          onBlur={changeBlur}
          onChange={obtainOtp}
        />
        <input
          id="input3"
          className="otp-input"
          type="tel"
          maxLength={1}
          onFocus={changeFocus}
          onBlur={changeBlur}
          onChange={obtainOtp}
        />
        <input
          id="input4"
          className="otp-input"
          type="tel"
          maxLength={1}
          onFocus={changeFocus}
          onBlur={changeBlur}
          onChange={obtainOtp}
        />
      </div>
      <p className="resend-otp">
        Did'nt get the OTP?{" "}
        <span
          style={{ cursor: "pointer" }}
          onClick={resendotp}
          className="resend-otp-span"
        >
          Resend OTP
        </span>
      </p>
      {load ? (
        <button
          style={{ cursor: "pointer" }}
          type="button"
          onClick={verifyOTP}
          className={obtainedOTP.index <= 3 ? "verify" : "otp-verify-2"}
        >
          Verify
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
          className="otp-verify-2"
          type="button"
        >
          <TailSpin height={20} width={20} color="#FFFFFF" />
        </button>
      )}
    </>
  );
};

export default withRouter(Verification);
