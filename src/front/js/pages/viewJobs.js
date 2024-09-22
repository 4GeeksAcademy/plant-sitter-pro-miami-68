import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";
import jobPosts from "../../img/jobs-post.png";

export const ViewJobs = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	return (
		<>

			<div className="row d-flex">
				<h1 className="mb-3 mt-4 diphylleia-regular jobs"><strong>There are __ jobs available near you!</strong></h1>
				<div className="d-flex row mt-3">
					<p className="text-center fs-4">** Insert job posts(only for viewing) here... **</p>
					<img src={jobPosts} />
				</div>
				{/* <div className="d-flex row mt-3">
					<p className="text-center fs-4">** Insert auto populated job post cards (only for viewing) here... **</p>
					<img className="sitter-pics" src={plant} />
					<img className="sitter-pics" src={monstera} />
					<img className="sitter-pics" src={plant} />
					<img className="sitter-pics" src={monstera} />
				</div> */}

				<div className="container mt-5 col-3">
					<button
						type="submit"
						className="btn col-12 rounded-pill mt-2"
						onClick={
							() => {
								navigate('/provider-signup')
							}
						}
					>
						<h3
							className="diphylleia-regular text-center"
							style={{ fontSize: "2vw" }}
						>
							<strong>Subscribe Now</strong>
						</h3>
					</button>
				</div>

				{/* <div class="hero-image mt-5">
					<img className="landing-page for-owners" src={clientSignUp} />
					<div className="owner-text row">
						<div className="col-5"></div>
						<div className="col-7">
							<h3 className="diphylleia-regular" style={{ fontSize: "3vw" }}><strong>Benefits of Joining...</strong></h3>
							<h4 className="diphylleia-regular mt-4" style={{ fontSize: "2vw" }}><strong>✔️ Safe</strong></h4>
							<p className="mb-0" style={{ fontSize: "1.5vw" }}>🌿 Find and hire vetted, qualitifed help near you.</p>
							<p className="mb-4" style={{ fontSize: "1.5vw" }}>🌿 Background checks completed for all plant sitters.</p>
							<h4 className="diphylleia-regular mt-3" style={{ fontSize: "2vw" }}><strong>✔️ Affordable</strong></h4>
							<p className="mb-0" style={{ fontSize: "1.5vw" }}>🌿Pay only $__ /month to post unlimited jobs.</p>
							<p className="mb-4" style={{ fontSize: "1.5vw" }}>🌿Choose your own rate per job.</p>
							<h4 className="diphylleia-regular mt-3" style={{ fontSize: "2vw" }}><strong>✔️ Convenient</strong></h4>
							<p className="mb-0" style={{ fontSize: "1.5vw" }}>🌿 Cancel any time.</p>
							<p className="mb-4" style={{ fontSize: "1.5vw" }}>🌿 Hire only the help you need, when you need it.</p>
						</div>
					</div>
				</div> */}

			</div>
		</>
	);
};
