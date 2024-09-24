import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import noImage from "../../img/noImage.png";
import { useNavigate } from "react-router-dom";
import Sedonia from "../../img/Sedonia.jpg";
import Cesar from "../../img/Cesar.jpg";

export const ContactUs = () => {
	const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    return (
        <div className="container mt-5">
            <h1 className="diphylleia-regular mb-4 text-center"><strong>Meet the Developers</strong></h1 >
            <div className="row">
                {/* Sedonia */}
                <div className="col contacts">
                    <img 
                        src={Sedonia} 
                        alt="Image of ___" 
                        className="card-img-top" 
                        style={{ borderRadius: "25px", objectFit: "cover", margin: "auto", marginTop: "20px" }}
                    />
                    <div className="card-body text-center">
                        <h5 className="card-title diphylleia-regular text-white fs-2">
                            <strong>Sedonia Raethstein</strong>
                        </h5>
                        <div className="card-text">
                            <i className="fa-solid fa-location-dot"/>  Gainesville, FL
                        </div>
                        <div className="card-text">
                            <a className="contact-us" href="mailto:river.sedonia@gmail.com">
                                <i className="fa-regular fa-envelope"/>  river.sedonia@gmail.com
                            </a>
                        </div>
                        <div className="card-text">
                            <a className="contact-us" href="https://www.linkedin.com/in/sedoniaraethstein/">
                                <i className="fa-brands fa-linkedin"/>  /sedoniaraethstein
                            </a>
                        </div>
                        <div className="card-text">
                            <a className="contact-us" href="https://github.com/Sedonia-R">
                                <i className="fa-brands fa-github"/>  /Sedonia-R
                            </a>
                        </div>
                    </div>
                </div>
                {/* Cesar */}
                <div className="col contacts">
                    <img 
                        src={Cesar} 
                        alt="Image of ___" 
                        className="card-img-top" 
                        style={{ borderRadius: "25px", objectFit: "cover", margin: "auto", marginTop: "20px" }}
                    />
                    <div className="card-body text-center">
                        <h5 className="card-title diphylleia-regular text-white fs-2">
                            <strong>Cesar Amaya Colella</strong>
                        </h5>
                        <div className="card-text">
                            <i className="fa-solid fa-location-dot"/>  Orlando, FL
                        </div>
                        <div className="card-text">
                            <a className="contact-us" href="mailto:your-email@gmail.com">
                                <i className="fa-regular fa-envelope"/>  cesar.rafael.gep@gmail.com
                            </a>
                        </div>
                        <div className="card-text">
                            <a className="contact-us" href="https://www.linkedin.com/in/cesaramcolson//">
                                <i className="fa-brands fa-linkedin"/>  /cesaramcolson
                            </a>
                        </div>
                        <div className="card-text">
                            <a className="contact-us" href="https://github.com/cesaramcolson">
                                <i className="fa-brands fa-github"/>  /cesaramcolson
                            </a>
                        </div>
                    </div>
                </div>
                {/* Gerardo */}
                <div className="col contacts">
                    <img 
                        src={noImage} 
                        alt="Image of ___" 
                        className="card-img-top" 
                        style={{ borderRadius: "25px", objectFit: "cover", margin: "auto", marginTop: "20px" }}
                    />
                    <div className="card-body text-center">
                        <h5 className="card-title diphylleia-regular text-white fs-2">
                            <strong>First Name Last Name</strong>
                        </h5>
                        <div className="card-text">
                            <i className="fa-solid fa-location-dot"/>  City, State
                        </div>
                        <div className="card-text">
                            <a className="contact-us" href="mailto:your-email@gmail.com">
                                <i className="fa-regular fa-envelope"/>  email
                            </a>
                        </div>
                        <div className="card-text">
                            <a className="contact-us" href="https://www.linkedin.com/">
                                <i className="fa-brands fa-linkedin"/>  /linkedin
                            </a>
                        </div>
                        <div className="card-text">
                            <a className="contact-us" href="https://github.com">
                                <i className="fa-brands fa-github"/>  /github
                            </a>
                        </div>
                    </div>
                </div>
                {/* Oneil */}
                <div className="col contacts">
                    <img 
                        src={noImage} 
                        alt="Image of ___" 
                        className="card-img-top" 
                        style={{ borderRadius: "25px", objectFit: "cover", margin: "auto", marginTop: "20px" }}
                    />
                    <div className="card-body text-center">
                        <h5 className="card-title diphylleia-regular text-white fs-2">
                            <strong>First Name Last Name</strong>
                        </h5>
                        <div className="card-text">
                            <i className="fa-solid fa-location-dot"/>  City, State
                        </div>
                        <div className="card-text">
                            <a className="contact-us" href="mailto:your-email@gmail.com">
                                <i className="fa-regular fa-envelope"/>  email
                            </a>
                        </div>
                        <div className="card-text">
                            <a className="contact-us" href="https://www.linkedin.com/">
                                <i className="fa-brands fa-linkedin"/>  /linkedin
                            </a>
                        </div>
                        <div className="card-text">
                            <a className="contact-us" href="https://github.com">
                                <i className="fa-brands fa-github"/>  /github
                            </a>
                        </div>
                    </div>
                </div>
                {/* Shafik */}
                <div className="col contacts">
                    <img 
                        src={noImage} 
                        alt="Image of ___" 
                        className="card-img-top" 
                        style={{ borderRadius: "25px", objectFit: "cover", margin: "auto", marginTop: "20px" }}
                    />
                    <div className="card-body text-center">
                        <h5 className="card-title diphylleia-regular text-white fs-2">
                            <strong>First Name Last Name</strong>
                        </h5>
                        <div className="card-text">
                            <i className="fa-solid fa-location-dot"/>  City, State
                        </div>
                        <div className="card-text">
                            <a className="contact-us" href="mailto:your-email@gmail.com">
                                <i className="fa-regular fa-envelope"/>  email
                            </a>
                        </div>
                        <div className="card-text">
                            <a className="contact-us" href="https://www.linkedin.com/">
                                <i className="fa-brands fa-linkedin"/>  /linkedin
                            </a>
                        </div>
                        <div className="card-text">
                            <a className="contact-us" href="https://github.com">
                                <i className="fa-brands fa-github"/>  /github
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

