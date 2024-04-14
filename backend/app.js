const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");
const cors = require("cors");
const paypal = require("paypal-rest-sdk");

const errorMiddleware = require("./middleware/error");

// Config
// if (process.env.NODE_ENV !== "PRODUCTION") {
require("dotenv").config({ path: "backend/config/config.env" });
// }

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(cors());

// Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

paypal.configure({
  mode: "sandbox",
  client_id:process.env.CLIENT_ID,
  client_secret:process.env.CLIENT_SECRET,
});

app.post("/api/v1/payment", async (req, res) => {
  let data;
  try {
    let create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: "http://localhost:4000/success",
        cancel_url: "http://localhost:4000/failed",
      },
      transactions: [
        {
          item_list: {
            items: [
              {
                name: "item",
                sku: "item",
                price: "1.00",
                currency: "USD",
                quantity: 1,
              },
            ],
          },
          amount: {
            currency: "USD",
            total: "1.00",
          },
          description: "This is the payment description.",
        },
      ],
    };

    await paypal.payment.create(create_payment_json, function (error, payment) {
      if (error) {
        throw error;
      } else {
        console.log("Create Payment Response");
        // console.log(payment);
        data = payment;
        res.json(data);
      }
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/success", async (req, res) => {
  try {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    const execute_payment_json = {
      payer_id: payerId,
      transactions: [
        {
          amount: {
            currency: "USD",
            total: "1.00",
          },
        },
      ],
    };

    paypal.payment.execute(
      paymentId,
      execute_payment_json,
      function (error, payment) {
        if (error) {
          console.log(error);
          return res.redirect("/failed");
        } else {
          console.log("Execute Payment Response");
          // console.log(payment);
          const response = JSON.stringify(payment);
          const parsedResponse = JSON.parse(response);

          const transactions = parsedResponse.transactions[0];

          console.log("transactions", transactions);

          return res.redirect("http://localhost:3000/success");
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
});

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
