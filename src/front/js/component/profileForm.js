import React, { useState, useEffect } from 'react';
import axios from 'axios';
import backendURL from './backendURL';
import './profile.css';

function ProfileForm({ userId }) {
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        plant_types: [],
        allow_caretaker: false,
        address: '',
        location: ''
    });

    useEffect(() => {
        if (userId) {
            axios.get(`${backendURL}/api/profile/${userId}`)
                .then(response => setProfile(response.data))
                .catch(error => console.error(error));
        }
    }, [userId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleToggleChange = (e) => {
        setProfile({ ...profile, allow_caretaker: e.target.checked });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const apiMethod = userId ? axios.put : axios.post;
        const apiUrl = userId ? `${backendURL}/api/profile/${userId}` : `${backendURL}/api/profile`;
        
        apiMethod(apiUrl, profile)
            .then(response => alert('Profile saved successfully'))
            .catch(error => console.error(error));
    };

    return (
        <form className="profile-form" onSubmit={handleSubmit}>
            <label>
                Name:
                <input 
                    type="text" 
                    name="name" 
                    value={profile.name} 
                    onChange={handleInputChange} 
                    required 
                />
            </label>
            <label>
                Email:
                <input 
                    type="email" 
                    name="email" 
                    value={profile.email} 
                    onChange={handleInputChange} 
                    required 
                />
            </label>
            <label>
                Plant Types:
                <select 
                    name="plant_types" 
                    multiple 
                    value={profile.plant_types} 
                    onChange={handleInputChange}
                >
                    <option value="succulent">Succulent</option>
                    <option value="flower">Flower</option>
                    <option value="tree">Tree</option>
                    <option value="herb">Herb</option>
                </select>
            </label>
            <label>
                Allow Caretaker:
                <input 
                    type="checkbox" 
                    name="allow_caretaker" 
                    checked={profile.allow_caretaker} 
                    onChange={handleToggleChange} 
                />
            </label>
            <label>
                Address:
                <input 
                    type="text" 
                    name="address" 
                    value={profile.address} 
                    onChange={handleInputChange} 
                    required 
                />
            </label>
            {/* A map component or dropdown could be added here */}
            <button type="submit">Save Profile</button>
        </form>
    );
}

export default ProfileForm;
