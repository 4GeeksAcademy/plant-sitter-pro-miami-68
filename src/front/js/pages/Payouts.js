import React from "react";

const Payouts = () => {
  const handlePayout = async () => {
    const token = sessionStorage.getItem("token");
    // Example call to your backend to trigger a payout
    const response = await fetch(process.env.BACKEND_URL + "/api/payout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        // providerId: "provider_stripe_account_id", // Replace with actual Stripe Account ID
        amount: 100, // Payout amount in cents
      }),
    });

    const data = await response.json();
    if (data.success) {
      alert("Payout successful!");
    } else {
      alert("Payout failed!");
    }
  };

  return (
    <div className="d-flex justify-content-center mb-5 pb-5">
      <button onClick={handlePayout}>Receive Payout</button>
    </div>
  );
};

export default Payouts;