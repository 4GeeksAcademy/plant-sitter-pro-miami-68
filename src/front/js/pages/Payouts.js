import React from 'react';

const Payouts = () => {
    const handlePayout = async () => {
        // Example call to your backend to trigger a payout
        const response = await fetch('/api/payout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                providerId: 'provider_stripe_account_id', // Replace with actual Stripe Account ID
                amount: 5000, // Payout amount in cents
            }),
        });

        const data = await response.json();
        if (data.success) {
            alert('Payout successful!');
        } else {
            alert('Payout failed!');
        }
    };

    return (
        <div>
            <h3>Payouts</h3>
            <button onClick={handlePayout}>Receive Payout</button>
        </div>
    );
};

export default Payouts;
