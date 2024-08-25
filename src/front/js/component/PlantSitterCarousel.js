import React, { useEffect, useState } from "react";
import PlantSitterCard from "./PlantSitterCard";
import "../../styles/PlantSitterCarousel.css";

const PlantSitterCarousel = () => {
  const [sitters, setSitters] = useState([]);

  useEffect(() => {
    fetch(`${process.env.BACKEND_URL}/plant_sitters`)
      .then((response) => response.json())
      .then((data) => setSitters(data))
      .catch((error) => console.error("Error fetching sitters:", error));
  }, []);

  return (
    <div className="carousel-container">
      <div className="plant-sitter-carousel">
        {sitters.map((sitter) => (
          <PlantSitterCard
            key={sitter.id}
            name={sitter.name}
            title="Plant Sitter"
            image="https://via.placeholder.com/300x200"  // Replace with actual image URLs
            tags={sitter.service_preferences || []}
          />
        ))}
      </div>
    </div>
  );
};

export default PlantSitterCarousel;
