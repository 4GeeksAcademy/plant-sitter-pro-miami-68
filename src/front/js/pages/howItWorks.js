import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import arrow from "../../img/arrow.png";
import houseplants from "../../img/houseplants2.jpg";
import PlantSitterCarousel from "../component/PlantSitterCard";
import ServicesCarousel from "../component/ServicesCarousel";

export const HowItWorks = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
            <h1 className="diphylleia-regular mb-4 "><strong>How it Works</strong></h1>
            <h2 className="diphylleia-regular mb-5 mt-3"><strong>We connect people who need help taking care of their plants with people who have green thumbs</strong></h2>
            <div className="row container-fluid">
                <div className="col">
                    <h2>Need help with your plants?</h2>
                    <div className="works text-start">
                        <h3 className="mb-3">🌿Are you going out of town and need someone to watch your plants while you're away?</h3>
                        <h3 className="mb-3">🌿Do you love plants, and want to have them, but you just can't keep them alive?</h3>
                        <h3 className="mb-3">🌿Could you use some help figuring out which plants will thrive in your space?</h3>
                        <h3 className="mb-3">🌿Do you need help with pruning, re-potting, or pest control?</h3>
                    </div>
                </div>
                <div className="col">
                    <h2>Got a green thumb?</h2>
                    <div className=" works text-start">
                        <h3>🌿Are you someone who has always been great with plants?</h3>
                        <h3>🌿Do you have education or professional experience with plant care?</h3>
                        <h3>🌿Would you like to earn money doing something you love?</h3>
                        <h3>🌿Are you able to help others take the best possible care of their plants?</h3> 
                    </div>
                </div>
            </div>
            <div className="row container-fluid">
                <div className="col justify-contents-center">
                    <img className="arrow" src={arrow}/>
                </div>
                <div className="col justify-contents-center">
                    <img className="arrow" src={arrow}/>
                </div>
            </div>

            <div className="row container-fluid">
                <div className="col justify-contents-center">
                    <h3>Hire a Plant Sitter</h3>
                </div>
                <div className="col justify-contents-center">
                    <h3>Become a Plant Sitter</h3>
                </div>
            </div>
		</div>
	);
};

