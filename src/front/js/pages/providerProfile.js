import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";
import succulents from "../../img/succulents.jpg";
import orchids from "../../img/orchids.jpg";
import unusual from "../../img/unusual.jpg";
import carnivorous from "../../img/carnivorous.jpg";
import usual from "../../img/usual.jpg";
import landscape from "../../img/landscape.jpg";
import outdoors from "../../img/outdoors.jpg";
import veggies from "../../img/veggies.jpg";
import { ServiceCard } from "../component/ServiceCard"

export const ProviderProfile = () => {
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

    const handlePlantSelection = (plant) => {
        setPreferredPlants(prevState =>
            prevState.includes(plant)
                ? prevState.filter(p => p !== plant)
                : [...prevState, plant]
        );
    };

    const handleSubmit = () => {

        const dataToSubmit = {
            profile_picture: picture,
            professionalExperience,
            preferredPlants: preferredPlants.length > 0 ? preferredPlants : store.plantSitter?.preferred_plants,
            servicePreferences: servicePreferences.length > 0 ? servicePreferences : store.plantSitter?.service_preferences,
            intro,
            currentPlants,
            clientInfo,
            extraInfo,
        };

        actions.createOrUpdatePlantSitter(
            dataToSubmit.profile_picture,
            dataToSubmit.professionalExperience,
            dataToSubmit.preferredPlants,
            dataToSubmit.servicePreferences,
            dataToSubmit.intro,
            dataToSubmit.currentPlants,
            dataToSubmit.clientInfo,
            dataToSubmit.extraInfo
        ).then((res) => {
            if (res.success) {
                navigate('/provider-profile-completed');
            } else {
                console.error("Error updating plant sitter:", res.error);
            }
        });
    };

    const getTextColorClass = (plant) => {
        return preferredPlants.includes(plant) ? "text-warning" : "text-white";
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="text-center m-2 mt-4">
            <h1 className="mb-4">Let's build your profile</h1>
            <div className="row">
                <h3 className="diphylleia-regular m-auto col-8">
                    Clients will view your profile to decide if you're the right fit to take care of their plants, so be sure to include all of your relevant knowledge, experience, and passion for plants!
                </h3>
            </div>
            <div className="row container-fluid mt-4">
                <div className="col bckgrnd rounded p-3 m-2">
                    <h2 className="diphylleia-regular text-white mb-4"><strong>Upload a profile picture</strong></h2>
                    <div
                        className="profile-picture m-auto mb-4"
                        style={{
                            backgroundImage: picture ? `url(${picture})` : '',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    >
                        <h1 className="upload-icon">
                            <i className="fa fa-plus fa-2x" aria-hidden="true"></i>
                        </h1>
                        <input
                            className="file-uploader"
                            type="file"
                            onChange={(e) => {
                                const image = e.target.files[0];
                                if (!image.type.includes('image')) {
                                    return alert('Only images are allowed!');
                                }

                                if (image.size > 10_000_000) {
                                    return alert('Maximum upload size is 10MB!');
                                }

                                if (image) {
                                    const fileReader = new FileReader();
                                    fileReader.readAsDataURL(image);

                                    fileReader.onload = (fileReaderEvent) => {
                                        setPicture(fileReaderEvent.target.result);
                                    }
                                }
                            }}
                            accept="image/*"
                        />
                    </div>
                    <div data-mdb-input-init className="form-outline form-white">
                        <h2 className="diphylleia-regular"><strong>{firstName} {lastName}</strong></h2>
                        <h3>{city}, {state}</h3>
                        <textarea rows="5" className="form-control form-control mt-4" placeholder="Brief Intro..." value={intro} onChange={(e) => setIntro(e.target.value)} aria-label="With textarea"></textarea>
                    </div>
                    <h3 className="diphylleia-regular text-white mt-3 mb-4"><strong>You said that you are comfortable providing the following services:</strong></h3>
                    <ServiceCard/>
                </div>
                <div className="col bckgrnd rounded p-3 m-2">
                    <h2 className="diphylleia-regular text-white mb-4"><strong>About you</strong></h2>
                    <label className="form-label diphylleia-regular fs-5 text-white"><strong>What should potential clients know about you?</strong></label>
                    <div className="input-group mb-3">
                        <textarea rows="5" className="form-control" placeholder="I've been a plant lover my whole life..." value={clientInfo} onChange={(e) => setClientInfo(e.target.value)} aria-label="With textarea"></textarea>
                    </div>
                    <label className="form-label diphylleia-regular fs-5 text-white"><strong>Do you currently own any plants?</strong></label>
                    <div className="input-group mb-3">
                        <textarea rows="5" className="form-control" placeholder="My apartment is basically a greenhouse..." value={currentPlants} onChange={(e) => setCurrentPlants(e.target.value)} aria-label="With textarea"></textarea>
                    </div>

                    <label className="form-label diphylleia-regular fs-5 text-white"><strong>Do you have any professional plant care experience?</strong></label>
                    <div className="input-group mb-3">
                        <textarea rows="5" className="form-control" placeholder="I worked at a garden nursery for a couple of years..." value={professionalExperience} onChange={(e) => setProfessionalExperience(e.target.value)} aria-label="With textarea"></textarea>
                    </div>
                    <label className="form-label diphylleia-regular fs-5 text-white"><strong>Anything else you would like to share?</strong></label>
                    <div className="input-group justify-contents-center mb-3">
                        <textarea rows="5" className="form-control" placeholder="Examples: 'I can help you decide what plants work best for your space', or 'I'm an expert at organic pest control'..." value={extraInfo} onChange={(e) => setExtraInfo(e.target.value)} aria-label="With textarea"></textarea>
                    </div>
                </div>
                <div className="col bckgrnd rounded p-3 m-2">
                    <label className="form-label diphylleia-regular fs-4 text-white"><h2><strong>What kinds of plants are you comfortable taking care of?</strong></h2></label>
                    <h5 className="mt-3 mb-2 text-white">Select all that apply</h5>
                    <div className="d-flex justify-content-center plant-types">
                        <div onClick={() => handlePlantSelection('standard')} className={`selectPlants ${preferredPlants.includes('standard') ? 'selected' : ''}`}>
                            <img src={usual} alt="Standard House Plants" className="plants img-fluid" />
                            <p className={`plantLabel ${getTextColorClass('standard')}`}><strong>Standard House Plants</strong></p>
                        </div>
                        <div onClick={() => handlePlantSelection('succulents')} className={`selectPlants ${preferredPlants.includes('succulents') ? 'selected' : ''}`}>
                            <img src={succulents} alt="Succulents" className="plants img-fluid" />
                            <p className={`plantLabel ${getTextColorClass('succulents')}`}><strong>Succulents</strong></p>
                        </div>
                        <div onClick={() => handlePlantSelection('orchids')} className={`selectPlants ${preferredPlants.includes('orchids') ? 'selected' : ''}`}>
                            <img src={orchids} alt="Orchids" className="plants img-fluid" />
                            <p className={`plantLabel ${getTextColorClass('orchids')}`}><strong>Orchids</strong></p>
                        </div>
                        <div onClick={() => handlePlantSelection('carnivorous')} className={`selectPlants ${preferredPlants.includes('carnivorous') ? 'selected' : ''}`}>
                            <img src={carnivorous} alt="Carnivorous" className="plants img-fluid" />
                            <p className={`plantLabel ${getTextColorClass('carnivorous')}`}><strong>Carnivorous</strong></p>
                        </div>
                        <div onClick={() => handlePlantSelection('unusual')} className={`selectPlants ${preferredPlants.includes('unusual') ? 'selected' : ''}`}>
                            <img src={unusual} alt="Unusual / Rare" className="plants img-fluid" />
                            <p className={`plantLabel ${getTextColorClass('unusual')}`}><strong>Unusual / Rare</strong></p>
                        </div>
                        <div onClick={() => handlePlantSelection('landscape')} className={`selectPlants ${preferredPlants.includes('landscape') ? 'selected' : ''}`}>
                            <img src={landscape} alt="Landscape" className="plants img-fluid" />
                            <p className={`plantLabel ${getTextColorClass('landscape')}`}><strong>Landscape</strong></p>
                        </div>
                        <div onClick={() => handlePlantSelection('outdoor')} className={`selectPlants ${preferredPlants.includes('outdoor') ? 'selected' : ''}`}>
                            <img src={outdoors} alt="Outdoor Potted Plants" className="plants img-fluid" />
                            <p className={`plantLabel ${getTextColorClass('outdoor')}`}><strong>Outdoor Potted Plants</strong></p>
                        </div>
                        <div onClick={() => handlePlantSelection('veggies')} className={`selectPlants ${preferredPlants.includes('veggies') ? 'selected' : ''}`}>
                            <img src={veggies} alt="Vegetable Gardens" className="plants img-fluid" />
                            <p className={`plantLabel ${getTextColorClass('veggies')}`}><strong>Vegetable Gardens</strong></p>
                        </div>
                    </div>
                </div>
            </div>
            <button
                type="submit"
                className="btn mb-3 mt-3 col-2 rounded-pill"
                onClick={handleSubmit}
            >
                Submit
            </button>
        </div>
    );
};