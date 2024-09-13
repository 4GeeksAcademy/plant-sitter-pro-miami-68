import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";
import { JobPlants } from "../component/JobPlants";
import { JobServices } from "../component/JobServices";
import { JobDates } from "../component/JobDates";

export const JobPost1 = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [picture, setPicture] = useState(null);
    const [addressLine1, setAddressLine1] = useState("");
    const [addressLine2, setAddressLine2] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [country, setCountry] = useState("United States");
    const [intro, setIntro] = useState("");
    const [moreAboutPlants, setMoreAboutPlants] = useState("");
    const [moreAboutServices, setMoreAboutServices] = useState("");
    const [extraInfo, setExtraInfo] = useState("");
    const [jobDuration, setJobDuration] = useState("");
    const firstName = store.user?.first_name;
    const lastName = store.user?.last_name;

    const handleSubmit = async () => {
        const formattedStartDate = new Date(store.jobPostDetails.startDate).toISOString();
        const formattedEndDate = new Date(store.jobPostDetails.endDate).toISOString();
    
        const result = await actions.createJobPost(
            formattedStartDate,
            formattedEndDate,
            addressLine1,
            addressLine2,
            city,
            state,
            zipCode,
            country,
            store.jobPostDetails.selectedServices,
            store.jobPostDetails.selectedPlants,
            intro,
            picture,
            moreAboutPlants,
            moreAboutServices,
            extraInfo,
            jobDuration
        );
        
        if (result.success) {
            navigate(`/job-post-preview/${result.data.id}`);
        } else {
            alert("Error creating job post");
        }
    };

    const handleImageUpload = (e) => {
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
    };


    return (
        <div className="text-center m-2 mt-4">
            <h1 className="mb-4">Ready to post a job?</h1>
            <div className="row">
                <h3 className="diphylleia-regular m-auto col-8">
                    Tell us more about the plants that you have, the care that you need, and a little about yourself so that our plant sitters can get to know you and your needs.
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
                            onChange={handleImageUpload}
                            accept="image/*"
                        />
                    </div>
                    <div data-mdb-input-init className="form-outline form-white">
                        <h2 className="diphylleia-regular mb-4"><strong>{firstName} {lastName}</strong></h2>
                        <h2 className="mb-2 fs-4">Job Location:</h2>
                        <input 
                            type="text" 
                            value={addressLine1} 
                            onChange={(e) => setAddressLine1(e.target.value)} 
                            className="form-control form-control-lg mb-3" 
                            placeholder="Address Line 1" 
                        />
                        <input 
                            type="text" 
                            value={addressLine2} 
                            onChange={(e) => setAddressLine2(e.target.value)} 
                            className="form-control form-control-lg mb-3" 
                            placeholder="Address Line 2" 
                        />
                        <input 
                            type="text" 
                            value={city} 
                            onChange={(e) => setCity(e.target.value)} 
                            className="form-control form-control-lg mb-3" 
                            placeholder="City" 
                        />
                        <input 
                            type="text" 
                            value={state} 
                            onChange={(e) => setState(e.target.value)} 
                            className="form-control form-control-lg mb-3" 
                            placeholder="State" 
                        />
                        <input 
                            type="text" 
                            value={zipCode} 
                            onChange={(e) => setZipCode(e.target.value)} 
                            className="form-control form-control-lg mb-3" 
                            placeholder="Zip Code" 
                        />
                            <input 
                            type="text" 
                            value={country} 
                            readOnly 
                            className="form-control form-control-lg mb-3" 
                            placeholder="Country"
                        />
                        <h2 className="mb-2 fs-4">About you:</h2>
                        <textarea 
                            rows="5" 
                            value={intro} 
                            onChange={(e) => setIntro(e.target.value)} 
                            className="form-control form-control" 
                            placeholder="Brief Intro..." 
                            aria-label="With textarea"
                        ></textarea>
                    </div>
                    <h2 className="diphylleia-regular text-white mt-3"><strong>Services</strong></h2>
                    <label for="basic-url" className="form-label diphylleia-regular fs-4 mt-2 text-white">
                        <strong>You said that you need help with:</strong>
                    </label>
                    <JobServices />
                </div>
                <div className="col bckgrnd rounded p-3 m-2">
                    <h2 className="diphylleia-regular text-white"><strong>Plant Types</strong></h2>
                    <label for="basic-url" className="form-label diphylleia-regular fs-4 mt-2 text-white">
                        <strong>You said that your plants include:</strong>
                    </label>
                    <div className="d-flex justify-content-center">
                        <JobPlants />
                    </div>
                    <label for="basic-url" className="form-label diphylleia-regular fs-5 mt-3 text-white">
                        <strong>Tell us more about your plants and their needs here:</strong>
                    </label>
                    <div className="input-group mb-3">
                        <textarea 
                            rows="8" 
                            value={moreAboutPlants} 
                            onChange={(e) => setMoreAboutPlants(e.target.value)} 
                            className="form-control" 
                            placeholder="Tell us more about your plants..." 
                            aria-label="With textarea"
                        ></textarea>
                    </div>
                    <label for="basic-url" className="form-label diphylleia-regular fs-5 mt-3 text-white">
                        <strong>Tell us more about what you need help with:</strong>
                    </label>
                    <div className="input-group mb-3">
                        <textarea 
                            rows="8" 
                            value={moreAboutServices} 
                            onChange={(e) => setMoreAboutServices(e.target.value)} 
                            className="form-control" 
                            placeholder="Examples: 'I need help watering while I am out of town'..." 
                            aria-label="With textarea"
                        ></textarea>
                    </div>
                    <label for="basic-url" className="form-label diphylleia-regular fs-5 mt-3 text-white">
                        <strong>Anything else you would like to share?</strong>
                    </label>
                    <div className="input-group justify-contents-center mb-3">
                        <textarea 
                            rows="5" 
                            value={extraInfo} 
                            onChange={(e) => setExtraInfo(e.target.value)} 
                            className="form-control" 
                            placeholder="Example: 'I could really use some help deciding what plants will work best...'" 
                            aria-label="With textarea"
                        ></textarea>
                    </div>
                </div>
                <div className="col bckgrnd rounded p-3 m-2">
                    <h2 className="diphylleia-regular text-white"><strong>Duration</strong></h2>
                    <label for="basic-url" className="form-label diphylleia-regular fs-5 mt-2 text-white">
                        <strong>You are requesting care for the following dates:</strong>
                    </label>
                    <JobDates />
                    <label for="basic-url" className="form-label diphylleia-regular fs-5 text-white">
                        <strong>What else should potential plant sitters know about the duration?</strong>
                    </label>
                    <div className="input-group mb-3">
                        <textarea 
                            rows="8" 
                            value={jobDuration} 
                            onChange={(e) => setJobDuration(e.target.value)} 
                            className="form-control" 
                            placeholder="Example: 'It's possible that I could be out of town for longer than the dates listed...'" 
                            aria-label="With textarea"
                        ></textarea>
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