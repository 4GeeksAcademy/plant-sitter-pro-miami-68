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
            <div className="text-center mb-1">
                <p>Already have an account? <a href="/login"><u>Log in</u></a> to skip</p>
            </div>
            <form action="/action_page.php">
                <div className="row container address mt-4 w-50">
                    <input placeholder="   ZIP code" type="text" id="zipcode" className="input-field rounded" />
                </div>
                <p></p>
            </form>
            <div className="mt-4">
                <h3 className="diphylleia-regular"><strong>How far are you willing to travel?</strong></h3>
                <input placeholder="   Ex: 15" type="number" id="zipcode" className="input-field rounded" name="zipcode" />
                <p className="m-0"></p>
                <label for="customRange2" className="form-label mb-3">Miles</label>
            </div>
            <button
                type="button"
                className="btn btn-success mt-3 col-2 rounded-pill"
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