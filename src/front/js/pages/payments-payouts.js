import React from 'react';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import PaymentForm from './PaymentForm'; // Component to handle payment form
import Payouts from './Payouts'; // Component to handle provider payouts
import CheckoutForm from './checkoutForm';

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY);

const PaymentsPayouts = () => {
    return (
        <div className="payments-payouts">
            <h2>Payments & Payouts</h2>
            <Elements stripe={stripePromise}>
                <CheckoutForm />
                <PaymentForm />  {/* For clients to make payments */}
                <Payouts />  {/* For providers to receive payouts */}
            </Elements>
        </div>
    );
};

export default PaymentsPayouts;
