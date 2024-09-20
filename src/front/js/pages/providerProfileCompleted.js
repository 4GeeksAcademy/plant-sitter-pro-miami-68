import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";
import { PlantCard } from "../component/PlantCard";
import { ServiceCard } from "../component/ServiceCard";

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
                <h2 className="mb-3 mt-3 diphylleia-regular jobs"><strong>This is how your profile will appear to others.</strong></h2>

                <div className="container row mb-2">
                    <button
                        className="edit editButton"
                        onClick={() => {
                            navigate("/provider-profile")
                        }}
                    >
                        Edit <i className="fas fa-pencil-alt"></i>
                    </button>
                </div>

                <div className="col bckgrnd rounded p-3 m-2">
                    <div data-mdb-input-init className="form-outline form-white">
                        <h2 className="diphylleia-regular"><strong>{firstName} {lastName}</strong></h2>
                        <h3>{city}, {state}</h3>
                    </div>
                    <div
                        className="profile-picture m-auto mb-4"
                        style={{
                            backgroundImage: picture ? `url(${picture})` : '',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    >
                    </div>
                    <div data-mdb-input-init className="form-outline form-white">
                        <p className="fs-4 mt-4 text-white description">{intro}</p>
                    </div>
                    <h3 className="diphylleia-regular text-white mt-3 mb-4"><strong>I can provide the following services:</strong></h3>
                    <ServiceCard />
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
                    </div>
                </div>
            </div>
            <button
                type="submit"
                className="btn btn-success mb-3 mt-3 col-2 rounded-pill"
                onClick={
                    () => {
                        navigate('/provider-landing')
                    }
                }
            >
                Publish My Profile
            </button>
        </div>
    );
};