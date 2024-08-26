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
import vacation from "../../img/vacation.jpg";
import regular from "../../img/regular.jpg";
import oneTime from "../../img/one-time.jpg";
import { useNavigate } from "react-router-dom";

export const ClientServices2 = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	return (
		<div className="text-center m-5">
			<h1 className="diphylleia-regular">Welcome (link to first name)! <i class="fa-solid fa-leaf"></i></h1>
			<h3 className="diphylleia-regular mt-3"><strong>What kind ?</strong></h3>
			<h5 className="mt-3">Select all that apply</h5>
            <div className="d-flex plant-types row">
                <div className="container col client-services">
                    <div className="centered">
                        <strong>I need short term help taking care of my plants.</strong>
                    </div>
                </div>
                <div className="container col client-services">
                    <div className="centered">
                        <strong>I need weekly help taking care of my plants.</strong>
                    </div>
                </div>
                <div className="container col client-services">
                    <div className="centered">
                        <strong>I need one time help with a task.</strong>
                    </div>
                </div>
               
            </div>
            <button
                type="submit" 
                className="btn btn-success mb-3 mt-5 col-2 rounded-pill"
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