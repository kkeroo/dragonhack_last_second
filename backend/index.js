const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const stripe = require('stripe')('sk_test_51N7IBYAJLTU2dEQVhL5xBioCWOYojuTck0LN3JRegAdOqa9XuKPJnkedr8wIrOKwRxShQLCozYbGwOdodt6yh2KK0049xdwToX');  // Use your test secret key
const cors = require('cors');

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
  const { paymentMethodId } = req.body;

  if (!paymentMethodId) {
    res.status(400).send('Missing payment method ID');
    return;
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000,  // amount in the smallest currency unit (cents for USD)
      currency: 'usd',
      payment_method: paymentMethodId,
      confirm: true,  // Automatically confirm the payment
    });

    // Respond with the client secret
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to create payment intent');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});