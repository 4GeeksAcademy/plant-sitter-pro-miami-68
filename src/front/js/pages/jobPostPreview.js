import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Context } from "../store/appContext";
import "../../styles/home.css";
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
import { JobDates } from "../component/JobDates";
import BushTrimmingLoader from "../component/BushTrimmingLoader";


export const JobPost2 = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
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
    const firstName = store.user?.first_name;
    const lastName = store.user?.last_name;
    const { job_post_id } = useParams();

    useEffect(() => {

        const fetchData = async () => {
            setLoading(true);
            if (!store.user) {
                await actions.getUser();
            }

            const res = await actions.getJobPostById(job_post_id);
            if (res.success && res.data) {
                setStartDate(res.data.start_date);
                setEndDate(res.data.end_date);
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
            setLoading(false);
        };

        fetchData();
    }, []);

    if (loading) {
        return <BushTrimmingLoader />;
    }

    console.log(jobServices);
    console.log(jobPlants);

    return (
        <div
            className="text-center d-grid mt-4"
            style={{ minWidth: '100%', justifyContent: 'center' }}
        >
            <h1 className="mt-3 mb-0 diphylleia-regular jobs"><strong>This is how your job post will appear to our Plant Sitters</strong></h1>
            <h3 className="p-5 diphylleia-regular jobs"><strong>You will be able to message applicants and the plant sitter that you chose in your published post.</strong></h3>
            
            <div
                className="container-fluid row"
            >
                <div className="col-4"></div>
                <button
                    className="btn btn-success col-2 rounded-pill"
                    onClick={() => {
                        actions.setJobPostDetails({ id: job_post_id });
                        navigate("/client-services1");
                    }}
                >
                    Edit <i className="fas fa-pencil-alt"></i>
                </button>
                <button
                    type="button"
                    className="btn btn-success col-2 rounded-pill"
                    onClick={
                        () => {
                            navigate('/job-posts')
                        }
                    }
                >
                    Publish
                </button>
                <div className="col-4"></div>
            </div>

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
                        <h3 className="text-white">{addressLine1}</h3>
                        <h3 className="text-white">{addressLine2}</h3>
                        <h3 className="text-white mb-5 jobs">{city}, {state} {zipCode}</h3>
                        <p className="fs-4 mt-4 bg-white text-black description">{intro}</p>
                        <h2 className="diphylleia-regular text-white mt-3"><strong>Services</strong></h2>
                        <label className="form-label diphylleia-regular fs-5 mt-2 text-white"><strong>I need help with:</strong></label>
                        {/* <JobServices /> */}

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
                        {/* <JobPlants /> */}
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
                    <JobDates />
                    <label className="form-label diphylleia-regular fs-5 text-white"><strong>Other things to know about this job's duration:</strong></label>
                    <div className="input-group mb-2">
                        <p className="fs-4 bg-white text-black description">{jobDuration}</p>
                    </div>
                    <div className="w-100">
                        <i
                            className="fa-regular fa-message btn"
                            style={{right: "100px", fontSize: "80px" }}
                            title="This is where you will communicate with applicants"
                        // onClick={() => /*insert navigate link*/}
                        />
                    </div>
                    <button
                        title="This will be active for applicants"
                        className="apply-now"
                        type="button"
                    // onClick={() => /*insert navigate link*/}
                    >
                        <strong>Apply Now</strong>
                    </button>
                </div>
            </div>
        </div>
    );
};