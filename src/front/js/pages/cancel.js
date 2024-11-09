import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

export const Cancel = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();


    return (
        <div className="text-center m-5">
            ** Cancel Subscription Page **
        </div>
    );
};