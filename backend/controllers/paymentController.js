const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  console.log("im in");
  console.log("im in");
  const myPayment = await stripe.paymentIntents.create({
    // amount: 1000,
    // currency: "inr",
    // metadata: {
      // company: "Ecommerce",
    // },
  });
  console.log("hey buddy");
  res.status(200)
        .json({ success: true, client_secret: myPayment.client_secret });
    
});

exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
    
    res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
    
});