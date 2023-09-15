import "./index.css";

import { BsCheck2 } from "react-icons/bs";

import { TailSpin } from "react-loader-spinner";

import { useState, useEffect } from "react";

import CartItemsFashion from "./cartItems";

import Cookies from "js-cookie";
import SelectPayment from "./selectPayment";

const FashionCart = (props) => {
  const [progress, setProgress] = useState("Cart");

  const [cartItems, setCartItems] = useState([]);
  const [totalFashionItemsPrice, setTotalPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [load, setLoad] = useState(false);

  const { match, history } = props;
  const { params } = match;

  useEffect(() => {
    getAllCartItems();
  }, []);

  useEffect(() => {
    settingTotalPrice();
  }, [cartItems]);

  const getAllCartItems = async () => {
    const response = await fetch(
      `${
        process.env.REACT_APP_ROOT_URL
      }/api/product/getAllProductFromCart/${Cookies.get("jwt_user")}`
    );
    const data = await response.json();

    if (response.ok) {
      setCartItems(data.productCart);
      setLoad(true);
    }
  };

  const settingTotalPrice = () => {
    setTotalPrice(0);
    cartItems.map((each) => {
      console.log(each);
      setTotalPrice((prevPrice) => prevPrice + each.price * each.count);
    });
  };

  const gobackTo = () => {
    const { match, history } = props;
    const { params } = match;
    if (params.zone === "fashionzone") {
      history.replace(`/${params.zone}`);
    } else if (params.fashioncategory === "fashioncategory") {
      history.replace(
        `/fashioncategory/detailedview/${params.type}/${params.name}/${params.id}`
      );
    } else {
      history.replace(`/fashioncategory/${params.zone}`);
    }
  };

  const updateProgress = (value) => {
    if (progress === "Cart") {
      setProgress("Payment");
    } else if (value === "PaymentDone") {
      const { history } = props;
      history.replace("/succefullyBookedFashion");
    }
  };

  return load ? (
    cartItems.length === 0 ? (
      <div className="load-spinner">
        <img className="empty-cart" src="/emptycart.gif" alt="empty-cart" />
        <p className="cart-header">Your Cart is Empty</p>
        <button onClick={gobackTo} className="arrow-btn-progress" type="button">
          <img className="left-arrow-progress" src="/backarrow.png" /> Go Back
        </button>
      </div>
    ) : (
      <>
        <div className="payment-progress">
          <div className="head-progress">
            <button
              onClick={gobackTo}
              className="arrow-btn-progress"
              type="button"
            >
              <img className="left-arrow-progress" src="/backarrow.png" />
            </button>
            <p className="progress-title">{progress}</p>
          </div>
          <div className="cart-progress">
            <div className="progress">
              <p className="progress-para1">
                {progress === "Cart" ? 1 : <BsCheck2 className="check-mark" />}
              </p>
              <p className="progress-para2">Cart</p>
            </div>
            <p className="progress-bar1"> - - - - - - - - - - - - - - -</p>
            <div className="progress">
              <p
                className={
                  progress === "Cart" ? "progress-para15" : "progress-para3"
                }
              >
                {progress === "Payment" ? (
                  2
                ) : (
                  <BsCheck2 className="check-mark" />
                )}
              </p>
              <p className="progress-para2">Payment</p>
            </div>
          </div>
        </div>
        <div className="fashion-total-container-payment">
          {progress === "Cart" ? (
            <CartItemsFashion
              cartItems={cartItems}
              getAllCartItems={getAllCartItems}
            />
          ) : (
            <SelectPayment
              cartItems={cartItems}
              updateProgress={updateProgress}
              progress={progress}
            />
          )}

          <div style={{ marginTop: "5%" }} className="price-details">
            <p className="price-head1">PriceDetials</p>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: "2.5%",
              }}
            >
              <p className="actual-price">Actual Price</p>
              <p className="price1">
                <span className="actual-price">₹</span>
                {totalFashionItemsPrice}
              </p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: "2.5%",
              }}
            >
              <p className="total-discount">Total Discount</p>
              <p className="total-discount">
                <span className="actual-price">-₹</span>
                {discount}
              </p>
            </div>
            <div
              className="total-cart-price"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: "2.5%",
                paddingTop: "2.5%",
                marginBottom: "5%",
              }}
            >
              <p className="total-price-head">Total</p>
              <p className="total-price-head">
                <span className="actual-price">₹</span>
                {totalFashionItemsPrice - discount}
              </p>
            </div>
            <button
              onClick={updateProgress}
              className={
                progress === "Cart"
                  ? "fashion-proceed-to-schedule"
                  : "fashion-proceed-button-disable"
              }
              type="button"
            >
              Proceed
            </button>
          </div>
        </div>
      </>
    )
  ) : (
    <div className="loader-spinner">
      <TailSpin color={"#F4BD18"} height={70} width={70} />
    </div>
  );
};

export default FashionCart;
