import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate, useParams } from "react-router-dom";
import { JobPlants } from "../component/JobPlants";
import { JobServices } from "../component/JobServices"; 
import { JobDates } from "../component/JobDates";

export const JobPostUpdate = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const { job_post_id } = useParams();

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
    const [jobDuration, setJobDuration] = useState("");

    useEffect(() => {
        const fetchJobPost = async () => {
            if (job_post_id) {
                const res = await actions.getJobPostById(job_post_id);
                if (res.success && res.data) {
                    setAddressLine1(res.data.address_line_1);
                    setAddressLine2(res.data.address_line_2);
                    setCity(res.data.city);
                    setState(res.data.state);
                    setZipCode(res.data.zip_code);
                    setCountry(res.data.country);
                    setIntro(res.data.intro);
                    setPicture(res.data.profile_picture_url);
                    setMoreAboutPlants(res.data.more_about_your_plants);
                    setMoreAboutServices(res.data.more_about_services);
                    setJobDuration(res.data.job_duration);
                }
            }
            setLoading(false);
        };

        fetchJobPost();
    }, []);

    const handleSubmit = async () => {
        const formattedStartDate = new Date(store.jobPostDetails.startDate).toISOString();
        const formattedEndDate = new Date(store.jobPostDetails.endDate).toISOString();

        if (job_post_id) {
            const result = await actions.updateJobPost(
                job_post_id,
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
                jobDuration
            );
            if (result.success) {
                navigate(`/job-post-preview/${job_post_id}`);
            } else {
                alert("Error updating job post");
            }
        } else {
            alert("No job post ID provided.");
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

    return loading ? <div>Loading...</div> : (
        <div className="text-center m-2 mt-4">
            <h1 className="mb-4">Update your job post</h1>
            <div className="row">
                <h3 className="diphylleia-regular m-auto col-8">
                    Update the details of your job post to ensure our plant sitters know what you need.
                </h3>
            </div>
            <div className="row container-fluid mt-4">
                <div className="col bckgrnd rounded p-3 m-2">
                    <h2 className="diphylleia-regular text-white mb-4"><strong>Update your profile picture</strong></h2>
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
                    <label className="form-label diphylleia-regular fs-4 mt-2 text-white">
                        <strong>Services you need:</strong>
                    </label>
                    <JobServices />
                </div>
                <div className="col bckgrnd rounded p-3 m-2">
                    <h2 className="diphylleia-regular text-white"><strong>Plant Types</strong></h2>
                    <label className="form-label diphylleia-regular fs-4 mt-2 text-white">
                        <strong>Types of plants you have:</strong>
                    </label>
                    <div className="d-flex justify-content-center">
                        <JobPlants />
                    </div>
                    <label className="form-label diphylleia-regular fs-5 mt-3 text-white">
                        <strong>More about your plants:</strong>
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
                    <label className="form-label diphylleia-regular fs-5 mt-3 text-white">
                        <strong>More about the services you need:</strong>
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
                </div>
                <div className="col bckgrnd rounded p-3 m-2">
                    <h2 className="diphylleia-regular text-white"><strong>Duration</strong></h2>
                    <label className="form-label diphylleia-regular fs-5 mt-2 text-white">
                        <strong>Requested care dates:</strong>
                    </label>
                    <JobDates />
                    <label className="form-label diphylleia-regular fs-5 text-white">
                        <strong>Additional information about the duration:</strong>
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
                Update Job Post
            </button>
        </div>
    );
};