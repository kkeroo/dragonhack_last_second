import React, { useState } from 'react';
import PaymentForm from './PaymentForm';
import FundPool from './FundPool';

const CheckoutForm = (props) => {
  const [fundSize, setFundSize] = useState(0);

  const handlePayment = async (paymentMethod) => {
    console.log('[PaymentMethod]', paymentMethod);

    // Send the payment method ID to your backend server
    const response = await fetch('http://localhost:5000/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        paymentMethodId: paymentMethod.id,
        email: 'user@example.com'  // replace with actual email
      })
    });

    const paymentIntent = await response.json();
    console.log('[PaymentIntent]', paymentIntent);

   
    // Add the amount of the payment to the fund size
    // Note: For this example, we're just adding a fixed amount
    // In a real application, you should use the actual payment amount
    setFundSize(fundSize + 1000);
  };

  return (
    <div>
      <PaymentForm user={props.user} handlePayment={handlePayment} />
      <FundPool fundSize={fundSize} />
    </div>
  );
};

export default CheckoutForm;
