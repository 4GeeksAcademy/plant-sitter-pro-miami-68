import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const EnterNewPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const response = await fetch("/reset_password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token, new_password: newPassword }),
        });
        const data = await response.json();

        if (response.ok) {
            setSuccess(data.message);
            setTimeout(() => navigate('/login'), 3000);
        } else {
            setError(data.error);
        }
    };

    return (
        <div>
            <h1>Enter New Password</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <input 
                type="password" 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)} 
                placeholder="Enter your new password"
            />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};
