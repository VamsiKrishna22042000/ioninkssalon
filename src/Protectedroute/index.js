import {
  withRouter,
  Redirect,
  Route,
} from "react-router-dom/cjs/react-router-dom.min";

import Cookies from "js-cookie";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";

const ProtectedRoute = (props) => {
  const [admin, setAdmin] = useState([]);

  useEffect(() => {
    getCustomerData();
  }, []);

  const getCustomerData = async () => {
    const url = `${process.env.REACT_APP_ROOT_URL}/api/admin/getAllUsers`;
    const response = await fetch(url);
    const data = await response.json();
    if (response.ok) {
      const filterdAdmin = data.users.map((each) => {
        return each.isAdmin === true ? each._id : null;
      });
      setAdmin(filterdAdmin);
    }
  };

  const obtainedCookie = Cookies.get("jwt_token");
  const userCookie = Cookies.get("jwt_user");

  if (obtainedCookie === undefined || userCookie === undefined) {
    return <Redirect to="/login" />;
  }

  if (props.location.pathname === "/admindashboard") {
    if (admin.length === 0) {
      getCustomerData();
    } else if (admin.length !== 0) {
      return admin.includes(userCookie) ? (
        <Route {...props} />
      ) : (
        <Redirect to="/" />
      );
    }
  } else {
    return <Route {...props} />;
  }
};

export default withRouter(ProtectedRoute);
