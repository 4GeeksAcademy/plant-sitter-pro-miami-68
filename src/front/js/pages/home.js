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
			<p>
				<img className="homePageImages" src={houseplants} />
			</p>
		</div>
		<div className="carousel-container">
        <PlantSitterCarousel />
		<ServicesCarousel />
      </div>
		</>
	);
};

