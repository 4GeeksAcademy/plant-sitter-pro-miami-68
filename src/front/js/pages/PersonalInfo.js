import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
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
                    <input type="text" name="state" value={formData.state} onChange={handleChange} />
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