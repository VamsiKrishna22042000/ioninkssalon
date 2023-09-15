import Detailedview from "../Detailedview";
import "./index.css";

import { ToastContainer, toast } from "react-toastify";

import { withRouter } from "react-router-dom/cjs/react-router-dom.min";

import "react-toastify/dist/ReactToastify.css";

import { Link, Redirect } from "react-router-dom";

import Cookies from "js-cookie";

import { TailSpin } from "react-loader-spinner";

import { BsHandbag } from "react-icons/bs";

import { RiDeleteBinLine } from "react-icons/ri";

import { useState, useEffect } from "react";

import DetailedViewCarousel from "./Detailedviewcarousel";

const sizes = [
  { id: "S", text: "S" },
  { id: "M", text: "M" },
  { id: "L", text: "L" },
  { id: "XL", text: "XL" },
  { id: "2XL", text: "2XL" },
  { id: "3Xl", text: "3XL" },
];

const footwearsizes = [
  { id: "5UK", text: "5UK" },
  { id: "6UK", text: "6UK" },
  { id: "7UK", text: "7UK" },
  { id: "10UK", text: "10UK" },
  { id: "11UK", text: "11UK" },
  { id: "12UK", text: "12UK" },
];

const ratingStars = [
  { id: 1, star1: "☆", star2: "★" },
  { id: 2, star1: "☆", star2: "★" },
  { id: 3, star1: "☆", star2: "★" },
  { id: 4, star1: "☆", star2: "★" },
  { id: 5, star1: "☆", star2: "★" },
];

