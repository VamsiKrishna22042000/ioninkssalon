import { useState, useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Cookies from "js-cookie";

import { withRouter, Link } from "react-router-dom";

import { BsBorderStyle, BsHandbag } from "react-icons/bs";

import { TailSpin } from "react-loader-spinner";

import "./index.css";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

const pageStage = {
  loading: "LOADING",
  success: "SUCCESS",
};

const SelectedService = (props) => {
  const [loading, setLoading] = useState(pageStage.loading);
  const [arr, setArr] = useState("");
  const [servicesarr, setServicesarr] = useState("");
  const [button, setButton] = useState("");
  const [itemsInCart, setItemsInCart] = useState([]);

  useEffect(() => {
    getCartItems();
  }, []);

  const getCartItems = async () => {
    if (
      Cookies.get("jwt_user") === undefined &&
      Cookies.get("jwt_token") === undefined
    ) {
      setItemsInCart([]);
    } else {
      const id = Cookies.get("jwt_user");
      const response = await fetch(
        `${
          process.env.REACT_APP_ROOT_URL
        }/api/salon/getAllServicesFromCart/${Cookies.get("jwt_user")}`
      );
      const data = await response.json();
      setItemsInCart(data.cart);
    }
  };

  const [idSection, setId] = useState({
    userId: Cookies.get("jwt_user"),
    salonId: "",
  });

  const { match } = props;
  const { params } = match;

  const getServices = async () => {
    const { match } = props;
    const { params } = match;
    /*console.log(params)*/

    const response = await fetch(
      `${process.env.REACT_APP_ROOT_URL}/api/admin/getAllSalon`
    );
    const data = await response.json();
    if (response.ok === true) {
      console.log(arr);
      const particularCategory = data.salons[0].categories.filter(
        (each) => each._id === params.id
      );
      const servicesOfParticularCategory = particularCategory[0].services;
      setServicesarr(servicesOfParticularCategory);
      setLoading(pageStage.success);
      setArr({
        category: particularCategory[0].category,
        id: particularCategory[0]._id,
      });
      setId((prevId) => ({ ...prevId, salonId: data.salons[0]._id }));
    }
  };

  const addToCart = async (event) => {
    if (
      Cookies.get("jwt_user") === undefined &&
      Cookies.get("jwt_token") === undefined
    ) {
      window.location.href = "/login";
    } else {
      setButton(event.target.id);
      const cartDetails = { ...idSection, serviceId: event.target.id };

      const options = {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(cartDetails),
      };

      const url = `${process.env.REACT_APP_ROOT_URL}/api/salon/addServiceToCart`;
      const response = await fetch(url, options);
      /*console.log(response)*/
      if (response.ok === true) {
        getCartItems();
        const { history } = props;
        history.replace(`/cart/${arr.category}/${arr.id}`);
      }
    }
  };

  useEffect(() => {
    const { match } = props;
    const { params } = match;
    setArr(params);
    getServices();
  }, [params]);

  const goback = () => {
    const { history } = props;
    history.push(`/beautyzone`);
  };
  const goToSelectCategory = () => {
    const { history } = props;
    history.push("/");
  };

  return loading === pageStage.loading ? (
    <div className="loader-spinner">
      <TailSpin color={"#F4BD18"} height={70} width={70} />
    </div>
  ) : (
    <div className="selected-category-con">
      <div className="sukras-header-beauty">
        <img
          style={{
            position: "absolute",
            marginLeft: "6.5%",
            zIndex: 5,
          }}
          onClick={goToSelectCategory}
          className="sukraslogobeauty"
          src="/sukraslogo.png"
          alt="Logo Space"
        />
        <img className="white-block" src="/whitesquare.png" alt="white-block" />
        <img
          style={{
            borderRadius: "5px",
          }}
          onClick={goToSelectCategory}
          className="sukraslogobeauty"
          src="/logo3.png"
          alt="Logo Space"
        />
        <button className="arrow-btn" type="button" onClick={goback}>
          <img className="left-arrow-mobile" src="/backarrow.png" />
        </button>

        <button className="location-btn" type="button">
          <img className="location-mobile" src="/location-icon.png" />
        </button>
        <select className="dropdown-con">
          <option>Hyderabad</option>
        </select>
        <button className="search-btn" type="button">
          <img className="search-mobile" src="/search-mobile.png" />
        </button>
        <button className="notification-btn" type="button">
          <img className="notification-mobile" src="/notification-mobile.png" />
        </button>
        <div className="search-cart1">
          <input
            style={{
              borderColor: "transparent",
              backgroundColor: "transparent",
            }}
            className="serch-cart-input"
            placeholder=""
            type="search"
          />
          <button style={{ display: "none" }} className="search-icon-button">
            <img
              src="/search-icon.png"
              alt="search-icon"
              className="search-icon"
            />
          </button>
          <Link to={`/cart/${arr.category}/${arr.id}`}>
            <button className="count-of-cart1">{itemsInCart.length}</button>
            <button className="cart-icon-button1">
              <img src="/cart.png" alt="cart-icon" className="cart-icon1" />
            </button>
          </Link>
        </div>
      </div>
      {servicesarr.length > 0 ? (
        <div className="selected-body">
          {servicesarr.map((each) =>
            each.active ? (
              <div className="selected-body-total">
                <div
                  style={{
                    width: "100%",
                  }}
                  className="selected-body-content"
                >
                  <h1
                    style={{
                      textTransform: "capitalize",
                      width: "80%",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                    className="selected-hea"
                  >
                    {each.service}
                  </h1>
                  <div className="selected-rating-con">
                    <p className="selected-rating">{each.rating}</p>
                    <img
                      className="rating-star"
                      src="/ratingstar.png"
                      alt="rating"
                    />
                    <p className="selected-rating">
                      ({each.reviews.length} reviews)
                    </p>
                  </div>
                  <div className="selected-rating-con">
                    <p className="selected-rating">
                      <span className="selected-price">₹ </span>
                      <span className="selected-price-icon">{each.price}</span>
                    </p>
                    <p className="selected-rating">• {each.time} mins</p>
                  </div>
                  <p
                    style={{
                      width: "78%",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {each.description}
                  </p>
                  <Link to={`/${each.service}/${arr.id}/details`}>
                    <button
                      style={{ marginTop: "2%" }}
                      className="view-details"
                      type="button"
                    >
                      View Details
                    </button>
                  </Link>
                </div>
                <div className="selected-body-book">
                  <img
                    className="selected-image"
                    src={each.image[0]}
                    alt={arr.category}
                  />
                  <button
                    id={each._id}
                    onClick={addToCart}
                    className={button === each._id ? "book-btn1" : "book-btn"}
                    type="button"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            ) : (
              <div className="loader-spinner">
                <img
                  className="empty-cart"
                  src="/emptycart.gif"
                  alt="empty-cart"
                />
                <p className="cart-header">No Service's Available</p>
              </div>
            )
          )}
        </div>
      ) : (
        <div className="load-spinner">
          <img className="empty-cart" src="/emptycart.gif" alt="empty-cart" />
          <p className="cart-header">No Service's Available</p>
        </div>
      )}
    </div>
  );
};

export default withRouter(SelectedService);
