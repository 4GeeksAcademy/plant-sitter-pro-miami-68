import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

export const ClientSignUp2 = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [addressLine1, setAddressLine1] = useState("");
    const [addressLine2, setAddressLine2] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("United States");
    const [zipCode, setZipCode] = useState("");
    const [termsAccepted, setTermsAccepted] = useState(false);
    const { actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (token) {
            navigate("/client-signup2");
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!termsAccepted) {
            alert("You must accept the terms and conditions.");
            return;
        }

        const result = await actions.signup(email, password, phone, firstName, lastName, addressLine1, addressLine2, city, state, country, zipCode);
        if (result.success) {
            navigate('/client-services1');
        } else {
            alert(result.error || "Sign-up failed. Please try again.");
        }
    };

    return (
        <div className="row justify-content-center">
            <div className="col-lg-6 bg-indigo">
                <h1 className="fw-normal mt-5 diphylleia-regular jobs">Create an account</h1>

                <div className="text-center mb-5">
                    <p>Already have an account? <a href="/login"><u>Log in</u></a></p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6 mb-2 pb-2">
                            <div data-mdb-input-init className="form-outline form-white">
                                <input
                                    type="text"
                                    id="firstName"
                                    className="form-control form-control-lg"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                                <label className="form-label" >First Name</label>
                            </div>
                        </div>
                        <div className="col-md-6 mb-2 pb-2">
                            <div data-mdb-input-init className="form-outline form-white">
                                <input
                                    type="text"
                                    id="lastName"
                                    className="form-control form-control-lg"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                                <label className="form-label">Last Name</label>
                            </div>
                        </div>
                    </div>

                    <div className="mb-2 pb-2">
                        <div data-mdb-input-init className="form-outline form-white">
                            <input
                                type="text"
                                id="addressLine1"
                                className="form-control form-control-lg"
                                value={addressLine1}
                                onChange={(e) => setAddressLine1(e.target.value)}
                            />
                            <label className="form-label">Address Line 1</label>
                        </div>
                    </div>

                    <div className="mb-2 pb-2">
                        <div data-mdb-input-init className="form-outline form-white">
                            <input
                                type="text"
                                id="addressLine2"
                                className="form-control form-control-lg"
                                value={addressLine2}
                                onChange={(e) => setAddressLine2(e.target.value)}
                            />
                            <label className="form-label">Address Line 2</label>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-5 mb-2 pb-2">
                            <div data-mdb-input-init className="form-outline form-white">
                                <input
                                    type="text"
                                    id="city"
                                    className="form-control form-control-lg"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                />
                                <label className="form-label">City</label>
                            </div>
                        </div>

                        <div className="col-md-5 mb-2 pb-2">
                            <div data-mdb-input-init className="form-outline form-white">
                                <input
                                    type="text"
                                    id="state"
                                    className="form-control form-control-lg"
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                />
                                <label className="form-label">State</label>
                            </div>
                        </div>

                        <div className="col-md-2 mb-2 pb-2">
                            <div data-mdb-input-init className="form-outline form-white">
                                <input
                                    type="text"
                                    id="zipCode"
                                    className="form-control form-control-lg"
                                    value={zipCode}
                                    onChange={(e) => setZipCode(e.target.value)}
                                />
                                <label className="form-label">ZIP Code</label>
                            </div>
                        </div>
                    </div>

                    <div className="mb-2 pb-2">
                        <fieldset disabled>
                            <div data-mdb-input-init className="form-outline form-white">
                                <input
                                    type="text"
                                    id="country"
                                    className="form-control"
                                    placeholder="Currently only available in the United States"
                                    value={country}
                                    readOnly
                                />
                                <label className="form-label">Country</label>
                            </div>
                        </fieldset>
                    </div>

                    <div className="mb-2 pb-2">
                        <div data-mdb-input-init className="form-outline form-white">
                            <input
                                type="tel"
                                id="phone"
                                className="form-control form-control-lg"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            <label className="form-label">Phone Number</label>
                        </div>
                    </div>

                    <div className="mb-2 pb-2">
                        <div data-mdb-input-init className="form-outline form-white">
                            <input
                                type="text"
                                id="email"
                                className="form-control form-control-lg"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label className="form-label">Email</label>
                        </div>
                    </div>

                    <div className="mb-2 pb-2">
                        <div data-mdb-input-init className="form-outline form-white">
                            <input
                                type="password"
                                id="password"
                                className="form-control form-control-lg"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <label className="form-label">Password</label>
                        </div>
                    </div>

                    <div className="form-check d-flex justify-content-start mb-2 pb-3">
                        <input
                            className="form-check-input me-3"
                            type="checkbox"
                            value={termsAccepted}
                            onChange={(e) => setTermsAccepted(e.target.checked)}
                            id="terms"
                        />
                        <label className="form-check-label">
                            I do accept the <a href="#!" className=""><u>Terms and Conditions</u></a> of your site.
                        </label>
                    </div>

                    <div className="d-flex justify-content-center">
                        <button
                            type="submit"
                            className="btn btn-success mb-5 col-5 rounded-pill"
                        >
                            Register
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
};