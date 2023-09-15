import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import Cookies from "js-cookie";

import { TailSpin } from "react-loader-spinner";

import { ToastContainer, toast } from "react-toastify";

import { withRouter } from "react-router-dom/cjs/react-router-dom.min";

import "react-toastify/dist/ReactToastify.css";

import "./index.css";

import { useState } from "react";

const ModalBox = (props) => {
  const { settingShow, getCookiesData } = props;

  const [change, setChange] = useState(false);
  const [load, setLoad] = useState(true);

  const [signupData, setSignUpdata] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    otp: "",
  });

  const resendOTP = async () => {
    if (signupData.mobileNumber.length === 12) {
      if (signupData.name !== "") {
        if (
          signupData.email.endsWith(
            "@gmail.com" || "@outlook.com" || "@hotmail.com"
          )
        ) {
          if (
            signupData.name !== "" &&
            signupData.mobileNumber !== "" &&
            signupData.email !== ""
          ) {
            const url = `${process.env.REACT_APP_ROOT_URL}/api/otp/otpSignup`;
            const details = {
              mobileNumber: parseInt(
                signupData.mobileNumber.slice(
                  2,
                  signupData.mobileNumber.length + 1
                )
              ),
            };

            const opitons = {
              method: "POST",

              headers: {
                "Content-Type": "application/json",
              },

              body: JSON.stringify(details),
            };

            const response = await fetch(url, opitons);

            const data = await response.json();

            if (response.ok) {
              console.log(data);
              toast.success(`${data.message}`, {
                position: "top-center",
                autoClose: 2000,
                pauseOnHover: true,
                closeOnClick: true,
                theme: "colored",
              });
            } else {
              toast.error(`${data.message}`, {
                position: "top-center",
                autoClose: 2000,
                pauseOnHover: true,
                closeOnClick: true,
                theme: "colored",
              });
              settingShow();
            }
          }
        } else {
          toast.error("Please Enter Valid Email", {
            position: "top-center",
            autoClose: 2000,
            pauseOnHover: true,
            closeOnClick: true,
            theme: "colored",
          });
        }
      } else {
        toast.error("Please Enter Name", {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "colored",
        });
      }
    } else {
      toast.error("Please Enter Valid Number", {
        position: "top-center",
        autoClose: 2000,
        pauseOnHover: true,
        closeOnClick: true,
        theme: "colored",
      });
    }
  };

  const sendOTP = async () => {
    setLoad(false);
    if (signupData.mobileNumber.length === 12) {
      if (signupData.name !== "") {
        if (
          signupData.email.endsWith(
            "@gmail.com" || "@outlook.com" || "@hotmail.com"
          )
        ) {
          if (
            signupData.name !== "" &&
            signupData.mobileNumber !== "" &&
            signupData.email !== ""
          ) {
            const url = `${process.env.REACT_APP_ROOT_URL}/api/otp/otpSignup`;
            const details = {
              mobileNumber: parseInt(
                signupData.mobileNumber.slice(
                  2,
                  signupData.mobileNumber.length + 1
                )
              ),
            };

            const opitons = {
              method: "POST",

              headers: {
                "Content-Type": "application/json",
              },

              body: JSON.stringify(details),
            };

            const response = await fetch(url, opitons);

            const data = await response.json();

            if (response.ok) {
              console.log(data);
              toast.success(`${data.message}`, {
                position: "top-center",
                autoClose: 2000,
                pauseOnHover: true,
                closeOnClick: true,
                theme: "colored",
              });
              setChange(!change);
              setLoad(true);
            } else {
              toast.error(`${data.message}`, {
                position: "top-center",
                autoClose: 2000,
                pauseOnHover: true,
                closeOnClick: true,
                theme: "colored",
              });
              setLoad(true);
              settingShow();
            }
          }
        } else {
          toast.error("Please Enter Valid Email", {
            position: "top-center",
            autoClose: 2000,
            pauseOnHover: true,
            closeOnClick: true,
            theme: "colored",
          });
          setLoad(true);
        }
      } else {
        toast.error("Please Enter Name", {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "colored",
        });
        setLoad(true);
      }
    } else {
      toast.error("Please Enter Valid Number", {
        position: "top-center",
        autoClose: 2000,
        pauseOnHover: true,
        closeOnClick: true,
        theme: "colored",
      });
      setLoad(true);
    }
  };

  const VerifyOTP = async (props) => {
    setLoad(false);
    if (signupData.otp !== "" && signupData.otp.length >= 4) {
      const url = `${process.env.REACT_APP_ROOT_URL}/api/otp/verifySignup`;

      const details = {
        name: signupData.name,
        email: signupData.email,
        mobileNumber: parseInt(
          signupData.mobileNumber.slice(2, signupData.mobileNumber.length + 1)
        ),
        otp: parseInt(signupData.otp),
      };

      const opitons = {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(details),
      };

      const res = await fetch(url, opitons);
      const data = await res.json();

      if (res.ok) {
        toast.success("SignedUp successfully", {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "colored",
        });
        setSignUpdata({
          name: "",
          email: "",
          mobileNumber: "",
          otp: "",
        });
        setLoad(true);
        getCookiesData({ token: data.token, userId: data.data._id });
        settingShow();
      } else {
        toast.error(`${data.message}`, {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "colored",
        });
        setLoad(true);
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

  return (
    <>
      <ToastContainer />
      <div className="modal-boxcon"></div>
      {change ? (
        <div className="modal-box-phone1">
          <p style={{ fontSize: 20, alignSelf: "center", marginTop: 30 }}>
            Enter OTP
          </p>
          <input
            maxLength={4}
            type="text"
            style={{
              alignSelf: "center",
              textAlign: "center",
              fontSize: 30,
              width: 130,
            }}
            onChange={(e) => {
              setSignUpdata((prevValue) => ({
                ...prevValue,
                otp: e.target.value,
              }));
            }}
          />
          <p style={{ alignSelf: "center", marginTop: 20 }}>
            Did'nt got OTP? click{" "}
            <span
              onClick={resendOTP}
              style={{ color: "#FFC300", cursor: "pointer" }}
            >
              Resend
            </span>
          </p>
          {load ? (
            <button
              onClick={() => {
                VerifyOTP();
              }}
              type="button"
              style={{
                backgroundColor: "#FFC300",
                color: "white",
                borderWidth: 0,
                alignSelf: "center",
                padding: 7,
                borderRadius: 2,
                fontSize: 17,
                marginTop: 10,
                cursor: "pointer",
              }}
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
                backgroundColor: "#FFC300",
                color: "white",
                borderWidth: 0,
                alignSelf: "center",
                padding: 7,
                borderRadius: 2,
                fontSize: 17,
                marginTop: 10,
                cursor: "pointer",
              }}
              type="button"
            >
              <TailSpin height={20} width={20} color="#FFFFFF" />
            </button>
          )}
        </div>
      ) : (
        <div className="modal-box-phone">
          <h1 style={{ marginLeft: 5, marginTop: 10, marginBottom: 3 }}>
            Sign Up
          </h1>
          <p className="head-modal" style={{ alignSelf: "flex-start" }}>
            Enter Mobile Number
          </p>
          <PhoneInput
            placeholder="Mobile number"
            className="phone-input2"
            country={"in"}
            value={signupData.mobileNumber}
            onChange={(value) => {
              setSignUpdata((prevValue) => ({
                ...prevValue,
                mobileNumber: value,
              }));
            }}
          />
          <p className="head-modal">Enter Name</p>
          <input
            type="text"
            className="phone-input3"
            onChange={(e) => {
              setSignUpdata((prevValue) => ({
                ...prevValue,
                name: e.target.value,
              }));
            }}
          />
          <p className="head-modal">Enter Email</p>
          <input
            type="text"
            className="phone-input3"
            onChange={(e) => {
              setSignUpdata((prevValue) => ({
                ...prevValue,
                email: e.target.value,
              }));
            }}
          />
          <button
            type="button"
            style={{
              backgroundColor: "transparent",
              color: "white",
              borderWidth: 0,
              alignSelf: "flex-end",
              padding: 20,
              position: "relative",
              bottom: 25,
              right: 20,
              borderRadius: 2,
            }}
          ></button>
          {load ? (
            <button
              onClick={() => {
                sendOTP();
              }}
              type="button"
              style={{
                backgroundColor: "#FFC300",
                color: "white",
                borderWidth: 0,
                alignSelf: "flex-end",
                padding: 5,
                position: "absolute",
                bottom: 25,
                right: 20,
                borderRadius: 2,
                cursor: "pointer",
              }}
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
                backgroundColor: "#FFC300",
                color: "white",
                borderWidth: 0,
                alignSelf: "flex-end",
                padding: 5,
                position: "absolute",
                bottom: 25,
                right: 20,
                borderRadius: 2,
              }}
              type="button"
            >
              <TailSpin height={20} width={20} color="#FFFFFF" />
            </button>
          )}

          <button
            onClick={() => {
              settingShow();
            }}
            type="button"
            style={{
              color: "#4E4E4E",
              backgroundColor: "transparent",
              borderWidth: 0,
              alignSelf: "flex-end",
              padding: 5,
              position: "absolute",
              borderRadius: 2,
              top: 10,
              right: 20,
              cursor: "pointer",
            }}
          >
            ✖
          </button>
        </div>
      )}
    </>
  );
};

export default withRouter(ModalBox);
