import Cookies from "js-cookie";
import "./index.css";

import Footer from "../footer/footer.js";

import { TailSpin } from "react-loader-spinner";

import { useEffect, useState } from "react";

const MyOrders = (props) => {
  const [orders, setOrders] = useState({
    eventOrders: [],
    serviceOrders: [],
    productOrders: [],
  });
  const [load, setLoad] = useState(false);
  useEffect(() => {
    getMyOrders();
  }, []);

  const getMyOrders = async () => {
    setLoad(false);
    const response = await fetch(
      `${process.env.REACT_APP_ROOT_URL}/api/orders/allOrders/${Cookies.get(
        "jwt_user"
      )}`
    );
    const data = await response.json();
    if (response.ok) {
      console.log(data);
      setLoad(true);
      setOrders((prevData) => ({
        ...prevData,
        eventOrders: data.eventOrders,
        serviceOrders: data.serviceOrders,
        productOrders: data.productOrders,
      }));
    }
  };

  const gobackTo = () => {
    const { history, match } = props;
    const { params } = match;
    history.replace(`/${params.zone}`);
  };

  return load ? (
    orders.serviceOrders.length > 0 &&
    orders.eventOrders.length > 0 &&
    orders.productOrders.length > 0 ? (
      <>
        <div className="total-orders">
          <div className="myorders-head">
            <button
              onClick={gobackTo}
              className="order-arrow-btn"
              type="button"
            >
              <img className="order-left-arrow-mobile" src="/backarrow.png" />
            </button>
            <h1>My Orders</h1>
          </div>
          <h1 style={{ marginLeft: 25, color: "#3E3E3E" }}>Services</h1>
          <div className="all-orders">
            {orders.serviceOrders.map((each) => (
              <div className="each-order">
                <img
                  className="each-img"
                  src={each.photos[0]}
                  alt="your services"
                />
                <div className="each-content">
                  <h1
                    style={{
                      textTransform: "capitalize",
                      fontSize: 18,
                      width: 180,
                      display: "-webkit-box",
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {each.name}
                  </h1>
                  <p>₹ {each.price}</p>
                  <p>{each.orderedAt}</p>
                  <p>Time : {each.time}</p>
                </div>
              </div>
            ))}
          </div>
          <h1 style={{ marginLeft: 25, color: "#3E3E3E" }}>Products</h1>
          <div className="all-orders">
            {orders.productOrders.map((each) => (
              <div style={{ position: "relative" }} className="each-order">
                <img
                  className="each-img"
                  src={each.photos[0]}
                  alt="your services"
                />
                <div className="each-content">
                  <h1
                    style={{
                      textTransform: "capitalize",
                      fontSize: 18,

                      marginBottom: 0,
                      width: 180,
                      display: "-webkit-box",
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {each.name}
                  </h1>
                  <p>₹ {each.price * each.count}</p>
                  <p>{each.orderedAt}</p>
                  <p>{`${each.count} ordered`}</p>
                  {each.size !== undefined && (
                    <p
                      style={{
                        position: "absolute",
                        top: 30,
                        right: 10,
                      }}
                    >{`Size : ${each.size}`}</p>
                  )}
                  {each.active ? (
                    <p className="deliverd" style={{ color: "red" }}>
                      On the Way
                    </p>
                  ) : (
                    <p style={{ color: "green" }} className="deliverd">
                      Delivered
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
          <h1 style={{ marginLeft: 25, color: "#3E3E3E" }}>Events</h1>
          <div className="all-orders">
            {orders.eventOrders.map((each) => (
              <div className="each-order">
                <img
                  className="each-img"
                  src={each.image}
                  alt="your services"
                />
                <div className="each-content">
                  <h1
                    style={{
                      textTransform: "capitalize",
                      fontSize: 18,
                      width: 180,
                      display: "-webkit-box",
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {each.eventName}
                  </h1>
                  <p>{each.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <Footer />
        </div>
      </>
    ) : (
      <div className="loader-spinner">
        <img className="empty-cart" src="/emptycart.gif" alt="empty-cart" />
        <p className="cart-header">You did'nt order anything yet</p>
        <button onClick={gobackTo} className="arrow-btn-progress" type="button">
          <img className="left-arrow-progress" src="/backarrow.png" /> Go Back
        </button>
      </div>
    )
  ) : (
    <div className="loader-container-myorders">
      <TailSpin color={"#F4BD18"} height={70} width={70} />
    </div>
  );
};

export default MyOrders;
