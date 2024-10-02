import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import "../../styles/handleSubmit.css"

export const ClientSignUp2 = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
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
    const [showModal, setShowModal] = useState(false);


    const handleSubmit = async (e) => {
        if (e.type === "keydown" && e.key !== "Enter") return
        e.preventDefault();

        if (!termsAccepted) {
            alert("You must accept the terms and conditions.");
            return;
        }

        if (password === confirmPassword) {
            const result = await actions.signup(email, password, phone, firstName, lastName, addressLine1, addressLine2, city, state, country, zipCode);
            if (result.success) {
                setShowModal(true); // Show modal on success;
            } else {
                alert(result.error || "Sign-up failed. Please try again.");
            }
        } else {
            alert("Passwords Do Not MATCHH!!");
        }

    };

    const handleCloseModal = () => {
        setShowModal(false);
        navigate('/client-services1');
    };

    return (
        <div className="row justify-content-center">
            <div className="col-lg-6 bg-indigo">
                <h1 className="fw-normal mb-1 mt-4 diphylleia-regular jobs">Create an account</h1>

                <div className="text-center mt-2 mb-4">
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
                                <label className="form-label" htmlFor="firstName">First Name</label>
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
                                <label className="form-label" htmlFor="lastName">Last Name</label>
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
                            <label className="form-label" htmlFor="addressLine1">Address Line 1</label>
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
                            <label className="form-label" htmlFor="addressLine2">Address Line 2</label>
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
                                <label className="form-label" htmlFor="city">City</label>
                            </div>
                        </div>

                        <div className="col-md-3 mb-2 pb-2">
                            <div data-mdb-input-init className="form-outline form-white">
                                <select className="form-select form-select-lg mb-2" aria-label="Default select example" for="state" value={state}
                                    onChange={(e) => setState(e.target.value)}>
                                    <option value="AL">Alabama</option>
                                    <option value="AK">Alaska</option>
                                    <option value="AZ">Arizona</option>
                                    <option value="AR">Arkansas</option>
                                    <option value="CA">California</option>
                                    <option value="CO">Colorado</option>
                                    <option value="CT">Connecticut</option>
                                    <option value="DE">Delaware</option>
                                    <option value="FL">Florida</option>
                                    <option value="GA">Georgia</option>
                                    <option value="HI">Hawaii</option>
                                    <option value="ID">Idaho</option>
                                    <option value="IL">Illinois</option>
                                    <option value="IN">Indiana</option>
                                    <option value="IA">Iowa</option>
                                    <option value="KS">Kansas</option>
                                    <option value="KY">Kentucky</option>
                                    <option value="LA">Louisiana</option>
                                    <option value="ME">Maine</option>
                                    <option value="MD">Maryland</option>
                                    <option value="MA">Massachusetts</option>
                                    <option value="MI">Michigan</option>
                                    <option value="MN">Minnesota</option>
                                    <option value="MS">Mississippi</option>
                                    <option value="MO">Missouri</option>
                                    <option value="MT">Montana</option>
                                    <option value="NE">Nebraska</option>
                                    <option value="NV">Nevada</option>
                                    <option value="NH">New Hampshire</option>
                                    <option value="NJ">New Jersey</option>
                                    <option value="NM">New Mexico</option>
                                    <option value="NY">New York</option>
                                    <option value="NC">North Carolina</option>
                                    <option value="ND">North Dakota</option>
                                    <option value="OH">Ohio</option>
                                    <option value="OK">Oklahoma</option>
                                    <option value="OR">Oregon</option>
                                    <option value="PA">Pennsylvania</option>
                                    <option value="RI">Rhode Island</option>
                                    <option value="SC">South Carolina</option>
                                    <option value="SD">South Dakota</option>
                                    <option value="TN">Tennessee</option>
                                    <option value="TX">Texas</option>
                                    <option value="UT">Utah</option>
                                    <option value="VT">Vermont</option>
                                    <option value="VA">Virginia</option>
                                    <option value="WA">Washington</option>
                                    <option value="WV">West Virginia</option>
                                    <option value="WI">Wisconsin</option>
                                    <option value="WY">Wyoming</option>
                                    <option value="PR">Puerto Rico</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-md-4 mb-2 pb-2">
                            <div data-mdb-input-init className="form-outline form-white">
                                <input
                                    type="text"
                                    id="zipCode"
                                    className="form-control form-control-lg"
                                    value={zipCode}
                                    onChange={(e) => setZipCode(e.target.value)}
                                />
                                <label className="form-label" htmlFor="zipCode">ZIP Code</label>
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
                                />
                                <label className="form-label" htmlFor="country">Country</label>
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
                            <label className="form-label" htmlFor="phone">Phone Number</label>
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
                            <label className="form-label" htmlFor="email">Email</label>
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
                            <label className="form-label" htmlFor="password">Password</label>
                        </div>
                    </div>
                    <div className="mb-2 pb-2">
                        <div data-mdb-input-init className="form-outline form-white">
                            <input
                                type="password"
                                id="confirmPassword"
                                className="form-control form-control-lg"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <label className="form-label" htmlFor="password">Confirm Password</label>
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
                        <label className="form-check-label" htmlFor="terms">
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
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Account Verification</Modal.Title>
                </Modal.Header>
                <Modal.Body>An email has been sent for you to verify the account.</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleCloseModal}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};