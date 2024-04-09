import React from "react";
import "./Contact.css";
import { Button } from "@material-ui/core";
import Footer from "../Footer/Footer";

const Contact = () => {
  return (
    <>
      <div className="contactContainer">
        <img
          src="https://img.freepik.com/premium-photo/people-connect-through-contact-us-customer-support-hotline-concept-finger-touch-access-contact-icons-email-address-virtual-screen-internet-wifi-represents-digital-communication-banner_143683-12449.jpg"
          alt=""
        />
        <div>
          <div className="contactDiv">
            <div className="contactTitle">Contact Us</div>
            <div className="contactDetail">
              There are many ways to contact us. You may drop us a line, give us
              a call or send an email, choose what suits you the most.
            </div>
            <div className="contactInfo">
              <a>+91 9999999999</a>
              <br />
              <a className="mailBtn" href="mailto:ishikapatel2409@gmail.com">
                <Button>ishikapatel2409@gmail.com</Button>
              </a>
            </div>
            <div className="followDetails">
              <div className="contactTitle">Follow Us</div>
              <a href="">
                <img
                  src="https://images.rawpixel.com/image_png_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjk4Mi1kNS0xMF8xLnBuZw.png"
                  alt=""
                />
              </a>
              <a href="">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/2048px-Instagram_logo_2022.svg.png"
                  alt=""
                />
              </a>
            </div>
          </div>
          <div className="formDiv">
            <div className="formTitle">Get In Touch With Us!</div>
            <div class="name">
              <div class="form-floating inp" style={{marginRight:'1rem'}}>
                <input
                  type="text"
                  required
                  class="form-control"
                  id="floatingFirstName"
                  autocomplete="off"
                  placeholder="FirstName"
                  formControlName="firstName"
                />
                <label for="floatingFirstName">First name*</label>
              </div>
              <div class="form-floating inp">
                <input
                  type="text"
                  required
                  class="form-control"
                  id="floatingLastName"
                  autocomplete="off"
                  placeholder="LastName"
                  formControlName="lastName"
                />
                <label for="floatingLastName">Last name*</label>
              </div>
            </div>
            <div class="other">
              <div class="form-floating inp">
                <input
                  type="email"
                  required
                  class="form-control"
                  id="floatingEmail"
                  autocomplete="off"
                  placeholder="Email"
                  formControlName="email"
                />
                <label for="floatingEmail">Email Address*</label>
              </div>
              <div class="textInp">
                <div class="form-floating">
                  <textarea
                    name=""
                    id="floatingTextArea"
                    cols="30"
                    rows="10"
                    class="form-control"
                    placeholder="Write..."
                    formControlName="query"
                  ></textarea>
                  <label for="floatingTextArea">Write Your query here*</label>
                </div>
              </div>
              <div class="buttonDiv">
                <button onClick="onSubmit()">SUBMIT</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
