const express = require('express');
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

// Make a payment
app.post('/create-payment-intent', async (req, res) => {
  const { paymentMethodId, email, groupId } = req.body;

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

    // Update the 'budget' field in the group document
    const groupRef = db.collection('groups').doc(groupId);
    await groupRef.update({
      budget: admin.firestore.FieldValue.increment(1000 / 100),  // Convert from cents to dollars before adding to the budget
    });

    // Respond with the client secret
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to create payment intent');
  }
});

// Add Payment Method for user
app.post('/add-payment-method', async (req, res) => {
  const paymentMethodId = req.body.paymentMethodId;
  const uid = req.body.uid;  // the user's uid who owns this payment method

  if (!paymentMethodId || !uid) {
      res.status(400).send('Missing paymentMethodId or uid');
      return;
  }

  try {
    const userRef = db.collection('users');

    // Query for the user document with the specified uid
    const snapshot = await userRef.where('uid', '==', uid).get();
  
    if (snapshot.empty) {
      console.log('No matching documents.');
      res.status(400).send('User does not exist');
      return;
    }
  
    let userDoc;
    // Since we expect 'uid' to be unique, there should only be one document in the snapshot
    snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
      userDoc = doc;
    });
  
    // Update the user's document with the new payment method
    await userDoc.ref.update({
      paymentMethods: paymentMethodId
    });

  
    res.status(200).send('Payment method added');
  } catch (err) {
      console.error('Error adding payment method:', err);
      res.status(500).send('Error adding payment method');
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