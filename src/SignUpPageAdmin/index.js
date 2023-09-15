import "./index.css";

import { useState } from "react";

import Cookies from "js-cookie";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import NavBar from "../SalonInksHome/navbar";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

import { InfinitySpin } from "react-loader-spinner";

const SignUpAdmin = (props) => {
  const { history } = props;

  const [name, setUpName] = useState("");
  const [email, setUpEmail] = useState("");
  const [password, setUpPassword] = useState("");

  const [load, setLoad] = useState(false);

  const alreadySignIn = Cookies.get("jwt_admin");

  const signUpRequest = async () => {
    if ((name !== "" && email !== "", password !== "")) {
      setLoad(true);
      const url = `https://beauty-management.onrender.com/api/admin/adminSignup`;

      const reqConfigure = {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ name, email, password }),
      };

      const response = await fetch(url, reqConfigure);

      const data = await response.json();

      if (response.ok) {
        Cookies.set("jwt_admin", data.result._id, { expires: 30 });
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
        setUpName("");
        setUpEmail("");
        setUpPassword("");
      }
    } else {
      if (name === "") {
        toast.error(`Please Enter Name`, {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "colored",
        });
      } else if (email === "") {
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
        <InfinitySpin color="#3636d5" height={150} width={150} />
      </div>
    ) : (
      <div className="signup-super-main-con">
        <ToastContainer />
        <NavBar props={props} />
        <div className="signup-main-con">
          <div>
            <img
              className="signupimage"
              src="/signinpageimage.jpg"
              alt="signupimage"
            />
            <h2>GET STARTED</h2>
          </div>
          <div>
            <h1>Sign Up</h1>
            <div className="sign-in-inputs">
              <p id="name">Name</p>
              <input
                onChange={(e) => {
                  setUpName(e.target.value);
                }}
                id="name"
                type="text"
                placeholder="Enter Name"
              />
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
              <button onClick={signUpRequest} type="button">
                Sign Up
              </button>
            </div>
            <p id="redirection-para">
              Do you have account ?
              <span
                onClick={() => {
                  history.push("/loginadmin");
                }}
              >
                Sign In
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  }
};
export default SignUpAdmin;
