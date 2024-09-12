import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";
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
import { JobPlants } from "../component/JobPlants";
import { JobServices } from "../component/JobServices";

export const JobPost2= () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const picture = store.jobPostDetails.picture;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            if (!store.user) {
                await actions.getUser();
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

	return (
		<div className="text-center m-2 mt-4">
            <div className="row container-fluid mt-4">
                <h1 className="mb-5 mt-3 diphylleia-regular jobs"><strong>This is how your job post will appear</strong></h1>
                <div className="col bckgrnd rounded p-3 m-2">
                    <h2 className="diphylleia-regular text-white mb-4"><strong>About Me</strong></h2>
                    <div
                        className="profile-picture m-auto mb-4"
                        style={{
                            backgroundImage: picture ? `url(${picture})` : '',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    >
                        <img className="img-fluid" src={picture}/>
                    </div>
                    
                    <div data-mdb-input-init className="form-outline form-white">
                        <h1 className="text-white mb-3 diphylleia-regular jobs"><strong>Rose McIntosh</strong></h1>
                        <h3 className="text-white mb-3 diphylleia-regular jobs"><strong>Nashville, TN</strong></h3>
                        <p className="fs-4 mt-4 text-white description">I could use some help taking care of my plants while I'm out of town next month for work.</p>
                        <h2 className="diphylleia-regular text-white mt-3"><strong>Services</strong></h2>
                        <label for="basic-url" className="form-label diphylleia-regular fs-5 mt-2 text-white"><strong>I need help with:</strong></label>
                        <JobServices />
                    </div>
                </div>
                    <div className="col bckgrnd rounded p-3 m-2">
                        <h2 className="diphylleia-regular text-white"><strong>Plant Types</strong></h2>
                        <label for="basic-url" className="form-label diphylleia-regular fs-5 mt-2 text-white"><strong>I have these kinds of plants:</strong></label>
                        <div className="d-flex justify-content-center">
                            <JobPlants />
                        </div>
                        <label for="basic-url" className="form-label diphylleia-regular fs-5 mt-3 text-white"><strong>About my plants and their needs:</strong></label>
                        <div className="input-group mb-1">
                            <p className="fs-4 text-white description">I have some potted hibiscus, citrus trees, and a small herb garden that need care outside. Inside, I have a ficus in the living room, monstera and several pothos in our Florida room, and there are English ivy in all of the bathrooms...</p>
                        </div>
                        <label for="basic-url" className="form-label diphylleia-regular fs-5 mt-3 text-white"><strong>More about what I need:</strong></label>
                        <div className="input-group mb-1">
                            <p className="fs-4 text-white description">I can't get rid of these pesty gnats coming out of my plants!</p>
                        </div>
                        <label for="basic-url" className="form-label diphylleia-regular fs-5 mt-2 text-white"><strong>Also...</strong></label>
                        <div className="input-group mb-1">
                            <p className="fs-4 text-white description">I could really use some help deciding what plants will work best in my space. Some of my babies look really unhappy where they are right now.</p>
                        </div>
                    </div>
                    <div className="col bckgrnd rounded p-3 m-2">
                    <h2 className="diphylleia-regular text-white"><strong>Duration</strong></h2>
                        <label for="basic-url" className="form-label diphylleia-regular fs-5 mt-2 text-white"><strong>I need help on these dates:</strong></label>
                        <div className="mt-3 mb-3">
                            <img src={calendar} className="plants img-fluid"/>  
                        </div>
                        <label for="basic-url" className="form-label diphylleia-regular fs-5 text-white"><strong>Other things to know about this job:</strong></label>
                        <div className="input-group mb-2">
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