import "./index.css";

import { useState, useEffect } from "react";

import { TailSpin } from "react-loader-spinner";

const Bookings = () => {
  const [myorders, setOrders] = useState([]);

  const [load, setLoad] = useState(false);
  const [buttonToggle, setToggle] = useState("");

  const toggleProduct = () => {};

  useEffect(() => {
    getMyOrders();
  }, []);

  const getMyOrders = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_ROOT_URL}/api/admin/appoinments`
    );
    const data = await response.json();
    if (response.ok) {
      const filterdProducts = data.salons.filter(
        (each) => each["eventName"] !== undefined
      );
      setOrders(filterdProducts);
      setLoad(true);
    }
  };

  return load ? (
    <>
      <div className="dashboard-component2">
        <div className="avialable-products-head">
          <div className="product-image">
            <p className="product-heads">Image</p>
          </div>

          <div className="product-name">
            <p className="product-heads">Event Name</p>
          </div>

          <div className="product-action">
            <p className="product-heads">User Name</p>
          </div>
          <div className="product-toggle">
            <p className="product-heads">Count of Guests</p>
          </div>

          <div className="product-action">
            <p className="product-heads">Category</p>
          </div>
          <div className="product-action">
            <p className="product-heads">State</p>
          </div>
          <div className="product-action">
            <p className="product-heads">Country</p>
          </div>
          <div className="product-action">
            <p className="product-heads">Booking Date</p>
          </div>
        </div>
        {myorders.map((each) => (
          <div key={each._id} id={each._id} className="avialable-products">
            <div className="product-image">
              <img
                className="productimage"
                src={each.image}
                alt="productimage"
              />
            </div>

            <div className="product-name">
              <p style={{ textTransform: "capitalize" }}>{each.eventName}</p>
            </div>
            <div className="product-action">
              <p style={{ textAlign: "center" }}>{each.yourName}</p>
            </div>
            <div id={each._id} className="product-toggle">
              <p style={{ textTransform: "capitalize" }}>
                {each.NumberOfGuest}
              </p>
            </div>

            <div className="product-action">
              <p style={{ textTransform: "capitalize" }}>{each.categories}</p>
            </div>
            <div className="product-action">
              <p style={{ textAlign: "center" }}>{each.state}</p>
            </div>
            <div className="product-action">
              <p style={{ textAlign: "center" }}>{each.country}</p>
            </div>
            <div className="product-action">
              <p>{each.date}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  ) : (
    <div className="loader-spinner-admin">
      <TailSpin color={"#F4BD18"} height={70} width={70} />
    </div>
  );
};
export default Bookings;
