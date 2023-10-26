import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./saloninkshome.css";

const teamData = [
  {
    name: "Linda White",
    image: "/ourteam.png",
    description:
      "“I love the convenience of booking my appointment with SALONINKS. It's so easy!",
  },
  {
    name: "Linda White",
    image: "/ourteam.png",
    description:
      "“I love the convenience of booking my appointment with SALONINKS. It's so easy!",
  },
  {
    name: "Linda White",
    image: "/ourteam.png",
    description:
      "“I love the convenience of booking my appointment with SALONINKS. It's so easy!",
  },
  {
    name: "Linda White",
    image: "/ourteam.png",
    description:
      "“I love the convenience of booking my appointment with SALONINKS. It's so easy!",
  },
  {
    name: "Linda White",
    image: "/ourteam.png",
    description:
      "“I love the convenience of booking my appointment with SALONINKS. It's so easy!",
  },
  {
    name: "Linda White",
    image: "/ourteam.png",
    description:
      "“I love the convenience of booking my appointment with SALONINKS. It's so easy!",
  },
];

export default function TestimonialSlider() {
  var settings1 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  var settings2 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };
  return (
    <>
      <Slider
        className="slide-show1"
        style={{ overflow: "hidden" }}
        {...settings1}
      >
        {teamData.map((each) => (
          <div className="slider-div1">
            <div className="slider-content1">
              <p>What they say</p>

              <h5>{each.description}</h5>
              <div className="customer-data1">
                <img src={each.image} alt="customerImage" />
                <div>
                  <p>{each.name}</p>
                  <h6>Regular Customer (SalonInks)</h6>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
      <Slider
        className="slide-show2"
        style={{ overflow: "hidden" }}
        {...settings2}
      >
        {teamData.map((each) => (
          <div className="slider-div1">
            <div className="slider-content1">
              <p>What they say</p>

              <h5>{each.description}</h5>
              <div className="customer-data1">
                <img src={each.image} alt="customerImage" />
                <div>
                  <p>{each.name}</p>
                  <h6>Regular Customer (SalonInks)</h6>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </>
  );
}
