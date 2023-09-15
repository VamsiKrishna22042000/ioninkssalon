import Cookies from "js-cookie";

import { Route, Redirect } from "react-router-dom";

const Protectedroute2 = (props) => {
  const alreadySignIn = Cookies.get("jwt_admin");
  if (alreadySignIn === undefined) {
    return <Redirect to="/loginadmin" />;
  } else if (alreadySignIn !== undefined) {
    return <Route {...props} />;
  }
};

export default Protectedroute2;
