import React, { useState } from "react";
// import playStore from "../../../images/playstore.png";
// import appStore from "../../../images/Appstore.png";
import "./Footer.css";

const Footer = () => {
  const d1 = new Date().getFullYear();
  const [year, setyear] = useState(d1);

  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src="https://cdn.mos.cms.futurecdn.net/Q2oLsPvoGLpzWuDqZgzANH.jpg" alt="playstore" />
        <img src="https://www.vectorlogo.zone/logos/apple_appstore/apple_appstore-ar21.png" alt="Appstore" />
      </div>
      <div className="midFooter">
        <h1>ECOMMERCE</h1>
        <p>High Quality is our first priority</p>
        <p>Copyrights {year} &copy; ishikapatel2409</p>
      </div>
      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="https://www.instagram.com/ishika_patel_._/">Instagram</a>
        <a href="https://www.linkedin.com/in/ishika-patel-8a0161210/">LinkedIn</a>
      </div>
    </footer>
  );
};

export default Footer;