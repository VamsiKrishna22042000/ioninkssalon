import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./saloninkshome.css";

const teamData = [
  {
    name: "ION SRAVAN (Managing Director)",
    image: "/ourteam.png",
    description:
      "Drawing on my extensive technical knowledge and experience, I guide the development of SalonInks  platform, ensuring seamless integration, robust servers, and a user-friendly experience for our clients.",
  },
  {
    name: "Glowry chowdhry",
    image: "/ourteam.png",
    description:
      "With a deep understanding of the Back end developement and a passion for customer success I lead SalonInks to provide innovative and secure envoirment that empower businesses to thrive in the digital era.",
  },
  {
    name: "Vamsi Krishna",
    image: "/ourteam.png",
    description:
      "With a deep understanding of the Back end developement and a passion for customer success,I lead SalonInks to provide innovative and secure envoirment that empower businesses to thrive in the digital era.",
  },
  {
    name: "ION SRAVAN (Managing Director)",
    image: "/ourteam.png",
    description:
      "Drawing on my extensive technical knowledge and experience, I guide the development of SalonInks  platform, ensuring seamless integration, robust servers, and a user-friendly experience for our clients.",
  },
  {
    name: "Glowry chowdhry",
    image: "/ourteam.png",
    description:
      "With a deep understanding of the Back end developement and a passion for customer success I lead SalonInks to provide innovative and secure envoirment that empower businesses to thrive in the digital era.",
  },
  {
    name: "Vamsi Krishna",
    image: "/ourteam.png",
    description:
      "With a deep understanding of the Back end developement and a passion for customer success,I lead SalonInks to provide innovative and secure envoirment that empower businesses to thrive in the digital era.",
  },
];

export default function SimpleSlider() {
  var settings1 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
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
          <div className="slider-div">
            <img src={each.image} alt="team-member" />
            <div className="slider-content">
              <strong>{each.name}</strong>
              <p>{each.description}</p>
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
          <div className="slider-div">
            <img src={each.image} alt="team-member" />
            <div className="slider-content">
              <strong>{each.name}</strong>
              <p>{each.description}</p>
            </div>
          </div>
        ))}
      </Slider>
    </>
  );
}
