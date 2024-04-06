import React, { useState } from "react";
// import playStore from "../../../images/playstore.png";
// import appStore from "../../../images/Appstore.png";
import { NavLink } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const d1 = new Date().getFullYear();
  const [year, setyear] = useState(d1);
  const [click, setclick] = useState(true);
  const Clk = () => {
    if (window.innerWidth <= 991) setclick(false);
  };
  return (
    <footer id="footer">
      <div className="details">
        <div className="navLinkDetails">
          <NavLink className="navLinks" to="/contact" onClick={Clk}>
            Contact Us
          </NavLink>
          <NavLink className="navLinks" to="/about" onClick={Clk}>
            About Us
          </NavLink>
        </div>
        <div className="mediaDetails">
          <div style={{ color: "#1e1e27", fontWeight: "400" }}>Follow Us</div>
          <a href="https://www.linkedin.com/in/ishika-patel-8a0161210/">
            LinkedIn
          </a>
          <a href="">Instagram</a>
        </div>
      </div>
      <div className="footerContainer">
        <div className="midFooter">
          <div>High Quality is our first priority</div>
          <div style={{marginTop:'0.5rem'}}>Copyrights {year} &copy; ishikapatel2409</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
