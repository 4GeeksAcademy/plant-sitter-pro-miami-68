import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import PlantSitterCarousel from "../component/PlantSitterCard";
import ServicesCarousel from "../component/ServicesCarousel";
import { useNavigate } from "react-router-dom";
import landing from "../../img/landing-page.jpg";
import landing2 from "../../img/landing-page2.png";
import logo2 from "../../img/Logo2.png";
import wilting from "../../img/wilting.png";
import helping from "../../img/helping.png";
import border from "../../img/border.png";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	return (
		<>
			{/* <div className="text-center mt-5">
				<h1 className="diphylleia-regular">Find Expert Help for Your Plants Anytime, Anywhere</h1>
				<h5>Whether you're away or need assistance, connect with trusted plant care professionals near you.</h5>
			</div> */}
			<div class="hero-image">
				<img className="landing-page" src={landing2} />
				<div class="hero-text">
					<h1 className="diphylleia-regular lp-headers">We connect plant owners</h1>
					<h1 className="diphylleia-regular lp-headers">with plant caretakers</h1>


					<div className="text-center mt-5">
						<div className="row container">
							<div className="col-1"></div>
							<div className="col-5 get-started">
								<h1 className="diphylleia-regular">Plant Owners</h1>
								<h4>🌿Going out of town?</h4>
								<h4>🌿Need help with pests?</h4>
								<h4>🌿Love plants, but kill them?</h4>
								{/* <img src={wilting} /> */}
								{/* <div className="fs-4">Start a free search for professionals near you.</div> */}
								<div className="container text-start">
									<button
										type="submit"
										className="btn col-12 rounded-pill mt-4"
										onClick={
											() => {
												navigate('/client-services1')
											}
										}
									>
										<h3 className="diphylleia-regular text-center">
											<strong>Find Help</strong>
										</h3>
									</button>
								</div>
							</div>
							<div className="col-5 get-started">
								<h1 className="diphylleia-regular">Caretakers</h1>
								<h4>🌿Got a green thumb?</h4>
								<h4>🌿Looking for work?</h4>
								{/* <img src={wilting} /> */}
								<div className="container text-start">
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
											<strong>Find Jobs</strong>
										</h3>
									</button>
								</div>
							</div>
							{/* <div className="col-2"></div> */}
						</div>
					</div>


				</div>
			</div>
			{/* <img className="landing-page" src={landing}/> */}
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
