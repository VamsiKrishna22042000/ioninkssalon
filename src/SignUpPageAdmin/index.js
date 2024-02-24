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

  const [email, setUpEmail] = useState("");
  const [password, setUpPassword] = useState("");
  const [loadModalBox, setShowModalBox] = useState(false);
  const [load, setLoad] = useState(false);
  const [showAnimation, setShowAnimation] = useState({
    SalonName: false,
  });

  const [salonData, setSalonData] = useState({
    salonName: "",
    staffCount: "Select",
    salonLoc: "",
    phoneNo: "",
    how: "Select",
  });

  const [controlling, setControling] = useState(false);
  const [control, setControl] = useState({ a1: "scissors1", a2: "hairdryer1" });

  const [showCon, setShowCon] = useState({
    salonNameCon: "salonData1",
    staffNameCon: "salonData3 show-none",
    salonLocation: "salonData3 show-none",
    salonPhoneNo: "salonData3 show-none",
    howDoYouKnowUs: "salonData3 show-none",
  });
  const alreadySignIn = Cookies.get("jwt_admin");

  const signUP = async () => {
    setLoad(true);
    const url = `${process.env.REACT_APP_ROOT_URL}/api/admin/adminSignup`;

    const reqConfigure = {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name: salonData.salonName,
        email,
        password,
        staffcount: salonData.staffCount,
        location: salonData.salonLoc,
        mobileNumber: salonData.phoneNo,
        where: salonData.how,
      }),
    };

    const response = await fetch(url, reqConfigure);

    const data = await response.json();

    if (response.ok) {
      Cookies.set("jwt_admin", data.result._id, { expires: 30 });
      Cookies.set("jwt_user", data.result.email, { expires: 30 });
      Cookies.set("jwt_token", data.token, { expires: 30 });
      Cookies.set("jwt_adminId", data.result._id, { expires: 30 });
      Cookies.set("jwt_salonId", data.salonId, { expires: 30 });
      history.replace("/admindashboard");
    } else {
      setLoad(false);
      window.location.reload();
      toast.error(`${data.message}`, {
        position: "top-center",
        autoClose: 2000,
        pauseOnHover: true,
        closeOnClick: true,
        theme: "colored",
      });
    }
  };

  const handleData = () => {
    if (salonData.salonName === "" && showCon.salonNameCon === "salonData1") {
      toast.error(`Please Enter Salon Name`, {
        position: "top-center",
        autoClose: 2000,
        pauseOnHover: true,
        closeOnClick: true,
        theme: "colored",
      });
    } else if (
      salonData.salonName === "" &&
      showCon.salonNameCon === "salonData3"
    ) {
      toast.error(`Please Enter Salon Name`, {
        position: "top-center",
        autoClose: 2000,
        pauseOnHover: true,
        closeOnClick: true,
        theme: "colored",
      });
    } else if (
      salonData.salonName !== "" &&
      showCon.salonNameCon === "salonData3"
    ) {
      setShowCon({ ...showCon, salonNameCon: "salonData2" });
      setControling(false);
      setControl({ a1: "scissors2", a2: "hairdryer2" });
      setTimeout(() => {
        setShowCon({
          ...showCon,
          salonNameCon: "show-none",
          staffNameCon: "salonData1",
        });
        setControl({ a1: "scissors1", a2: "hairdryer1" });
        setTimeout(() => {
          setShowCon({
            ...showCon,
            salonNameCon: "show-none",
            staffNameCon: "salonData3",
          });
          setControling(true);
        }, 1000);
      }, 400);
    } else if (
      salonData.staffCount === "Select" &&
      showCon.salonNameCon === "show-none"
    ) {
      toast.error(`Please Select Staff Count`, {
        position: "top-center",
        autoClose: 2000,
        pauseOnHover: true,
        closeOnClick: true,
        theme: "colored",
      });
    } else if (
      salonData.staffCount !== "Select" &&
      showCon.staffNameCon === "salonData3"
    ) {
      setShowCon({
        ...showCon,
        staffNameCon: "salonData2",
      });
      setControling(false);
      setControl({ a1: "scissors2", a2: "hairdryer2" });
      setTimeout(() => {
        setShowCon({
          ...showCon,
          staffNameCon: "show-none",
          salonLocation: "salonData1",
        });
        setControl({ a1: "scissors1", a2: "hairdryer1" });
        setTimeout(() => {
          setShowCon({
            ...showCon,
            staffNameCon: "show-none",
            salonLocation: "salonData3",
          });
          setControling(true);
        }, 500);
      }, 400);
    } else if (
      salonData.salonLoc === "" &&
      showCon.staffNameCon === "show-none"
    ) {
      toast.error(`Please Enter Location`, {
        position: "top-center",
        autoClose: 2000,
        pauseOnHover: true,
        closeOnClick: true,
        theme: "colored",
      });
    } else if (
      salonData.salonLoc !== "" &&
      showCon.salonLocation === "salonData3"
    ) {
      setShowCon({
        ...showCon,
        salonLocation: "salonData2",
      });
      setControling(false);
      setControl({ a1: "scissors2", a2: "hairdryer2" });
      setTimeout(() => {
        setShowCon({
          ...showCon,
          salonLocation: "show-none",
          salonPhoneNo: "salonData1",
        });
        setControl({ a1: "scissors1", a2: "hairdryer1" });
        setTimeout(() => {
          setShowCon({
            ...showCon,
            salonLocation: "show-none",
            salonPhoneNo: "salonData3",
          });
          setControling(true);
        }, 500);
      }, 400);
    } else if (
      salonData.phoneNo === "" &&
      showCon.salonPhoneNo === "salonData3"
    ) {
      toast.error(`Please Enter Mobile Number`, {
        position: "top-center",
        autoClose: 2000,
        pauseOnHover: true,
        closeOnClick: true,
        theme: "colored",
      });
    } else if (
      salonData.phoneNo !== "" &&
      showCon.salonPhoneNo === "salonData3"
    ) {
      setShowCon({
        ...showCon,
        salonPhoneNo: "salonData2",
      });
      setControling(false);
      setControl({ a1: "scissors2", a2: "hairdryer2" });
      setTimeout(() => {
        setShowCon({
          ...showCon,
          salonPhoneNo: "show-none",
          howDoYouKnowUs: "salonData1",
        });
        setControl({ a1: "scissors1", a2: "hairdryer1" });
        setTimeout(() => {
          setShowCon({
            ...showCon,
            salonPhoneNo: "show-none",
            howDoYouKnowUs: "salonData3",
          });
          setControling(true);
        }, 500);
      }, 400);
    } else if (
      salonData.how === "Select" &&
      showCon.howDoYouKnowUs === "salonData3"
    ) {
      toast.error(`Please Select Where Did You Know About Us ? `, {
        position: "top-center",
        autoClose: 2000,
        pauseOnHover: true,
        closeOnClick: true,
        theme: "colored",
      });
    } else {
      setShowModalBox(false);
      signUP();
    }
  };

  const ModalboxCollectData = () => {
    return (
      <>
        <div
          style={{
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            position: "fixed",
            backgroundColor: "#ffffff90",
            zIndex: 5,
          }}
        ></div>
        <div className="modal-box-signupPage">
          <img
            id="image1"
            className={controlling ? "scissors3" : control.a1}
            src="/scissors.png"
            alt="scissors"
          />
          <img
            id="image2"
            className={controlling ? "hairdryer3" : control.a2}
            src="/hairdryer.png"
            alt="hairdryer"
          />
          <div
            id="salon-name"
            className={
              showAnimation.SalonName
                ? showCon.salonNameCon
                : showCon.salonNameCon
            }
          >
            <p>Please Enter Your Salon Name</p>
            <input
              placeholder="Enter Salon Name"
              autoFocus
              value={salonData.salonName}
              onChange={(e) => {
                setSalonData({ ...salonData, salonName: e.target.value });
              }}
              type="text"
            />
            <button onClick={handleData} type="button">
              Step 1/5&nbsp;&nbsp;Continue
            </button>
          </div>
          <div id="staff-con" className={showCon.staffNameCon}>
            <p>Please Select Staff Count</p>
            <select
              value={salonData.staffCount}
              onChange={(e) => {
                setSalonData({ ...salonData, staffCount: e.target.value });
              }}
              type="text"
            >
              <option>Select</option>
              <option>1 - 5</option>
              <option>5 - 10</option>
              <option>10 - 20</option>
              <option>25 - 30</option>
              <option>above 30 </option>
            </select>
            <button onClick={handleData} type="button">
              Step 2/5&nbsp;&nbsp;Continue
            </button>
          </div>
          <div id="salon-loc" className={showCon.salonLocation}>
            <p>Please Enter Your Salon Location</p>
            <input
              placeholder="Enter Location"
              autoFocus
              value={salonData.salonLoc}
              onChange={(e) => {
                setSalonData({
                  ...salonData,
                  salonLoc: e.target.value,
                });
              }}
              type="text"
            />
            <button onClick={handleData} type="button">
              Step 3/5&nbsp;&nbsp;Continue
            </button>
          </div>
          <div id="salon-phone" className={showCon.salonPhoneNo}>
            <p>Please Enter Your Mobile Number</p>
            <input
              autoFocus
              type="number"
              value={salonData.phoneNo}
              onChange={(e) => {
                setSalonData({
                  ...salonData,
                  phoneNo: e.target.value,
                });
              }}
              placeholder="Enter MobileNumber"
            />
            <button onClick={handleData} type="button">
              Step 4/5&nbsp;&nbsp;Continue
            </button>
          </div>
          <div id="how-salon" className={showCon.howDoYouKnowUs}>
            <p>Where Did You Know About Us ?</p>
            <select
              value={salonData.how}
              onChange={(e) => {
                setSalonData({ ...salonData, how: e.target.value });
              }}
              type="text"
            >
              <option>Select</option>
              <option>Google</option>
              <option>FaceBook</option>
              <option>Instagram</option>
              <option>Friend</option>
              <option>Other</option>
            </select>
            <button onClick={handleData} type="button">
              Step 5/5&nbsp;&nbsp;Continue
            </button>
          </div>
        </div>
      </>
    );
  };

  const signUpRequest = () => {
    if ((email !== "", password !== "")) {
      if (!email.endsWith("@gmail.com" || "@outlook.com")) {
        toast.error(`Please Enter Valid Email`, {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "colored",
        });
      } else {
        setShowModalBox(true);
        setTimeout(() => {
          setShowAnimation({ ...showAnimation, SalonName: true });
          setShowCon({ ...showCon, salonNameCon: "salonData3" });
          setControling(true);
        }, 1000);
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
              src="/signinpageimage.jpg"
              alt="signupimage"
            />
            <h2>GET STARTED</h2>
          </div>
          <div>
            <h1>Sign Up</h1>
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
        {loadModalBox && <ModalboxCollectData />}
      </div>
    );
  }
};
export default SignUpAdmin;
