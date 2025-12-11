
<?php
// verify-payment.php
$input = json_decode(file_get_contents('php://input'), true);
$orderId = $input['razorpay_order_id'] ?? '';
$paymentId = $input['razorpay_payment_id'] ?? '';
$signature = $input['razorpay_signature'] ?? '';
$expected = hash_hmac('sha256', $orderId . '|' . $paymentId, getenv('RAZORPAY_KEY_SECRET'));
echo json_encode(['status' => ($expected === $signature ? 'success' : 'failed')]);
