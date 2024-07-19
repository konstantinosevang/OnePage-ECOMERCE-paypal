require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;
const paypal = require('./paypal');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.post('/capture', async (req, res) => {
    const orderID = req.body.orderID;

    const request = new paypal.orders.OrdersCaptureRequest(orderID);
    request.requestBody({});

    try {
        const capture = await paypal.client.execute(request);
        res.status(200).json(capture.result);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/', (req, res) => {
    res.render('index', { PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
