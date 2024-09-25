import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate, useParams } from "react-router-dom";
import { PlantCard } from "../component/PlantCard";
// import { ServiceCard } from "../component/ServiceCard";
import watering from "../../img/watering.png";
import cleaning from "../../img/cleaning.png";
import pruning from "../../img/pruning.png";
import repotting from "../../img/repotting.png";
import pestControl from "../../img/pestControl.png";
import succulents from "../../img/succulents.jpg";
import orchids from "../../img/orchids.jpg";
import unusual from "../../img/unusual.jpg";
import carnivorous from "../../img/carnivorous.jpg";
import usual from "../../img/usual.jpg";
import landscape from "../../img/landscape.jpg";
import outdoors from "../../img/outdoors.jpg";
import veggies from "../../img/veggies.jpg";
// import { ProviderServices } from "./providerServices";

export const ApplicantProfiles= () => {
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
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const { sitter_id } = useParams();
    const [id, setId] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            if (!store.user) {
                const user = await actions.getUser();
                    if (user.success && user.data) {
                        setCity(user.data.city);
                        setState(user.data.state);
                    }
            }

            const res = await actions.getPlantSitterByIdPublic(sitter_id);
            if (res.success && res.data) {
                setProfessionalExperience(res.data.professional_experience);
                setIntro(res.data.intro);
                setCurrentPlants(res.data.current_plants);
                setClientInfo(res.data.client_info);
                setExtraInfo(res.data.extra_info);
                setPreferredPlants(res.data.preferred_plants);
                setServicePreferences(res.data.service_preferences);
                setPicture(res.data.profile_picture_url);
                setFirstName(res.data.first_name);
                setLastName(res.data.last_name);
                setId(res.data.id);
                setCity(res.data.city);
                setState(res.data.state);
            }
            setLoading(false);
        };

        fetchData();
    }, []);

    return (
        <div className="text-center m-2">
            <h1 className="mt-4">Applicant # {id}</h1>
            <div className="row container-fluid mt-1">
                <div className="row" style={{ padding: "20px", margin: "30px", border: "2px solid black", borderRadius: "15px" }}>
                    <div className="col bckgrnd rounded p-3 m-2">
                        <div data-mdb-input-init className="form-outline form-white">
                            <h2 className="diphylleia-regular mb-4"><strong>{firstName} {lastName}</strong></h2>
                            {/* <h3>{city}, {state}</h3> */}
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
                            <p className="fs-4 mt-4 text-black description">{intro}</p>
                        </div>
                        <h3 className="diphylleia-regular text-white mt-3 mb-4"><strong>I can provide the following services:</strong></h3>
                        {/* <ServiceCard /> */}
                        <div className="container plantImageWrapper p-0">
                            {servicePreferences.map((image, index) => {
                                if (image == "watering") {
                                    return (
                                        <div className="selectPlants" key={index}>
                                            <div className="plantImageContainer plants" >
                                                <img
                                                    src={watering}
                                                    className="selectPlantsCompleted"
                                                    alt={`Picture of plant type ${image}`}
                                                />
                                            </div>
                                            <p className="text-white mb-0"><strong>{image}</strong></p>
                                        </div>
                                    )
                                }
                                if (image == "cleaning") {
                                    return (
                                        <div className="selectPlants" key={index}>
                                            <div className="plantImageContainer plants" >
                                                <img
                                                    src={cleaning}
                                                    className="selectPlantsCompleted"
                                                    alt={`Picture of plant type ${image}`}
                                                />
                                            </div>
                                            <p className="text-white mb-0"><strong>{image}</strong></p>
                                        </div>
                                    )
                                }
                                if (image == "pruning") {
                                    return (
                                        <div className="selectPlants" key={index}>
                                            <div className="plantImageContainer plants" >
                                                <img
                                                    src={pruning}
                                                    className="selectPlantsCompleted"
                                                    alt={`Picture of plant type ${image}`}
                                                />
                                            </div>
                                            <p className="text-white mb-0"><strong>{image}</strong></p>
                                        </div>
                                    )
                                }
                                if (image == "repotting") {
                                    return (
                                        <div className="selectPlants" key={index}>
                                            <div className="plantImageContainer plants" >
                                                <img
                                                    src={repotting}
                                                    className="selectPlantsCompleted"
                                                    alt={`Picture of plant type ${image}`}
                                                />
                                            </div>
                                            <p className="text-white mb-0"><strong>{image}</strong></p>
                                        </div>
                                    )
                                }
                                if (image == "pestControl") {
                                    return (
                                        <div className="selectPlants" key={index}>
                                            <div className="plantImageContainer plants" >
                                                <img
                                                    src={pestControl}
                                                    className="selectPlantsCompleted"
                                                    alt={`Picture of plant type ${image}`}
                                                />
                                            </div>
                                            <p className="text-white mb-0"><strong>{image}</strong></p>
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    </div>
                    <div className="col bckgrnd rounded p-3 m-2">
                        <h2 className="diphylleia-regular text-white mb-4"><strong>About me</strong></h2>
                        <label className="form-label diphylleia-regular fs-5 text-white"><strong>What potential clients should know about me:</strong></label>
                        <div className="input-group mb-3">
                            <p className="fs-4 text-black description">{clientInfo}</p>
                        </div>
                        <label className="form-label diphylleia-regular fs-5 text-white"><strong>My plants:</strong></label>
                        <div className="input-group mb-3">
                            <p className="fs-4 text-black description">{currentPlants}</p>
                        </div>

                        <label className="form-label diphylleia-regular fs-5 text-white"><strong>My background and experience:</strong></label>
                        <div className="input-group mb-3">
                            <p className="fs-4 text-black description">{professionalExperience}</p>
                        </div>
                        <label className="form-label diphylleia-regular fs-5 text-white"><strong>Other things I'd like to share:</strong></label>
                        <div className="input-group justify-contents-center mb-3">
                            <p className="fs-4 text-black description">{extraInfo}</p>
                        </div>
                    </div>
                    <div className="col bckgrnd rounded p-3 m-2">
                        <h2 className="diphylleia-regular text-white mb-3"><strong>I am comfortable caring for:</strong></h2>
                        <div className="d-flex justify-content-center">
                            {/* <PlantCard /> */}
                            <div className="container plantImageWrapper p-0">   
                                {preferredPlants.map((image, index) => {
                                    if(image == "standard") {
                                        return (
                                            <div className="selectPlants" key={index}>
                                                <div className="plantImageContainer plants" >
                                                    <img 
                                                        src={usual}
                                                        className="selectPlantsCompleted"
                                                        alt={`Picture of plant type ${image}`}
                                                    />
                                                </div>
                                                <p className="text-white mb-0"><strong>{image}</strong></p>
                                            </div>
                                        )
                                    }
                                    if(image == "outdoor") {
                                        return (
                                            <div className="selectPlants" key={index}>
                                                <div className="plantImageContainer plants" >
                                                    <img 
                                                        src={outdoors}
                                                        className="selectPlantsCompleted"
                                                        alt={`Picture of plant type ${image}`}
                                                    />
                                                </div>
                                                <p className="text-white mb-0"><strong>{image}</strong></p>
                                            </div>
                                        )
                                    }
                                    if(image == "succulents") {
                                        return (
                                            <div className="selectPlants" key={index}>
                                                <div className="plantImageContainer plants" >
                                                    <img 
                                                        src={succulents}
                                                        className="selectPlantsCompleted"
                                                        alt={`Picture of plant type ${image}`}
                                                    />
                                                </div>
                                                <p className="text-white mb-0"><strong>{image}</strong></p>
                                            </div>
                                        )
                                    }
                                    if(image == "orchids") {
                                        return (
                                            <div className="selectPlants" key={index}>
                                                <div className="plantImageContainer plants" >
                                                    <img 
                                                        src={orchids}
                                                        className="selectPlantsCompleted"
                                                        alt={`Picture of plant type ${image}`}
                                                    />
                                                </div>
                                                <p className="text-white mb-0"><strong>{image}</strong></p>
                                            </div>
                                        )
                                    }
                                    if(image == "unusual") {
                                        return (
                                            <div className="selectPlants" key={index}>
                                                <div className="plantImageContainer plants" >
                                                    <img 
                                                        src={unusual}
                                                        className="selectPlantsCompleted"
                                                        alt={`Picture of plant type ${image}`}
                                                    />
                                                </div>
                                                <p className="text-white mb-0"><strong>{image}</strong></p>
                                            </div>
                                        )
                                    }
                                    if(image == "carnivorous") {
                                        return (
                                            <div className="selectPlants" key={index}>
                                                <div className="plantImageContainer plants" >
                                                    <img 
                                                        src={carnivorous}
                                                        className="selectPlantsCompleted"
                                                        alt={`Picture of plant type ${image}`}
                                                    />
                                                </div>
                                                <p className="text-white mb-0"><strong>{image}</strong></p>
                                            </div>
                                        )
                                    }
                                    if(image == "landscape") {
                                        return (
                                            <div className="selectPlants" key={index}>
                                                <div className="plantImageContainer plants" >
                                                    <img 
                                                        src={landscape}
                                                        className="selectPlantsCompleted"
                                                        alt={`Picture of plant type ${image}`}
                                                    />
                                                </div>
                                                <p className="text-white mb-0"><strong>{image}</strong></p>
                                            </div>
                                        )
                                    }
                                    if(image == "veggies") {
                                        return (
                                            <div className="selectPlants" key={index}>
                                                <div className="plantImageContainer plants" >
                                                    <img 
                                                        src={veggies}
                                                        className="selectPlantsCompleted"
                                                        alt={`Picture of plant type ${image}`}
                                                    />
                                                </div>
                                                <p className="text-white mb-0"><strong>{image}</strong></p>
                                            </div>
                                        )
                                    }
                                    })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};