import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

export const ViewApplicants = () => {
    return (
        <div>
            <h1 className="text-center mt-4 mb-5 diphylleia-regular"><strong>View Applicants</strong></h1>
            <div 
                type= "button"
                style={{border: "1px solid black", borderRadius: "5px", 
                width: "200px", height: "200px", margin: "auto", 
                textAlign: "center"}}
            >
                Auto populated list of applicants here

            </div>
        </div>
    )
}