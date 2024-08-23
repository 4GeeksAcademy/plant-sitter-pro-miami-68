import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import plantPic from "../../img/plants-on-stand.jpg";
import placeholder from "../../img/placeholder.png";
import { useNavigate } from "react-router-dom";

export const ProviderSignUp= () => {
	// const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	return (
		<div className="row justify-content-center">
			<div class="col-lg-4 bg-indigo">
				<h1 class="fw-normal mb-3 diphylleia-regular">Register to continue</h1>
				<div class="mb-2 pb-2">
					<div data-mdb-input-init class="form-outline form-white">
						<input type="text" id="form3Examplea2" class="form-control form-control-lg" />
						<label class="form-label" for="form3Examplea2">Address Line 1</label>
					</div>
				</div>

				<div class="mb-2 pb-2">
					<div data-mdb-input-init class="form-outline form-white">
						<input type="text" id="form3Examplea3" class="form-control form-control-lg" />
						<label class="form-label" for="form3Examplea3">Address Line 2</label>
					</div>
				</div>

				<div class="row">
					<div class="col-md-5 mb-2 pb-2">
						<div data-mdb-input-init class="form-outline form-white">
							<input type="text" id="form3Examplea4" class="form-control form-control-lg" />
							<label class="form-label" for="form3Examplea4">City</label>
						</div>
					</div>

					<div class="col-md-7 mb-2 pb-2">
						<div data-mdb-input-init class="form-outline form-white">
							<input type="text" id="form3Examplea5" class="form-control form-control-lg" />
							<label class="form-label" for="form3Examplea5">ZIP Code</label>
						</div>
					</div>
				</div>

				<div class="mb-2 pb-2">
					<fieldset disabled>
						<div data-mdb-input-init class="form-outline form-white">
							<input type="text" id="disabledTextInput" class="form-control" placeholder="Currently only available in the United States"/>
							<label for="disabledTextInput" class="form-label">Country</label>
						</div>
					</fieldset>
				</div>

				<div class="row">
					<div class="mb-2 pb-2">
						<div data-mdb-input-init class="form-outline form-white">
							<input type="text" id="form3Examplea8" class="form-control form-control-lg" />
							<label class="form-label" for="form3Examplea8">Phone Number</label>
						</div>
					</div>
				</div>

				<div class="mb-2">
					<div data-mdb-input-init class="form-outline form-white">
						<input type="text" id="form3Examplea9" class="form-control form-control-lg" />
						<label class="form-label" for="form3Examplea9">Email</label>
					</div>
				</div>

				<div class="form-check d-flex justify-content-start mb-2 pb-3">
					<input class="form-check-input me-3" type="checkbox" value="" id="form2Example3c" />
					<label class="form-check-label " for="form2Example3">
						I do accept the <a href="#!" class=""><u>Terms and Conditions</u></a> of your
						site.
					</label>
				</div>

				<button
                    type="submit" 
                    className="btn btn-success mb-5 col-2 rounded-pill"
                    onClick={
                        () => {
                            navigate('/provider-services')
                        }
                    }
                >
                    Register
                </button>
			</div>
		</div>




		// <div className="text-center mt-5">
		// 	<h1 className="diphylleia-regular">Welcome Plant Care Experts!</h1>
		// 	<h3 className="mt-5">Create an account</h3>
		// 	<form>
		// 		<div className="mb-3 row">
		// 			<div className="col-2 m-auto pt-2">
		// 				<input placeholder="First Name" type="text" className="form-control" id="firstName" aria-describedby="firstName"/>
		// 			</div>
		// 		</div>
		// 		<div className="mb-3 row">
		// 			<div className="col-2 m-auto pt-2">
		// 				<input placeholder="Last Name" type="text" className="form-control" id="lastName" aria-describedby="lastName"/>
		// 				<div id="emailHelp" className="form-text">Clients only see the last initial.</div>
		// 			</div>
		// 		</div>
		// 		<div className="mb-3 row">
		// 			<div className="col-2 m-auto">
		// 				<input placeholder="Email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
		// 			</div>
		// 			<div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
		// 		</div>
		// 		<div className="mb-3 row">
		// 			<div className="col-2 m-auto">
		// 				<input placeholder="Password" type="password" className="form-control" id="password" aria-describedby="password"/>
		// 			</div>
		// 		</div>
		// 		<button 
		// 			type="submit" 
		// 			className="btn btn-primary mb-5"
		// 			onClick={
        //                 () => {
        //                     navigate('/provider-profile')
        //                 }
        //             }
		// 			>
		// 				Join now
		// 		</button>
		// 	</form>
		// </div>
	);
};