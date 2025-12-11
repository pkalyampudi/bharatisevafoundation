
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Razorpay from 'razorpay';
import crypto from 'crypto';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const razor = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET });

// Create order for one‑time donation
app.post('/create-order', async (req, res) => {
  try {
    const { amount, donor } = req.body;
    const order = await razor.orders.create({
      amount: Math.round(Number(amount) * 100),
      currency: 'INR',
      receipt: `donation_${Date.now()}`,
      notes: { ...(donor || {}) }
    });
    res.json({ orderId: order.id, keyId: process.env.RAZORPAY_KEY_ID, amountPaise: order.amount });
  } catch (e) {
    console.error('Order error', e);
    res.status(500).json({ error: 'order_create_failed' });
  }
});

// Verify payment signature
app.post('/verify-payment', (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body || {};
  const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
  hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = hmac.digest('hex');
  if (digest === razorpay_signature) {
    // TODO: Persist transaction and email receipt
    return res.json({ status: 'success' });
  }
  return res.status(400).json({ status: 'failed' });
});

// Create subscription (for monthly donations via card/netbanking or UPI AutoPay when supported)
app.post('/create-subscription', async (req, res) => {
  try {
    const planId = process.env.RAZORPAY_PLAN_ID; // create plan in dashboard
    const { donor, amount } = req.body;
    // For variable amount subscriptions, create dynamic plan or use subscriptions with addons.
    const subscription = await razor.subscriptions.create({
      plan_id: planId,
      customer_notify: 1,
      total_count: 0, // ongoing
      notes: { ...(donor || {}), source: 'website' }
    });
    res.json({ subscriptionId: subscription.id, keyId: process.env.RAZORPAY_KEY_ID });
  } catch (e) {
    console.error('Subscription error', e);
    res.status(500).json({ error: 'subscription_create_failed' });
  }
});

// Webhook receiver
app.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  // Validate x-razorpay-signature against webhook secret (set in dashboard)
  res.status(200).send('ok');
});

app.listen(process.env.PORT || 4000, () => console.log('Donations server running'));
