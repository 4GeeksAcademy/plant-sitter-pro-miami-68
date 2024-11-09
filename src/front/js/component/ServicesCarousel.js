import React from "react";
import "../../styles/ServicesCarousel.css";
import pruning from "../../img/HomePageImages/Gemini.Pruning.Service.home.jpg"
import watering from "../../img/HomePageImages/Gemini.Watering.Service.Home.jpg"
import repotting from "../../img/HomePageImages/Gemini.Repotting.Home.jpg"
import pestcontrol from "../../img/HomePageImages/Gemini.PestControl.Service.home.jpg"
import plantcleaning from "../../img/HomePageImages/Gemini.PlantCleaning.Service.Home.jpg"
import "../../styles/ServicesCarousel.css"


const services = [
  {
    name: "Watering",
    image: watering,  
    link: "/watering",
  },
  {
    name: "Re-Potting",
    image: repotting,  // Replace with the actual path to your image
    link: "/repotting",
  },
  {
    name: "Pruning",
    image: pruning,  // Replace with the actual path to your image
    link: "/pruning",
  },
  {
    name: "Pest Control",
    image: pestcontrol,  // Replace with the actual path to your image
    link: "/pestcontrol",
  },
  {
    name: "Plant Cleaning",
    image: plantcleaning,  // Replace with the actual path to your image
    link: "/plantcleaning",
  },
  {
    name: "Watering",
    image: watering,  
    link: "/watering",
  },
  {
    name: "Re-Potting",
    image: repotting,  
    link: "/repotting",
  },
  {
    name: "Pruning",
    image: pruning,  
    link: "/pruning",
  },
  {
    name: "Pest Control",
    image: pestcontrol,  
    link: "/pestcontrol",
  },
  {
    name: "Plant Cleaning",
    image: plantcleaning,  
    link: "/plantcleaning",
  },
  {
    name: "Watering",
    image: watering,  
    link: "/watering",
  },
  {
    name: "Re-Potting",
    image: repotting,  // Replace with the actual path to your image
    link: "/repotting",
  },
  {
    name: "Pruning",
    image: pruning,  // Replace with the actual path to your image
    link: "/pruning",
  },
  {
    name: "Pest Control",
    image: pestcontrol,  // Replace with the actual path to your image
    link: "/pestcontrol",
  },
  {
    name: "Plant Cleaning",
    image: plantcleaning,  // Replace with the actual path to your image
    link: "/plantcleaning",
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
