import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import './../../styles/PersonalInfo.css';

export const PersonalInfo = () => {
    const { store, actions } = useContext(Context);
    const [formData, setFormData] = useState({
        email: "",
        phone: "",
        first_name: "",
        last_name: "",
        address_line_1: "",
        address_line_2: "",
        city: "",
        state: "",
        country: "",
        zip_code: ""
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            if (store.token) {
                const result = await actions.getUser();
                if (result.success) {
                    setFormData({
                        email: result.data.email,
                        phone: result.data.phone,
                        first_name: result.data.first_name,
                        last_name: result.data.last_name,
                        address_line_1: result.data.address_line_1,
                        address_line_2: result.data.address_line_2,
                        city: result.data.city,
                        state: result.data.state,
                        country: result.data.country,
                        zip_code: result.data.zip_code
                    });
                } else {
                    console.log(result.error);
                    navigate('/login');
                }
            } else {
                navigate('/login');
            }
        };

        fetchUserData();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, phone, first_name, last_name, address_line_1, address_line_2, city, state, zip_code } = formData;
        const result = await actions.updateUser(email, phone, first_name, last_name, address_line_1, address_line_2, city, state, formData.country, zip_code);

        if (result.success) {
            alert("User information updated successfully.");
            navigate('/account-settings')
        } else {
            setError(result.error);
        }
    };

    return (
        <div className="personal-info-container">
            <div className="breadcrumbs">
                <a href="#" onClick={() => navigate('/account-settings')}>Account</a> &gt; <span>Personal Information</span>
            </div>
            <h2 className="header">Personal Information</h2>
            {error && <p className="error-message">{error}</p>}
            <form className="personal-info-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email</label>
                    <input type="text" name="email" value={formData.email} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Phone Number</label>
                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>First Name</label>
                    <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Address Line 1</label>
                    <input type="text" name="address_line_1" value={formData.address_line_1} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Address Line 2</label>
                    <input type="text" name="address_line_2" value={formData.address_line_2} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>City</label>
                    <input type="text" name="city" value={formData.city} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>State</label>
                    <select className="form-select form-select-lg mb-2" aria-label="Default select example" for="state" value={formData.state}
                        name= "state" onChange={handleChange}>
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
                <div className="form-group">
                    <label>Country</label>
                    <input type="text" name="country" value={formData.country} readOnly />
                </div>
                <div className="form-group">
                    <label>Zip Code</label>
                    <input type="text" name="zip_code" value={formData.zip_code} onChange={handleChange} />
                </div>
                <button type="submit" className="update-button">Update Information</button>
            </form>
        </div>
    );
};