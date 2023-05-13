import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import logo from './logo.svg';
import './App.css';
import SignIn  from './SignIn';
import SignUp from './SignUp';

const stripePromise = loadStripe('pk_test_51N7IBYAJLTU2dEQVnjksDVbhGmCQjD9D0kIvnLdDCPc4hczDIqHERCrKSSf0EnppUhj7TPHwmWjSeyxc1ArFULCl00l9hiUgta');

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <SignIn></SignIn>
        <SignUp></SignUp>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default App;
