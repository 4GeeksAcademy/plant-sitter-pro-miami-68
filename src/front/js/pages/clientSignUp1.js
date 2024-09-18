import React, { useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";
import plant from "../../img/plant.png";

export const ClientSignUp1 = () => {
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
			<div className="col-lg-4 mt-5 bg-indigo m-auto">
				<div className="mb-2 pb-2 d-flex justify-content-center">
					<div className="subscription">
						<p className="m-auto diphylleia-regular fs-3"><strong>Subscribe Now to Continue</strong></p>
						<strong>$5.00/yr.</strong>
						<p className="mb-0">✔️ Find and hire qualitifed help near you</p>
						<p className="mt-0 mb-0">✔️ Background checks completed for all sitters</p>
						<p className="mt-0 mb-0">✔️ Cancel anytime</p>
						<img className="plant" src={plant} />
						<div className="d-flex justify-content-center">
							<button
								type="submit"
								className="btn btn-success mb-5 col-6 rounded-pill"
								onClick={
									() => {
										navigate('/client-signup2')
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