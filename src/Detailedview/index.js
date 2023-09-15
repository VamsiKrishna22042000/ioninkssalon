import { withRouter, Link, Redirect } from "react-router-dom";

import { BsHandbag } from "react-icons/bs";

import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";

import { TailSpin } from "react-loader-spinner";

import "./index.css";

import { RiDeleteBinLine } from "react-icons/ri";

import Cookies from "js-cookie";

const ratingStars = [
  { id: 1, star1: "☆", star2: "★" },
  { id: 2, star1: "☆", star2: "★" },
  { id: 3, star1: "☆", star2: "★" },
  { id: 4, star1: "☆", star2: "★" },
  { id: 5, star1: "☆", star2: "★" },
];

const pageStage = {
  loading: "LOADING",
  success: "SUCCESS",
};

const DetailedView = (props) => {
  const [detailsarr, setArr] = useState("");
  const [review, setReview] = useState([]);

  const [button, setButtonColor] = useState("make-abook-details");
  const [button2, setButtonColor2] = useState("add");
  const [idSection, setId] = useState({
    userId: Cookies.get("jwt_user"),
    salonId: "",
    serviceId: "",
  });

  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const [loading, setLoading] = useState(pageStage.loading);

  const [serviceDetails, setDetails] = useState("");

  const [itemsInCart, setItemsInCart] = useState([]);
  const [showque, setQue] = useState({ que1: false, que2: false, que3: false });

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
        `${process.env.REACT_APP_ROOT_URL}/api/salon/getAllServicesFromCart/${id}`
      );
      const data = await response.json();
      setItemsInCart(data.cart);
    }
  };

  const { match } = props;
  const { params } = match;

  useEffect(() => {
    setArr(params);
    getServices();
  }, []);

  const getServices = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_ROOT_URL}/api/admin/getAllSalon`
    );
    const data = await response.json();
    if (response.ok === true) {
      const obtainedServices = data.salons[0].categories.map(
        (each) => each.services
      );
      const filterdService = obtainedServices.map((each) =>
        each.filter((eachService) => eachService.service === params.category)
      );
      const servicefilterd = filterdService.filter((each) => each.length === 1);
      setDetails(servicefilterd[0][0]);
      setReview(servicefilterd[0][0].reviews);
      /*console.log(servicefilterd[0][0].reviews)*/
      setId((prevId) => ({
        ...prevId,
        salonId: data.salons[0]._id,
        serviceId: servicefilterd[0][0]._id,
      }));
      setLoading(pageStage.success);
    }
  };

  const gobackToNodetails = () => {
    const { history } = props;
    if (detailsarr.id === "beautyzone") {
      history.push("/beautyzone");
    } else {
      history.push(`/${detailsarr.category}/${detailsarr.id}`);
    }
  };

  const addCommentFunction = (event) => {
    setComment(event.target.value);
    setButtonColor2("add");
    setTimeout(() => {
      setButtonColor2("add");
    }, 1000);
  };

  const goToSelectCategory = () => {
    const { history } = props;
    history.push("/");
  };

  const formatDate = (date) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const addCommentButton = async (props) => {
    if (
      Cookies.get("jwt_user") === undefined &&
      Cookies.get("jwt_token") === undefined
    ) {
      window.location.href = "/login";
    } else {
      if (comment === "" && rating > 0) {
        toast.info("Please add Review about our service", {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "colored",
        });
      } else if (comment !== "" && rating === 0) {
        toast.info("Please rate our service", {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "colored",
        });
      } else if (comment === "" && rating === 0) {
        toast.info("Please add Review & Rating about our service", {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "colored",
        });
      } else {
        const newReview = {
          ...idSection,
          review: comment,
          rating,
          date: formatDate(new Date()),
        };

        /*console.log(newReview)*/

        const url = `${process.env.REACT_APP_ROOT_URL}/api/user/addServiceReview`;

        const options = {
          method: "POST",

          headers: {
            "Content-Type": "application/json",

            Authorization: "Bearer " + Cookies.get("jwt_token"),
          },

          body: JSON.stringify(newReview),
        };

        const response = await fetch(url, options);
        if (response.ok) {
          setComment("");
          setRating(0);
          document.getElementById("comment-input").value = "";
          getServices();
          toast.success("Review added Successfully", {
            position: "top-center",
            autoClose: 2000,
            pauseOnHover: true,
            closeOnClick: true,
            theme: "colored",
          });
        }

        /*console.log(response)*/
      }
    }
  };

  const deleteReview = async (event) => {
    console.log(event.target.id);

    const deleteTheReview = {
      salonId: idSection.salonId,
      reviewId: event.target.id,
    };

    /*console.log(deleteTheReview)*/

    const url = `${process.env.REACT_APP_ROOT_URL}/api/user/deleteServiceReview`;

    const options = {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("jwt_user"),
      },

      body: JSON.stringify(deleteTheReview),
    };

    const response = await fetch(url, options);
    const data = await response.json();
    if (response.ok) {
      getServices();
    }
    getServices();
    toast.error("Review Deleted", {
      position: "top-center",
      autoClose: 2000,
      pauseOnHover: true,
      closeOnClick: true,
      theme: "colored",
    });
  };

  const setupRating = (event) => {
    setRating(parseInt(event.target.id));
  };

  const addToCart = async () => {
    if (
      Cookies.get("jwt_user") === undefined &&
      Cookies.get("jwt_token") === undefined
    ) {
      window.location.href = "/login";
    } else {
      setButtonColor("make-abook-details1");
      const cartDetails = { ...idSection };

      const options = {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(cartDetails),
      };

      const url = `${process.env.REACT_APP_ROOT_URL}/api/salon/addServiceToCart`;
      const response = await fetch(url, options);
      if (response.ok === true) {
        setButtonColor("make-abook-details1");
        getCartItems();
        const { history } = props;
        history.replace(
          `/cart/${detailsarr.category}/${detailsarr.id}/details`
        );
      }
    }
  };

  /*console.log(idSection)*/

  return loading === pageStage.loading ? (
    <div className="loader-spinner">
      <TailSpin color={"#F4BD18"} height={70} width={70} />
    </div>
  ) : (
    <div id={serviceDetails._id} className="details-view-con">
      <ToastContainer />
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
        <img
          style={{
            borderRadius: "5px",
          }}
          onClick={goToSelectCategory}
          className="sukraslogobeauty"
          src="/logo3.png"
          alt="Logo Space"
        />
        <button
          style={{ paddingTop: "3%", paddingLeft: "1%" }}
          className="arrow-btn"
          type="button"
          onClick={gobackToNodetails}
        >
          <img className="left-arrow-mobile" src="/backarrow.png" />
        </button>
        <p
          style={{ textTransform: "capitalize" }}
          className="sukras-beauty-selected"
        ></p>
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
        <div className="search-cart2">
          <input
            style={{
              backgroundColor: "transparent",
              borderColor: "transparent",
            }}
            className="serch-cart-input"
            type="search"
          />
          <button className="search-icon-button"></button>
          <Link to={`/cart/${detailsarr.category}/${detailsarr.id}/details`}>
            <button className="count-of-cart2">{itemsInCart.length}</button>
            <button className="cart-icon-button2">
              <img src="/cart.png" alt="cart-icon" className="cart-icon2" />
            </button>
          </Link>
        </div>
      </div>
      <div className="details-view-body">
        <div className="details-content">
          <img
            className="details-img"
            src={serviceDetails.image[0]}
            alt="details-img"
          />
          <h1 style={{ textTransform: "capitalize" }} className="details-head">
            {detailsarr.category}
          </h1>
          <div className="selected-rating-con">
            <p className="selected-rating">{serviceDetails.rating}</p>
            <img className="rating-star1" src="/ratingstar.png" alt="rating" />
            <p className="selected-rating">
              ({serviceDetails.reviews.length} reviews)
            </p>
          </div>
          <div className="selected-rating-con">
            <p className="selected-rating">
              <span className="selected-price">₹ </span>
              <span className="selected-price-icon">
                {serviceDetails.price}
              </span>
            </p>
            <p className="selected-rating">• {serviceDetails.time} mins</p>
          </div>
          <p>{serviceDetails.description}</p>

          <p className="details-about">What’s Included?</p>
          <p>{serviceDetails.whatsIncluded}</p>

          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          ></div>
          <p className="details-about">FAQ's?</p>
          <div>
            <p className="questions">
              {serviceDetails.faq1.que1}
              {showque.que1 ? (
                <span
                  onClick={(prevQue) =>
                    setQue({ ...prevQue, que1: !showque.que1 })
                  }
                  style={{
                    transform: `rotate(-90deg)`,
                    display: "inline-block",
                    marginLeft: 15,
                    cursor: "pointer",
                  }}
                >
                  ❯
                </span>
              ) : (
                <span
                  onClick={(prevQue) =>
                    setQue({ ...prevQue, que1: !showque.que1 })
                  }
                  style={{
                    transform: `rotate(90deg)`,
                    display: "inline-block",
                    marginLeft: 15,
                    cursor: "pointer",
                  }}
                >
                  ❯
                </span>
              )}
            </p>
            {showque.que1 && (
              <p style={{ width: "90%" }}>{serviceDetails.faq1.ans1}</p>
            )}
          </div>
          <div>
            <p className="questions">
              {serviceDetails.faq2.que2}
              {showque.que2 ? (
                <span
                  onClick={(prevQue) =>
                    setQue({ ...prevQue, que2: !showque.que2 })
                  }
                  style={{
                    transform: `rotate(-90deg)`,
                    display: "inline-block",
                    marginLeft: 15,
                    cursor: "pointer",
                  }}
                >
                  ❯
                </span>
              ) : (
                <span
                  onClick={(prevQue) =>
                    setQue({ ...prevQue, que2: !showque.que2 })
                  }
                  style={{
                    transform: `rotate(90deg)`,
                    display: "inline-block",
                    marginLeft: 15,
                    cursor: "pointer",
                  }}
                >
                  ❯
                </span>
              )}
            </p>
            {showque.que2 && (
              <p style={{ width: "90%" }}>{serviceDetails.faq2.ans2}</p>
            )}
          </div>
          <div>
            <p className="questions">
              {serviceDetails.faq3.que3}
              {showque.que3 ? (
                <span
                  onClick={(prevQue) =>
                    setQue({ ...prevQue, que3: !showque.que3 })
                  }
                  style={{
                    transform: `rotate(-90deg)`,
                    display: "inline-block",
                    marginLeft: 15,
                    cursor: "pointer",
                  }}
                >
                  ❯
                </span>
              ) : (
                <span
                  onClick={(prevQue) =>
                    setQue({ ...prevQue, que3: !showque.que3 })
                  }
                  style={{
                    transform: `rotate(90deg)`,
                    display: "inline-block",
                    marginLeft: 15,
                    cursor: "pointer",
                  }}
                >
                  ❯
                </span>
              )}
            </p>
            {showque.que3 && (
              <p style={{ width: "90%" }}>{serviceDetails.faq3.ans3}</p>
            )}
          </div>
          <Link to={`/${detailsarr.category}/${detailsarr.id}/details`}>
            <button onClick={addToCart} className={button} type="button">
              Book Appointment
            </button>
          </Link>
          <hr />
          <p className="details-about">Customer Reviews</p>

          {review.map((each) => (
            <div className="review-item">
              <div className="review-rating">
                <p>{each.rating}</p>
                <img
                  className="rating-star2"
                  src="/ratingstar.png"
                  alt="rating"
                />
              </div>
              <p className="review-para">{each.review}</p>
              <div className="review-person">
                <p>{each.userId}</p>
                <div className="divider"></div>
                <p>{each.date.toString()}</p>
                <button
                  id={each._id}
                  className={
                    Cookies.get("jwt_user") === each.userId
                      ? "delete-icon"
                      : "dont-delete"
                  }
                  type="button"
                >
                  <RiDeleteBinLine onClick={deleteReview} id={each._id} />
                </button>
              </div>
            </div>
          ))}
          <div className="AddComment">
            <h1 className="comment-head">Write your review</h1>
            <textarea
              id="comment-input"
              onChange={addCommentFunction}
              className="add-comment-input"
              type="text"
              placeholder="What did you like or dislike about our service."
            />
            <h1 className="rating-head">How would you rate our service?</h1>
            <div className="rating-box">
              {ratingStars.map((each) => (
                <button
                  onClick={setupRating}
                  id={each.id}
                  className={
                    each.id > rating ? "rating-button" : "rating-button2"
                  }
                  type="button"
                >
                  {each.id > rating ? each.star1 : each.star2}
                </button>
              ))}
            </div>
            <button className={button2} onClick={addCommentButton}>
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(DetailedView);
