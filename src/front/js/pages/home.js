import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import houseplants from "../../img/houseplants2.jpg";
import PlantSitterCarousel from "../component/PlantSitterCard";
import ServicesCarousel from "../component/ServicesCarousel";

export const Home = () => {
	const { store, actions } = useContext(Context);

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
			<h3 className="diphylleia-regular text-center mt-2"><strong>Get Started</strong></h3>
		</div>
			{/* <p>
				<img className="homePageImages" src={houseplants} />
			</p> */}
		</>
	);
};

