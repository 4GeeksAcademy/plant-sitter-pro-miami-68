import React, { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom"
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

export const CompletedJobsPage = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1 className="text-center mt-4 mb-5 diphylleia-regular"><strong>Here are the jobs you have posted that have already been completed.</strong></h1>
            <h1 
                className="text-center mt-4 mb-5 diphylleia-regular apply-link"
                style={{textDecoration: "underline"}}
                onClick={() => navigate('/client-landing')}
            >
                <strong>Back to your profile page</strong>
            </h1>
        </div>
    )
}