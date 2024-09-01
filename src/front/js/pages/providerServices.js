import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import watering from "../../img/watering.png";
import cleaning from "../../img/cleaning.png";
import pruning from "../../img/pruning.png";
import repotting from "../../img/repotting.png";
import pestControl from "../../img/pestControl.png";
import { useNavigate } from "react-router-dom";

export const ProviderServices = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [servicePreferences, setServicePreferences] = useState([]);

    useEffect(() => {
        actions.getPlantSitter().then(res => {
            if (res.success) {
                setServicePreferences(res.data.service_preferences || []);
            } else {
                console.log("No PlantSitter found, creating a new one");
                setServicePreferences([]);
            }
        });
    }, []);

    const handleCheckboxChange = (service) => {
        setServicePreferences(prevState => 
            prevState.includes(service) 
            ? prevState.filter(s => s !== service) 
            : [...prevState, service]
        );
    };

    const isServiceChecked = (service) => {
        return servicePreferences.includes(service);
    };

    const handleSubmit = () => {
        const plantSitterData = {
            service_preferences: servicePreferences,
            profile_picture_url: store.plantSitter?.profile_picture_url,
            professional_experience: store.plantSitter?.professional_experience,
            preferred_plants: store.plantSitter?.preferred_plants,
            intro: store.plantSitter?.intro,
            current_plants: store.plantSitter?.current_plants,
            client_info: store.plantSitter?.client_info,
            extra_info: store.plantSitter?.extra_info,
        };
    
        if (store.plantSitter && store.plantSitter.id) {
            actions.createOrUpdatePlantSitter(
                plantSitterData.profile_picture_url,
                plantSitterData.professional_experience,
                plantSitterData.preferred_plants,
                plantSitterData.service_preferences,
                plantSitterData.intro,
                plantSitterData.current_plants,
                plantSitterData.client_info,
                plantSitterData.extra_info
            ).then((res) => {
                if (res.success) {
                    navigate('/provider-profile');
                } else {
                    console.error("Error updating plant sitter:", res.error);
                }
            });
        } else {
            actions.createOrUpdatePlantSitter(
                plantSitterData.profile_picture_url,
                plantSitterData.professional_experience,
                plantSitterData.preferred_plants,
                plantSitterData.service_preferences,
                plantSitterData.intro,
                plantSitterData.current_plants,
                plantSitterData.client_info,
                plantSitterData.extra_info,
                true
            ).then((res) => {
                if (res.success) {
                    navigate('/provider-profile');
                } else {
                    console.error("Error creating plant sitter:", res.error);
                }
            });
        }
    };

    return (
        <div className="text-center m-5">
            <h1 className="diphylleia-regular">Welcome to the Plant Care Pro Team! <i className="fa-solid fa-leaf"></i></h1>
            <h3 className="diphylleia-regular"><strong>What kind of services can you provide?</strong></h3>
            <h5 className="mt-3">Select all that apply</h5>

            <div className="row justify-content-center topRow">
                <label className="checkbx col-5">
                    <img className="icon" src={watering}/>
                    Watering
                    <input 
                        type="checkbox" 
                        onChange={() => handleCheckboxChange('watering')} 
                        checked={isServiceChecked('watering')}
                    />
                    <span className="checkmark"></span>
                </label>
            </div>
            <div className="row justify-content-center topRow">
                <label className="checkbx col-5">
                    <img className="icon" src={repotting}/>
                    Repotting
                    <input 
                        type="checkbox" 
                        onChange={() => handleCheckboxChange('repotting')} 
                        checked={isServiceChecked('repotting')}
                    />
                    <span className="checkmark"></span>
                </label>
            </div>
            <div className="row justify-content-center topRow">
                <label className="checkbx col-5">
                    <img className="icon" src={pruning}/>
                    Pruning
                    <input 
                        type="checkbox" 
                        onChange={() => handleCheckboxChange('pruning')} 
                        checked={isServiceChecked('pruning')}
                    />
                    <span className="checkmark"></span>
                </label>
            </div>
            <div className="row justify-content-center topRow">
                <label className="checkbx col-5">
                    <img className="icon" src={pestControl}/>
                    Pest Control
                    <input 
                        type="checkbox" 
                        onChange={() => handleCheckboxChange('pestControl')} 
                        checked={isServiceChecked('pestControl')}
                    />
                    <span className="checkmark"></span>
                </label>
            </div>
            <div className="row justify-content-center topRow">
                <label className="checkbx col-5">
                    <img className="icon" src={cleaning}/>
                    Cleaning
                    <input 
                        type="checkbox" 
                        onChange={() => handleCheckboxChange('cleaning')} 
                        checked={isServiceChecked('cleaning')}
                    />
                    <span className="checkmark"></span>
                </label>
            </div>
            <button 
                type="submit" 
                className="btn btn-success mb-5 col-5 rounded-pill"
                onClick={handleSubmit}
            >
                Next
            </button>
        </div>
    );
};