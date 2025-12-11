
<?php
// create-order.php
// Requires: composer require razorpay/razorpay
require __DIR__ . '/vendor/autoload.php';
use Razorpay\Api\Api;

$api = new Api(getenv('RAZORPAY_KEY_ID'), getenv('RAZORPAY_KEY_SECRET'));
$input = json_decode(file_get_contents('php://input'), true);
$amount = intval($input['amount'] * 100);
$order = $api->order->create([
  'amount' => $amount,
  'currency' => 'INR',
  'receipt' => 'donation_' . time(),
  'notes' => $input['donor'] ?? []
]);
echo json_encode(['orderId' => $order['id'], 'keyId' => getenv('RAZORPAY_KEY_ID'), 'amountPaise' => $order['amount']]);
