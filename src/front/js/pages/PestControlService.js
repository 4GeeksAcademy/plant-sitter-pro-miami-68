import React from "react";
import { useNavigate } from "react-router-dom";
import pestControlImage from "../../img/HomePageImages/Gemini.PestControl.Service.home.jpg"; // Path to the pest control image
import "../../styles/pestcontrolservice.css";

const PestControlService = () => {
  const navigate = useNavigate();

  return (
    <div className="service-page-container">
      <div className="service-image-container">
        <img
          src={pestControlImage}
          alt="Pest Control Service"
          className="service-image"
        />
      </div>
      <div className="service-description-container">
        <h2>Pest Control Service</h2>
        <p>
          Protect your plants from pests with our specialized pest control
          service. We use eco-friendly methods to eliminate insects and other
          harmful organisms, ensuring your plants remain healthy and vibrant.
        </p>
        <button
          className="btn btn-success mt-3"
          onClick={() => navigate("/provider-signup1")}
        >
          Sign Up to Schedule
        </button>
      </div>
    </div>
  );
};

export default PestControlService;
