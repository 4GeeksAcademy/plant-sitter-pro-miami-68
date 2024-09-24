import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const ViewApplicants = () => {
    const { store, actions } = useContext(Context);
    const { job_post_id } = useParams();
    const [applicants, setApplicants] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchApplicants = async () => {
            if (job_post_id) {
                const res = await actions.getJobApplicants(job_post_id);
                if (res.success) {
                    setApplicants(res.data);
                } else {
                    alert(res.error || "No applicants found.");
                }
            } else {
                alert("No Job Post ID found.");
            }
        };

        fetchApplicants();
    }, [job_post_id]);

    const handleDecision = async (applicantId, decision) => {
        const res = await actions.updateAssignmentStatus(applicantId, decision);
        if (res.success) {
            alert(`Applicant has been ${decision}.`);
            setApplicants(prev => prev.map(a => 
                a.id === applicantId ? { ...a, status: decision } : a
            ));  // Update the status in the frontend after accepting/rejecting
        } else {
            alert(res.error || "Error making a decision.");
        }
    };

    return (
        <div>
            <h1 className="text-center mt-4 mb-5"><strong>View Applicants</strong></h1>
            <div className="container">
                {applicants.length > 0 ? (
                    applicants.map(applicant => (
                        <div key={applicant.id} className="applicant-card">
                            <h5>Plant Sitter ID: {applicant.plantsitter_id}</h5>
                            <p>Status: {applicant.status}</p>
                            {applicant.status === 'pending' && (
                                <>
                                    <button 
                                        onClick={() => handleDecision(applicant.id, 'accepted')}
                                    >
                                        Accept
                                    </button>
                                    <button 
                                        onClick={() => handleDecision(applicant.id, 'rejected')}
                                    >
                                        Reject
                                    </button>
                                </>
                            )}
                            {applicant.status !== 'pending' && (
                                <p>Decision: {applicant.status}</p>
                            )}
                        </div>
                    ))
                ) : (
                    <p>No applicants found.</p>
                )}
            </div>
        </div>
    );
};