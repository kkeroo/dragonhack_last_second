const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');
const port = 5000;

let serviceAccount = require('./data.json');

let admin = require('firebase-admin');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
const db = admin.firestore();

// Middleware
app.use(express.json());

// Use body-parser middleware to parse JSON request bodies
app.use(bodyParser.json());

// Enable CORS for all origins
app.use(cors());

// Routes
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.post('/create-payment-intent', async (req, res) => {
  const { paymentMethodId, email } = req.body;

  if (!paymentMethodId) {
    res.status(400).send('Missing payment method ID');
    return;
  }

  if (!email) {
    res.status(400).send('Missing email');
    return;
  }

  try {
    // Check if customer with the provided email already exists
    const existingCustomers = await stripe.customers.list({ email: email });

    let customerId;

    if (existingCustomers.data.length) {
      // If customer already exists, get their ID
      customerId = existingCustomers.data[0].id;
    } else {
      // If customer does not exist, create a new customer
      const customer = await stripe.customers.create({ email: email });
      customerId = customer.id;
    }

    // Attach the payment method to the customer
    await stripe.paymentMethods.attach(paymentMethodId, { customer: customerId });

    // Set the payment method as the default for the customer
    await stripe.customers.update(customerId, { invoice_settings: { default_payment_method: paymentMethodId } });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000,  // amount in the smallest currency unit (cents for USD)
      currency: 'usd',
      customer: customerId,
      payment_method: paymentMethodId,
      off_session: true,  // Indicates that the customer is not in your checkout flow at the time of this payment attempt
      confirm: true,  // Automatically confirm the payment
    });

    // Respond with the client secret
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to create payment intent');
  }
});

// Registration
app.post('/register', (req, res) => {
    const user = {
        uid: req.body.uid,
        email: req.body.email,
        username: req.body.username
    };
    const users = db.collection('users');
    users.add(user).then(doc => {
        console.log('User document created with ID:', doc.id);
        res.status(201).send('User document created');
    }).catch(err => {
        console.error('Error creating user document:', err);
        res.status(500).send('Error creating user document');
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});