import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import noImage from "../../img/noImage.png";
import clientSignUp from "../../img/client-sign-up.png";

export const ViewJobs = () => {
    const { store } = useContext(Context);
    const jobPosts = store.jobPosts || [];

    return (
        <div className="row d-flex">
            <h1 className="mb-3 mt-4 diphylleia-regular jobs">
                <strong>There are {jobPosts.length} jobs available near you!</strong>
            </h1>

            <div className="d-flex row m-3">
                {jobPosts.length > 0 ? (
                    jobPosts.map((jobPost) => (
                        <div 
                            key={jobPost.id} 
                            className="col-md-4 mb-4"
                        >
                            <div 
                                className="card" 
                                style={{ backgroundColor: "rgb(70, 108, 70)", borderRadius: "15px", minHeight: "100%" }}
                            >
                                <img
                                    src={jobPost.profile_picture_url || noImage}
                                    alt={`${jobPost.first_name} ${jobPost.last_name}`}
                                    className="card-img-top"
                                    style={{
                                        borderRadius: "25px",
                                        width: "90%",
                                        height: "375px",
                                        objectFit: "cover",
                                        margin: "auto",
                                        marginTop: "20px"
                                    }}
                                />
                                <div className="card-body">
                                    <h3 className="card-title text-white diphylleia-regular fs-2">
                                        <strong>{jobPost.first_name} {jobPost.last_name}</strong>
                                    </h3>
                                    <div className="card-text text-white fs-5">
                                        <strong>Job Location:</strong> {jobPost.location || 'Location not provided'}
                                    </div>
                                    <div className="card-text text-white fs-5">
                                        <strong>Dates:</strong> {new Date(jobPost.start_date).toLocaleDateString()} - {new Date(jobPost.end_date).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center w-100">
                        <p>No job posts found near your location.</p>
                    </div>
                )}
            </div>

            <div className="hero-image mt-5">
                <img className="landing-page for-owners" src={clientSignUp} alt="Client Sign Up" />
                <div className="owner-text row">
                    <div className="col-5"></div>
                    <div className="col-7">
                        <h3 className="diphylleia-regular" style={{ fontSize: "3vw" }}>
                            <strong>Benefits of Joining...</strong>
                        </h3>
                        <h4 className="diphylleia-regular mt-4" style={{ fontSize: "2vw" }}>
                            <strong>✔️ Safe</strong>
                        </h4>
                        <p className="mb-0" style={{ fontSize: "1.5vw" }}>
                            🌿 Find and hire vetted, qualified help near you.
                        </p>
                        <p className="mb-4" style={{ fontSize: "1.5vw" }}>
                            🌿 Background checks completed for all plant sitters.
                        </p>
                        <h4 className="diphylleia-regular mt-3" style={{ fontSize: "2vw" }}>
                            <strong>✔️ Affordable</strong>
                        </h4>
                        <p className="mb-0" style={{ fontSize: "1.5vw" }}>
                            🌿 Pay only $__ /month to post unlimited jobs.
                        </p>
                        <p className="mb-4" style={{ fontSize: "1.5vw" }}>
                            🌿 Choose your own rate per job.
                        </p>
                        <h4 className="diphylleia-regular mt-3" style={{ fontSize: "2vw" }}>
                            <strong>✔️ Convenient</strong>
                        </h4>
                        <p className="mb-0" style={{ fontSize: "1.5vw" }}>
                            🌿 Cancel any time.
                        </p>
                        <p className="mb-4" style={{ fontSize: "1.5vw" }}>
                            🌿 Hire only the help you need, when you need it.
                        </p>
                    </div>
                </div>
            </div>

			<div className="container mt-5 col-3">
                <button
                    type="submit"
                    className="btn col-12 rounded-pill mt-2"
                    onClick={() => navigate('/provider-signup')}
                >
                    <h3 className="diphylleia-regular text-center" style={{ fontSize: "2vw" }}>
                        <strong>Subscribe Now</strong>
                    </h3>
                </button>
            </div>
        </div>
    );
};