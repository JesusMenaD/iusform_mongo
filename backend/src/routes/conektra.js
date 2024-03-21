const { Router } = require('express');
const conekta = require('conekta');
const router = Router();

router.get('/', async (req, res) => {
  conekta.api_key = 'key_vGTQtxJea07Dqk3JQD5XlUY';
  conekta.locale = 'es';

  conekta.Order.create({
    currency: 'MXN',
    customer_info: {
      name: 'Jesus',
      phone: '+522213425514',
      email: 'mcmena636@gmaill.com'
    },
    line_items: [{
      name: 'Box of Cohiba S1s',
      unit_price: 35000,
      quantity: 1
    }],
    charges: [{
      payment_method: {
        type: 'oxxo_cash'
        // token_id: 'tok_test_visa_4242'
      }
    }]
  }).then(function (result) {
    console.log(result.toObject());
    res.status(200).json(result.toObject());
  }, function (error) {
    console.log(error);
    res.status(500).json(error);
  });
});

router.get('/checkout', async (req, res) => {
  conekta.api_key = 'key_vGTQtxJea07Dqk3JQD5XlUY';
  conekta.locale = 'es';

  const order = await conekta.Order.create({
    currency: 'MXN',
    customer_info: {
      customer_id: 'cus_2vcnQ9UZzNzuD7VuJ'
    },
    line_items: [{
      name: 'Box of Cohiba S1s',
      unit_price: 3500,
      quantity: 1
    }],
    // shipping_lines: [{
    //   amount: 0
    // }],
    checkout: {
      type: 'HostedPayment',
      success_url: 'https://iusform.com/',
      failure_url: 'https://iusform.com/',
      allowed_payment_methods: ['cash', 'card', 'bank_transfer'],
      multifactor_authentication: false,
      monthly_installments_enabled: true,
      monthly_installments_options: [3, 6, 9, 12, 18],
      expires_at: 1710979200,
      redirection_time: 4
    },
    shipping_contact: {
      phone: '+522213425514',
      receiver: 'psd',
      address: {
        street1: '102 poniente',
        country: 'MX',
        postal_code: '72200'
      }
    }
  });

  console.log(order.toObject());
  res.status(200).json(order.toObject());
});

router.get('/customer', async (req, res) => {
  conekta.api_key = 'key_vGTQtxJea07Dqk3JQD5XlUY';
  conekta.locale = 'es';

  const customer = await conekta.Customer.find('cus_2vcnQ9UZzNzuD7VuJ') || null;

  console.log(customer.toObject());
  res.status(200).json(customer.toObject());
});

module.exports = router;
