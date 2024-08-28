import React from "react";
import { useNavigate } from "react-router-dom";
import pruningImage from '../../img/HomePageImages/Gemini.Pruning.Service.home.jpg'; // Path to the pruning image
import "../../styles/pruningservice.css";

const PruningService = () => {
  const navigate = useNavigate();

  return (
    <div className="service-page-container">
      <div className="service-image-container">
        <img
          src={pruningImage}
          alt="Pruning Service"
          className="service-image"
        />
      </div>
      <div className="service-description-container">
        <h2>Pruning Service</h2>
        <p>
          Regular pruning helps to maintain the shape and health of your plants.
          Our pruning service removes dead or overgrown branches, encouraging
          new growth and improving the overall appearance of your plants.
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

export default PruningService;
