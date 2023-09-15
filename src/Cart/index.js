import "./index.css";
import Paymentprogress from "./payment";
import Cookies from "js-cookie";

import { withRouter } from "react-router-dom/cjs/react-router-dom.min";

import { TailSpin } from "react-loader-spinner";

import CartItems from "../CartItems";

import { useEffect, useState } from "react";
import ScheduleTime from "../ScheduleTime";

const pageStage = {
  loading: "LOADING",
  success: "SUCCESS",
};

const Cart = (props) => {
  const [progress, setProgress] = useState("Cart");
  const [bookingSlots, setBookingSlots] = useState([]);
  const [loading, setLoading] = useState(pageStage.loading);
  const [cartItemsArr, setCartItemsArr] = useState([]);
  const [TotalPrice, setTotalPrice] = useState(0);
  const [discount, setDiscount] = useState(0);

  const formatdate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);

    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    getCartItems();
  }, []);

  useEffect(() => {
    makeABook();
  }, [progress]);

  useEffect(() => {
    setTotalPrice(0);
    getTotalPrice();
  }, [cartItemsArr]);

  const getTotalPrice = () => {
    cartItemsArr.map((each) => {
      setTotalPrice((prevTotal) => prevTotal + parseInt(each.price));
    });
  };

  const gobackTo = () => {
    const { match, history } = props;
    const { params } = match;
    if (params.zone === "beautyzone") {
      history.replace(`/${params.zone}`);
    } else if (params.details === "details") {
      history.replace(`/${params.zone}/${params.id}/${params.details}`);
    } else {
      history.replace(`/${params.zone}/${params.id}`);
    }
  };

  const getCartItems = async () => {
    const id = Cookies.get("jwt_user");
    const response = await fetch(
      `${process.env.REACT_APP_ROOT_URL}/api/salon/getAllServicesFromCart/${id}`
    );
    const data = await response.json();
    if (response.ok === true) {
      if (data.cart.length > 0) {
        setCartItemsArr(data.cart);
      } else {
        setCartItemsArr([]);
      }
      setLoading(pageStage.success);
    }
  };

  const updateProgress = (value) => {
    console.log(value);
    setProgress(value[0]);
    setBookingSlots(value[1]);
  };

  const ScheduleTimeProgress = (value) => {
    setProgress(value[0]);
  };

  const makeABook = () => {
    const filterIt = [...bookingSlots];
    const obtained = filterIt.filter((each) => typeof each === "object");
    /*console.log(progress)*/
    /*console.log(obtained)*/
    if (progress === "Done") {
      obtained.map(async (each) => {
        const url = `${process.env.REACT_APP_ROOT_URL}/api/user/bookSalon`;
        /*console.log(each.serviceId)*/ const tobeSent = {
          userId: Cookies.get("jwt_user"),
          salonId: "64c1e5b880e7fc21fb096a71",
          serviceId: each.serviceId,
          cartId: each._id,
          time: each.time,
          date: formatdate(new Date(each.date)),
        };
        console.log(tobeSent);
        const options = {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(tobeSent),
        };

        const response = await fetch(url, options);
        const data = await response.json();

        if (response.ok) {
          console.log(data);
          const { history } = props;
          history.replace("/succefullyBooked");
        }
      });
    }
  };

  /*console.log(cartItemsArr)*/
  return loading === pageStage.loading ? (
    <div className="loader-spinner">
      <TailSpin color={"#F4BD18"} height={70} width={70} />
    </div>
  ) : cartItemsArr.length !== 0 ? (
    <div className="Cart-total-con">
      <Paymentprogress
        prog={progress === "Done" ? "Payment" : progress}
        updateProgress={updateProgress}
      />
      <div className="cart-total-body">
        {progress === "Cart" ? (
          <CartItems
            cartItemsArr={cartItemsArr}
            updateProgress={updateProgress}
            getCartItems={getCartItems}
            TotalPrice={TotalPrice}
            discount={discount}
          />
        ) : progress === "Payment" ? (
          <ScheduleTime
            ScheduleTimeProgress={ScheduleTimeProgress}
            TotalPrice={TotalPrice}
            discount={discount}
          />
        ) : (
          <ScheduleTime
            progress={progress}
            ScheduleTimeProgress={ScheduleTimeProgress}
            TotalPrice={TotalPrice}
            discount={discount}
          />
        )}
      </div>
    </div>
  ) : (
    <div className="load-spinner">
      <img className="empty-cart" src="/emptycart.gif" alt="empty-cart" />
      <p className="cart-header">Your Cart is Empty</p>
      <button onClick={gobackTo} className="arrow-btn-progress" type="button">
        <img className="left-arrow-progress" src="/backarrow.png" /> Go Back
      </button>
    </div>
  );
};
export default withRouter(Cart);
