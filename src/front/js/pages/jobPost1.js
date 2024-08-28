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

export const JobPost1= () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	return (
		<div className="text-center m-2 mt-4">
            <h1 className="mb-4">Ready to post a job?</h1>
            <div className="row">
                <h3 className="diphylleia-regular m-auto col-8">Tell us more about the plants that you have, the care that you need, and a little about yourself so that our 
                    plant sitters can get to know you and your needs.
                </h3>
            </div>
            <div className="row container-fluid mt-4">
                <div className="col bckgrnd rounded p-3 m-2">
                    <h3 className="diphylleia-regular text-white">Upload a picture of yourself (or your plants) ⬇️</h3>
                    <img className="img-fluid btn" src={picture}/>
                    <div data-mdb-input-init className="form-outline form-white">
                        <input type="text" placeholder="First Name" id="form3Examplea5" className="form-control form-control-lg mb-3" />
                        <input type="text" placeholder="Last Name" id="form3Examplea5" className="form-control form-control-lg mb-3" />
                        <input type="text" placeholder="Your Location (City, State)" id="form3Examplea5" className="form-control form-control-lg mb-3" />
                        <textarea rows="5" className="form-control form-control" placeholder="Brief Intro..." aria-label="With textarea"></textarea>
                    </div>
                </div>
                <div className="col bckgrnd rounded p-3 m-2">
                    <h1 className="diphylleia-regular text-white">Plant Types and Services</h1>
                    <label for="basic-url" className="form-label diphylleia-regular fs-5 mt-4 text-white"><strong>You said that your plants include:</strong></label>
                    <div className="input-group mb-3">
                        <textarea rows="3" className="form-control" placeholder="Insert auto populated list of plant types selected on previous page" aria-label="With textarea"></textarea>
                    </div>
                    <label for="basic-url" className="form-label diphylleia-regular fs-5 mt-3 text-white"><strong>Tell us more about your plants and their needs here:</strong><p>Note that you will be able to communicate with your plant sitter directly, to leave more specific instructions if needed.</p></label>
                    <div className="input-group mb-3">
                        <textarea rows="8" className="form-control" placeholder="Example: 'I have some potted hibiscus, citrus trees, and a small herb garden that need care outside. Inside, I have a ficus in the living room, monstera and several pothos in our Florida room, and there are English ivy in all of the bathrooms...'" aria-label="With textarea"></textarea>
                    </div>

                    <label for="basic-url" className="form-label diphylleia-regular fs-5 mt-4 text-white"><strong>You said that you need the following services:</strong></label>
                    <div className="input-group mb-3">
                        <textarea rows="3" className="form-control" placeholder="Insert auto populated list of services selected on the previous page" aria-label="With textarea"></textarea>
                    </div>
                    <label for="basic-url" className="form-label diphylleia-regular fs-5 mt-3 text-white"><strong>Tell us more about what you need help with:</strong></label>
                    <div className="input-group mb-3">
                        <textarea rows="8" className="form-control" placeholder="Examples: 'I need help watering while I am out of town' or 'I can't get rid of these pesty gnats coming out of my plants!'" aria-label="With textarea"></textarea>
                    </div>


                    <label for="basic-url" className="form-label diphylleia-regular fs-5 mt-3 text-white"><strong>Anything else you would like to share?</strong></label>
                    <div className="input-group justify-contents-center mb-3">
                        <textarea rows="5" className="form-control" placeholder="Example: 'I could really use some help deciding what plants will work best in my space. Some of my babies look really unhappy where they are right now." aria-label="With textarea">
                        </textarea>
                    </div>
                    
                </div>
                <div className="col bckgrnd rounded p-3 m-2">
                    <h1 className="diphylleia-regular text-white">Duration</h1>
                    <label for="basic-url" className="form-label diphylleia-regular fs-5 mt-4 text-white"><strong>You are requesting care for the following dates:</strong></label>
                    <div className="input-group mb-3">
                        <textarea rows="3" className="form-control" placeholder="Insert auto populated calendar or list of dates from scheduler" aria-label="With textarea"></textarea>
                    </div>
                    <label for="basic-url" className="form-label diphylleia-regular fs-5 text-white"><strong>What else should potential plant sitters know about this job?</strong></label>
                    <div className="input-group mb-3">
                        <textarea rows="8" className="form-control" placeholder="I have a lot of plants! It's a big job, but I will leave all of the instructions that you need..." aria-label="With textarea"></textarea>
                    </div>
                    <label for="basic-url" className="form-label diphylleia-regular fs-5 text-white"><strong>Anything else you would like to share about the duration of the job?</strong></label>
                    <div className="input-group justify-contents-center mb-3">
                        <textarea rows="5" className="form-control" placeholder="Example: 'There is a chance that my trip could be extended for a week...'" aria-label="With textarea">
                        </textarea>
                    </div>
                </div>
            </div>
            <button
                type="submit" 
                className="btn mb-3 mt-3 col-2 rounded-pill"
                onClick={
                    () => {
                        navigate('/job-post2')
                    }
                }
            >
                Submit
            </button>
        </div>
	);
};