import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import placeholder from "../../img/placeholder.png";
import watering from "../../img/watering.png";
import cleaning from "../../img/cleaning.png";
import pruning from "../../img/pruning.png";
import repotting from "../../img/repotting.png";
import pestControl from "../../img/pestControl.png";
import { useNavigate } from "react-router-dom";

export const ProviderProfile = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	return (
		<div className="text-center m-5">
			<h1 className="diphylleia-regular">Let's Build Your Profile!</h1>

            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">@</span>
                <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"/>
            </div>

            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                <span className="input-group-text" id="basic-addon2">@example.com</span>
            </div>

            <label for="basic-url" className="form-label">Your vanity URL</label>
            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon3">https://example.com/users/</span>
                <input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3"/>
            </div>

            <div className="input-group mb-3">
                <span className="input-group-text">$</span>
                <input type="text" className="form-control" aria-label="Amount (to the nearest dollar)"/>
                <span className="input-group-text">.00</span>
            </div>

            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Username" aria-label="Username"/>
                <span className="input-group-text">@</span>
                <input type="text" className="form-control" placeholder="Server" aria-label="Server"/>
            </div>

            <div className="input-group">
                <span className="input-group-text">With textarea</span>
                <textarea className="form-control" aria-label="With textarea"></textarea>
            </div>

			<h5>This is where providers can create and update their profile with 
				personal information, 
				skills, 
				experience, 
				rates, 
				and availability 
				so that clients can view their services and hire them.
			</h5>
			
			<h3 className="mt-5">Build Your Profile</h3>
			<img 
				className="picUpload btn"
				src={placeholder}
				// onClick={
				// 	() => {
				// 		navigate('/')
				// 	}
				// }
			/>
			<p><strong>Add a Profile Picture</strong></p>

            <button 
				type="submit" 
				className="btn btn-success mb-5 col-2 rounded-pill"
				onClick={
					() => {
						navigate('/plant-types')
					}
				}
			>
				Next
			</button>
		</div>
	);
};