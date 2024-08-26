import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const SignUp = () => {
	const navigate = useNavigate();

	return (
		<div className="row justify-content-center">
			<div className="col-lg-6 bg-indigo">
				<h1 className="fw-normal mb-5 mt-5 diphylleia-regular jobs">Sign Up</h1>
				<div className="row">
					<div className="col-md-6 mb-2 pb-2">
						<div data-mdb-input-init className="form-outline form-white">
							<input type="text" id="firstName" className="form-control form-control-lg" />
							<label className="form-label" htmlFor="firstName">First Name</label>
						</div>
					</div>
					<div className="col-md-6 mb-2 pb-2">
						<div data-mdb-input-init className="form-outline form-white">
							<input type="text" id="lastName" className="form-control form-control-lg" />
							<label className="form-label" htmlFor="lastName">Last Name</label>
						</div>
					</div>
				</div>

				<div className="mb-2 pb-2">
					<div data-mdb-input-init className="form-outline form-white">
						<input type="text" id="email" className="form-control form-control-lg" />
						<label className="form-label" htmlFor="email">Email</label>
					</div>
				</div>

				<div className="mb-2 pb-2">
					<div data-mdb-input-init className="form-outline form-white">
						<input type="password" id="password" className="form-control form-control-lg" />
						<label className="form-label" htmlFor="password">Password</label>
					</div>
				</div>

				<div className="mb-2 pb-2">
					<div data-mdb-input-init className="form-outline form-white">
						<input type="tel" id="phone" className="form-control form-control-lg" />
						<label className="form-label" htmlFor="phone">Phone Number</label>
					</div>
				</div>

				<div className="form-check d-flex justify-content-start mb-2 pb-3">
					<input className="form-check-input me-3" type="checkbox" value="" id="terms" />
					<label className="form-check-label" htmlFor="terms">
						I accept the <a href="#!" className=""><u>Terms and Conditions</u></a>.
					</label>
				</div>

				<div className="d-flex justify-content-center">
					<button
						type="submit" 
						className="btn btn-success mb-5 col-5 rounded-pill"
						onClick={() => navigate('/')}
					>
						Sign Up
					</button>
				</div>

				<div className="text-center">
					<p>Already have an account? <a href="/login"><u>Log in</u></a></p>
				</div>
			</div>
		</div>
	);
};