import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import './App.css';
import SignIn  from './SignIn';
import SignUp from './SignUp';

import './style.css'

const stripePromise = loadStripe('pk_test_51N7IBYAJLTU2dEQVnjksDVbhGmCQjD9D0kIvnLdDCPc4hczDIqHERCrKSSf0EnppUhj7TPHwmWjSeyxc1ArFULCl00l9hiUgta');

const App = () => {
  return (
    <div className="App">
        {/* <SignIn></SignIn> */}
        <SignUp></SignUp>
    </div>
  );
};

export default App;
