import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import PlantSitterCarousel from "../component/PlantSitterCard";
import ServicesCarousel from "../component/ServicesCarousel";
import { useNavigate } from "react-router-dom";
import landing2 from "../../img/landing-page2.png";
import howitworks from "../../img/howitworks.png";
import helping from "../../img/helping.png";
import helping2 from "../../img/helping2.png";
import forOwners from "../../img/for-owners.png";
import client from "../../img/client.png";
import profilepic from "../../img/profilePicture.png";


export const Home = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	return (
		<>
			<div class="hero-image">
				<img className="landing-page" src={landing2} />
				<div class="hero-text">
					<h1 className="diphylleia-regular lp-headers">We connect plant owners</h1>
					<h1 className="diphylleia-regular lp-headers">with plant caretakers</h1>
					<div className="text-center mt-5">
						<div className="row container">
							<div className="col-5 get-started">
								<h1
									className="diphylleia-regular pb-2"
									style={{ fontSize: "2.5vw" }}
								>
									Owners
								</h1>
								<h4 style={{ fontSize: "1.5vw" }}>🌿Going out of town?</h4>
								<h4 style={{ fontSize: "1.5vw" }}>🌿Need help with pests?</h4>
								<h4 style={{ fontSize: "1.5vw" }}>🌿Love plants, but kill them?</h4>
								<div className="container text-start">
									<button
										type="button"
										className="btn col-12 rounded-pill mt-2"
										onClick={
											() => {
												actions.clearJobPostId();
												navigate('/client-map')
											}
										}
									>
										<h3
											className="diphylleia-regular text-center"
											style={{ fontSize: "2vw" }}
										>
											<strong>Find Help</strong>
										</h3>
									</button>
								</div>
							</div>
							<div className="col-5 get-started">
								<h1 className="diphylleia-regular pb-2"
									style={{ fontSize: "2.5vw" }}
								>
									Caretakers
								</h1>
								<h4 style={{ fontSize: "1.5vw" }}>🌿Looking for work?</h4>
								<h4 style={{ fontSize: "1.5vw" }}>🌿Got a green thumb?</h4>
								<h4 style={{ fontSize: "1.5vw" }}>🌿Experienced with plant care?</h4>
								<div className="container text-start">
									<button
										type="button"
										className="btn col-12 rounded-pill mt-2"
										onClick={
											() => {
												navigate('/provider-map')
											}
										}
									>
										<h3
											className="diphylleia-regular text-center"
											style={{ fontSize: "2vw" }}
										>
											<strong>Find Jobs</strong>
										</h3>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<h1 className="diphylleia-regular text-center mt-5 mb-2"><strong>Get Help With...</strong></h1>
			<div className="carousel-container mt-2 mb-2">
				<ServicesCarousel />
			</div>

			<div class="hero-image mt-5">
				<img className="landing-page for-owners" src={forOwners} />
				<div class="owner-text">

					<div className="row d-flex">
						<div className="col-7">
							<h1 className="diphylleia-regular lp-headers" id="how-it-works"><strong>How it works</strong></h1>
						</div>
						<div className="container col-3">
							<button
								type="button"
								className="btn col-12 rounded-pill mt-2"
								onClick={
									() => {
										actions.clearJobPostId();
										navigate('/client-map')
									}
								}
							>
								<h3
									className="diphylleia-regular text-center"
									style={{ fontSize: "2vw" }}
								>
									<strong>Browse Now</strong>
								</h3>
							</button>
						</div>
					</div>

					<h1 className="diphylleia-regular" style={{ fontSize: "3.5vw" }}><img src={helping2} /> Hiring Help</h1>
					<h4 className="diphylleia-regular mt-4" style={{ fontSize: "2vw" }}><strong>1. See who works in your area 🌿 </strong></h4>
					<p className="mb-4" style={{ fontSize: "1.5vw" }}>All of our plant sitters are background checked. Browse available profiles in your area for free.</p>
					<h4 className="diphylleia-regular mt-3" style={{ fontSize: "2vw" }}><strong>2. Sign up for an account and tell us about your needs 🌿 </strong></h4>
					<p className="mb-4" style={{ fontSize: "1.5vw" }}>Share what kind of help you need and when you need it.</p>
					<h4 className="diphylleia-regular mt-3" style={{ fontSize: "2vw" }}><strong>3. Post jobs and secure the plant care services that you need 🌿 </strong></h4>
					<p className="mb-4" style={{ fontSize: "1.5vw" }}>Plant sitters apply to jobs that you post and you choose who to hire.</p>

				</div>
			</div>

			<h1 className="diphylleia-regular text-center mt-5 mb-2"><strong>Meet Some of Our Plant Sitters...</strong></h1>
			<div className="d-flex row mt-3">
				<p className="text-center fs-4">** Insert carousel here... **</p>
				<img className="sitter-pics" src={client} />
				<img className="sitter-pics" src={profilepic} />
				<img className="sitter-pics" src={client} />
				<img className="sitter-pics" src={profilepic} />
				<img className="sitter-pics" src={client} />
			</div>
			{/* <div className="carousel-container mt-2 mb-2">
				<PlantSitterCarousel />
			</div> */}
			<div class="hero-image mt-5">
				<img className="landing-page" src={howitworks} />
				<div class="caretaker-text">

					<div className="row d-flex">
						<div className="container col-3">
							<button
								type="button"
								className="btn col-12 rounded-pill mt-2"
								onClick={
									() => {
										navigate('/provider-map')
									}
								}
							>
								<h3
									className="diphylleia-regular text-center"
									style={{ fontSize: "2vw" }}
								>
									<strong>Sign Up Now</strong>
								</h3>
							</button>
						</div>

						<div className="col-8">
							<h1 className="diphylleia-regular lp-headers"><strong>How it works</strong></h1>
						</div>
					</div>

					<h1 className="diphylleia-regular" style={{ fontSize: "3.5vw" }}>Becoming a Plant Sitter <img src={helping} /></h1>
					<h4 className="diphylleia-regular mt-4" style={{ fontSize: "2vw" }}><strong>🌿 1. Register with our service and pass a background check</strong></h4>
					<p className="mb-4" style={{ fontSize: "1.5vw" }}>Background check included with sign-up fee.</p>
					<h4 className="diphylleia-regular mt-3" style={{ fontSize: "2vw" }}><strong>🌿 2. Tell us about your qualifications, education, and experience</strong></h4>
					<p className="mb-4" style={{ fontSize: "1.5vw" }}>Professional experience is great, but not required.</p>
					<h4 className="diphylleia-regular mt-3" style={{ fontSize: "2vw" }}><strong>🌿 3. Browse and apply for available jobs in your area.</strong></h4>
					<p className="mb-4" style={{ fontSize: "1.5vw" }}>Chat directly with plant owners near you and choose jobs that work for you.</p>

				</div>
			</div>


		</>
	);
};
