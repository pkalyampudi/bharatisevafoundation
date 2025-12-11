
# Donations Backend (Node.js)

1. Create `.env` from `.env.example` and set keys.
2. `npm install`
3. `npm start`
4. Ensure your web root proxies `/create-order`, `/verify-payment`, `/create-subscription` to this server (or deploy both together).

Create a **Plan** in Razorpay Dashboard for monthly donations and set `RAZORPAY_PLAN_ID`.
Enable **Webhooks** (`/webhook`) for `payment.captured`, `order.paid`, `subscription.charged`.
