import React, { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";
import Payouts from "./Payouts";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentsPayouts = () => {
  const [activeTab, setActiveTab] = useState("makePayments");

  return (
    <div className="payments-payouts container mt-5">
      <h2 className="text-center mb-4">Payments & Payouts</h2>

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

      <Elements stripe={stripePromise}>
        {activeTab === "makePayments" && <PaymentForm />}
        {activeTab === "payouts" && <Payouts />}
      </Elements>
    </div>
  );
};

export default PaymentsPayouts;