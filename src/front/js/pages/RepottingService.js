import React from "react";
import { useNavigate } from "react-router-dom";
import repottingImage from "../../img/HomePageImages/Gemini.Repotting.Home.jpg"; // Path to the repotting image
import "../../styles/repottingservice.css"

const RepottingService = () => {
  const navigate = useNavigate();

  return (
    <div className="service-page-container">
      <div className="service-image-container">
        <img
          src={repottingImage}
          alt="Repotting Service"
          className="service-image"
        />
      </div>
      <div className="service-description-container">
        <h2>Repotting Service</h2>
        <p>
          Repotting is essential for maintaining the health and growth of your
          plants. Our experts carefully transfer your plants to new pots,
          ensuring the roots have ample space to grow and thrive.
        </p>
        <button
          className="btn btn-success mt-3"
          onClick={() => navigate("/client-signup1")}
        >
          Sign Up to Schedule
        </button>
      </div>
    </div>
  );
};

export default RepottingService;
