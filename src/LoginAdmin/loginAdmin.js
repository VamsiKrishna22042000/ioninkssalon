import "../SignUpPageAdmin/index.css";

import { useState } from "react";

import Cookies from "js-cookie";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import NavBar from "../SalonInksHome/navbar";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

import { InfinitySpin } from "react-loader-spinner";

const LoginAdmin = (props) => {
  const { history } = props;

  const [email, setUpEmail] = useState("");
  const [password, setUpPassword] = useState("");

  const [load, setLoad] = useState(false);

  const alreadySignIn = Cookies.get("jwt_admin");

  const LoginRequest = async () => {
    if ((email !== "", password !== "")) {
      setLoad(true);
      const url = `${process.env.REACT_APP_ROOT_URL}/api/admin/adminLogin`;

      const reqConfigure = {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ email, password }),
      };

      const response = await fetch(url, reqConfigure);

      const data = await response.json();

      console.log(data);

      if (response.ok) {
        Cookies.set("jwt_admin", data.result._id, { expires: 30 });
        Cookies.set("jwt_user", data.result.email, { expires: 30 });
        Cookies.set("jwt_token", data.token, { expires: 30 });
        Cookies.set("jwt_adminId", data.result._id, { expires: 30 });
        Cookies.set("jwt_salonId", data.salonId, { expires: 30 });
        history.replace("/admindashboard");
      } else {
        setLoad(false);
        toast.error(`${data.message}`, {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "colored",
        });
        setUpEmail("");
        setUpPassword("");
      }
    } else {
      if (email === "") {
        toast.error(`Please Enter Email`, {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "colored",
        });
      } else if (!email.endsWith("@gmail.com", "@outlook.com")) {
        toast.error(`Please Enter Valid Email`, {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "colored",
        });
      } else if (password === "") {
        toast.error(`Please Password`, {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "colored",
        });
      }
    }
  };

  if (alreadySignIn !== undefined) {
    return <Redirect to="/admindashboard" />;
  } else if (alreadySignIn === undefined) {
    return load ? (
      <div
        style={{
          height: "100vh",
          widht: "100vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ToastContainer />
        <InfinitySpin color="#3636d5" height={150} width={150} />
      </div>
    ) : (
      <div className="signup-super-main-con">
        <ToastContainer />
        <NavBar props={props} />
        <div className="signup-main-con">
          <div className="imgCon">
            <img
              className="signupimage"
              src="/loginpageimage.jpg"
              alt="signupimage"
            />
            <h2>WELCOME</h2>
          </div>
          <div>
            <h1>Login</h1>
            <div className="sign-in-inputs">
              <p id="email">Email</p>
              <input
                onChange={(e) => {
                  setUpEmail(e.target.value);
                }}
                id="email"
                type="email"
                placeholder="Enter Email"
              />
              <p id="password">Password</p>
              <input
                onChange={(e) => {
                  setUpPassword(e.target.value);
                }}
                id="password"
                type="password"
                placeholder="Enter Password"
              />
              <button onClick={LoginRequest} type="button">
                Sign In
              </button>
            </div>

            <p id="redirection-para">
              Forgot Password ? <span>Click Here</span>
              <br />
              Don't have an account ?
              <span
                onClick={() => {
                  history.push("/signupadmin");
                }}
              >
                Sign Up
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  }
};
export default LoginAdmin;
