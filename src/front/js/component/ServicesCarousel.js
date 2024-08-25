import React from "react";
import "../../styles/ServicesCarousel.css";

const services = [
  {
    name: "Watering",
    image: "path_to_watering_image.jpg",  // Replace with the actual path to your image
    link: "/services/watering",
  },
  {
    name: "Re-Potting",
    image: "path_to_repotting_image.jpg",  // Replace with the actual path to your image
    link: "/services/repotting",
  },
  {
    name: "Pruning",
    image: "path_to_pruning_image.jpg",  // Replace with the actual path to your image
    link: "/services/pruning",
  },
  {
    name: "Pest Control",
    image: "path_to_pestcontrol_image.jpg",  // Replace with the actual path to your image
    link: "/services/pestcontrol",
  },
  {
    name: "Plant Cleaning",
    image: "path_to_plantcleaning_image.jpg",  // Replace with the actual path to your image
    link: "/services/plantcleaning",
  },
];

const ServicesCarousel = () => {
  return (
    <div className="carousel-container">
      <div className="services-carousel">
        {services.map((service, index) => (
          <a key={index} href={service.link} className="service-card">
            <img src={service.image} alt={service.name} className="card-image" />
            <div className="card-overlay">
              <h5 className="service-name">{service.name}</h5>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ServicesCarousel;
