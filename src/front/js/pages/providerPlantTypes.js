import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import succulents from "../../img/succulents.jpg";
import orchids from "../../img/orchids.jpg";
import unusual from "../../img/unusual.jpg";
import carnivorous from "../../img/carnivorous.jpg";
import usual from "../../img/usual.jpg";
import landscape from "../../img/landscape.jpg";
import outdoors from "../../img/outdoors.jpg";
import veggies from "../../img/veggies.jpg";

import { useNavigate } from "react-router-dom";

export const ProviderPlantTypes = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	return (
		<div className="text-center m-5">
			<h1 className="diphylleia-regular">What kinds of plants are you comfortable taking care of?</h1>
			<h5 className="mt-4">Select all that apply</h5>
			<div className="d-flex plant-types">
				<div className="justify-content-center">
					<img className="plants btn" src={usual}/>
					<p><strong>Standard House Plants</strong></p>
				</div>
				<div className="justify-content-center">
					<img className="plants btn" src={succulents}/>
					<p><strong>Succulents</strong></p>
				</div>
				<div className="justify-content-center">
					<img className="plants btn" src={orchids}/>
					<p><strong>Orchids</strong></p>
				</div>
				<div className="justify-content-center">
					<img className="plants btn" src={carnivorous}/>
					<p><strong>Carnivorous</strong></p>
				</div>
				<div className="justify-content-center">
					<img className="plants btn" src={unusual}/>
					<p><strong>Other / Picky / Unusual</strong></p>
				</div>
				<div className="justify-content-center">
					<img className="plants btn" src={landscape}/>
					<p><strong>Landscape Plants</strong></p>
				</div>
				<div className="justify-content-center">
					<img className="plants btn" src={outdoors}/>
					<p><strong>Outdoor Potted Plants</strong></p>
				</div>
				<div className="justify-content-center">
					<img className="plants btn" src={veggies}/>
					<p><strong>Vegetable Gardens</strong></p>
				</div>
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