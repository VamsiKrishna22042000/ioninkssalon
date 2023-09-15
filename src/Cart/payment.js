import "./payment.css";

import { BsCheck2 } from "react-icons/bs";

import { withRouter } from "react-router-dom/cjs/react-router-dom.min";

const Paymentprogress = (props) => {
  const { prog } = props;

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

  return (
    <div className="payment-progress">
      <div className="head-progress">
        <button onClick={gobackTo} className="arrow-btn-progress" type="button">
          <img className="left-arrow-progress" src="/backarrow.png" />
        </button>
        <p className="progress-title">{prog}</p>
      </div>
      <div className="cart-progress">
        <div className="progress">
          <p className="progress-para1">
            {prog === "Cart" ? 1 : <BsCheck2 className="check-mark" />}
          </p>
          <p className="progress-para2">Cart</p>
        </div>
        <p className="progress-bar1"> - - - - - - - - - - - - - - -</p>
        <div className="progress">
          <p className={prog === "Cart" ? "progress-para15" : "progress-para3"}>
            {prog === "Cart" ? 2 : <BsCheck2 className="check-mark" />}
          </p>
          <p className="progress-para2">Payment</p>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Paymentprogress);
