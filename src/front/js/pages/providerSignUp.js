import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import plantPic from "../../img/plants-on-stand.jpg";
import placeholder from "../../img/placeholder.png";
import { useNavigate } from "react-router-dom";

export const ProviderProfile= () => {
	// const { store, actions } = useContext(Context);
	// const navigate = useNavigate();

	return (
		<div className="text-center mt-5">
			<h1 className="diphylleia-regular">Welcome Plant Care Experts!</h1>
			<h3 className="mt-5">Create an account</h3>
			<form>
				<div className="mb-3 row">
					<div className="col-2 m-auto pt-2">
						<input placeholder="First Name" type="text" className="form-control" id="firstName" aria-describedby="firstName"/>
					</div>
				</div>
				<div className="mb-3 row">
					<div className="col-2 m-auto pt-2">
						<input placeholder="Last Name" type="text" className="form-control" id="lastName" aria-describedby="lastName"/>
						<div id="emailHelp" className="form-text">Clients only see the last initial.</div>
					</div>
				</div>
				<div className="mb-3 row">
					<div className="col-2 m-auto">
						<input placeholder="Email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
					</div>
					<div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
				</div>
				<div className="mb-3 row">
					<div className="col-2 m-auto">
						<input placeholder="Password" type="password" className="form-control" id="password" aria-describedby="password"/>
					</div>
				</div>
				<button type="submit" className="btn btn-primary mb-5">Join now</button>
			</form>
		</div>
	);
};