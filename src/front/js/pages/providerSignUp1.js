import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";
import plant from "../../img/plant.png";

export const ProviderSignUp1= () => {
	// const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	return (
		<div className="row d-flex">
			<h1 className="fw-normal mt-5 mb-4 diphylleia-regular jobs">There are __ plant sits near you!</h1>				
			<div className="col-lg-4 bg-indigo m-auto">
				<div className="mb-2 pb-2 d-flex justify-content-center">
					<div className="subscription">
						<p className="m-auto diphylleia-regular fs-3"><strong>Subscribe Now to Find Jobs</strong></p>
                        $15.00/yr.
						<p className="mb-0">✔️ Includes background check</p>
						<p className="mt-0">✔️ Find & apply to jobs</p>
						<img className="plant" src={plant}/>
						<div className="d-flex justify-content-center">
							<button
								type="submit" 
								className="btn btn-success mb-5 col-6 rounded-pill"
								onClick={
									() => {
										navigate('/provider-signup2')
									}
								}
							>
								Sign me up!
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};