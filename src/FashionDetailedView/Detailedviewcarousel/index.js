import { useState, useEffect } from "react";

import "./index.css";

const DetailedViewCarousel = (props) => {
  const { filterItem } = props;
  const { photos, rating } = filterItem;
  const [activeIndex, setActiveIndex] = useState(0);
  const [dots, setDots] = useState([]);

  useEffect(() => {
    getDots();
  }, [photos]);

  const getDots = () => {
    setDots([]);
    for (let index = 0; index < photos.length; index++) {
      setDots((prevDots) => [...prevDots, { id: index }]);
    }
  };

  useEffect(() => {
    const id = setTimeout(() => {
      if (activeIndex === dots.length - 1) {
        setActiveIndex(0);
      } else {
        setActiveIndex(activeIndex + 1);
      }
    }, 3000);

    return () => {
      clearTimeout(id);
    };
  }, [activeIndex]);

  console.log(photos.length);
  console.log(dots.length);
  return (
    <>
      <div className="fashion-carouselImg-con">
        {photos !== "" && photos.length === 1
          ? photos.map((each) => (
              <div
                className="fashion-carousel-content"
                style={{
                  backgroundImage: `url(${each})`,
                }}
              >
                <button className="star-btn" type="button">
                  {rating}
                  <img
                    className="rating-star2"
                    src="/ratingstar.png"
                    alt="rating"
                  />
                </button>
                <div className="fashion-shadow"></div>
              </div>
            ))
          : photos.map((each) => (
              <div
                className="fashion-carousel-content"
                style={{
                  transform: `translate(-${activeIndex * 100}%)`,
                  backgroundImage: `url(${each})`,
                }}
              >
                <button className="star-btn" type="button">
                  {rating}
                  <img
                    className="rating-star2"
                    src="/ratingstar.png"
                    alt="rating"
                  />
                </button>
                <div className="fashion-shadow"></div>
              </div>
            ))}
      </div>
      <div className="fashion-dots-con">
        {dots.map((each) =>
          dots.length === 1 ? (
            <div key={each.id} id={each.id} className="dots"></div>
          ) : (
            <div
              key={each.id}
              id={each.id}
              className={activeIndex === each.id ? "dots" : "dots2"}
            ></div>
          )
        )}
      </div>
    </>
  );
};

export default DetailedViewCarousel;
