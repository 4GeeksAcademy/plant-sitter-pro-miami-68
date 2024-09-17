import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate, useParams } from "react-router-dom";

// Import the missing components
import { JobServices } from "../component/JobServices";
import { JobPlants } from "../component/JobPlants";
import { JobDates } from "../component/JobDates";  // Import JobDates

export const JobPost1 = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const { job_post_id } = useParams();  // Get job_post_id from the URL
    const [loading, setLoading] = useState(true);

    // Form state for the job post details
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
    const [jobServices, setJobServices] = useState([]);
    const [jobPlants, setJobPlants] = useState([]);

    // Fetch the job post data if editing
    useEffect(() => {
        const fetchJobPost = async () => {
            if (job_post_id) {
                const res = await actions.getJobPostById(job_post_id);
                if (res.success && res.data) {
                    // Prepopulate fields with the existing job post data
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
                    setJobServices(JSON.parse(res.data.service_preferences));
                    setJobPlants(JSON.parse(res.data.my_plants));
                }
            }
            setLoading(false);
        };

        fetchJobPost();
    }, [job_post_id, actions]);

    // Handle form submission (create or update)
    const handleSubmit = async () => {
        const formattedStartDate = new Date(store.jobPostDetails.startDate).toISOString();
        const formattedEndDate = new Date(store.jobPostDetails.endDate).toISOString();

        if (job_post_id) {
            // Update existing job post
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
            // Create a new job post
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
                jobDuration
            );
            if (result.success) {
                navigate(`/job-post-preview/${result.data.id}`);
            } else {
                alert("Error creating job post");
            }
        }
    };

    // Handle image upload
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

    // Render a loading state while data is being fetched
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="text-center m-2 mt-4">
            <h1 className="mb-4">{job_post_id ? "Edit Job Post" : "Create Job Post"}</h1>
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
                        <h2 className="diphylleia-regular mb-4"><strong>{store.user?.first_name} {store.user?.last_name}</strong></h2>
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
                    
                    {/* Conditional rendering of JobServices */}
                    {job_post_id ? (
                        <div className="container plantImageWrapper p-0">   
                            {jobServices.map((service, index) => (
                                <div className="selectPlants" key={index}>
                                    <div className="plantImageContainer plants" >
                                        <img 
                                            src={getImageForService(service)} // Helper function to get image
                                            className="selectPlantsCompleted"
                                            alt={`Picture of service ${service}`}
                                        />
                                    </div>
                                    <p className="text-white mb-0"><strong>{service}</strong></p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <JobServices />
                    )}
                </div>
                <div className="col bckgrnd rounded p-3 m-2">
                    <h2 className="diphylleia-regular text-white"><strong>Plant Types</strong></h2>
                    <label for="basic-url" className="form-label diphylleia-regular fs-4 mt-2 text-white">
                        <strong>You said that your plants include:</strong>
                    </label>
                    
                    {/* Conditional rendering of JobPlants */}
                    {job_post_id ? (
                        <div className="container plantImageWrapper p-0">   
                            {jobPlants.map((plant, index) => (
                                <div className="selectPlants" key={index}>
                                    <div className="plantImageContainer plants" >
                                        <img 
                                            src={getImageForPlant(plant)} // Helper function to get image
                                            className="selectPlantsCompleted"
                                            alt={`Picture of plant type ${plant}`}
                                        />
                                    </div>
                                    <p className="text-white mb-0"><strong>{plant}</strong></p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <JobPlants />
                    )}
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

// Helper function to return appropriate images for services
const getImageForService = (service) => {
    switch (service) {
        case 'Watering':
            return watering;
        case 'Cleaning':
            return cleaning;
        case 'Pruning':
            return pruning;
        case 'Repotting':
            return repotting;
        case 'Pest Control':
            return pestControl;
        default:
            return '';
    }
};

// Helper function to return appropriate images for plants
const getImageForPlant = (plant) => {
    switch (plant) {
        case 'Standard House Plants':
            return usual;
        case 'Succulents':
            return succulents;
        case 'Orchids':
            return orchids;
        case 'Carnivorous':
            return carnivorous;
        case 'Unusual / Rare':
            return unusual;
        case 'Landscape':
            return landscape;
        case 'Outdoor Potted Plants':
            return outdoors;
        case 'Vegetable Gardens':
            return veggies;
        default:
            return '';
    }
};