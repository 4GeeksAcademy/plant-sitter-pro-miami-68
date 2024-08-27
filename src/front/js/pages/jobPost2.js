import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";
import plantoutlines from "../../img/plantoutlines.jpg";
import client from "../../img/client.png";
import picture from "../../img/profilePicture.png";
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
import calendar from "../../img/calendar.png"

export const JobPost2= () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	return (
		<div className="text-center m-2 mt-4">
            <div className="row container-fluid mt-4">
                <h1 className="mb-5 mt-3 diphylleia-regular jobs"><strong>This is how your job post will appear</strong></h1>
                <div className="col bckgrnd rounded p-3 m-2">
                    <img className="img-fluid" src={picture}/>
                    <div data-mdb-input-init className="form-outline form-white">
                        <h1 className="text-white mb-3 diphylleia-regular jobs"><strong>Rose McIntosh</strong></h1>
                        <h3 className="text-white mb-3 diphylleia-regular jobs"><strong>Nashville, TN</strong></h3>
                        <p className="fs-4 mt-4 text-white description">I could use some help taking care of my plants while I'm out of town next month for work.</p>
                    </div>
                </div>
                    <div className="col bckgrnd rounded p-3 m-2">
                        <h1 className="diphylleia-regular text-white">Plant Types and Services</h1>
                        <label for="basic-url" className="form-label diphylleia-regular fs-5 mt-4 text-white"><strong>I have plants belonging to these categories:</strong></label>
                        <div className="d-flex plant-types">
                            <div className="justify-content-center">
                                <img src={usual} className="plants img-fluid"/>            
                                <p className="text-white"><strong>Standard House Plants</strong></p>
                            </div>
                            <div className="justify-content-center">
                                <img src={succulents} className="plants img-fluid"/>            
                                <p className="text-white"><strong>Succulents</strong></p>
                            </div>
                            <div className="justify-content-center">
                                <img src={orchids} className="plants img-fluid"/>            
                                <p className="text-white"><strong>Orchids</strong></p>
                            </div>
                            <div className="justify-content-center">
                                <img src={outdoors} className="plants img-fluid"/>            
                                <p className="text-white"><strong>Outdoor Potted Plants</strong></p>
                            </div>
                        </div>
                        <label for="basic-url" className="form-label diphylleia-regular fs-5 mt-3 text-white"><strong>About my plants and their needs:</strong></label>
                        <div className="input-group mb-3">
                            <p className="fs-4 text-white description">I have some potted hibiscus, citrus trees, and a small herb garden that need care outside. Inside, I have a ficus in the living room, monstera and several pothos in our Florida room, and there are English ivy in all of the bathrooms...</p>
                        </div>
                        <label for="basic-url" className="form-label diphylleia-regular fs-5 mt-4 text-white"><strong>I need help with the following services:</strong></label>
                        
                        <div className="d-flex plant-types">
                            <div className="justify-content-center">
                                <input type="image"  alt="Submit" className="imageSmall img-fluid" src={watering}/>
                                <p className="text-white"><strong>Watering</strong></p>
                            </div>
                            <div className="justify-content-center">
                                <input type="image"  alt="Submit" className="imageSmall img-fluid" src={cleaning}/>
                                <p className="text-white"><strong>Cleaning</strong></p>
                            </div>
                            <div className="justify-content-center">
                                <input type="image"  alt="Submit" className="imageSmall img-fluid" src={pestControl}/>
                                <p className="text-white"><strong>Pest Control</strong></p>
                            </div>
                        </div>
                        <label for="basic-url" className="form-label diphylleia-regular fs-5 mt-3 text-white"><strong>More about what I need:</strong></label>
                        <div className="input-group mb-3">
                            <p className="fs-4 text-white description">I can't get rid of these pesty gnats coming out of my plants!</p>
                        </div>
                        <label for="basic-url" className="form-label diphylleia-regular fs-5 mt-3 text-white"><strong>Also...</strong></label>
                        <div className="input-group mb-3">
                            <p className="fs-4 text-white description">I could really use some help deciding what plants will work best in my space. Some of my babies look really unhappy where they are right now.</p>
                        </div>
                    </div>
                    <div className="col bckgrnd rounded p-3 m-2">
                        <h1 className="diphylleia-regular text-white">Duration</h1>
                        <label for="basic-url" className="form-label diphylleia-regular fs-5 mt-4 text-white"><strong>I am requesting care for the following dates:</strong></label>
                        <div className="mt-3 mb-3">
                            <img src={calendar} className="plants img-fluid"/>  
                        </div>
                        <label for="basic-url" className="form-label diphylleia-regular fs-5 text-white"><strong>Other things to know about this job:</strong></label>
                        <div className="input-group mb-3">
                            <p className="fs-4 text-white description">I have a lot of plants! It's a big job, but I will leave all of the instructions that you need.</p>
                        </div>
                        <label for="basic-url" className="form-label diphylleia-regular fs-5 text-white"><strong>Lastly...</strong></label>
                        <div className="input-group mb-3">
                            <p className="fs-4 text-white description">There is a chance that my trip could be extended for a week.</p>
                        </div>
                    </div>
            </div>
            <button
                type="submit" 
                className="btn mb-3 mt-3 col-2 rounded-pill"
                onClick={
                    () => {
                        navigate('/')
                    }
                }
            >
                Submit
            </button>
        </div>
	);
};