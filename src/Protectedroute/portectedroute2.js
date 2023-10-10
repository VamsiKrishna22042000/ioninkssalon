import Cookies from "js-cookie";

import { Route, Redirect } from "react-router-dom";

const Protectedroute2 = (props) => {
  const alreadySignIn = Cookies.get("jwt_admin");
  const userName = Cookies.get("jwt_user");
  const userToken = Cookies.get("jwt_token");
  const salonId = Cookies.get("jwt_salonId");
  if (
    alreadySignIn === undefined ||
    userName === undefined ||
    userToken === undefined ||
    salonId === undefined
  ) {
    return <Redirect to="/loginadmin" />;
  } else if (alreadySignIn !== undefined) {
    return <Route {...props} />;
  }
};

export default Protectedroute2;
