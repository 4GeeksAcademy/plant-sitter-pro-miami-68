import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

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
            <h2>Your Job Posts</h2>
            <div className="row">
                {jobPosts.map((post) => (
                    <div className="col-md-4 mb-4" key={post.id} onClick={() => handleViewJobPost(post.id)}>
                        <div className="card">
                            <img 
                                src={post.profile_picture_url} 
                                alt="Job Profile" 
                                className="card-img-top" 
                                style={{ width: "375px", height: "375px", objectFit: "cover", margin: "auto" }}
                            />
                            <div className="card-body">
                                <h5 className="card-title">
                                    {post.first_name} {post.last_name}
                                </h5>
                                <p className="card-text">
                                    <strong>Address:</strong> {post.address_line_1 || 'No Address'}, {post.address_line_2 || ''}
                                </p>
                                <p className="card-text">
                                    <strong>Job Area:</strong> {post.location || 'Location not provided'}
                                </p>
                                <p className="card-text">
                                    <strong>Duration:</strong> {formatDate(post.start_date)} - {formatDate(post.end_date)}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};