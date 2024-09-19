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
						<p className="m-auto diphylleia-regular mt-3 fs-3"><strong>Payment Page Goes Here</strong></p>
						<img className="plant mt-3 mb-3" src={plant} />
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
								Process Payment
							</button>
						</div>
					</div>
				</div>
				<p className="fs-2 text-center">Include Success Page?</p>
			</div>
		</div>
	);
};