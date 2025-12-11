
# Donations Backend (PHP)

1. In cPanel, set environment variables `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_PLAN_ID` (optional).
2. Upload these PHP files to `public_html/`.
3. Run `composer require razorpay/razorpay` via SSH or local then upload `vendor/`.
4. Frontend calls:
   - POST `/create-order.php`
   - POST `/verify-payment.php`
   - POST `/create-subscription.php` (optional)
