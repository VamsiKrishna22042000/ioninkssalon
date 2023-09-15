import FashionZoneCarousel from "../FashionzoneCarousel";
import "./index.css";

import { TailSpin } from "react-loader-spinner";

import Cookies from "js-cookie";

import { useState, useEffect } from "react";

import Footer from "../footer/footer.js";

import { Link } from "react-router-dom";

const FashionZone = (props) => {
  const [categories, setCategories] = useState([]);
  const [load, setLoad] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [displayProfile, setProfile] = useState(false);
  const [videos, setVideos] = useState([]);
  const [availableproducts, setProducts] = useState([]);

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_ROOT_URL}/api/admin/videosApi`
    );
    const data = await response.json();
    if (response.ok) {
      setVideos(data.videos);
    }
  };

  const gobackTo = () => {
    const { history } = props;
    history.push("/");
  };

  const settingProfile = () => {
    setProfile(!displayProfile);
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
      `${process.env.REACT_APP_ROOT_URL}/api/admin/getAllCategory`
    );

    const data = await response.json();
    const res = await fetch(
      `${process.env.REACT_APP_ROOT_URL}/api/admin/getAllProduct`
    );
    const da = await res.json();
    if (response.ok === true && res.ok === true) {
      setCategories(data.categories);
      setProducts(da.products);
      setLoad(true);
    }
  };
  const goToSelectCategory = () => {
    const { history } = props;
    history.push("/");
  };
  const deleteCookie = () => {
    /* deleteCookie was integrated with both searchIcons*/
    Cookies.remove("jwt_token");
    Cookies.remove("jwt_user");
  };

  const filterCosmetics = categories.filter(
    (each) => each.type !== "cosmetics"
  );

  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(0);
  const [search, setSearch] = useState("");

  const handleVideoMouseDown = (event) => {
    console.log(event.button);
    if (event.button === 0) {
      setDragging(true);
      setStartX(event.clientX);
      setSliderPosition(currentX);
    }
  };

  const handleVideoMouseUp = (event) => {
    console.log(event.button);
    if (event.button === 0) {
      setDragging(false);
    }
  };

  const handleVideoMouseMove = (event) => {
    if (dragging) {
      const deltaX = event.clientX - startX;
      const newSliderPosition = sliderPosition + deltaX;

      const VIDEO_WIDTH = 550; // Width of each video slide in pixels
      const CONTAINER_WIDTH = window.innerWidth; // Uses the width of the screen of the particular device
      const totalVideosWidth = videos.length * VIDEO_WIDTH;

      // Calculate the maximum allowed slider position based on the videos array length
      const maxSliderPosition = CONTAINER_WIDTH - totalVideosWidth;

      // Restrict the slider position within the range of videos array
      if (newSliderPosition > 0) {
        setCurrentX(0);
      } else if (newSliderPosition < maxSliderPosition) {
        setCurrentX(maxSliderPosition);
      } else {
        setCurrentX(newSliderPosition);
      }
    }
  };

  let f = availableproducts.map((each) => [each.type, each.name, each._id]);

  let fil = f.filter(
    (each) =>
      search !== "" &&
      each[1].toLowerCase().startsWith(search.toLowerCase()) &&
      each
  );

  return load ? (
    <>
      <div style={{ overflow: "hidden" }} className="sukras-header-fashionzone">
        <img
          className="sukraslogosukras diable-logo"
          src="./logo3.png"
          alt="Logo Space"
          onClick={goToSelectCategory}
        />
        <img
          style={{
            position: "absolute",
            marginLeft: "5.5%",
            marginBottom: "1.5%",
          }}
          onClick={goToSelectCategory}
          className="sukraslogobeauty"
          src="./sukraslogo.png"
          alt="Logo Space"
        />
        <button onClick={gobackTo} className="arrow-btn" type="button">
          <img className="left-arrow-mobile" src="./backarrow.png" />
        </button>
        <button className="location-btnn" type="button">
          <img className="location-mobilee" src="./location-icon.png" />
        </button>
        <select className="dropdown-container">
          <option>Vizianagaram</option>
        </select>

        <button className="user-btn" type="button">
          <img className="user" src="./user.png" />
        </button>
        <button
          onClick={settingProfile}
          className="arrowdown-btn"
          type="button"
        >
          <img className="arrow" src="./arrowdown.png" />
        </button>

        <div className="search-cart">
          <input
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            className="serch-cart-input"
            placeholder="Search Product"
            type="search"
          />
          <button onClick={deleteCookie} className="search-icon-button">
            <img
              src="./search-icon.png"
              alt="search-icon"
              className="search-icon"
            />
          </button>
          <Link to={`/fashioncart/fashionzone`}>
            <button className="count-of-cart">{cartItems.length}</button>
            <button className="cart-icon-buttonn">
              <img src="./cart.png" alt="cart-icon" className="cart-icon" />
            </button>
          </Link>
        </div>
      </div>
      <div className="sukras-main-beauty">
        {fil.length > 0 && (
          <div className="serch-cart-container1">
            {fil.map((ea) => (
              <Link
                to={`/fashioncategory/detailedview/${ea[0]}/${ea[1]}/${ea[2]}`}
                className="each-service-each"
              >
                {ea[1]}
              </Link>
            ))}
          </div>
        )}
        <div className="beautyzone-body">
          <div className={displayProfile ? "profile-block" : "profile-display"}>
            {Cookies.get("jwt_user") === undefined ? (
              <button
                type="button"
                className="log-btn"
                onClick={() => {
                  window.location.href = "/login";
                }}
                style={{ marginTop: 5 }}
              >
                Log In
              </button>
            ) : (
              <button
                className="log-btn"
                type="button"
                onClick={deleteCookie}
                style={{ marginTop: 5 }}
              >
                Log Out
              </button>
            )}
            <Link
              className="log-btn"
              style={{ textDecoration: "none" }}
              to={`/myorders/myorders/myorders/beautyzone`}
            >
              My Orders
            </Link>
          </div>
          <FashionZoneCarousel />
        </div>
        <div className="beautyzone-body-2">
          {categories === "" ? (
            <div className="service-spinner">
              <TailSpin color={"#F4BD18"} height={70} width={70} />
            </div>
          ) : (
            <>
              <div className="beauty-cosmetic-head">
                <h1>Our Fashion videos</h1>
              </div>
              <div className="beauty-cosmetic-products3">
                <div
                  onMouseDown={handleVideoMouseDown}
                  onMouseMove={handleVideoMouseMove}
                  onMouseUp={handleVideoMouseUp}
                  style={{
                    transform: `translateX(${currentX}px)`,
                    transition: dragging ? "none" : "transform 0.3s ease",
                  }}
                  className="cosmatic-products-con"
                >
                  {videos.map((each) => (
                    <div className="cosmatic-videoItem">
                      <iframe
                        style={{ cursor: "pointer" }}
                        className="cosmatic-productImg"
                        width="560"
                        height="315"
                        src={each.link}
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen="true"
                      ></iframe>
                    </div>
                  ))}
                </div>
              </div>
              <div className="our-services">
                <p className="our-services-head">Find Your Fashion</p>
                {filterCosmetics.map((each) => (
                  <Link to={`/fashioncategory/${each.type}`}>
                    <button
                      key={each._id}
                      className="our-services-btn"
                      id={each._id}
                      type="button"
                    >
                      <img
                        className="our-services-img"
                        src={`${each.image}`}
                        alt={each.categoryImage}
                      />
                      <p
                        style={{ textTransform: "capitalize" }}
                        className="our-services-name"
                      >
                        {each.type}
                      </p>
                    </button>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <div className="loader-spinner">
      <TailSpin color={"#F4BD18"} height={70} width={70} />
    </div>
  );
};

export default FashionZone;
