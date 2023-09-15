import "./footer.css";

import { MdLocationPin } from "react-icons/md";

import { MdPhone } from "react-icons/md";

import { MdEmail } from "react-icons/md";

import { ImEarth } from "react-icons/im";

import { IoLogoFacebook, IoLogoInstagram } from "react-icons/io";

import { AiOutlineCopyrightCircle } from "react-icons/ai";

import { FaWhatsappSquare } from "react-icons/fa";

import { IoLogoYoutube } from "react-icons/io";

import { BiLogoTwitter } from "react-icons/bi";

const Footer = () => {
  return (
    <div className="footer-con">
      <div className="logo-con">
        <img className="footer-image" src="/logo3.png" alt="sukraslogo" />
        <div className="fotter-select">
          <p
            onClick={() => {
              window.location.href = "/";
            }}
            style={{ borderLeft: "hidden", cursor: "pointer" }}
            className="footer-para"
          >
            Home
          </p>
          <p
            onClick={() => {
              window.location.href = "/aboutus";
            }}
            style={{
              borderLeft: "hidden",
              borderRight: "hidden",
              cursor: "pointer",
            }}
            className="footer-para"
          >
            About
          </p>
        </div>
        <p style={{ fontSize: 13, marginTop: 0 }}>
          Sukras
          <AiOutlineCopyrightCircle
            style={{
              fontSize: 10,
              marginRight: 3,
              marginLeft: 3,
              cursor: "pointer",
            }}
          />
          all rights reserved @ 2023
        </p>
      </div>
      <div className="logo-con2">
        <div className="location-footer">
          <div>
            <MdLocationPin
              onClick={() => {
                window.location.href =
                  "https://www.google.com/maps/place/Sukras/@18.1086017,83.3988453,17z/data=!3m1!4b1!4m6!3m5!1s0x3a3be56c0f4509ab:0x96fbd530e1344a14!8m2!3d18.1086017!4d83.4014202!16s%2Fg%2F11ssyz4fjt?entry=ttu";
              }}
              style={{
                backgroundColor: "#d4af37",
                color: "000000",
                borderRadius: "50%",
                padding: "0.5%",
                fontSize: 20,
                cursor: "pointer",
              }}
            />
          </div>
          <p style={{ fontSize: 13, marginLeft: 5, marginTop: 0 }}>
            2nd Floor, Seshadri Complex, Lower Tankbund Rd, opp. Mayura Hotel,
            near RTC complex, Gadi Khana, Balaji Nagar, Vizianagaram, Andhra
            Pradesh 535002
          </p>
        </div>
        <div className="location-footer">
          <div>
            <MdPhone
              style={{
                backgroundColor: "#d4af37",
                color: "000000",
                borderRadius: "50%",
                padding: "0.5%",
                fontSize: 20,
                cursor: "pointer",
              }}
            />
          </div>

          <p style={{ fontSize: 13, marginLeft: 5, marginTop: 0 }}>
            +91 7789919999
          </p>
        </div>
        <div className="location-footer">
          <MdEmail
            onClick={() => {
              window.location.href =
                "https://mail.google.com/mail/u/0/#inbox?compose=new";
            }}
            style={{
              backgroundColor: "#d4af37",
              color: "000000",
              borderRadius: "50%",
              padding: "0.5%",
              fontSize: 20,
              cursor: "pointer",
            }}
          />
          <p style={{ fontSize: 13, marginLeft: 5, marginTop: 0 }}>
            sudha.sukras@gmail.com
          </p>
        </div>
        <div className="location-footer">
          <ImEarth
            onClick={() => {
              window.location.href = "https://www.sukrass.com/";
            }}
            style={{
              backgroundColor: "#d4af37",
              color: "000000",
              borderRadius: "50%",
              padding: "0.5%",
              fontSize: 20,
              cursor: "pointer",
            }}
          />
          <p style={{ fontSize: 13, marginLeft: 5, marginTop: 0 }}>
            sukrass.com
          </p>
        </div>
      </div>
      <div className="logo-con3">
        <p>About Sukras</p>
        <p style={{ fontSize: 13, marginTop: 5, marginBottom: 5 }}>
          Sukra's Salon Shop offers a luxurious escape into beauty and
          relaxation. With a blend of top-notch treatments, skilled stylists,
          and a serene ambiance, it's a haven for self-care. Discover a
          rejuvenating experience that leaves you feeling pampered and
          confident."
        </p>
        <p style={{ marginTop: 5 }}>Our Social Media</p>
        <div style={{ marginTop: 5 }}>
          <BiLogoTwitter
            onClick={() => {
              window.location.href = "https://twitter.com/sukras_official";
            }}
            style={{ fontSize: 25, marginLeft: 10, cursor: "pointer" }}
          />
          <IoLogoFacebook
            onClick={() => {
              window.location.href =
                "https://m.facebook.com/profile.php?id=100092844217013";
            }}
            style={{ fontSize: 25, marginLeft: 10, cursor: "pointer" }}
          />
          <IoLogoYoutube
            onClick={() => {
              window.location.href =
                "https://www.youtube.com/@Sukras_official/";
            }}
            style={{ fontSize: 25, marginLeft: 10, cursor: "pointer" }}
          />
          <IoLogoInstagram
            onClick={() => {
              window.location.href =
                "https://www.instagram.com/sukrasofficial/";
            }}
            style={{ fontSize: 25, marginLeft: 10, cursor: "pointer" }}
          />
          <FaWhatsappSquare
            onClick={() => {
              window.location.href = "https://wa.link/855kde";
            }}
            style={{ fontSize: 25, marginLeft: 10, cursor: "pointer" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
