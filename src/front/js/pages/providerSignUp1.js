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
			<div className="col-lg-4 bg-indigo m-auto">
				<h1 className="fw-normal mb-3 diphylleia-regular jobs">Find jobs near you</h1>
				<div className="mb-2 pb-2 d-flex justify-content-center">
					<div className="subscription">
                        $15.00/yr.
						<p></p>
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