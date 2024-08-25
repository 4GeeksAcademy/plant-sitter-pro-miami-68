import React from "react";
import "../../styles/PlantSitterCard.css";

const PlantSitterCard = ({ name, title, image, tags }) => {
  return (
    <div className="plant-sitter-card">
      <img src={image} alt={name} className="card-image" />
      <div className="card-body">
        <h5 className="card-name">{name}</h5>
        <p className="card-title">{title}</p>
        <div className="card-tags">
          {tags && tags.map((tag, index) => (
            <span key={index} className="badge badge-secondary">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlantSitterCard;
