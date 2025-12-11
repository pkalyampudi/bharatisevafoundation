
async function launchCheckout(order, donor) {
  const rzp = new Razorpay({
    key: order.keyId,
    amount: order.amountPaise,
    currency: 'INR',
    name: 'Rongala Bharati Seva Foundation',
    description: 'Donation',
    order_id: order.orderId,
    prefill: { name: donor.name, email: donor.email, contact: donor.phone },
    notes: { pan: donor.pan || '', address: donor.address || '' },
    handler: async function (response) {
      const verify = await fetch('/verify-payment', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(response)
      });
      const result = await verify.json();
      window.location.href = '/thank-you.html';
    }
  });
  rzp.open();
}

function formData() {
  return {
    amount: Number(document.getElementById('amount').value),
    donor: {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      pan: document.getElementById('pan')?.value || '',
      address: document.getElementById('address')?.value || ''
    }
  };
}

document.getElementById('donateOnce').addEventListener('click', async () => {
  const payload = formData();
  const res = await fetch('/create-order', {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
  });
  const order = await res.json();
  launchCheckout(order, payload.donor);
});

document.getElementById('donateMonthly').addEventListener('click', async () => {
  const payload = formData();
  const res = await fetch('/create-subscription', {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
  });
  const sub = await res.json();
  const rzp = new Razorpay({
    key: sub.keyId,
    subscription_id: sub.subscriptionId,
    name: 'Rongala Bharati Seva Foundation',
    description: 'Monthly Donation',
    prefill: { name: payload.donor.name, email: payload.donor.email, contact: payload.donor.phone },
    notes: { pan: payload.donor.pan || '', address: payload.donor.address || '' }
  });
  rzp.open();
});
