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
            <div className="row container-fluid">
                <div className="col">
                    <h3>Need Help?</h3>
                    <div className=" works text-start text-white">
                        <h3>🌿Going out of town?</h3>
                        <h3>🌿Love plants, but can't keep them alive?</h3>
                        <h3>🌿Not sure what plants will thrive in your space?</h3>
                        <h3>🌿Need help with pruning, re-potting, or pest control?</h3>
                    </div>
                </div>
                <div className="col">
                    <h3>Looking to Help?</h3>
                    <div className=" works text-start text-white">
                        <h3>🌿Love plants?</h3>
                        <h3>🌿Got a green thumb?</h3>
                        <h3>🌿Want to make some extra cash?</h3>
                        <h3>🌿Able to help others take the best care of their plants?</h3> 
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
		</div>
	);
};

