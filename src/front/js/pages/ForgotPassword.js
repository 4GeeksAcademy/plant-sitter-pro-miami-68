import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const response = await fetch("/forgot_password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });
        const data = await response.json();

        if (response.ok) {
            setMessage(data.message);
            setTimeout(() => navigate('/login'), 3000);
        } else {
            setError(data.error);
        }
    };

    return (
        <div>
            <h1>Forgot Password</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            {message && <div className="alert alert-success">{message}</div>}
            <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Enter your email"
            />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};
