import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import plantPic from "../../img/plants-on-stand.jpg";
import placeholder from "../../img/placeholder.png";
import { useNavigate } from "react-router-dom";

export const ClientSignUp2= () => {
	// const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	return (
		<div className="row justify-content-center">
			<div className="col-lg-6 bg-indigo">
				<h1 className="fw-normal mb-5 diphylleia-regular jobs">Create an account</h1>
                <div className="row">
					<div className="col-md-6 mb-2 pb-2">
						<div data-mdb-input-init className="form-outline form-white">
							<input type="text" id="firstName" className="form-control form-control-lg" />
							<label className="form-label" for="firstName">First Name</label>
						</div>
					</div>

					<div className="col-md-6 mb-2 pb-2">
						<div data-mdb-input-init className="form-outline form-white">
							<input type="text" id="lastName" className="form-control form-control-lg" />
							<label className="form-label" for="lastName">Last Name</label>
						</div>
					</div>
				</div>

				<div className="mb-2 pb-2">
					<div data-mdb-input-init className="form-outline form-white">
						<input type="text" id="form3Examplea2" className="form-control form-control-lg" />
						<label className="form-label" for="form3Examplea2">Address Line 1</label>
					</div>
				</div>

				<div className="mb-2 pb-2">
					<div data-mdb-input-init className="form-outline form-white">
						<input type="text" id="form3Examplea3" className="form-control form-control-lg" />
						<label className="form-label" for="form3Examplea3">Address Line 2</label>
					</div>
				</div>

				<div className="row">
					<div className="col-md-5 mb-2 pb-2">
						<div data-mdb-input-init className="form-outline form-white">
							<input type="text" id="form3Examplea4" className="form-control form-control-lg" />
							<label className="form-label" for="form3Examplea4">City</label>
						</div>
					</div>

					<div className="col-md-7 mb-2 pb-2">
						<div data-mdb-input-init className="form-outline form-white">
							<input type="text" id="form3Examplea5" className="form-control form-control-lg" />
							<label className="form-label" for="form3Examplea5">ZIP Code</label>
						</div>
					</div>
				</div>

				<div className="mb-2 pb-2">
					<fieldset disabled>
						<div data-mdb-input-init className="form-outline form-white">
							<input type="text" id="disabledTextInput" className="form-control" placeholder="Currently only available in the United States"/>
							<label for="disabledTextInput" className="form-label">Country</label>
						</div>
					</fieldset>
				</div>

				<div className="row">
					<div className="mb-2 pb-2">
						<div data-mdb-input-init className="form-outline form-white">
							<input type="text" id="form3Examplea8" className="form-control form-control-lg" />
							<label className="form-label" for="form3Examplea8">Phone Number</label>
						</div>
					</div>
				</div>

				<div className="mb-2">
					<div data-mdb-input-init className="form-outline form-white">
						<input type="text" id="form3Examplea9" className="form-control form-control-lg" />
						<label className="form-label" for="form3Examplea9">Email</label>
					</div>
				</div>

				<div className="form-check d-flex justify-content-start mb-2 pb-3">
					<input className="form-check-input me-3" type="checkbox" value="" id="form2Example3c" />
					<label className="form-check-label " for="form2Example3">
						I do accept the <a href="#!" className=""><u>Terms and Conditions</u></a> of your
						site.
					</label>
				</div>

				<div className="d-flex justify-content-center mb-2 pb-3">
					<button
						type="submit" 
						className="btn btn-success mb-5 col-5 rounded-pill"
						onClick={
							() => {
								navigate('/client-services')
							}
						}
					>
						Register
					</button>
				</div>
			</div>
		</div>
	);
};