import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import plantPic from "../../img/plants-on-stand.jpg";
import placeholder from "../../img/placeholder.png";
import { useNavigate } from "react-router-dom";

export const ProviderLogin = () => {
    // const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    return (
        <div className="row justify-content-center">
            <div className="col-lg-6 bg-indigo">
                <h1 className="fw-normal mb-5 mt-5 diphylleia-regular jobs">Log in to your account</h1>
                
                <div className="mb-2">
                    <div data-mdb-input-init className="form-outline form-white">
                        <input type="text" id="email" className="form-control form-control-lg" />
                        <label className="form-label" htmlFor="email">Email</label>
                    </div>
                </div>

                <div className="mb-2">
                    <div data-mdb-input-init className="form-outline form-white">
                        <input type="password" id="password" className="form-control form-control-lg" />
                        <label className="form-label" htmlFor="password">Password</label>
                    </div>
                </div>

                <div className="form-check d-flex justify-content-start mb-2 pb-3">
                    <input className="form-check-input me-3" type="checkbox" value="" id="rememberMe" />
                    <label className="form-check-label" htmlFor="rememberMe">
                        Remember me
                    </label>
                </div>

                <div className="d-flex justify-content-center">
                    <button
                        type="submit" 
                        className="btn btn-success mb-5 col-5 rounded-pill"
                        onClick={() => {
                            navigate('/');
                        }}
                    >
                        Log In
                    </button>
                </div>

                <div className="text-center">
                    <p>Don't have an account? <a href="/sign-up"><u>Sign up</u></a></p>
                </div>
            </div>
        </div>
    );
};