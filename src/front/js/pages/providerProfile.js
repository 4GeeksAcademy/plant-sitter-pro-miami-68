import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";
import plantoutlines from "../../img/plantoutlines.jpg";
import picture from "../../img/profilePicture.png";
import succulents from "../../img/succulents.jpg";
import orchids from "../../img/orchids.jpg";
import unusual from "../../img/unusual.jpg";
import carnivorous from "../../img/carnivorous.jpg";
import usual from "../../img/usual.jpg";
import landscape from "../../img/landscape.jpg";
import outdoors from "../../img/outdoors.jpg";
import veggies from "../../img/veggies.jpg";

export const ProviderProfile = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	return (
		<div className="text-center m-2">
            <h1 className="mb-4"> Let's build your profile</h1>
            <div className="row">
                <h3 className="diphylleia-regular m-auto col-8">Clients will view your profile to decide if you're the right fit to take care of their plants, 
                    so be sure to include all of your relevant knowledge, experience, and passion for plants!
                </h3>
            </div>
            <div className="row container-fluid mt-4">
                <div className="col bg-success rounded p-3 m-2">
                    <h3 className="diphylleia-regular text-white">Upload a profile picture ⬇️</h3>
                    <img className="img-fluid btn" src={picture}/>
                    <div data-mdb-input-init className="form-outline form-white">
                        <input type="text" placeholder="First Name" id="form3Examplea5" className="form-control form-control-lg mb-3" />
                        <input type="text" placeholder="Last Name" id="form3Examplea5" className="form-control form-control-lg mb-3" />
                    {/* </div>
                    <div data-mdb-input-init className="form-outline form-white"> */}
                        <input type="text" placeholder="Your Location (City, State)" id="form3Examplea5" className="form-control form-control-lg mb-3" />
                    {/* </div>
                    <div data-mdb-input-init className="form-outline form-white"> */}
                        <textarea className="form-control form-control-lg" placeholder="Brief Intro..." aria-label="With textarea">
                        </textarea>
                    </div>
                </div>
                <div className="col bg-success rounded p-3 m-2">
                    <label for="basic-url" className="form-label diphylleia-regular fs-5 text-white"><strong>What should potential clients know about you?</strong></label>
                    <div className="input-group mb-3">
                        <textarea rows="5" className="form-control" placeholder="I've been a plant love my whole life..." aria-label="With textarea"></textarea>
                    </div>
                    <label for="basic-url" className="form-label diphylleia-regular fs-5 text-white"><strong>Do you currently own any plants?</strong></label>
                    <div className="input-group mb-3">
                        <textarea rows="5" className="form-control" placeholder="My apartment is basically a greenhouse..." aria-label="With textarea"></textarea>
                    </div>

                    <label for="basic-url" className="form-label diphylleia-regular fs-5 text-white"><strong>Do you have any professional plant care experience?</strong></label>
                    <div className="input-group mb-3">
                        <textarea rows="5" className="form-control" placeholder="I worked at a garden nursery for a couple of years..." aria-label="With textarea"></textarea>
                    </div>
                    <label for="basic-url" className="form-label diphylleia-regular fs-5 text-white"><strong>Anything else you would like to share?</strong></label>
                    <div className="input-group justify-contents-center mb-3">
                        <textarea rows="5" className="form-control" placeholder="Examples: 'I can help you decide what plants work best for your space', or 
                            'I'm an expert at organic pest control'..." aria-label="With textarea">
                        </textarea>
                    </div>
                </div>
                <div className="col bg-success rounded p-3 m-2">
                    <h1 className="diphylleia-regular text-white">What kinds of plants are you comfortable taking care of?</h1>
                    <h5 className="mt-4 mb-4 text-white">Select all that apply</h5>

                    <div className="d-flex plant-types">
                        <div className="justify-content-center">
                            <img className="plants btn img-fluid" src={usual}/>
                            <p className="text-white"><strong>Standard House Plants</strong></p>
                        </div>
                        <div className="justify-content-center">
                            <img className="plants btn img-fluid" src={succulents}/>
                            <p className="text-white"><strong>Succulents</strong></p>
                        </div>
                        <div className="justify-content-center">
                            <img className="plants btn img-fluid" src={orchids}/>
                            <p className="text-white"><strong>Orchids</strong></p>
                        </div>
                        <div className="justify-content-center">
                            <img className="plants btn img-fluid" src={carnivorous}/>
                            <p className="text-white"><strong>Carnivorous</strong></p>
                        </div>
                        <div className="justify-content-center">
                            <img className="plants btn img-fluid" src={unusual}/>
                            <p className="text-white"><strong>Unusual / Rare</strong></p>
                        </div>
                        <div className="justify-content-center">
                            <img className="plants btn img-fluid" src={landscape}/>
                            <p className="text-white"><strong>Landscape</strong></p>
                        </div>
                        <div className="justify-content-center">
                            <img className="plants btn img-fluid" src={outdoors}/>
                            <p className="text-white"><strong>Outdoor Potted Plants</strong></p>
                        </div>
                        <div className="justify-content-center">
                            <img className="plants btn img-fluid" src={veggies}/>
                            <p className="text-white"><strong>Vegetable Gardens</strong></p>
                        </div>
                    </div>
                </div>
            </div>
            <button
                type="submit" 
                className="btn btn-success mb-3 mt-3 col-2 rounded-pill"
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