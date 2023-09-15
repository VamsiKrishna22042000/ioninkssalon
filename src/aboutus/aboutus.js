import React from "react";

import Footer from "../footer/footer.js";

import "./aboutus.css";

const AboutUs = () => {
  return (
    <>
      <div className="aboutus">
        <h1
          onClick={() => {
            window.location.href = "/";
          }}
          className="arrow-style-aboutus"
        >
          ‹
        </h1>
        <header className="header">
          <h1>About Us - Sukras Salon</h1>
        </header>
        <h1 className="head-about">About Us - Sukras Salon</h1>
        <div className="container">
          <section className="intro">
            <h2 style={{ marginTop: 20, marginBottom: 5 }}>
              Welcome to Sukras Salon
            </h2>
            <p>
              At Sukras Salon, beauty is our passion and your satisfaction is
              our priority. We offer a wide range of exquisite beauty services
              to help you look and feel your best. Our dedicated team of
              professionals is committed to providing you with top-notch
              treatments that leave you feeling rejuvenated and confident.
            </p>
          </section>
          <section className="services">
            <h2 style={{ marginTop: 20, marginBottom: 5 }}>Our Services</h2>
            <ul>
              <li>
                <h3>Bridal Makeovers</h3>
                <div className="service-about">
                  <p className="about-para">
                    Welcome to Sukras Bridal Makeovers, where we weave
                    enchanting tales of beauty on your special day. Our team of
                    skilled artisans is dedicated to translating your bridal
                    dreams into reality. Through in-depth consultations, we
                    delve into your vision, incorporating your style and theme
                    into every detail. From traditional grace to contemporary
                    flair, our makeup artists and hairstylists sculpt
                    personalized looks that reflect your essence. On the big
                    day, our expert hands ensure flawless execution, while our
                    soothing presence fosters a tranquil environment. With
                    meticulous attention, we craft mesmerizing hairstyles and
                    makeup that enhance your features and radiate confidence.
                    Sukras Bridal Makeovers is more than a service; it's an art
                    form that encapsulates your journey. Join us in creating a
                    timeless, unforgettable bridal transformation, where every
                    glance in the mirror evokes awe and joy. Your fairytale
                    begins with us.
                  </p>
                  <img
                    className="about-image"
                    src="/Bridal.jpg"
                    alt="Bridal Makeup"
                  />
                </div>
              </li>
              <li>
                <h3>Nail Art Extensions</h3>
                <div className="service-about">
                  <img className="about-image" src="nail2.jpg" alt="Nail Art" />
                  <p className="about-para">
                    Step into the realm of artistic expression at Sukras Nail
                    Art Extensions, where your fingertips become a canvas of
                    creativity. Our skilled technicians craft stunning nail
                    extensions using top-tier materials like acrylic, gel, and
                    dip powder. From elegant simplicity to intricate designs, we
                    cater to your style and preferences, ensuring each extension
                    is a unique masterpiece. With an eye for detail and a
                    passion for innovation, we transform your nails into
                    captivating works of art that last. Whether it's a special
                    event or your daily flair, our extensions add a touch of
                    glamour to every occasion. At Sukras, we blend technique
                    with imagination, delivering nail art that's both enduring
                    and enchanting. Join us to adorn your nails with stories
                    that reflect your personality, and let your fingertips make
                    an unforgettable statement.
                  </p>
                </div>
              </li>
              <li>
                <h3>Haircare and Styling</h3>
                <div className="service-about">
                  <p className="about-para">
                    Welcome to Sukras Haircare and Styling, where we nurture
                    your locks to shine and create impeccable styles that define
                    you. Our holistic approach combines rejuvenating treatments
                    and expert styling techniques to ensure your hair's health
                    and beauty. From personalized consultations to understand
                    your preferences to recommending the best care routine, we
                    tailor our services to your unique needs. Our skilled
                    stylists bring your visions to life, whether it's a
                    sophisticated updo or a casual beachy wave. We use
                    high-quality products and cutting-edge tools to deliver
                    results that exceed your expectations. At Sukras, we believe
                    that your hair tells a story, and we're here to make that
                    story vibrant and captivating. With every cut, color, and
                    style, we celebrate your individuality, enhancing your
                    confidence and leaving a lasting impression. Embrace the
                    world of Sukras Haircare and Styling, where your tresses are
                    transformed into a canvas of beauty and expression.
                  </p>
                  <img
                    className="about-image"
                    src="hairstyling.jpg"
                    alt="Hair Styling"
                  />
                </div>
              </li>
            </ul>
          </section>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AboutUs;
