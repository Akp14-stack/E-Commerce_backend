const Razorpay = require('razorpay');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// POST /api/payment/order
const createRazorpayOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, // convert to paisa
      currency: 'INR',
      receipt: `order_rcptid_${Math.floor(Math.random() * 10000)}`,
    };

    const order = await razorpay.orders.create(options);
    res.json({ status: true, order });
  } catch (err) {
    console.error('❌ Razorpay order error:', err);
    res.status(500).json({ status: false, message: 'Failed to create Razorpay order' });
  }
};

module.exports = { createRazorpayOrder };
