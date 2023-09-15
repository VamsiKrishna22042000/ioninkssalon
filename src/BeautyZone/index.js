import "./index.css";

import { TailSpin } from "react-loader-spinner";

import Cookies from "js-cookie";

import { useState, useEffect } from "react";

import Carousel from "../Carousel/index";

import { withRouter } from "react-router-dom/cjs/react-router-dom.min";

import { Link } from "react-router-dom";

import Footer from "../footer/footer";

const Beautyzone = (props) => {
  const [categories, setCategories] = useState("");

  const [load, setLoad] = useState(false);

  const [videos, setVideos] = useState([]);

  /**const [products, setallProducts] = useState([]);*/
  const [itemsInCart, setItemsInCart] = useState([]);
  const [displayProfile, setProfile] = useState(false);

  const [availableServices, setavailServices] = useState([]);

  const [search, setSearch] = useState("");

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

  useEffect(() => {
    getCartItems();
  }, []);

  const settingProfile = () => {
    setProfile(!displayProfile);
  };

  const getCartItems = async () => {
    if (
      Cookies.get("jwt_user") === undefined &&
      Cookies.get("jwt_token") === undefined
    ) {
      setItemsInCart([]);
    } else {
      const response = await fetch(
        `${
          process.env.REACT_APP_ROOT_URL
        }/api/salon/getAllServicesFromCart/${Cookies.get("jwt_user")}`
      );
      const data = await response.json();
      setItemsInCart(data.cart);
    }
  };

  const getTheCategories = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_ROOT_URL}/api/admin/getAllSalon`
    );

    const data = await response.json();

    const res = await fetch(
      `${process.env.REACT_APP_ROOT_URL}/api/admin/getAllServices`
    );

    const da = await res.json();

    if (response.ok === true && res.ok === true) {
      getCartItems();
      setLoad(true);
      setCategories(data.salons[0].categories);

      const filerServices = da.allServices.map((each) => each.service);

      setavailServices(filerServices);
      /*console.log(data.salons[0].categories)*/

      /*console.log(service)*/
    }
  };

  useEffect(() => {
    getTheCategories();
    /**getAllOFtheProducts();*/
  }, []);

  /**const getAllOFtheProducts = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_ROOT_URL}/api/admin/getAllProduct`
    );
    const da = await res.json();
    if (res.ok) {
      setallProducts(da.products);
      setLoad(true);
    }
  };*/

  const goToSelectCategory = () => {
    const { history } = props;
    history.push("/");
  };

  const gobackTo = () => {
    const { history } = props;
    history.push("/");
  };

  const deleteCookie = () => {
    /* deleteCookie was integrated with both searchIcons*/
    Cookies.remove("jwt_token");
    Cookies.remove("jwt_user");
    window.location.reload();
  };

  /**const filterdProductsBasedOnType = products.filter(
    (each) => each.type === "cosmetics"
  );*/

  /**const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(4); // 4 = startIndex + 5*/

  // Function to handle left arrow click
  /**  const handleLeftArrowClick = () => {
    if (startIndex > 0) {
      setStartIndex((prevStartIndex) => prevStartIndex - 5);
      setEndIndex((prevEndIndex) => prevEndIndex - 5);
    }
  };

  const handleRightArrowClick = () => {
    if (endIndex < filterdProductsBasedOnType.length - 1) {
      setStartIndex((prevStartIndex) => prevStartIndex + 5);
      setEndIndex((prevEndIndex) => prevEndIndex + 5);
    }
  }; */

  // Filtered products based on type (cosmetics) as before

  // Slice the products array to display the current range
  /** const visibleProducts = filterdProductsBasedOnType.slice(
    startIndex,
    endIndex + 1
  );*/

  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(0);

  const handleVideoMouseDown = (event) => {
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

  const filterSearch = availableServices.map((each) => {
    if (search === "") {
      return null;
    } else if (each.toLowerCase().startsWith(search.toLowerCase())) {
      return each;
    }
  });

  const fil = filterSearch.filter(
    (each) => each !== null && each !== undefined
  );

  return load ? (
    <>
      <div style={{ overflow: "hidden" }} className="sukras-header-beautyzone">
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
          className="sukraslogobeauty diable-logo"
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
            className="serch-cart-input"
            placeholder="Search Service"
            type="search"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <button className="search-icon-button">
            <img
              src="./search-icon.png"
              alt="search-icon"
              className="search-icon"
            />
          </button>
          <Link to={`/cart/beautyzone`}>
            <button className="count-of-cart">{itemsInCart.length}</button>
            <button className="cart-icon-buttonn">
              <img src="./cart.png" alt="cart-icon" className="cart-icon" />
            </button>
          </Link>
        </div>
      </div>

      <div className="sukras-main-beauty">
        {fil.length > 0 && (
          <div className="serch-cart-container">
            {fil.map((ea) => (
              <Link
                to={`/${ea}/beautyzone/details`}
                className="each-service-each"
              >
                {ea}
              </Link>
            ))}
          </div>
        )}
        <div className={displayProfile ? "profile-block" : "profile-display"}>
          {Cookies.get("jwt_user") === undefined ? (
            <button
              className="log-btn"
              type="button"
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
            style={{
              textDecoration: "none",
            }}
            className="log-btn"
            to={`/myorders/myorders/myorders/beautyzone`}
          >
            My Orders
          </Link>
        </div>
        <div className="beautyzone-body">
          <Carousel />
        </div>

        <div className="beautyzone-body-2">
          {categories.length === 0 ? (
            <div className="service-spinner">
              <TailSpin color={"#F4BD18"} height={70} width={70} />
            </div>
          ) : (
            <>
              <div className="our-services">
                <p className="our-services-head">Our Service's</p>
                {categories.map(
                  (each) =>
                    each.services.length > 0 && (
                      <Link
                        className="services-link"
                        key={each._id}
                        to={`/${each.category}/${each._id}`}
                      >
                        <button
                          key={each._id}
                          className="our-services-btn"
                          id={each._id}
                          type="button"
                        >
                          <img
                            className="our-services-img"
                            src={`${each.categoryImage}`}
                            alt={each.categoryImage}
                          />
                          <p
                            style={{ textTransform: "capitalize" }}
                            className="our-services-name"
                          >
                            {each.category}
                          </p>
                        </button>
                      </Link>
                    )
                )}
              </div>
              <div className="beautyzone-body-2">
                <div className="beauty-cosmetic-head">
                  <h1>Beauty Training</h1>
                </div>
                <div className="training-con">
                  <div
                    className="training"
                    style={{ backgroundImage: `url("/training.png")` }}
                  >
                    <div className="training-content">
                      <div className="image-training-content">
                        <img
                          className="training-image"
                          src="BEAUTYlogo.png"
                          alt="beauty"
                        />
                        <img
                          className="training-image2"
                          src="Traininglogo.png"
                          alt="training"
                        />
                      </div>
                      <h1 className="tining-head1">
                        Indias One Of Best Beauty Academy
                      </h1>
                      <h1 className="tining-head2">
                        Leading Beauty School in Vizianagaram
                      </h1>
                      <p className="tining-head3">
                        Over 80% of our graduates are gainfully employed while
                        the remaining have become enterpruners and employers of
                        labour
                      </p>
                      <button
                        onClick={() => {
                          window.location.href = "/training";
                        }}
                        className="tining-button"
                      >
                        Know More ❯
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="beauty-cosmetic-head">
                <h1 style={{ marginBottom: 10 }}>Our Service videos</h1>
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
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      ></iframe>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/** <div className="beauty-cosmetic-head">
          <h1>Cosmetics</h1>
          <p>
            <Link className="decoration" to={`/fashioncategory/cosmetics`}>
              View All
            </Link>
          </p>
        </div>
        <div className="beauty-cosmetic-products">
          <div className="cosmatic-products-con">
            
            <button
              style={{
                fontSize: "24px",
                borderWidth: "0",
                backgroundColor: "transparent",
              }}
              className="arrow-button left-arrow"
              onClick={handleLeftArrowClick}
              disabled={startIndex === 0}
            >
              ❮
            </button>
            {visibleProducts.map((each) => (
              <Link
                to={`/fashioncategory/detailedview/${each.type}/${each.name}/${each._id}`}
                className="cosmatic-productItem"
              >
                <img
                  className="cosmatic-productImg"
                  src={each.photos[0]}
                  alt={each.category}
                />
                <p className="cosmatic-product-name">{each.name}</p>
              </Link>
            ))}
           
            <button
              style={{
                fontSize: "24px",
                borderWidth: "0",
                backgroundColor: "transparent",
              }}
              className="arrow-button right-arrow"
              onClick={handleRightArrowClick}
              disabled={endIndex === filterdProductsBasedOnType.length - 1}
            >
              ❯
            </button>
          </div>
        </div>
        <div className="beauty-cosmetic-products1">
          <div className="cosmatic-products-con">
            {filterdProductsBasedOnType.map((each) => (
              <Link
                to={`/fashioncategory/detailedview/${each.type}/${each.name}/${each._id}`}
                className="cosmatic-productItem"
              >
                <img
                  className="cosmatic-productImg"
                  src={each.photos[0]}
                  alt={each.category}
                />
                <p className="cosmatic-product-name">{each.name}</p>
              </Link>
            ))}
          </div>
        </div>*/}
        <Footer />
      </div>
    </>
  ) : (
    <div className="loader-spinner">
      <TailSpin color={"#F4BD18"} height={70} width={70} />
    </div>
  );
};
export default withRouter(Beautyzone);
