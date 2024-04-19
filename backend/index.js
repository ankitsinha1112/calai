const express = require('express');
const Razorpay = require('razorpay');
const shortid = require('shortid');
var cors = require('cors') 
const app = express();
const port = process.env.PORT || 5000;

// Initialize razorpay object
const razorpay = new Razorpay({
  key_id: "rzp_test_2n6ppe8SunQpbi",
  key_secret: "w4zIkbw4KiYbJwbg5nvaZGIW",
});
app.use(cors())
app.use(express.json());

//available ports
app.get("/", (_req, res) => {
  res.send({ message: "Hello from Api." });
});

app.post('/create-order', async (req, res) => {
  const payment_capture = 1;
  const amount = 1;
  const currency = "USD";
  const options = {
    amount: (amount * 100).toString(),
    currency,
    receipt: shortid.generate(),
    payment_capture,
  };

  try {
    const response = await razorpay.orders.create(options);
    res.status(200).json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
