const checkoutNodeJssdk = require('@paypal/checkout-server-sdk');
require('dotenv').config();

let clientId = process.env.PAYPAL_CLIENT_ID;
let clientSecret = process.env.PAYPAL_CLIENT_SECRET;

let environment = new checkoutNodeJssdk.core.SandboxEnvironment(clientId, clientSecret);
let client = new checkoutNodeJssdk.core.PayPalHttpClient(environment);

module.exports = { client, orders: checkoutNodeJssdk.orders };
