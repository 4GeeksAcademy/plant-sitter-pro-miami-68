import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";
import picture from "../../img/profilePicture.png";
import succulents from "../../img/succulents.jpg";
import orchids from "../../img/orchids.jpg";
import client from "../../img/client.png";
import unusual from "../../img/unusual.jpg";
import carnivorous from "../../img/carnivorous.jpg";
import usual from "../../img/usual.jpg";
import landscape from "../../img/landscape.jpg";
import outdoors from "../../img/outdoors.jpg";
import veggies from "../../img/veggies.jpg";

export const ProviderProfileCompleted = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	return (
		<div className="text-center m-2">
            <div className="row container-fluid mt-4">
                <h1 className="mb-5 mt-3 diphylleia-regular jobs"><strong>This is how your profile will appear to others.</strong></h1>
                <div className="col bckgrnd rounded p-3 m-2">
                    <img className="img-fluid" src={client}/>
                    <div data-mdb-input-init className="form-outline form-white">
                        <h1 className="text-white mb-3 diphylleia-regular jobs"><strong>Alex Hawthorne</strong></h1>
                        <h3 className="text-white mb-3 diphylleia-regular jobs"><strong>Gainesville, FL</strong></h3>
                        <p className="fs-4 mt-4 text-white description">Hi! I'm Alex. I have a bachelor's degree in Horticulture and years of experience caring for plants of all kinds.</p>
                    </div>
                </div>
                <div className="col bckgrnd rounded p-3 m-2">
                    <label for="basic-url" className="form-label diphylleia-regular fs-5 text-white"><strong>What potential clients should know about me:</strong></label>
                    <div className="input-group mb-3">
                        <p className="fs-4 text-white description">Plants are my passion! I've been a plant lover my whole life and have dedicated my career to their care.</p>
                    </div>
                    <label for="basic-url" className="form-label diphylleia-regular fs-5 text-white"><strong>My plants:</strong></label>
                    <div className="input-group mb-3">
                        <p className="fs-4 text-white description">I have SO many plants! The list includes everything from pothos to Venus fly traps - I love them all!</p>
                    </div>

                    <label for="basic-url" className="form-label diphylleia-regular fs-5 text-white"><strong>My background and experience:</strong></label>
                    <div className="input-group mb-3">
                        <p className="fs-4 text-white description">I have a bachelor of science degree in horticulture from the University of Florida, and at least a decade of experience owning my own personal plants.</p>
                    </div>
                    <label for="basic-url" className="form-label diphylleia-regular fs-5 text-white"><strong>Other things I'd like to share:</strong></label>
                    <div className="input-group justify-contents-center mb-3">
                        <p className="fs-4 text-white description">I'm an expert at organic pest control, in case you need any help with whiteflies, fungus gnats, scale, mealy bugs, etc. 
                            I can also help you decide what plants work best for your space. No job is too big or small! Just tell me what you need and I will take the best possible care of your plants.
                        </p>
                    </div>
                </div>
                <div className="col bckgrnd rounded p-3 m-2">
                    <h1 className="diphylleia-regular text-white mb-5">I am comfortable taking care of the following types of plants:</h1>
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
                            <img src={carnivorous} className="plants img-fluid"/>            
                            <p className="text-white"><strong>carnivorous</strong></p>
                        </div>
                        <div className="justify-content-center">
                            <img src={unusual} className="plants img-fluid"/>            
                            <p className="text-white"><strong>Unusual / Rare</strong></p>
                        </div>
                        <div className="justify-content-center">
                            <img src={outdoors} className="plants img-fluid"/>            
                            <p className="text-white"><strong>Outdoor Potted Plants</strong></p>
                        </div>
                    </div>
                </div>
            </div>
            <button
                type="submit" 
                className="btn btn-success mb-3 mt-3 col-2 rounded-pill"
                onClick={
                    () => {
                        navigate('/view-jobs')
                    }
                }
            >
                Next
        </button>
        </div>
	);
};