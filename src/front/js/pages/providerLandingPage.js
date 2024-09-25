import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";
import ShovelAnimation from "../component/ShovelAnimation";

export const ProviderLandingPage = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [jobPostsNearby, setJobPostsNearby] = useState([]);
    const [ownedJobPosts, setOwnedJobPosts] = useState([]);
    const [appliedJobs, setAppliedJobs] = useState([]);
    const [completedJobs, setCompletedJobs] = useState([]);
    const [picture, setPicture] = useState(null);
    const firstName = store.user?.first_name;
    const lastName = store.user?.last_name;
    const city = store.user?.city;
    const state = store.user?.state;
    const zipCode = store.user?.zip_code;
    const distance = 15;

    useEffect(() => {
        const fetchData = async () => {
            if (!store.user) {
                await actions.getUser();
            }
    
            const res = await actions.getPlantSitter();
            if (res.success && res.data) {
                setPicture(res.data.profile_picture_url);
            }
    
            const ownedJobsRes = await actions.getUserOwnedJobs();
            if (ownedJobsRes.success) {
                const nonCompletedJobs = ownedJobsRes.data.filter(job => job.status !== 'completed');
                setOwnedJobPosts(nonCompletedJobs);
            }
    
            const appliedRes = await actions.getUserAppliedJobs();
            if (appliedRes.success) {
                const nonCompletedAppliedJobs = appliedRes.data.filter(job => job.status !== 'completed');
                setAppliedJobs(nonCompletedAppliedJobs);
            }

            const completedRes = await actions.getUserCompletedJobs();
            if (completedRes.success) {
                setCompletedJobs(completedRes.data);
            }
    
            if (zipCode) {
                const jobPostsRes = await actions.searchJobPosts(zipCode, distance);
                if (jobPostsRes.success) {
                    const jobPosts = Array.isArray(store.jobPosts) ? store.jobPosts : [];
                    const nearbyJobs = jobPosts.filter(
                        (jobPost) =>
                            (!Array.isArray(ownedJobsRes.data) || !ownedJobsRes.data.some((ownedJob) => ownedJob.id === jobPost.id)) &&
                            (!Array.isArray(appliedRes.data) || !appliedRes.data.some((appliedJob) => appliedJob.job_post_id === jobPost.id))
                    );
                    setJobPostsNearby(nearbyJobs);
                } else {
                    alert("No job posts found near your location.");
                }
            }
        
            setLoading(false);
        };
    
        fetchData();
    }, []);


    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "2-digit", day: "2-digit" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    if (loading) return <ShovelAnimation />;

    return (
        <div className="container-fluid">
            <div className="row mb-4 mt-4" style={{ marginLeft: "30px" }}>
                <div className="profile-container row">
                    <div className="col">
                        <div
                            className="landing-profile ml-3 profile-hover"
                            style={{
                                backgroundImage: picture ? `url(${picture})` : "none",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                height: "200px",
                                width: "200px",
                                borderRadius: "50%",
                                border: "2px solid #ccc",
                                position: "relative",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: picture ? "transparent" : "#f0f0f0",
                            }}
                            onClick={() => navigate("/provider-services")}
                        >
                            {!picture && (
                                <span className="no-profile-text">Sign Up as a Plantsitter</span>
                            )}
                        </div>
                    </div>
                    <div className="col text-end">
                        <h4 className="diphylleia-regular mb-0">
                            <strong>Plant Sitter Since</strong>
                        </h4>
                        <h4 className="diphylleia-regular mt-0">October 2024</h4>
                    </div>
                </div>
                <h2 className="diphylleia-regular">
                    <strong>{firstName} {lastName}</strong>
                </h2>
                <h3>{city}, {state}</h3>
            </div>

            {/* Your Job Posts Section */}
            <div className="row container-fluid mt-4">
                <h2 className="mb-3 mt-3 diphylleia-regular">
                    <strong>Your Job Posts</strong>
                </h2>
                <div className="row">
                    {ownedJobPosts.length > 0 ? (
                        ownedJobPosts.map((jobPost) => (
                            <div
                                key={jobPost.id}
                                className="col mb-1 job-option"
                                style={{ paddingLeft: "1px", paddingRight: "1px" }}
                                onClick={() => navigate(`/published-job-posts/${jobPost.id}`)}
                            >
                                <div
                                    className="card"
                                    style={{
                                        backgroundColor: "rgb(70, 108, 70)",
                                        borderRadius: "10px",
                                        width: "240px",
                                        height: "300px",
                                    }}
                                >
                                    <img
                                        src={jobPost.profile_picture_url || "noImage.png"}
                                        alt={`${jobPost.first_name} ${jobPost.last_name}`}
                                        className="card-img-top"
                                        style={{
                                            borderRadius: "10px",
                                            width: "95%",
                                            height: "150px",
                                            objectFit: "cover",
                                            margin: "auto",
                                            marginTop: "10px",
                                        }}
                                    />
                                    <div className="card-body" style={{ padding: "10px", textAlign: "center" }}>
                                        <h6 className="card-title text-white diphylleia-regular" style={{ fontSize: "16px" }}>
                                            <strong>{jobPost.first_name} {jobPost.last_name}</strong>
                                        </h6>
                                        <p className="card-text text-white" style={{ fontSize: "14px", margin: "10px 0" }}>
                                            <strong>Location:</strong> {jobPost.location || "Not provided"}
                                        </p>
                                        <p className="card-text text-white" style={{ fontSize: "14px", margin: "10px 0" }}>
                                            <strong>Dates:</strong> {formatDate(jobPost.start_date)} - {formatDate(jobPost.end_date)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>You don't have any job posts yet.</p>
                    )}
                </div>

                {/* Available Jobs Section */}
                <h2 className="mb-3 mt-3 diphylleia-regular">
                    <strong>Available Jobs</strong>
                </h2>
                <div className="row">
                    {jobPostsNearby.length > 0 ? (
                        jobPostsNearby.map((jobPost) => (
                            <div
                                key={jobPost.id}
                                className="col mb-1 job-option"
                                style={{ paddingLeft: "1px", paddingRight: "1px" }}
                                onClick={() => navigate(`/published-job-posts/${jobPost.id}`)}
                            >
                                <div
                                    className="card"
                                    style={{
                                        backgroundColor: "rgb(70, 108, 70)",
                                        borderRadius: "10px",
                                        width: "240px",
                                        height: "300px",
                                    }}
                                >
                                    <img
                                        src={jobPost.profile_picture_url || "noImage.png"}
                                        alt={`${jobPost.first_name} ${jobPost.last_name}`}
                                        className="card-img-top"
                                        style={{
                                            borderRadius: "10px",
                                            width: "95%",
                                            height: "150px",
                                            objectFit: "cover",
                                            margin: "auto",
                                            marginTop: "10px",
                                        }}
                                    />
                                    <div className="card-body" style={{ padding: "10px", textAlign: "center" }}>
                                        <h6 className="card-title text-white diphylleia-regular" style={{ fontSize: "16px" }}>
                                            <strong>{jobPost.first_name} {jobPost.last_name}</strong>
                                        </h6>
                                        <p className="card-text text-white" style={{ fontSize: "14px", margin: "10px 0" }}>
                                            <strong>Location:</strong> {jobPost.location || "Not provided"}
                                        </p>
                                        <p className="card-text text-white" style={{ fontSize: "14px", margin: "10px 0" }}>
                                            <strong>Dates:</strong> {formatDate(jobPost.start_date)} - {formatDate(jobPost.end_date)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No available job posts found near your location.</p>
                    )}
                </div>
            
                <h2 className="mb-3 mt-3 diphylleia-regular"><strong>Your Jobs</strong></h2>
                <div className="row">
                    {appliedJobs.length > 0 ? (
                        appliedJobs.map((jobAssignment) => {
                            let statusColor;
                            if (jobAssignment.status === 'pending') {
                                statusColor = 'yellow';
                            } else if (jobAssignment.status === 'rejected') {
                                statusColor = 'red';
                            } else if (jobAssignment.status === 'accepted') {
                                statusColor = '#00FF00';
                            }

                            return (
                                <div 
                                    key={jobAssignment.id} 
                                    className="col mb-1 job-option" 
                                    style={{ paddingLeft: "1px", paddingRight: "1px" }}
                                    onClick={() => navigate(`/published-job-posts/${jobAssignment.job_post_id}`)}
                                >
                                    <div className="card" style={{ backgroundColor: "rgb(50, 70, 50)", borderRadius: "10px", width: "240px", height: "320px" }}>
                                        <img
                                            src={jobAssignment.job_post.profile_picture_url || "noImage.png"}
                                            alt={`${jobAssignment.job_post.first_name} ${jobAssignment.job_post.last_name}`}
                                            className="card-img-top"
                                            style={{
                                                borderRadius: "10px",
                                                width: "95%",
                                                height: "150px",
                                                objectFit: "cover",
                                                margin: "auto",
                                                marginTop: "10px",
                                            }}
                                        />
                                        <div className="card-body" style={{ padding: "10px", textAlign: "center" }}>
                                            <h6 className="card-title text-white diphylleia-regular" style={{ fontSize: "16px" }}>
                                                <strong>{jobAssignment.job_post.first_name} {jobAssignment.job_post.last_name}</strong>
                                            </h6>
                                            <p className="card-text text-white" style={{ fontSize: "14px", margin: "10px 0" }}>
                                                <strong>Location:</strong> {jobAssignment.job_post.location || 'Not provided'}
                                            </p>
                                            <p className="card-text text-white" style={{ fontSize: "14px", margin: "10px 0" }}>
                                                <strong>Dates:</strong> {formatDate(jobAssignment.job_post.start_date)} - {formatDate(jobAssignment.job_post.end_date)}
                                            </p>
                                            {/* Display the status of the job application */}
                                            <p 
                                                className="card-text"
                                                style={{
                                                    fontSize: "20px",
                                                    fontWeight: "bold", 
                                                    color: statusColor
                                                }}
                                            >
                                                {jobAssignment.status.charAt(0).toUpperCase() + jobAssignment.status.slice(1)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p>You haven't applied to any jobs yet.</p>
                    )}
                </div>

                <h2 className="mb-3 mt-3 diphylleia-regular"><strong>Completed Jobs</strong></h2>
                <div className="row">
                    {completedJobs.length > 0 ? (
                        completedJobs.map((jobAssignment) => (
                            <div 
                                key={jobAssignment.id} 
                                className="col mb-1 job-option" 
                                style={{ paddingLeft: "1px", paddingRight: "1px" }}
                                onClick={() => navigate(`/published-job-posts/${jobAssignment.job_post_id}`)}
                            >
                                <div className="card" style={{ backgroundColor: "rgb(50, 50, 50)", borderRadius: "10px", width: "240px", height: "320px" }}>
                                    <img
                                        src={jobAssignment.job_post.profile_picture_url || "noImage.png"}
                                        alt={`${jobAssignment.job_post.first_name} ${jobAssignment.job_post.last_name}`}
                                        className="card-img-top"
                                        style={{
                                            borderRadius: "10px",
                                            width: "95%",
                                            height: "150px",
                                            objectFit: "cover",
                                            margin: "auto",
                                            marginTop: "10px",
                                        }}
                                    />
                                    <div className="card-body" style={{ padding: "10px", textAlign: "center" }}>
                                        <h6 className="card-title text-white diphylleia-regular" style={{ fontSize: "16px" }}>
                                            <strong>{jobAssignment.job_post.first_name} {jobAssignment.job_post.last_name}</strong>
                                        </h6>
                                        <p className="card-text text-white" style={{ fontSize: "14px", margin: "10px 0" }}>
                                            <strong>Location:</strong> {jobAssignment.job_post.location || 'Not provided'}
                                        </p>
                                        <p className="card-text text-white" style={{ fontSize: "14px", margin: "10px 0" }}>
                                            <strong>Dates:</strong> {formatDate(jobAssignment.job_post.start_date)} - {formatDate(jobAssignment.job_post.end_date)}
                                        </p>
                                        <p 
                                            className="card-text"
                                            style={{
                                                fontSize: "20px",
                                                fontWeight: "bold", 
                                                color: 'gray'
                                            }}
                                        >
                                            Completed
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>You don't have any completed jobs yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};