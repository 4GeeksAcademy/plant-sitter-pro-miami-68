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

export const ViewJobs = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	return (
		<div className="text-center m-2 mt-4">
            <h1 className="mb-4">Here are the jobs available in your search area</h1>
            <div className="row container-fluid mt-4">
                <div className="col bckgrnd rounded p-3 m-2">
                    Link to job
                </div>
                <div className="col bckgrnd rounded p-3 m-2">
                    Link to job
                </div>
                <div className="col bckgrnd rounded p-3 m-2">
                    Link to job
                </div>
                <div className="col bckgrnd rounded p-3 m-2">
                    Link to job
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