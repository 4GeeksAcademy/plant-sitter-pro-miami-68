import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    setPaymentProcessing(true);

    // Call your backend to create a PaymentIntent
    try {
      const response = await fetch(
        process.env.BACKEND_URL + "/api/create-payment-intent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: 5000 }), // amount in cents (e.g., $50.00)
        }
      );

      const { clientSecret } = await response.json();

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
          },
        }
      );

      if (error) {
        console.error(error);
        setError(error.message);
      } else {
        if (paymentIntent.status === "succeeded") {
          setSuccess(true);
          console.log("Payment successful!");
        }
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while processing the payment.");
    }

    setPaymentProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={paymentProcessing || !stripe}>
        {paymentProcessing ? "Processing..." : "Pay"}
      </button>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {success && <div style={{ color: "green" }}>Payment successful!</div>}
    </form>
  );
};

export default PaymentForm;
