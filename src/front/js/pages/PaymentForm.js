import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [amount, setAmount] = useState(''); // State for payment amount

  // Nav pill state
  const [activeTab, setActiveTab] = useState("makePayments"); // Default is "makePayments"

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    setPaymentProcessing(true);

    // Validate the amount
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      setError("Please enter a valid payment amount.");
      setPaymentProcessing(false);
      return;
    }

    // Call your backend to create a PaymentIntent
    try {
      const response = await fetch(
        process.env.BACKEND_URL + "/api/create-payment-intent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: numericAmount * 100 }), // Convert to cents
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
    <div>
      {/* Nav Pills */}
      <ul className="nav nav-pills">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "makePayments" ? "active" : ""}`}
            onClick={() => setActiveTab("makePayments")}
          >
            To Make Payments
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "payouts" ? "active" : ""}`}
            onClick={() => setActiveTab("payouts")}
          >
            Payouts for Plant Sitters
          </button>
        </li>
      </ul>

      <div className="tab-content mt-4">
        {/* "To Make Payments" Tab */}
        {activeTab === "makePayments" && (
          <div>
            <h3>Make a Payment</h3>
            <form onSubmit={handleSubmit}>
              <div>
                <label>
                  Payment Amount (USD):
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="1"
                    step="0.01"
                    placeholder="Enter amount"
                    required
                  />
                </label>
              </div>
              <CardElement />
              <button type="submit" disabled={paymentProcessing || !stripe}>
                {paymentProcessing ? "Processing..." : "Pay"}
              </button>
              {error && <div style={{ color: "red" }}>{error}</div>}
              {success && <div style={{ color: "green" }}>Payment successful!</div>}
            </form>
          </div>
        )}

        {/* "Payouts for Plant Sitters" Tab */}
        {activeTab === "payouts" && (
          <div>
            <h3>Payouts for Plant Sitters</h3>
            <p>Instructions on how to manage payouts for plant sitters will go here.</p>
            {/* You can add the relevant payout form or instructions here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentForm;
