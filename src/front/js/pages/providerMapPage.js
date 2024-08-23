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
        <form action="/action_page.php">
            <div class="input-container p-3">
                <input placeholder="   ZIP code" type="text" id="zipcode" className="input-field rounded" name="zipcode"/>  
                <i className="fa-solid fa-location-dot pin"></i>
            </div>
            <img className="map" src={map}/>
            <p></p>
        </form>
        <div>
            <h4>How far are you willing to travel?</h4>
            <input placeholder="   Ex: 15" type="number" id="zipcode" className="input-field rounded" name="zipcode"/>
            <p className="m-0"></p>
            <label for="customRange2" className="form-label mb-3">Miles</label>
        </div>
        <button
                type="submit" 
                className="btn btn-success mb-3 col-2 rounded-pill"
                onClick={
                    () => {
                        navigate('/provider-services')
                    }
                }
            >
                Next
        </button>
    </div>
	);
};