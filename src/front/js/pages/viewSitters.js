import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import PlantSitterCard from "../component/PlantSitterCard";
import clientSignUp from "../../img/client-sign-up.png";
import { useNavigate } from "react-router-dom";

export const ViewSitters = () => {
    const { store } = useContext(Context);
    const sitters = store.sitters || [];
    const navigate = useNavigate();

    const handleButtonClick = () => {
        if (store.token) {
            // If logged in, navigate to create a job post
            navigate("/client-services1");
        } else {
            // If not logged in, navigate to the signup page
            navigate("/client-signup1");
        }
    };

    return (
        <div className="row d-flex">
            <h1 className="mb-5 mt-5 diphylleia-regular jobs">
                <strong>There are {sitters.length} Plant Sitters near you!</strong>
            </h1>

            <div className="d-flex row m-3">
                {sitters.length > 0 ? (
                    sitters.map((sitter) => (
                        <PlantSitterCard key={sitter.id} sitter={sitter} />
                    ))
                ) : (
                    <div className="d-flex justify-content-center align-items-center" style={{ height: "100px" }}>
                        <p>No sitters found near your location...</p>
                    </div>
                )}
            </div>

            <div className="hero-image mt-5">
                <img className="landing-page for-owners" src={clientSignUp} alt="Client Sign Up" />
                <div className="owner-text row">
                    <div className="col-5"></div>
                    <div className="col-7">
                        <h3 className="diphylleia-regular" style={{ fontSize: "3vw" }}>
                            <strong>Take comfort knowing that</strong>
                        </h3>
                        <h3 className="diphylleia-regular" style={{ fontSize: "3vw" }}>
                            <strong>our service is...</strong>
                        </h3>
                        <h4 className="diphylleia-regular mt-4" style={{ fontSize: "2vw" }}>
                            <strong>✔️ Safe</strong>
                        </h4>
                        <p className="mb-0" style={{ fontSize: "1.5vw" }}>
                            🌿 Find and hire vetted, qualified help near you.
                        </p>
                        <p className="mb-4" style={{ fontSize: "1.5vw" }}>
                            🌿 Background checks completed for all plant sitters.
                        </p>
                        <h4 className="diphylleia-regular mt-3" style={{ fontSize: "2vw" }}>
                            <strong>✔️ Affordable</strong>
                        </h4>
                        <p className="mb-0" style={{ fontSize: "1.5vw" }}>
                            🌿 Pay only $__ /month to post unlimited jobs.
                        </p>
                        <p className="mb-4" style={{ fontSize: "1.5vw" }}>
                            🌿 Choose your own rate per job.
                        </p>
                        <h4 className="diphylleia-regular mt-3" style={{ fontSize: "2vw" }}>
                            <strong>✔️ Convenient</strong>
                        </h4>
                        <p className="mb-0" style={{ fontSize: "1.5vw" }}>
                            🌿 Cancel any time.
                        </p>
                        <p className="mb-4" style={{ fontSize: "1.5vw" }}>
                            🌿 Hire only the help you need, when you need it.
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mt-5 col-3">
                <button
                    type="button"
                    className="btn col-12 rounded-pill mt-2"
                    onClick={handleButtonClick}
                >
                    <h3 className="diphylleia-regular text-center" style={{ fontSize: "2vw" }}>
                        <strong>{store.token ? "Create a Job Post" : "Subscribe Now"}</strong>
                    </h3>
                </button>
            </div>
        </div>
    );
};