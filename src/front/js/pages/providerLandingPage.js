import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";
import { PlantCard } from "../component/PlantCard";
import { ServiceCard } from "../component/ServiceCard";

export const ProviderLandingPage = () => {
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
        <div className="container-fluid">
            <div
                className="row mb-4 mt-4"
                style={{ marginLeft: "30px" }}
            >
                <div className="profile-container row">
                    <div className="col">
                        <div
                            className="landing-profile ml-3"
                            style={{
                                backgroundImage: picture ? `url(${picture})` : '',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                            onClick={() => navigate('/provider-profile')}
                        >
                        </div>
                    <div className="middle">
                        <div className="edit-profile">
                            <i className="fa-solid fa-pencil" />
                        </div>
                    </div>
                    </div>
                    <div className="col text-end">
                        <h4 className="diphylleia-regular mb-0"><strong>Plant Sitter Since</strong></h4>
                        <h4 className="diphylleia-regular mt-0">October 2024</h4>
                    </div>
                </div>
                <h2 className="diphylleia-regular"><strong>{firstName} {lastName}</strong></h2>
                <h3>{city}, {state}</h3>
            </div>

            <div className="row container-fluid mt-4">
                <h2 className="mb-3 mt-3 diphylleia-regular">
                    <strong>Your Options</strong>
                </h2>
                {/* Insert component showing jobs within search radius */}
                <div
                    className="pt-5 text-center"
                    style={{ border: "1px solid black", borderRadius: "10px", width: "200px", height: "200px" }}
                >
                    <p>Component Showing</p>
                    <p>Jobs in Search Radius</p>
                </div>

                <h2 className="mb-3 mt-3 diphylleia-regular">
                    <strong>Your Jobs</strong>
                </h2>
                {/* Insert component showing jobs */}
                <div
                    className="pt-3 text-center"
                    style={{ border: "1px solid black", borderRadius: "10px", width: "200px", height: "200px" }}
                >
                    <p>Component Showing</p>
                    <p>Jobs applied to & upcoming jobs (differently colored / in different colums)</p>
                </div>
            </div>
        </div>
    );
};