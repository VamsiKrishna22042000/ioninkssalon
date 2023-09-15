import { useState, useEffect } from "react";

import "./index.css";

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [banners, setBanners] = useState([]);
  const [dots, setDots] = useState([]);

  useEffect(() => {
    getBanners();
  }, []);

  const getBanners = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_ROOT_URL}/api/admin/getAllBanners`
    );
    const data = await response.json();
    console.log(data);
    if (response.ok === true) {
      const bannersDestructure = data.banners.filter((each) => ({
        id: each._id,
        image: each.image,
        offer: each.offer,
        text: each.text,
        link: each.link,
        btn: "Shop Now   ❯",
      }));
      const filterdBanners = bannersDestructure.filter(
        (each) => each.category === "beauty"
      );
      setBanners(filterdBanners);
    }
  };

  useEffect(() => {
    getDots();
  }, [banners]);

  const getDots = () => {
    setDots([]);
    for (let index = 0; index < banners.length; index++) {
      setDots((prevDots) => [...prevDots, { id: index }]);
    }
  };

  useEffect(() => {
    const id = setTimeout(() => {
      if (activeIndex === banners.length - 1) {
        setActiveIndex(0);
      } else {
        setActiveIndex(activeIndex + 1);
      }
    }, 3000);

    return () => {
      clearTimeout(id);
    };
  }, [activeIndex]);

  return (
    <>
      <div className="carouselImg-con">
        {banners !== "" &&
          banners.map((each) => (
            <div
              key={each._id}
              id={each.id}
              className="fashionzone-carousel-content"
              style={{
                transform: `translate(-${activeIndex * 100}%)`,
                backgroundImage: `url(${each.image})`,
              }}
            >
              <div className="shadow"></div>
            </div>
          ))}
      </div>
      <div className="dots-con">
        {dots.map((each) => (
          <div
            key={each.id}
            id={each.id}
            className={activeIndex === each.id ? "dots" : "dots2"}
          ></div>
        ))}
      </div>
    </>
  );
};

export default Carousel;
