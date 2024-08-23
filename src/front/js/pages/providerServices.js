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

export const ProviderServices = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	return (
		<div className="text-center m-5">
			<h1 className="diphylleia-regular">Welcome to the Plant Care Pro Team! <i class="fa-solid fa-leaf"></i></h1>
			<h3 className="diphylleia-regular"><strong>What kind of services can you provide?</strong></h3>
			<h5 className="mt-3">Select all that apply</h5>
			<div className="row justify-content-center topRow">
				<label className="checkbx col-2">
					<img className="icon" src={watering}/>
					Watering
					<input type="checkbox"/>
					<span className="checkmark"></span>
				</label>
			</div>
			<div className="row justify-content-center">
				<label className="checkbx col-2">
					<img className="icon" src={repotting}/>
					Repotting
					<input type="checkbox"/>
					<span className="checkmark"></span>
				</label>
			</div>
			<div className="row justify-content-center">
				<label className="checkbx col-2">
					<img className="icon" src={pruning}/>
					Pruning
					<input type="checkbox"/>
					<span className="checkmark"></span>
				</label>
			</div>
			<div className="row justify-content-center">
				<label className="checkbx col-2">
					<img className="icon" src={pestControl}/>
					Pest Control
					<input type="checkbox"/>
					<span className="checkmark"></span>
				</label>
			</div>
			<div className="row justify-content-center bottomRow">
				<label className="checkbx col-2">
					<img className="icon" src={cleaning}/>
					Plant Cleaning
					<input type="checkbox"/>
					<span className="checkmark"></span>
				</label>
			</div>
			
			<button 
				type="submit" 
				className="btn btn-success mb-5 col-2 rounded-pill"
				onClick={
					() => {
						navigate('/provider-profile')
					}
				}
			>
				Next
			</button>
		</div>
	);
};