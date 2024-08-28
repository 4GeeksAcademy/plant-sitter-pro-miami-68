import React from "react";
import { useNavigate } from "react-router-dom";
import wateringImage from "../../img/HomePageImages/Gemini.Watering.Service.Home.jpg"; // Path to the watering image
import "../../styles/wateringservice.css"

const WateringService = () => {
  const navigate = useNavigate();

  return (
    <div className="service-page-container">
      <div className="service-image-container">
        <img
          src={wateringImage}
          alt="Watering Service"
          className="service-image"
        />
      </div>
      <div className="service-description-container">
        <h2>Watering Service</h2>
        <p>
          Our watering service ensures that your plants receive the optimal
          amount of water based on their specific needs. Whether you're on
          vacation or just need a helping hand, our expert plant sitters are
          here to keep your plants hydrated and thriving.
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

export default WateringService;
