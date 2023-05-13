import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const PaymentForm = ({ user, handlePayment }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentMethod, setPaymentMethod] = useState(null);

  const handleCardDetails = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('[error]', error);
    } else {
        setPaymentMethod(paymentMethod);
        const response = await fetch('http://localhost:5000/add-payment-method', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          uid: user,
          paymentMethodId: paymentMethod.id
        })
      });
      // const customer = await response.json();
      // console.log('[Customer]', customer);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (paymentMethod) {
      handlePayment(paymentMethod);
    }
  };

  return (
    <section>
      <h2>Add a payment method</h2>
      <form onSubmit={handleCardDetails}>
        <CardElement />
        <button type="submit">
          Save Card Details
        </button>
      </form>
      <section>
        <h2>Create payment</h2>
        <button onClick={handleSubmit}>
          Pay
        </button>
      </section>
    </section>
  );
};

export default PaymentForm;

