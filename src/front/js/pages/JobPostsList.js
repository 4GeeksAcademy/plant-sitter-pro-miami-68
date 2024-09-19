import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import noImage from "../../img/noImage.png";

export const JobPostsList = () => {
    const { store, actions } = useContext(Context);
    const [jobPosts, setJobPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJobPosts = async () => {
            const res = await actions.getJobPosts();
            if (res.success) {
                setJobPosts(res.data);
            } else {
                alert("Error fetching job posts.");
            }
        };
        fetchJobPosts();
    }, []);


    const handleViewJobPost = (jobPostId) => {
        navigate(`/job-post-preview/${jobPostId}`);
    };

    // Function to format date in "MM/DD/YYYY" format
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="container mt-5">
            <h1 className="diphylleia-regular mb-4 text-center"><strong>Your Job Posts</strong></h1 >
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
                <div
                    className="upload-job"
                    onClick={() => navigate("/client-services1")}
                    style={{ marginTop: "10%", marginLeft: "40px" }}
                >
                    <i className="fa fa-plus fa-6x plus-sign"></i>
                </div>
            </div>
        </div>
    );
};