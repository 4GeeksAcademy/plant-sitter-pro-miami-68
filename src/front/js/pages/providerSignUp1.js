import React, { useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";
import client from "../../img/client.png";
import profilepic from "../../img/profilePicture.png";
import clientSignUp from "../../img/client-sign-up.png";
import jobPosts from "../../img/jobs-post.png";
import viewJobs from "../../img/view-jobs.png";

export const ProviderSignUp1 = () => {
	// const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	useEffect(() => {
		const token = sessionStorage.getItem("token");
		if (token) {
			navigate("/client-services1");
		}
	}, [navigate]);

	return (
		<div className="row d-flex">
			<h1 className="mb-5 mt-5 diphylleia-regular jobs"><strong>There are __ jobs available near you!</strong></h1>

			<div className="d-flex row mt-3">
				<p className="text-center fs-4">** Insert job posts(only for viewing) here... **</p>
				<img src={jobPosts} />
			</div>

			<div className="container mt-5 col-3">
				<button
					type="button"
					className="btn col-12 rounded-pill mt-2"
					onClick={
						() => {
							navigate('/client-signup1')
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
		</div>
	);
};