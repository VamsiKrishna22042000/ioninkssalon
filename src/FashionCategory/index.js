import "./index.css";

import { BsHandbag } from "react-icons/bs";

import { Link, withRouter } from "react-router-dom";

import Cookies from "js-cookie";

import { TailSpin } from "react-loader-spinner";

import { useState, useEffect } from "react";

const FashionCategory = (props) => {
  const [subCategory, setSubCategory] = useState([]);
  const [allProducts, setallProducts] = useState([]);
  const [price, setPrice] = useState(0);
  const [load, setLoad] = useState(false);
  const [options, setOptions] = useState({
    price: true,
    discount: true,
    availability: true,
  });
  const [cartItems, setCartItems] = useState([]);
  const { match } = props;
  const { params } = match;
  useEffect(() => {
    getTheCategoryItems();
    getAllOFtheProducts();
    getAllCartItems();
  }, []);

  const goToSelectCategory = () => {
    const { history } = props;
    history.push("/");
  };

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

  const changeOptions = (event) => {
    if (event.target.id === "price") {
      setOptions((prevOptions) => ({
        ...prevOptions,
        price: !prevOptions.price,
      }));
    } else if (event.target.id === "discount") {
      setOptions((prevOptions) => ({
        ...prevOptions,
        discount: !prevOptions.discount,
      }));
    } else if (event.target.id === "availability") {
      setOptions((prevOptions) => ({
        ...prevOptions,
        availability: !prevOptions.availability,
      }));
    }
  };

  const getTheCategoryItems = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_ROOT_URL}/api/admin/getAllCategory/${params.category}`
    );
    const data = await response.json();
    if (response.ok) {
      setSubCategory(data.categories);
    }
  };

  const getAllOFtheProducts = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_ROOT_URL}/api/admin/getAllProduct`
    );
    const da = await res.json();
    if (res.ok) {
      setallProducts(da.products);
      setLoad(true);
    }
  };

  const goback = () => {
    const { history, match } = props;
    const { params } = match;

    if (params.category === "cosmetics") {
      history.push("/beautyzone");
    } else {
      history.push(`/fashionzone`);
    }
  };

  const deleteCookie = () => {
    /* deleteCookie was integrated with both searchIcons*/
    Cookies.remove("jwt_token");
    Cookies.remove("jwt_user");
  };

  const changePrice = (e) => {
    if (e.target.id === "1") {
      setPrice(1);
    } else if (e.target.id === "2") {
      setPrice(2);
    } else if (e.target.id === "3") {
      setPrice(3);
    } else if (e.target.id === "4") {
      setPrice(4);
    } else {
      setPrice(0);
    }
  };

  const filterdItemsBasedOnType = allProducts.filter(
    (each) => each.type === params.category
  );

  const filterBasedOnPrice = filterdItemsBasedOnType.filter((each) => {
    if (price === 1) {
      return parseInt(each.price) < 1000 && each;
    } else if (price === 2) {
      return parseInt(each.price) > 1000 && parseInt(each.price) < 1500 && each;
    } else if (price === 3) {
      return parseInt(each.price) > 1500 && parseInt(each.price) < 2000 && each;
    } else if (price === 4) {
      return parseInt(each.price) > 2000 && parseInt(each.price) < 2500 && each;
    } else {
      return each;
    }
  });

  return load ? (
    <div className="fashion-category">
      <div style={{ overflow: "hidden" }} className="sukras-header-beauty">
        <img className="white-block" src="/whitesquare.png" alt="white-block" />
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
        <button onClick={goback} className="arrow-btn" type="button">
          <img className="left-arrow-mobile" src="/backarrow.png" />
        </button>
        <button
          onClick={deleteCookie}
          className="search-btn-fashion"
          type="button"
        ></button>
        <Link to={`/fashioncart/${params.category}`}>
          <button className="cartBag-btn" type="button">
            <img className="cartBag" src="/cartBag.png" />
          </button>
        </Link>
        <div className="search-cart">
          <input
            style={{ borderColor: "transparent" }}
            className="serch-cart-input"
            placeholder=""
            type="search"
          />
          <button
            onClick={deleteCookie}
            className="search-icon-button"
          ></button>
          <Link to={`/fashioncart/${params.category}`}>
            <button className="fashioncategory-count-of-cart">
              {cartItems.length}
            </button>
            <button className="cart-icon-buttonn">
              <img src="/cart.png" alt="cart-icon" className="cart-icon" />
            </button>
          </Link>
        </div>
      </div>
      <div className="fashion">
        <p>Filters</p>
      </div>
      <div className="fashion-category-main-body">
        <div className="fashion-zone-filter">
          <div className="filter-zone-text">
            <p>Price</p>
            <p
              style={{ marginLeft: "2%" }}
              id="price"
              onClick={changeOptions}
              className={options.price ? "todown" : "toup"}
            >
              ❯
            </p>
          </div>
          <div
            className={
              options.price
                ? "fashion-zone-opitons"
                : "fashion-zone-opitons-disable"
            }
          >
            <div>
              <input
                checked={price === 0 ? true : false}
                onClick={changePrice}
                id="0"
                type="checkbox"
              />
              <lable htmlFor="0">All Products</lable>
            </div>
            <div>
              <input
                checked={price === 1 ? true : false}
                onClick={changePrice}
                id="1"
                type="checkbox"
              />
              <lable htmlFor="1">Under ₹ 1000</lable>
            </div>
            <div>
              <input
                checked={price === 2 ? true : false}
                onClick={changePrice}
                id="2"
                type="checkbox"
              />
              <lable htmlFor="2">₹ 1000 - ₹ 1500</lable>
            </div>
            <div>
              <input
                checked={price === 3 ? true : false}
                onClick={changePrice}
                id="3"
                type="checkbox"
              />
              <lable htmlFor="3">₹ 1500 - ₹ 2000</lable>
            </div>
            <div>
              <input
                checked={price === 4 ? true : false}
                onClick={changePrice}
                id="4"
                type="checkbox"
              />
              <lable htmlFor="4">₹ 2000 - ₹ 2500</lable>
            </div>
          </div>
        </div>
        {filterBasedOnPrice.length > 0 ? (
          <div className="fashion-category-body">
            {filterBasedOnPrice.map(
              (each) =>
                each.active && (
                  <Link
                    to={`/fashioncategory/detailedview/${each.type}/${each.name}/${each._id}`}
                    key={each._id}
                    id={each._id}
                    className="fashion-category-item"
                  >
                    <img
                      className="fashion-category-image"
                      src={each.photos[0]}
                      alt={each.photos[0]}
                    />
                    <p
                      style={{ textTransform: "capitalize" }}
                      className="fashion-item-name"
                    >
                      {each.name}
                    </p>
                    <div className="price-details-off">
                      <p className="fashion-item-price">
                        <span className="fashion-item-name">₹</span>
                        {each.price}
                      </p>
                    </div>
                    <div className="price-details-rating">
                      <p className="fashion-item-star">{each.rating} </p>
                      <img
                        className="fashion-item-star-rating"
                        src="/ratingstar.png"
                        alt="star"
                      />
                      <p className="fashion-item-reviews">
                        ({each.reviews} reviews)
                      </p>
                    </div>
                  </Link>
                )
            )}
          </div>
        ) : (
          <div className="load-spinner">
            <img className="empty-cart" src="/emptycart.gif" alt="empty-cart" />
            <p className="cart-header">No Product's available</p>
          </div>
        )}
      </div>
    </div>
  ) : (
    <div className="loader-spinner">
      <TailSpin color={"#F4BD18"} height={70} width={70} />
    </div>
  );
};
export default withRouter(FashionCategory);
