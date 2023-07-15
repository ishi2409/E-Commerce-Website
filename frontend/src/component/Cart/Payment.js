import React, { Fragment, useEffect, useRef, useState } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Typography } from "@material-ui/core";
import { useAlert } from "react-alert";

import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";


import axios from "axios";
import "./payment.css";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { createOrder, clearErrors } from "../../actions/orderAction";
import { useNavigate } from "react-router-dom";


const Payment = () => {
    // const stripe = useStripe();
    // const elements = useElements();
    const dispatch = useDispatch();
    const alert = useAlert();
   
    const payBtn = useRef(null);
    const navigate = useNavigate();
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };
  const [num, setnum] = useState("");
  const [d, setd] = useState("");
  const [cv, setcv] = useState("");

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };
  const JP = (e) => {
     if(e.target.name==="number"){
        setnum(e.target.value);
     }
     if(e.target.name==="date"){
      setd(e.target.value);
   }
    if(e.target.name==="cvv"){
    setcv(e.target.value);
   }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    payBtn.current.disabled = true;
    if (num.length !== 16 || d.length !== 5 || cv.length !== 3 ) {
      alert.error("please fill data properly");
       payBtn.current.disabled = false;
      return;
    }

    try {
      dispatch(createOrder(order));
      navigate("/success");
    }
    catch (error) {
      payBtn.current.disabled = false;
      alert.error("Something went wrong in payment please do again")
    }
    setnum("");
    setd("");
    setcv("");
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <Typography>Card Info</Typography>
          <div>
            <CreditCardIcon />
            {/* <CardNumberElement className="paymentInput" /> */}
            <input type="text" className="paymentInput" name="number" onChange={JP} value={num}  placeholder="xxxx xxxx xxxx xxxx" required autoComplete="off" />
          </div>
          <div>
            <EventIcon />
            {/* <CardExpiryElement className="paymentInput" /> */}
            <input type="text" className="paymentInput" name="date" onChange={JP} value={d} placeholder="MM/DD" required autoComplete="off" />
          </div>
          <div>
            <VpnKeyIcon />
            {/* <CardCvcElement className="paymentInput" /> */}
            <input type="password" className="paymentInput" name="cvv" onChange={JP} value={cv} placeholder="cvv" required autoComplete="off" />
          </div>

          <input
            type="submit"
            value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="paymentFormBtn"
          />
        </form>
      </div>
    </Fragment>
  );
};

export default Payment;

// const config = {
//   headers: {
//     "Content-Type": "application/json",
//   },
// };

  //   const { data } = await axios.post(
    //     "/api/v1/payment/process",
    //     paymentData,
    //     config
    // );
    //   const client_secret = data.client_secret;
    //   console.log(client_secret);

      // if (!stripe || !elements) return;

      // const result = await stripe.confirmCardPayment(client_secret, {
      //   payment_method: {
      //     card: elements.getElement(CardNumberElement),
      //     billing_details: {
      //       name: user.name,
      //       email: user.email,
      //       address: {
      //         line1: shippingInfo.address,
      //         city: shippingInfo.city,
      //         state: shippingInfo.state,
      //         postal_code: shippingInfo.pinCode,
      //         country: shippingInfo.country,
      //       },
      //     },
      //   },
      // });

      // if (result.error) {
      //   payBtn.current.disabled = false;
      //   alert.error(result.error.message);
      // }
      // else {
      //   if (result.paymentIntent.status === "succeeded") {
      //     order.paymentInfo = {
      //       id: result.paymentIntent.id,
      //       status: result.paymentIntent.status,
      //     };
        // } else {
          // alert.error("There's some issue while processing payment ");
        // }
      // }