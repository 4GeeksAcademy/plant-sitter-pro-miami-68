import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [paymentProcessing, setPaymentProcessing] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        setPaymentProcessing(true);

        const { error, paymentIntent } = await stripe.confirmCardPayment('client_secret', {
            payment_method: {
                card: cardElement,
            },
        });

        if (error) {
            console.error(error);
        } else {
            if (paymentIntent.status === 'succeeded') {
                console.log('Payment successful!');
            }
        }

        setPaymentProcessing(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={paymentProcessing || !stripe}>Pay</button>
        </form>
    );
};

export default PaymentForm;
