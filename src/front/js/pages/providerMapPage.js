import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import map from "../../img/mapPlaceholder.png";
import pin from "../../img/pin.png"
import { useNavigate } from "react-router-dom";


export const ProviderMapPage = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	return (
		<div className="text-center m-5">
			<h1 className="diphylleia-regular">Where would you like to work?</h1>
            <div className="row g-3 justify-content-center m-3">
                <label className="col-2">                   
                   <input placeholder="ZIP code" type="text" id="zipcode" className="form-control" aria-describedby="zipcode" />            
                </label>
            </div>
            <img className="map" src={map}/>
            <p></p>
            <button
				type="submit" 
				className="btn btn-success mb-5 col-2 rounded-pill"
                onClick={
                    () => {
                        navigate('/for-providers')
                    }
                }
            >
                Next
            </button>
		</div>
	);
};