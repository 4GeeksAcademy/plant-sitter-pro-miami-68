import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [succeeded, setSucceeded] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);

        const cardElement = elements.getElement(CardElement);

        const res = await fetch('/create-payment-intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount: 2000 })  // Amount in cents
        });

        const { clientSecret } = await res.json();

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement
            }
        });

        if (payload.error) {
            setError(`Payment failed: ${payload.error.message}`);
            setProcessing(false);
        } else {
            setSucceeded(true);
            setError(null);
            setProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button disabled={!stripe || processing || succeeded}>
                {processing ? 'Processing...' : 'Pay'}
            </button>
            {error && <div>{error}</div>}
            {succeeded && <div>Payment succeeded!</div>}
        </form>
    );
};

export default CheckoutForm;