import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import Jp from '../../../images/Jp.jpeg'
const About = () => {
  window.scrollTo(0, 0);
  const visitInstagram = () => {
    window.location = "https://www.instagram.com/ishika_patel_._/";
  };
  return (
    <div className="aboutSection">
      <div className="aboutSectionContainer">
        About Us Page
      </div>
    </div>
  );
};

export default About;