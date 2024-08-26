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
import watering from "../../img/watering.png";
import cleaning from "../../img/cleaning.png";
import pruning from "../../img/pruning.png";
import repotting from "../../img/repotting.png";
import pestControl from "../../img/pestControl.png";
import border from "../../img/border.png";
import { useNavigate } from "react-router-dom";

export const ClientServices1 = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	return (
		<div className="text-center m-5">
			<h1 className="diphylleia-regular">Welcome (link to first name)!</h1>
            <img className="divider" src={border}></img>
			<h3 className="diphylleia-regular mt-1"><strong>How frequently do you want help?</strong></h3>
            <div className="d-flex row client-services">
                <div className="col scheduler">
                    <div className="centered">
                        <strong>Insert scheduler</strong>
                    </div>
                </div>
            <p></p>
            <img className="divider m-auto" src={border}></img>
            <h3 className="diphylleia-regular mt-4"><strong>What kind of plants do you have that need care?</strong></h3>
            <p className="fs-5">Don't worry - you can be more specific when you post a job</p>
            <h5 className="mt-3 mb-4">Select all that apply</h5>
            <div className="d-flex plant-types">
                <form action="/submit-url" method="post" className="justify-content-center">
                    <input type="image"  alt="Submit" className="plants img-fluid" src={usual}/>
                    <p className="text-white"><strong>Standard House Plants</strong></p>
                </form>
                <form action="/submit-url" method="post" className="justify-content-center">
                    <input type="image"  alt="Submit" className="plants img-fluid" src={succulents}/>
                    <p className="text-white"><strong>Succulents</strong></p>
                </form>
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
            <img className="divider m-auto" src={border}></img>
            <h3 className="diphylleia-regular mt-4"><strong>What kind of services do you need?</strong></h3>
            <h5 className="mt-3 mb-4">Select all that apply</h5>
            <div className="d-flex plant-types">
                <form action="/submit-url" method="post" className="justify-content-center">
                    <input type="image"  alt="Submit" className="plants img-fluid" src={watering}/>
                    <p className="text-white"><strong>Watering</strong></p>
                </form>
                <form action="/submit-url" method="post" className="justify-content-center">
                    <input type="image"  alt="Submit" className="plants img-fluid" src={cleaning}/>
                    <p className="text-white"><strong>Cleaning</strong></p>
                </form>
                <form action="/submit-url" method="post" className="justify-content-center">
                    <input type="image"  alt="Submit" className="plants img-fluid" src={pruning}/>
                    <p className="text-white"><strong>Pruning</strong></p>
                </form>
                <form action="/submit-url" method="post" className="justify-content-center">
                    <input type="image"  alt="Submit" className="plants img-fluid" src={repotting}/>
                    <p className="text-white"><strong>Repotting</strong></p>
                </form>
                <form action="/submit-url" method="post" className="justify-content-center">
                    <input type="image"  alt="Submit" className="plants img-fluid" src={pestControl}/>
                    <p className="text-white"><strong>Pest control</strong></p>
                </form>
            </div>
            <div className="container row mt-5 mb-5">
                <button
                    type="submit" 
                    className="btn btn-success m-auto col-2 rounded-pill"
                    onClick={
                        () => {
                            navigate('/job-post1')
                        }
                    }
                >
                    Next
                </button>
            </div>
            <div className="mb-5"> </div>
        </div>
    </div>
	);
};