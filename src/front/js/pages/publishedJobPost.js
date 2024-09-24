import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import calendar from "../../img/calendar.png";
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
import BushTrimmingLoader from "../component/BushTrimmingLoader";


export const PublishedJobPosts = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState(""); 
    const [picture, setPicture] = useState(null);
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
    const { job_post_id } = useParams();
    const [isActive, setIsActive] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [isOwner, setIsOwner] = useState(false);
    const [hasApplied, setHasApplied] = useState(false);  
    const [hasPlantSitterProfile, setHasPlantSitterProfile] = useState(false);

    useEffect(() => {

        const fetchData = async () => {
            setLoading(true);
            if (!store.user) {
                await actions.getUser();
            }

            const plantSitterRes = await actions.getPlantSitter();
            if (plantSitterRes.success && plantSitterRes.data) {
                setHasPlantSitterProfile(true);
            }

            const res = await actions.getJobPostByIdPublic(job_post_id);
            if (res.success && res.data) {
                setStartDate(res.data.start_date);
                setEndDate(res.data.end_date);
                setFirstName(res.data.first_name);
                setLastName(res.data.last_name);
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

                if (res.data.user_id === store.user.id) {
                    setIsOwner(true);
                } else {
                    const applied = await actions.checkAssignment(job_post_id);
                    setHasApplied(applied.success && applied.data.applied);
                }
            }
            setLoading(false);
        };

        fetchData();
    }, []);



    const handleApply = async () => {
        if (!hasPlantSitterProfile) {
            navigate("/provider-services");
            return;
        }

        const res = await actions.applyForJob(job_post_id);
        if (res.success) {
            alert("Successfully applied for the job!");
            setHasApplied(true);
        } else {
            alert("Error applying for the job: " + res.error);
        }
    };


    const formatDate = (isoString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(isoString).toLocaleDateString(undefined, options);
    };

    if (loading) {
        return <BushTrimmingLoader />;
    }

    const changeColorOnClick = () => {
        if (isActive == false) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }

    // Delete Job Post function
    const handleDeleteJobPost = async () => {
        setDeleting(true);
        const response = await actions.deleteJobPost(job_post_id);

        if (response.success) {
            setShowModal(false);
            navigate('/job-posts'); // Redirect to job post listing after successful deletion
        } else {
            alert("Failed to delete job post: " + response.error);
        }
        setDeleting(false);
    };

    return (
        <div className="text-center d-grid mt-4">
            <div className="mb-2">
                <button 
                    style={{backgroundColor: "white", color: "black", border: "3px solid black", borderRadius:"25px", width: "150px"}}
                    onClick={() => navigate('/provider-landing')}
                >
                    <strong>Back</strong>
                </button>
            </div>

            {!isOwner && !hasApplied && (
                <div className="mb-2">
                <button 
                    style={{
                        backgroundColor: hasPlantSitterProfile ? "green" : "yellow",
                        color: hasPlantSitterProfile ? "white" : "black",
                        border: "3px solid black",
                        borderRadius: "25px",
                        width: "150px"
                    }}
                    onClick={handleApply}
                >
                    <strong>{hasPlantSitterProfile ? "Apply for this Job" : "Sign Up as a Plantsitter to Apply"}</strong>
                </button>
            </div>
            )}

            {isOwner && (
                <>
                    <div>
                        <button
                            className="see-applicants mb-2"
                            type="button"
                            onClick={() => navigate(`/view-applicants/${job_post_id}`)}
                        >
                            <strong>See Applicants</strong>
                        </button>
                        <button
                            className="mark-completed mb-3"
                            type="button"
                            style={{
                                backgroundColor: isActive ? 'blue' : 'orange',
                                color: isActive ? 'white' : 'black',
                              }}
                            onClick={() => setIsActive(!isActive)}
                        >
                            <strong>Mark As Completed</strong>
                        </button>
                              {/* Delete Job Post Button */}
                <button
                    className="delete-job-post mb-3 ms-2"
                    type="button"
                    style={{
                        backgroundColor: 'red',
                        color: 'white',
                    }}
                    onClick={() => setShowModal(true)} // Show the modal when clicked
                >
                    <strong>Delete Job Post</strong>
                </button>

            </div>
                </>
            )}
            <div className="row" style={{ padding: "20px", margin: "30px", border: "2px solid black", borderRadius: "15px" }}>
                <div className="col bckgrnd rounded p-3 m-2">
                    <h1 className="text-white mb-4 diphylleia-regular jobs"><strong>{firstName} {lastName}</strong></h1>
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
                        <h2 className="diphylleia-regular text-white mb-4"><strong>Plant Owner</strong></h2>
                        <p className="fs-3">🌿</p>
                        <h3 className="text-white diphylleia-regular mt-1 mb-3 jobs">Job Location</h3>
                        <h3 className="text-white mb-5 jobs">{city}, {state} {zipCode}</h3>
                        <p className="fs-4 mt-4 bg-white text-black description">{intro}</p>
                        <h2 className="diphylleia-regular text-white mt-3"><strong>Services</strong></h2>
                        <label className="form-label diphylleia-regular fs-5 mt-2 text-white"><strong>I need help with:</strong></label>

                        <div className="container plantImageWrapper p-0">
                            {jobServices.map((image, index) => {
                                if (image == "Watering") {
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
                                if (image == "Cleaning") {
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
                                if (image == "Pruning") {
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
                                if (image == "Repotting") {
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
                                if (image == "Pest Control") {
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
                </div>
                <div className="col bckgrnd rounded p-3 m-2">
                    <h2 className="diphylleia-regular text-white"><strong>Plant Types</strong></h2>
                    <label className="form-label diphylleia-regular fs-5 mt-2 text-white"><strong>I have these kinds of plants:</strong></label>
                    <div className="d-flex justify-content-center">
                        <div className="container plantImageWrapper p-0">
                            {jobPlants.map((image, index) => {
                                if (image == "Standard House Plants") {
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
                                if (image == "Outdoor Potted Plants") {
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
                                if (image == "Succulents") {
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
                                if (image == "Orchids") {
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
                                if (image == "Unusual / Rare") {
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
                                if (image == "Carnivorous") {
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
                                if (image == "Landscape") {
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
                                if (image == "Vegetable Gardens") {
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
                    <label className="form-label diphylleia-regular fs-5 mt-3 text-white"><strong>About my plants and their needs:</strong></label>
                    <div className="input-group mb-1">
                        <p className="fs-4 bg-white text-black description">{moreAboutPlants}</p>
                    </div>
                    <label className="form-label diphylleia-regular fs-5 mt-3 text-white"><strong>More about what I need:</strong></label>
                    <div className="input-group mb-1">
                        <p className="fs-4 bg-white text-black  description">{moreAboutServices}</p>
                    </div>
                </div>
                <div className="col bckgrnd rounded p-3 m-2">
                    <h2 className="diphylleia-regular text-white"><strong>Duration</strong></h2>
                    <label className="form-label diphylleia-regular fs-5 mt-2 text-white"><strong>I need help on these dates:</strong></label>
                    <div className="dates rounded">   
                        <div className='dateWrapper'>
                            <div>Start date:</div>
                            <div>{formatDate(startDate)}</div>
                        </div>
                        <div className='dateWrapper'>
                            <div>End date:</div>
                            <div>{formatDate(endDate)}</div>
                        </div>
                    </div>
                    <label className="form-label diphylleia-regular fs-5 text-white"><strong>Other things to know about this job's duration:</strong></label>
                    <div className="input-group mb-2">
                        <p className="fs-4 bg-white text-black description">{jobDuration}</p>
                    </div>
                    <div style={{border: "1px solid white", borderRadius: "10px", padding: "10px"}}>
                        <h5 className="mt-1">Message Plant Sitter</h5>
                        <div 
                            className="btn mt-3 mb-3"
                            style={{ width: "100%"}}
                        >
                            <i
                                className="fa-regular fa-message"
                                style={{fontSize: "80px" }}
                                title="This is where you will communicate with applicants"
                            // onClick={() => /*insert navigate link*/}
                            />
                        </div>
                    </div>
                    {/* Modal for Deleting the Job Post */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this job post? This action cannot be undone.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button
                        variant="danger"
                        onClick={handleDeleteJobPost}
                        disabled={deleting} // Disable the button while deleting
                    >
                        {deleting ? 'Deleting...' : 'Confirm Delete'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
            </div>
        </div>
    );
};