import React from "react";
import { useNavigate } from "react-router-dom";
import plantCleaningImage from "../../img/HomePageImages/Gemini.PlantCleaning.Service.Home.jpg"; // Path to the plant cleaning image
import "../../styles/plantcleaning.css";

const PlantCleaningService = () => {
  const navigate = useNavigate();

  return (
    <div className="service-page-container">
      <div className="service-image-container">
        <img
          src={plantCleaningImage}
          alt="Plant Cleaning Service"
          className="service-image"
        />
      </div>
      <div className="service-description-container">
        <h2>Plant Cleaning Service</h2>
        <p>
          Keep your plants looking their best with our plant cleaning service.
          We carefully clean the leaves and stems, removing dust and debris to
          enhance your plant's ability to photosynthesize and grow.
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

export default PlantCleaningService;
