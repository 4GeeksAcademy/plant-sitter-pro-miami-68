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
                <button
                    type="submit" 
                    className="btn btn-success mb-5 col-2 rounded-pill"
                    onClick={
                        () => {
                            navigate('/provider-services')
                        }
                    }
                >
                    Next
                </button>
            </form>
        {/* </div> */}
</div>
		// <div className="text-center m-5">
		// 	<h1 className="diphylleia-regular">Where would you like to work?</h1>
        //     <div className="col-2 g-3 justify-self-center m-3 input-container">
        //         <input placeholder="ZIP code" type="text" id="zipcode" className="input-field" name="zipcode"/>  
        //         <i className="fa-solid fa-location-dot"></i>
        //     </div>
        //     <img className="map" src={map}/>
        //     <p></p>
        //     <button
		// 		type="submit" 
		// 		className="btn btn-success mb-5 col-2 rounded-pill"
        //         onClick={
        //             () => {
        //                 navigate('/provider-services')
        //             }
        //         }
        //     >
        //         Next
        //     </button>
		// </div>
	);
};