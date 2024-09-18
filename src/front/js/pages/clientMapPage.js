import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import map from "../../img/mapPlaceholder.png";
import pin from "../../img/pin.png"
import { useNavigate } from "react-router-dom";


export const ClientMapPage = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    return (
        <div className="text-center m-5">
            <h1 className="diphylleia-regular">Where are you located?</h1>
            <form action="/action_page.php">
                <div className="row container address mt-4 w-50">
                    <input placeholder="   ZIP code" type="text" id="zipcode" className="input-field rounded" />
                </div>
                {/* <img className="map" src={map}/> */}
                <p></p>
            </form>
            <button
                type="submit"
                className="btn btn-success mt-3 col-2 rounded-pill"
                onClick={
                    () => {
                        navigate('/client-signup1')
                    }
                }
            >
                Next
            </button>
        </div>
    );
};