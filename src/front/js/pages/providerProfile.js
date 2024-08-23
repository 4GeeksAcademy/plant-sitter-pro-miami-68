import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import placeholder from "../../img/placeholder.png";
import succulents from "../../img/succulents.jpg";
import orchids from "../../img/orchids.jpg";
import unusual from "../../img/unusual.jpg";
import carnivorous from "../../img/carnivorous.jpg";
import usual from "../../img/usual.jpg";
import landscape from "../../img/landscape.jpg";
import outdoors from "../../img/outdoors.jpg";
import veggies from "../../img/veggies.jpg";
import { useNavigate } from "react-router-dom";

export const ProviderProfile = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	return (
		<div className="text-center m-5">
            <div className="text-center m-5 row">
                <h1 className="diphylleia-regular pb-4">Let's Build Your Profile</h1>
                <div className="col-4"></div>
                <div className="col-4">
                    <h5 className="diphylleia-regular mb-4">Clients will view your profile to decide if you're the right fit to take care of their plants, 
                        so be sure to include all of your relevant knowledge, experience, and passion for plants!
                    </h5>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="First Name" aria-label="firstName"/>
                    </div>

                    <div className="input-group mb-1">
                        <input type="text" className="form-control" placeholder="Last Name" aria-label="lastName" aria-describedby="lastName"/>
                    </div>

                    <img 
                        className="picUpload btn mt-3"
                        src={placeholder}
                        // onClick={
                        // 	() => {
                        // 		navigate('/')
                        // 	}
                        // }
                    />
                    <p><strong>Add a Profile Picture</strong></p>

                    <label for="basic-url" className="form-label diphylleia-regular fs-5"><strong>What should potential clients know about you?</strong></label>
                    <div className="input-group mb-3">
                        <textarea className="form-control" placeholder="I've been a plant love my whole life..." aria-label="With textarea"></textarea>
                    </div>
                    <label for="basic-url" className="form-label diphylleia-regular fs-5"><strong>Do you currently own any plants?</strong></label>
                    <div className="input-group mb-3">
                        <textarea className="form-control" placeholder="My apartment is basically a greenhouse..." aria-label="With textarea"></textarea>
                    </div>

                    <label for="basic-url" className="form-label diphylleia-regular fs-5"><strong>Do you have any professional plant care experience?</strong></label>
                    <div className="input-group mb-3">
                        <textarea className="form-control" placeholder="I worked at a garden nursery for a couple of years..." aria-label="With textarea"></textarea>
                    </div>
                </div>
            </div>
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
					<p><strong>Picky / Unusual House Plants</strong></p>
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
            <div className="row container-flex">
                <div className="col-4"></div>
                <div className="col-4">
                    <label for="basic-url" className="form-label diphylleia-regular fs-5"><strong>Anything else you would like to share?</strong></label>
                    <div className="input-group justify-contents-center mb-3">
                        <textarea className="form-control" placeholder="Examples: 'I can help you decide what plants work best for your space', or 
                            'I'm an expert at organic pest control'..." aria-label="With textarea">
                        </textarea>
                    </div>
                </div>
            </div>
			<button 
				type="submit" 
				className="btn btn-success mb-5 mt-3 col-2 rounded-pill"
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