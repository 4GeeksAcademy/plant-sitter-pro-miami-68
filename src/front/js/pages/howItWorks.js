import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import wilting from "../../img/wilting.png";
import helping from "../../img/helping.png";
import border from "../../img/border.png";
import { useNavigate } from "react-router-dom";

export const HowItWorks = () => {
	const { store, actions } = useContext(Context);
    const navigate = useNavigate();

	return (
		<div className="text-center mt-5">
            <h1 className="diphylleia-regular mb-2"><strong>How it Works</strong></h1>
            <img className="divider m-auto" src={border}></img>
            <h2 className="diphylleia-regular col-9 m-auto mb-5 mt-1"><strong>We connect people who need help taking 
                care of their plants with people who have green thumbs</strong>
            </h2>
            <div className="row container-fluid">
                <div className="col m-3">
                    <h3>Need help with your plants? <img src={wilting}/></h3>
                    <div className="container works text-start">
                        <button
                            type="submit" 
                            className="btn col-12 rounded-pill mt-4"
                            onClick={
                                () => {
                                    navigate('/client-map')
                                }
                            }
                        >
                            <h3 className="diphylleia-regular text-center">
                                Hire a Plant Sitter
                            </h3>
                        </button>
                        <h4 className="diphylleia-regular mt-4"><strong>🌿Step 1: Tell us where you're located.</strong></h4>
                        <p className="mb-4 fs-5">We'll tell you how many plant sitters are available near you.</p>
                        <h4 className="diphylleia-regular mt-3"><strong>🌿Step 2: Subscribe to our service and create an account.</strong></h4>
                        <p className="mb-4 fs-5">Subscribing requires a low, one time fee that grants you access to our network of vetted, plant care professionals. You can cancel any time.</p>
                        <h4 className="diphylleia-regular mt-3"><strong>🌿Step 3: Create a job post and secure the plant care services that you need.</strong></h4>
                        <p className="mb-4 fs-5">Here you'll answer questions about the number and types of plants that you have, as well as the kinds of services that you require.</p>
                    </div>
                </div>
                <div className="col m-3">
                    <h3><img src={helping}/> Looking for work in plant care?</h3>
                    <div className="container works text-start">
                    <button
                            type="submit" 
                            className="btn col-12 rounded-pill mt-4"
                            onClick={
                                () => {
                                    navigate('/provider-map')
                                }
                            }
                        >
                            <h3 className="diphylleia-regular text-center">
                                Become a Plant Sitter
                            </h3>
                        </button>
                        <h4 className="diphylleia-regular mt-4"><strong>🌿Step 1: Tell us where you're located and how far you're willing to travel.</strong></h4>
                        <p className="mb-4 fs-5">We'll tell you how many jobs are available in your search area.</p>
                        <h4 className="diphylleia-regular mt-3"><strong>🌿Step 2: Subscribe to our service and create an account.</strong></h4>
                        <p className="mb-4 fs-5">Subscribing requires a low, one time fee that grants you access to view and accept jobs in your area. You can cancel any time.</p>
                        <h4 className="diphylleia-regular mt-3"><strong>🌿Step 3: Create a profile and find work near you as a plant care professional.</strong></h4>
                        <p className="mb-4 fs-5">Here you'll answer questions about your training and experience, and you'll have access to veiw and accept jobs near you.</p>
                    </div>
                </div>
            </div>
		</div>
	);
};

