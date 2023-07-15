import React, { useEffect, useState } from "react";
import {Elements, useStripe} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Payment from "./Payment";
import axios from "axios";

const Pay = () => {
    // const stripe = useStripe();
    const [stripeApiKey, setStripeApiKey] = useState("");
    async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
    }
    useEffect(() => {
        getStripeApiKey();
    });
    return (
        <>
                <Payment />
        </>
    );
 
}

export default Pay;