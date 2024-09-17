import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import PlantSitterCarousel from "../component/PlantSitterCard";
import ServicesCarousel from "../component/ServicesCarousel";
import { useNavigate } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	return (
		<>
			<div className="text-center mt-5">
				<h1 className="diphylleia-regular">Find Expert Help for Your Plants Anytime, Anywhere</h1>
				<h5>Whether you're away or need assistance, connect with trusted plant care professionals near you.</h5>
			</div>
			<div className="carousel-container">
				<h3 className="diphylleia-regular text-center mb-2"><strong>Meet Our Plant Sitters</strong></h3>
				<PlantSitterCarousel />
				<h3 className="diphylleia-regular text-center mt-2 mb-2"><strong>Learn More About the Services We Provide</strong></h3>
				<ServicesCarousel />
			</div>
			<div className="container-fluid mt-5 text-center">
				<button 
					className="btn text-center mt-2"
					onClick={() => navigate("/how-it-works")}
				>
					<h4 className="diphylleia-regular"><strong>Get Started</strong></h4>
				</button>
			</div>
		</>
	);
};