const FashionDetailedView = (props) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [size, setSize] = useState("");
  const [categories, setCategories] = useState([]);
  const [load, setLoad] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [button, setButton] = useState("make-abook-details");

  const { match } = props;
  const { params } = match;

  const gobackTo = () => {
    const { history } = props;
    if (params.type === "cosmetics") {
      history.push("/beautyzone");
    } else {
      history.push(`/fashioncategory/${params.type}`);
    }
  };

  const changeReview = (event) => {
    setReview(event.target.value);
  };

  const formatDate = (date) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  useEffect(() => {
    getAllCategoryOfProducts();
    getAllCartItems();
  }, []);

  const getAllCartItems = async () => {
    if (
      Cookies.get("jwt_user") === undefined &&
      Cookies.get("jwt_token") === undefined
    ) {
      setCartItems([]);
    } else {
      const response = await fetch(
        `${
          process.env.REACT_APP_ROOT_URL
        }/api/product/getAllProductFromCart/${Cookies.get("jwt_user")}`
      );
      const data = await response.json();

      if (response.ok) {
        setCartItems(data.productCart);
      }
    }
  };

  const getAllCategoryOfProducts = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_ROOT_URL}/api/admin/getAllProduct`
    );
    const data = await response.json();
    if (response.ok === true) {
      setCategories(data.products);
      setLoad(true);
    }
  };

  const selectSize = (event) => {
    setSize(event.target.id);
  };

  const setupRating = (event) => {
    setRating(parseInt(event.target.id));
  };
  const filterItem = categories.filter((each) => each._id === params.id);

  const addReview = async () => {
    if (
      Cookies.get("jwt_user") === undefined &&
      Cookies.get("jwt_token") === undefined
    ) {
      window.location.href = "/login";
    } else {
      if (review === "" && rating > 0) {
        toast.info("Please add Review about the product", {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "colored",
        });
      } else if (review !== "" && rating === 0) {
        toast.info("Please add rating about the product", {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "colored",
        });
      } else if (review === "" && rating === 0) {
        toast.info("Please add Review & Rating about our product", {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "colored",
        });
      } else {
        const url = `${process.env.REACT_APP_ROOT_URL}/api/product/addProductReview`;
        const details = {
          userId: Cookies.get("jwt_user"),
          productId: filterItem[0]._id,
          rating,
          review,
          date: formatDate(new Date()),
        };
        const options = {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(details),
        };

        await fetch(url, options);
        setRating(0);
        document.getElementById("comment-input").value = "";
        getAllCategoryOfProducts();
        toast.success("Review added Successfully", {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "colored",
        });
      }
    }
  };

  const deleteReview = async (event) => {
    const url = `${process.env.REACT_APP_ROOT_URL}/api/product/deleteProductReview`;

    const details = {
      productId: filterItem[0]._id,
      reviewId: event.target.id,
    };

    const opitons = {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
    };

    const response = await fetch(url, opitons);
    if (response.ok) {
      getAllCategoryOfProducts();
    }
    toast.error("Review Deleted", {
      position: "top-center",
      autoClose: 2000,
      pauseOnHover: true,
      closeOnClick: true,
      theme: "colored",
    });
  };
  const goToSelectCategory = () => {
    const { history } = props;
    history.push("/");
  };

  const addProductToCart = async (props) => {
    if (
      Cookies.get("jwt_user") === undefined &&
      Cookies.get("jwt_token") === undefined
    ) {
      window.location.href = "/login";
    } else {
      if (
        params.type === "men" ||
        params.type === "women" ||
        params.type === "kids" ||
        params.type === "footwear"
      ) {
        if (size === "") {
          toast.error("Select Size", {
            position: "top-center",
            autoClose: 2000,
            pauseOnHover: true,
            closeOnClick: true,
            theme: "colored",
          });
        } else {
          setButton("make-abook-details1");
          const url = `${process.env.REACT_APP_ROOT_URL}/api/product/addProductToCart`;
          const details = {
            userId: Cookies.get("jwt_user"),
            size: size,
            productId: params.id,
          };
          const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(details),
          };

          const response = await fetch(url, options);

          if (response.ok) {
            getAllCartItems();
            console.log(params);
            window.location.href = `/fashioncart/fashioncategory/${params.type}/${params.name}/${params.id}`;
          }
        }
      } else {
        setButton("make-abook-details1");
        const url = `${process.env.REACT_APP_ROOT_URL}/api/product/addProductToCart`;
        const details = {
          userId: Cookies.get("jwt_user"),
          productId: params.id,
        };
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(details),
        };

        const response = await fetch(url, options);

        if (response.ok) {
          getAllCartItems();
          console.log(params);
          window.location.href = `/fashioncart/fashioncategory/${params.type}/${params.name}/${params.id}`;
        }
      }
    }
  };

  return load ? (
    <div classname="detailed-view-body">
      <ToastContainer />
      <div style={{ overflow: "hidden" }} className="sukras-header-fashion">
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
        <button onClick={gobackTo} className="arrow-btn" type="button">
          <img className="left-arrow-mobile" src="/backarrow.png" />
        </button>
        <p class="detailed-view-head" style={{ textTransform: "capitalize" }}>
          {filterItem[0].name}
        </p>
        <div className="search-cart">
          <input
            style={{
              borderColor: "transparent",
              backgroundColor: "transparent",
            }}
            className="serch-cart-input"
            placeholder=""
            type="search"
          />
          <button className="search-icon-button"></button>

          <Link
            to={`/fashioncart/fashioncategory/${params.type}/${params.name}/${params.id}`}
          >
            <button className="fashion-count-of-cart-cart">
              {cartItems.length}
            </button>
            <button className="cart-icon-buttonn">
              <img src="/cart.png" alt="cart-icon" className="cart-icon" />
            </button>
            <button className="fashion-cartBag-btn" type="button">
              <img className="fashion-cartBag" src="/cartBag.png" />
            </button>
          </Link>
        </div>
      </div>
      <div className="detailed-view-sub-body">
        <div className="details-view-con">
          <div className="details-view-body">
            <div className="fashion-details-content">
              <DetailedViewCarousel filterItem={filterItem[0]} />
              <h1
                style={{ textTransform: "capitalize" }}
                className="fashion-details-head"
              >
                {filterItem[0].name}
              </h1>

              <div className="selected-rating-con">
                <p className="fashion-selected-rating">
                  <span className="fashion-selected-price">₹ </span>
                  <span className="selected-price-icon">
                    {filterItem[0].price}
                  </span>
                </p>
              </div>
              <div className="selected-rating-con">
                <p className="selected-rating">{filterItem[0].rating}</p>
                <img
                  className="rating-star1"
                  src="/ratingstar.png"
                  alt="rating"
                />
                <p className="selected-rating">
                  ({filterItem[0].reviews} reviews)
                </p>
              </div>
              {params.type === "cosmetics" ? null : params.type === "men" ||
                params.type === "women" ||
                params.type === "kids" ? (
                <p className="fashion-details-about">Select Size</p>
              ) : null}
              {params.type === "cosmetics" ? null : params.type ===
                "footwear" ? (
                <div className="fashion-details-size-selection">
                  {footwearsizes.map((each) => (
                    <button
                      id={each.id}
                      onClick={selectSize}
                      className={
                        each.id === size
                          ? "fashion-size-select1"
                          : "fashion-size-select"
                      }
                      type="button"
                    >
                      {each.text}
                    </button>
                  ))}
                </div>
              ) : params.type === "men" ||
                params.type === "women" ||
                params.type === "kids" ? (
                <div className="fashion-details-size-selection">
                  {sizes.map((each) => (
                    <button
                      id={each.id}
                      onClick={selectSize}
                      className={
                        each.id === size
                          ? "fashion-size-select1"
                          : "fashion-size-select"
                      }
                      type="button"
                    >
                      {each.text}
                    </button>
                  ))}
                </div>
              ) : null}
              <p className="fashion-details-about">Product Details</p>
              <p>{filterItem[0].about}</p>

              <button
                onClick={addProductToCart}
                className={button}
                type="button"
              >
                Add to Cart
              </button>

              <p className="fashion-details-about">Customer Reviews</p>

              {filterItem[0].productReviews.map((each) => (
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
                    <p>{each.date}</p>
                    <button
                      onClick={deleteReview}
                      id={each._id}
                      className={
                        Cookies.get("jwt_user") === each.userId
                          ? "delete-icon"
                          : "dont-delete"
                      }
                      type="button"
                    >
                      <RiDeleteBinLine id={each._id} />
                    </button>
                  </div>
                </div>
              ))}
              <div className="AddComment">
                <h1 className="comment-head">Write your review</h1>
                <textarea
                  onChange={changeReview}
                  id="comment-input"
                  className="add-comment-input"
                  type="text"
                  placeholder="What did you like or dislike about our product."
                />
                <h1 className="rating-head">How would you rate our product?</h1>
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
                <button onClick={addReview} className="add">
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="loader-spinner">
      <TailSpin color={"#F4BD18"} height={70} width={70} />
    </div>
  );
};
export default withRouter(FashionDetailedView);
