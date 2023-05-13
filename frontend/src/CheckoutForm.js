import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  // Use state to keep track of the total payments made
  const [fundSize, setFundSize] = useState(0);

  const handleSubmit = async (event) => {
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
        console.log('[PaymentMethod]', paymentMethod);
    
        // Send the payment method ID to your backend server
        const response = await fetch('http://localhost:5000/create-payment-intent', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            paymentMethodId: paymentMethod.id
            })
        });

        const paymentIntent = await response.json();
        console.log('[PaymentIntent]', paymentIntent);

        // Add the amount of the payment to the fund size
        // Note: For this example, we're just adding a fixed amount
        // In a real application, you should use the actual payment amount
        setFundSize(fundSize + 1000);
    }
  };

  return (
    <div>
      <section>
        <h2>Add a payment method</h2>
        <CardElement />
      </section>

      <section>
        <h2>Create payment</h2>
        <button onClick={handleSubmit} disabled={!stripe}>
          Pay
        </button>
      </section>

      <section>
        <h2>Pool</h2>
        <p>{fundSize}</p>
      </section>
    </div>
  );
};

export default CheckoutForm;
