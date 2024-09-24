import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";
import BushTrimmingLoader from "../component/BushTrimmingLoader";

export const ProviderLandingPage = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [jobPostsNearby, setJobPostsNearby] = useState([]);
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

            if (zipCode) {
                const res = await actions.searchJobPosts(zipCode, distance);
                if (res.success) {
                    setJobPostsNearby(store.jobPosts);
                } else {
                    alert("No job posts found near your location.");
                }
            }

            setLoading(false);
        };

        fetchData();
    }, []);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    if (loading) return <BushTrimmingLoader/>;

    return (
        <div className="container-fluid">
            <div className="row mb-4 mt-4" style={{ marginLeft: "30px" }}>
                <div className="profile-container row">
                    <div className="col">
                        <div
                            className="landing-profile ml-3"
                            style={{
                                backgroundImage: picture ? `url(${picture})` : 'url(no-image.png)',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                height: '200px',
                                width: '200px',
                                borderRadius: '50%',
                            }}
                            onClick={() => navigate('/provider-profile')}
                        ></div>
                    </div>
                    <div className="col text-end">
                        <h4 className="diphylleia-regular mb-0"><strong>Plant Sitter Since</strong></h4>
                        <h4 className="diphylleia-regular mt-0">October 2024</h4>
                    </div>
                </div>
                <h2 className="diphylleia-regular"><strong>{firstName} {lastName}</strong></h2>
                <h3>{city}, {state}</h3>
            </div>

            <div className="row container-fluid mt-4">
                <h2 className="mb-3 mt-3 diphylleia-regular"><strong>Your Options</strong></h2>
                <div className="row">
                    {jobPostsNearby.length > 0 ? (
                        jobPostsNearby.map((jobPost) => (
                            <div 
                                key={jobPost.id} 
                                className="col mb-1 job-option" 
                                style={{ paddingLeft: "1px", paddingRight: "1px"}}
                                onClick={()=> navigate(`/published-job-posts/${jobPost.id}`)}
                            >
                                <div className="card" style={{ backgroundColor: "rgb(70, 108, 70)", borderRadius: "10px", width: "240px", height: "300px" }}>
                                    <img
                                        src={jobPost.profile_picture_url || "no-image.png"}
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
                                            <strong>Location:</strong> {jobPost.location || 'Not provided'}
                                        </p>
                                        <p className="card-text text-white" style={{ fontSize: "14px", margin: "10px 0" }}>
                                            <strong>Dates:</strong> {formatDate(jobPost.start_date)} - {formatDate(jobPost.end_date)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No job posts found near your location.</p>
                    )}
                </div>

                <h2 className="mb-3 mt-3 diphylleia-regular"><strong>Your Jobs</strong></h2>
                {/* Placeholder for Your Jobs */}
                <div className="row">
                    <div className="col-md-4 mb-2" style={{ paddingLeft: "2px", paddingRight: "2px" }}>
                        <div className="card" style={{ backgroundColor: "rgb(50, 70, 50)", borderRadius: "10px", width: "240px", height: "260px" }}>
                            <div className="card-body text-center" style={{ padding: "10px" }}>
                                <p className="diphylleia-regular text-white" style={{ fontSize: "16px" }}>You haven't applied to any jobs yet.</p>
                            </div>
                        </div>
                    </div>
                    {/* Additional job cards for applied or upcoming jobs can go here */}
                </div>
            </div>
        </div>
    );
};