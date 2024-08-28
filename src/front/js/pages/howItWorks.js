import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import wilting from "../../img/wilting.png";
import helping from "../../img/helping.png";
import arrow from "../../img/arrow.png";
import houseplants from "../../img/houseplants2.jpg";
import PlantSitterCarousel from "../component/PlantSitterCard";
import ServicesCarousel from "../component/ServicesCarousel";
import { useNavigate } from "react-router-dom";

export const HowItWorks = () => {
	const { store, actions } = useContext(Context);
    const navigate = useNavigate();

	return (
		<div className="text-center mt-5">
            <h1 className="diphylleia-regular mb-4"><strong>How it Works</strong></h1>
            <h2 className="diphylleia-regular mb-5 mt-3"><strong>We connect people who need help taking care of their plants with people who have green thumbs</strong></h2>

            <div className="row container-fluid">
                <div className="col m-3">
                    <h2>Need help with your plants? <img src={wilting}/></h2>
                    <div className="container works text-start">
                        <button
                            type="submit" 
                            className="btn col-6 rounded-pill"
                            onClick={
                                () => {
                                    navigate('/client-map')
                                }
                            }
                        >
                            <h1 className="diphylleia-regular text-center">
                                Hire a Plant Sitter
                            </h1>
                        </button>
                        <h2 className="diphylleia-regular mt-3"><strong>🌿Step 1: Tell us where you're located.</strong></h2>
                        <p className="mb-3 fs-4">We'll tell you how many plant sitters are available near you.</p>
                        <h2 className="diphylleia-regular mt-3"><strong>🌿Step 2: Subscribe to our service and create an account.</strong></h2>
                        <p className="mb-3 fs-4">Subscribing requires a low, one time fee that grants you access to our network of vetted, plant care professionals. You can cancel any time.</p>
                        <h2 className="diphylleia-regular mt-3"><strong>🌿Step 3: Create a job post and secure the plant care services that you need.</strong></h2>
                        <p className="mb-3 fs-4">Here you'll answer questions about the number and types of plants that you have, as well as the kinds of services that you require.</p>
                    </div>
                </div>
                <div className="col m-3">
                    <h2><img src={helping}/> Looking for work in plant care?</h2>
                    <div className="container works text-start">
                    <button
                            type="submit" 
                            className="btn col-6 rounded-pill"
                            onClick={
                                () => {
                                    navigate('/provider-map')
                                }
                            }
                        >
                            <h1 className="diphylleia-regular text-center">
                                Become a Plant Sitter
                            </h1>
                        </button>
                        <h2 className="diphylleia-regular mt-3"><strong>🌿Step 1: Tell us where you're located and how far you're willing to travel.</strong></h2>
                        <p className="mb-3 fs-4">We'll tell you how many jobs are available in your search area.</p>
                        <h2 className="diphylleia-regular mt-3"><strong>🌿Step 2: Subscribe to our service and create an account.</strong></h2>
                        <p className="mb-3 fs-4">Subscribing requires a low, one time fee that grants you access to view and accept jobs in your area. You can cancel any time.</p>
                        <h2 className="diphylleia-regular mt-3"><strong>🌿Step 3: Create a profile and find work near you as a plant care professional.</strong></h2>
                        <p className="mb-3 fs-4">Here you'll answer questions about your training and experience, and you'll have access to veiw and accept jobs near you.</p>
                    </div>
                </div>
            </div>
		</div>
	);
};

