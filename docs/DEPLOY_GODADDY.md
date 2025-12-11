
# GoDaddy Deployment Guide

## Option A: PHP (Shared Hosting)
1. Log in to cPanel → File Manager → upload `website/` contents to `public_html/`.
2. Upload `backend-php/` files to `public_html/`.
3. In cPanel → SSL/TLS → enable AutoSSL.
4. In cPanel → Cron Jobs (optional): set log rotation, backups.
5. Set environment variables in cPanel or use `.htaccess` `SetEnv`.

Update frontend JS endpoints to `/create-order.php`, `/verify-payment.php`, `/create-subscription.php`.

## Option B: Node.js (if Node Selector available)
1. cPanel → Setup Node.js App → Node 18/20 → Application Root `public_html/app` → Startup `server.js`.
2. Upload `backend-node/` into that root; run `npm install` from Terminal.
3. Serve static website from `public_html/` and proxy donation endpoints via `.htaccess` or subdomain.

## DNS
Point `bharatisevafoundation.org` A record to hosting IP; ensure `www` CNAME to root. Enable HTTPS.

## Razorpay Dashboard
- Generate API keys (Test → Live).
- Create **Plan** for monthly donations.
- Enable **Webhooks** to `/webhook`.
- For automated **80G receipts**, consider Razorpay Payment Pages/Buttons.

## Compliance & Policies
- Publish Privacy, Terms, Refund pages.
- If accepting foreign contributions, ensure FCRA registration/prior permission and reporting.
