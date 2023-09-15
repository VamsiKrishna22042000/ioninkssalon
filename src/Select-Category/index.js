import { withRouter } from "react-router-dom/cjs/react-router-dom.min";

import "./index.css";

const SelectCategory = (props) => {
  const moveToHomePage = (event) => {
    const { history } = props;
    history.push(`/${event.target.id}`);
  };

  return (
    <div className="sukras-main-sukras">
      <div className="sukras-header-sukras">
        <img className="sukraslogosukras1" src="./logo3.png" alt="Logo Space" />
        <img
          className="sukraslogosukras1"
          src="./sukraslogo.png"
          alt="Logo Space"
        />
      </div>

      <div className="sukras-home-sukras">
        <div
          id="beautyzone"
          onClick={moveToHomePage}
          className="sukras-content-container"
        >
          <img
            id="beautyzone"
            onClick={moveToHomePage}
            className="sukras-content-image1"
            src="./beautyzone2.png"
          />
          <h1
            id="beautyzone"
            onClick={moveToHomePage}
            style={{ textAlign: "center", cursor: "pointer" }}
          >
            Beauty Zone
          </h1>
          <p
            id="beautyzone"
            onClick={moveToHomePage}
            style={{ textAlign: "center", cursor: "pointer" }}
            className="sukras-content-para"
          >
            Elevate your beauty at Sukras BeautyZone, where our seasoned
            professionals curate personalized salon experiences, delivering
            exquisite makeovers that rejuvenate your glow and spirit.
          </p>
          <button
            id="beautyzone"
            onClick={moveToHomePage}
            style={{ cursor: "pointer" }}
            className="content-button-sukrass"
          >
            Proceed <span style={{ marginLeft: 10 }}>❯</span>
          </button>
        </div>

        <div
          id="fashionzone"
          onClick={moveToHomePage}
          className="sukras-content-container"
        >
          <img
            id="fashionzone"
            onClick={moveToHomePage}
            className="sukras-content-image2"
            src="./fashionzone2.png"
          />
          <h1
            id="fashionzone"
            onClick={moveToHomePage}
            style={{ textAlign: "center", cursor: "pointer" }}
          >
            Fashion Zone
          </h1>
          <p
            id="fashionzone"
            onClick={moveToHomePage}
            style={{ textAlign: "center", cursor: "pointer" }}
            className="sukras-content-para"
          >
            Dive into the world of style and elegance at Fashion Zone. Our
            trend-setting collection and attentive stylists converge to redefine
            your fashion journey, ensuring you stand out with confidence and
            panache.
          </p>
          <button
            id="fashionzone"
            onClick={moveToHomePage}
            style={{ cursor: "pointer" }}
            className="content-button-sukrass"
          >
            Proceed <span style={{ marginLeft: 10 }}>❯</span>
          </button>
        </div>

        <div
          id="eventManagement"
          onClick={moveToHomePage}
          className="sukras-content-container"
        >
          <img
            id="eventManagement"
            onClick={moveToHomePage}
            className="sukras-content-image3"
            src="./eventmanagement2.png"
          />
          <h1
            id="eventManagement"
            onClick={moveToHomePage}
            style={{ textAlign: "center", cursor: "pointer" }}
          >
            Event Managemet
          </h1>
          <p
            id="eventManagement"
            onClick={moveToHomePage}
            style={{ textAlign: "center", cursor: "pointer" }}
            className="sukras-content-para"
          >
            Welcome to Event Management by Sukras: Your dreams, our expertise.
            From concept to execution, we craft unforgettable experiences,
            turning your occasions into cherished memories.
          </p>
          <button
            id="eventManagement"
            onClick={moveToHomePage}
            style={{ cursor: "pointer" }}
            className="content-button-sukrass"
          >
            Proceed <span style={{ marginLeft: 10 }}>❯</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default withRouter(SelectCategory);
