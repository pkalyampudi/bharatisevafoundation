
<?php
// create-subscription.php
require __DIR__ . '/vendor/autoload.php';
use Razorpay\Api\Api;
$api = new Api(getenv('RAZORPAY_KEY_ID'), getenv('RAZORPAY_KEY_SECRET'));
$input = json_decode(file_get_contents('php://input'), true);
$planId = getenv('RAZORPAY_PLAN_ID');
$sub = $api->subscription->create([
  'plan_id' => $planId,
  'customer_notify' => 1,
  'total_count' => 0,
  'notes' => $input['donor'] ?? []
]);
echo json_encode(['subscriptionId' => $sub['id'], 'keyId' => getenv('RAZORPAY_KEY_ID')]);
