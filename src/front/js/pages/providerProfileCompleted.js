import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";
import { PlantCard } from "../component/PlantCard";

export const ProviderProfileCompleted = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [picture, setPicture] = useState(null);
    const [professionalExperience, setProfessionalExperience] = useState("");
    const [intro, setIntro] = useState("");
    const [currentPlants, setCurrentPlants] = useState("");
    const [clientInfo, setClientInfo] = useState("");
    const [extraInfo, setExtraInfo] = useState("");
    const [preferredPlants, setPreferredPlants] = useState([]);
    const [servicePreferences, setServicePreferences] = useState([]);
    const firstName = store.user?.first_name;
    const lastName = store.user?.last_name;
    const city = store.user?.city;
    const state = store.user?.state;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            if (!store.user) {
                await actions.getUser();
            }

            const res = await actions.getPlantSitter();
            if (res.success && res.data) {
                setProfessionalExperience(res.data.professional_experience);
                setIntro(res.data.intro);
                setCurrentPlants(res.data.current_plants);
                setClientInfo(res.data.client_info);
                setExtraInfo(res.data.extra_info);
                setPreferredPlants(res.data.preferred_plants || []);
                setServicePreferences(res.data.service_preferences || []);
                setPicture(res.data.profile_picture_url);
            }
            setLoading(false);
        };

        fetchData();
    }, []);

	return (
		<div className="text-center m-2">
            <div className="row container-fluid mt-4">
                <h2 className="mb-5 mt-3 diphylleia-regular jobs"><strong>This is how your profile will appear to others.</strong></h2>
                <div className="col bckgrnd rounded p-3 m-2">
                    <div data-mdb-input-init className="form-outline form-white">
                        <h2 className="diphylleia-regular"><strong>{firstName} {lastName}</strong></h2>
                        <h3>{city}, {state}</h3>
                    </div>
                    <img className="profile-picture m-auto" src={picture}/>
                    <div data-mdb-input-init className="form-outline form-white">
                        <p className="fs-4 mt-4 text-white description">{intro}</p>
                    </div>
                </div>
                <div className="col bckgrnd rounded p-3 m-2">
                    <h2 className="diphylleia-regular text-white mb-4"><strong>About me</strong></h2>
                    <label for="basic-url" className="form-label diphylleia-regular fs-5 text-white"><strong>What potential clients should know about me:</strong></label>
                    <div className="input-group mb-3">
                        <p className="fs-4 text-white description">{clientInfo}</p>
                    </div>
                    <label for="basic-url" className="form-label diphylleia-regular fs-5 text-white"><strong>My plants:</strong></label>
                    <div className="input-group mb-3">
                        <p className="fs-4 text-white description">{currentPlants}</p>
                    </div>

                    <label for="basic-url" className="form-label diphylleia-regular fs-5 text-white"><strong>My background and experience:</strong></label>
                    <div className="input-group mb-3">
                        <p className="fs-4 text-white description">{professionalExperience}</p>
                    </div>
                    <label for="basic-url" className="form-label diphylleia-regular fs-5 text-white"><strong>Other things I'd like to share:</strong></label>
                    <div className="input-group justify-contents-center mb-3">
                        <p className="fs-4 text-white description">{extraInfo}</p>
                    </div>
                </div>
                <div className="col bckgrnd rounded p-3 m-2">
                    <h2 className="diphylleia-regular text-white mb-3"><strong>I am comfortable caring for:</strong></h2>
                    <div className="d-flex justify-content-center">
                        <PlantCard />

                        {/* <div>{preferredPlants}</div>


                        <div id="slectedPlants" className="d-flex justify-content-center plant-types">
                            <ul className="selectPlants">
                                {store.contacts.map(contact => {
                                    return <ContactCard key={contact.id} contact={contact}/>
                                })}
                            </ul>
                        </div> */}


                        {/* <div className="selectPlants">
                            <img src={usual} className="plants img-fluid"/>            
                            <p className="text-white"><strong>Standard House Plants</strong></p>
                        </div>
                        <div className="selectPlants">
                            <img src={succulents} className="plants img-fluid"/>            
                            <p className="text-white"><strong>Succulents</strong></p>
                        </div>
                        <div className="selectPlants">
                            <img src={orchids} className="plants img-fluid"/>            
                            <p className="text-white"><strong>Orchids</strong></p>
                        </div>
                        <div className="selectPlants">
                            <img src={carnivorous} className="plants img-fluid"/>            
                            <p className="text-white"><strong>carnivorous</strong></p>
                        </div>
                        <div className="selectPlants">
                            <img src={unusual} className="plants img-fluid"/>            
                            <p className="text-white"><strong>Unusual / Rare</strong></p>
                        </div>
                        <div className="selectPlants">
                            <img src={outdoors} className="plants img-fluid"/>            
                            <p className="text-white"><strong>Outdoor Potted Plants</strong></p>
                        </div> */}
                    </div>
                </div>
            </div>
            <button
                type="submit" 
                className="btn btn-success mb-3 mt-3 col-2 rounded-pill"
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