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


export const ClientLandingPage = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [jobPosts, setJobPosts] = useState([]);
    // const [startDate, setStartDate] = useState("");
    // const [endDate, setEndDate] = useState("");
    const [picture, setPicture] = useState(null);
    // const [addressLine1, setAddressLine1] = useState("");
    // const [addressLine2, setAddressLine2] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    // const [zipCode, setZipCode] = useState("");
    // const [country, setCountry] = useState("United States");
    // const [intro, setIntro] = useState("");
    // const [moreAboutPlants, setMoreAboutPlants] = useState("");
    // const [moreAboutServices, setMoreAboutServices] = useState("");
    // const [jobDuration, setJobDuration] = useState("");
    // const [jobServices, setJobServices] = useState([]);
    // const [jobPlants, setJobPlants] = useState([]);
    const firstName = store.user?.first_name;
    const lastName = store.user?.last_name;
    // const { job_post_id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            if (!store.user) {
                await actions.getUser();
            }

            const res = await actions.getJobPosts();
            if (res.success && res.data) {
                setJobPosts(res.data);
                // setEndDate(res.data.endDate);
                // setAddressLine1(res.data.addressLine1);
                // setAddressLine2(res.data.addressLine2);
                // setCity(res.data.city);
                // setState(res.data.state);
                // setZipCode(res.data.zipCode);
                // setCountry(res.data.country);
                // setIntro(res.data.intro);
                setPicture(res.data.profile_picture_url);
                // setMoreAboutPlants(res.data.more_about_your_plants);
                // setMoreAboutServices(res.data.more_about_services);
                // setJobDuration(res.data.job_duration);
                // setJobServices(JSON.parse(res.data.service_preferences));
                // setJobPlants(JSON.parse(res.data.my_plants));
            } else {
                alert("Error fetching job posts");
            }

            setLoading(false);
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    console.log(jobPosts);

    const handleViewJobPost = (jobPostId) => {
        navigate(`/job-post-preview/${jobPostId}`);
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (

        <div className="container-fluid">
            <div
                className="row mb-4 mt-4"
                style={{ marginLeft: "30px" }}
            >
                <div className="profile-container row">
                    {/* <div className="col-3">
                        <div
                            className="landing-profile ml-3"
                            style={{
                                backgroundImage: picture ? `url(${picture})` : '',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}

                        >
                        </div>
                        <div className="middle">
                            <div
                                className="edit-profile"
                                onClick={() => navigate('/client-services1')}
                            >
                                <i className="fa fa-plus fa-2x" />
                            </div>
                        </div>
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
                    </div> */}
                <h2 className="diphylleia-regular"><strong>{firstName} {lastName}</strong></h2>
                    <div className="col text-end">
                        <h4 className="diphylleia-regular mb-0"><strong>Subscriber Since</strong></h4>
                        <h4 className="diphylleia-regular mt-0">October 2024</h4>
                    </div>
                </div>
            </div>

            <div className="row container-fluid mt-4">
                <h2 className="mb-3 mt-3 diphylleia-regular">
                    <strong>Your Job Posts</strong>
                </h2>
                <div className="row">
                    {jobPosts.map((post) => (
                        <div className="col-md-4 mb-4" key={post.id} onClick={() => handleViewJobPost(post.id)}>
                            <div className="card" style={{ backgroundColor: "rgb(70, 108, 70)", borderRadius: "15px", minHeight: "100%" }}>
                                <img
                                    src={post.profile_picture_url || noImage}
                                    alt="Job Profile Picture"
                                    className="card-img-top"
                                    style={{ borderRadius: "25px", width: "90%", height: "375px", objectFit: "cover", margin: "auto", marginTop: "20px" }}
                                />
                                <div className="card-body">
                                    <h3 className="card-title text-white diphylleia-regular fs-2">
                                        <strong>{post.first_name} {post.last_name}</strong>
                                    </h3>
                                    {/* <div className="card-text text-white fs-5">
                                        <strong>Address:</strong> {post.address_line_1 || 'No Address'}, {post.address_line_2 || ''}
                                    </div> */}
                                    <div className="card-text text-white fs-5">
                                        <strong>Job Address:</strong> {post.location || 'Location not provided'}
                                    </div>
                                    <div className="card-text text-white fs-5">
                                        <strong>Dates:</strong> {formatDate(post.start_date)} - {formatDate(post.end_date)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
