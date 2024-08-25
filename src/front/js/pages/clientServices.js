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

export const ClientServices = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	return (
		<div className="text-center m-5">
			<h1 className="diphylleia-regular">Welcome (link to first name)! <i class="fa-solid fa-leaf"></i></h1>
			<h3 className="diphylleia-regular mt-5"><strong>What kind of plant care help do you need?</strong></h3>
			<h5 className="mt-3">Select all that apply</h5>
            <div className="d-flex plant-types">
                <div className="container needs">
                    <p>I need short term help taking care of my plants while I am away, or unable to do it myself.</p>
                </div>
                <div className="container needs">
                    <p>I need regular help caring for my plants</p>
                </div>
                <form action="/submit-url" method="post" className="justify-content-center">
                    <input type="image"  alt="Submit" className="plants img-fluid" src={orchids}/>
                    <p className="text-white"><strong>Orchids</strong></p>
                </form>
                <form action="/submit-url" method="post" className="justify-content-center">
                    <input type="image"  alt="Submit" className="plants img-fluid" src={carnivorous}/>
                    <p className="text-white"><strong>Carnivorous</strong></p>
                </form>
                <form action="/submit-url" method="post" className="justify-content-center">
                    <input type="image"  alt="Submit" className="plants img-fluid" src={unusual}/>
                    <p className="text-white"><strong>Unusual / Rare</strong></p>
                </form>
                <form action="/submit-url" method="post" className="justify-content-center">
                    <input type="image"  alt="Submit" className="plants img-fluid" src={landscape}/>
                    <p className="text-white"><strong>Landscape</strong></p>
                </form>
                <form action="/submit-url" method="post" className="justify-content-center">
                    <input type="image"  alt="Submit" className="plants img-fluid" src={outdoors}/>
                    <p className="text-white"><strong>Outdoor Potted Plants</strong></p>
                </form>
                <form action="/submit-url" method="post" className="justify-content-center">
                    <input type="image"  alt="Submit" className="plants img-fluid" src={veggies}/>
                    <p className="text-white"><strong>Vegetable Gardens</strong></p>
                </form>
            </div>
            <button
                type="submit" 
                className="btn btn-success mb-3 mt-3 col-2 rounded-pill"
                onClick={
                    () => {
                        navigate('/provider-profile-completed')
                    }
                }
            >
                Next
        </button>
    </div>
	);
};