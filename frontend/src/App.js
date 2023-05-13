import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51N7IBYAJLTU2dEQVnjksDVbhGmCQjD9D0kIvnLdDCPc4hczDIqHERCrKSSf0EnppUhj7TPHwmWjSeyxc1ArFULCl00l9hiUgta');

const App = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default App;
