import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";
import noImage from "../../img/noImage.png";
import ScissorsLoader from "../component/ScissorsLoader";

export const ClientLandingPage = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [jobPosts, setJobPosts] = useState([]);
    const [picture, setPicture] = useState(null);
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const firstName = store.user?.first_name;
    const lastName = store.user?.last_name;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            if (!store.user) {
                await actions.getUser();
            }

            if (store.user) {
                const result = await actions.getUser();
                    if (result.success && result.data) {
                        setCity(result.data.city);
                        setState(result.data.state);
                    }
                    const res = await actions.getUserJobPosts();
                    if (res.success && res.data) {
                        setJobPosts(res.data);
                        setPicture(res.data.profile_picture_url);
                    }
            }
            setLoading(false);
        };

        fetchData();
    }, []);

    if (loading) {
        return <ScissorsLoader />;
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
                className="row mt-4"
                style={{ marginLeft: "30px" }}
            >
                <div className="profile-container row">
                    <h1 className="diphylleia-regular"><strong>{firstName} {lastName}</strong></h1>
                    {/* <h2 className="diphylleia-regular"><strong>{city}, {state}</strong></h2> */}
                    <div className="col text-end">
                        <h4 className="diphylleia-regular mb-0"><strong>Subscriber Since</strong></h4>
                        <h4 className="diphylleia-regular mt-0">October 2024</h4>
                    </div>
                </div>
            </div>

            <div className="container mt-3">
                <div className="container">
                    <h1 
                        className="diphylleia-regular mb-4 text-center apply-link"
                        style={{textDecoration: "underline"}}
                        onClick={() => navigate('/job-posts')}
                    >
                        <strong>View Current / Published Jobs</strong>
                    </h1>
                </div>

                <h1 className="diphylleia-regular mb-5 text-center"><strong>Edit Your Open Job Posts</strong></h1 >
                <div className="row">
                    {jobPosts.map((post) => (
                        <div className="col-md-4 mb-4 job-cards" key={post.id} onClick={() => handleViewJobPost(post.id)}>
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
                    <div
                        className="upload-job"
                        onClick={() => {
                            actions.clearJobPostId();
                            navigate("/client-services1")}
                        }
                        style={{ marginTop: "10%", marginLeft: "40px" }}
                    >
                        <i className="fa fa-plus fa-6x plus-sign"></i>
                    </div>
                </div>
                <div className="container mt-3 mb-3">
                    <h1 
                        className="diphylleia-regular mb-4 text-center apply-link"
                        style={{textDecoration: "underline"}}
                        onClick={() => navigate('/completed-jobs-page')}
                    >
                        <strong>View Completed Jobs</strong>
                    </h1>
                </div>
            </div>
        </div>
    );
};
