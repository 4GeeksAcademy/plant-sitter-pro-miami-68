import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import "../../styles/enternewpassword.css"

export const EnterNewPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (e.type === "keydown" && e.key !== "Enter") return
        if (newPassword === confirmNewPassword) {
            const response = await fetch(`${process.env.BACKEND_URL}/api/reset_password`, {
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

        } else {
            alert("Passwords do not match!");
        }
    };

    return (
        <div>
            <div className="new-password-container">
                <h1 className="new-password-header">Enter New Password</h1>
                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}
                <input
                    type="password"
                    className="new-password-input"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter your new password"
                />
                <input
                    type="password"
                    className="new-password-input"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    placeholder="Confirm New Password"
                />
                <button className="new-password-button" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
};
