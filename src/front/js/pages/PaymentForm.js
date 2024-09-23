import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [amount, setAmount] = useState('');
  const [activeTab, setActiveTab] = useState("makePayments");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    setPaymentProcessing(true);

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      setError("Please enter a valid payment amount.");
      setPaymentProcessing(false);
      return;
    }

    try {
      const response = await fetch(
        process.env.BACKEND_URL + "/api/create-payment-intent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: numericAmount * 100 }),
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
    <div className="container mt-5">
      {/* Nav Pills */}
      <ul className="nav nav-pills mb-4 justify-content-center">
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

      {/* Payment Form */}
      {activeTab === "makePayments" && (
        <div className="card shadow-sm p-4">
          <h3 className="text-center">Make a Payment</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Payment Amount (USD):</label>
              <input
                type="number"
                className="form-control"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="1"
                step="0.01"
                placeholder="Enter amount"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Credit Card Details:</label>
              <div className="form-control p-2">
                <CardElement />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={paymentProcessing || !stripe}
            >
              {paymentProcessing ? "Processing..." : "Pay"}
            </button>

            {error && <div className="alert alert-danger mt-3">{error}</div>}
            {success && <div className="alert alert-success mt-3">Payment successful!</div>}
          </form>
        </div>
      )}

      {/* Payouts Section */}
      {activeTab === "payouts" && (
        <div className="card shadow-sm p-4">
          <h3 className="text-center">Payouts for Plant Sitters</h3>
          <p className="text-center">
            Instructions on how to manage payouts for plant sitters will go here.
          </p>
          {/* You can add the relevant payout form or instructions here */}
        </div>
      )}
    </div>
  );
};

export default PaymentForm;
