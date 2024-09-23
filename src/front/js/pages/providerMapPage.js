import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

export const ProviderMapPage = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [zipCode, setZipCode] = useState("");
    const [distance, setDistance] = useState("");

    const handleSearch = async () => {
        if (zipCode && distance) {
            const res = await actions.searchJobPosts(zipCode, distance);
            if (res.success) {
                navigate('/view-jobs');
            } else {
                // navigate('/view-jobs');
                alert("No job posts yet in your search area. Try expanding your search.");
            }
        } else {
            alert("Please enter a valid ZIP code and distance.");
        }
    };

    return (
        <div className="text-center m-5">
            <h1 className="diphylleia-regular">Where would you like to work?</h1>
            <div className="text-center mb-1">
                <p>Already have an account? <a href="/login"><u>Log in</u></a> to skip</p>
            </div>
            <form>
                <div className="row container address mt-4 w-50">
                    <input 
                        placeholder=" ZIP code" 
                        type="text" 
                        id="zipcode" 
                        className="input-field rounded"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                    />
                </div>
            </form>
            <div className="mt-4">
                <h3 className="diphylleia-regular"><strong>How far are you willing to travel?</strong></h3>
                <input 
                    placeholder=" Ex: 15" 
                    type="number" 
                    id="distance" 
                    className="input-field rounded" 
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                />
            </div>
            <div>
                <label className="form-label mb-3">Miles</label>
            </div>
            <button
                type="button"
                className="btn btn-success mt-3 col-2 rounded-pill"
                onClick={handleSearch}
            >
                Next
            </button>
        </div>
    );
};