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
            {/* <style>{`
                .new-password-container {
                    width: 100%;
                    max-width: 500px;
                    margin: 50px auto;
                    padding: 30px;
                    background-color: white;
                    border-radius: 10px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    border: 1px solid #e0e0e0;
                    text-align: center;
                }
                .new-password-header {
                    margin-bottom: 20px;
                    font-size: 24px;
                    color: #4A7C59;
                    text-align: center;
                }
                .new-password-input {
                    width: 100%;
                    padding: 10px;
                    margin-bottom: 20px;
                    border-radius: 5px;
                    border: 1px solid #ccc;
                    font-size: 16px;
                    box-sizing: border-box;
                    transition: border-color 0.3s ease;
                }
                .new-password-input:focus {
                    border-color: #4A7C59;
                    outline: none;
                }
                .new-password-button {
                    background-color: #4A7C59;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    font-size: 16px;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                    width: 100%;
                    padding: 10px;
                    text-align: center;
                }
                .new-password-button:hover {
                    background-color: #3c684d;
                }
                .alert-success {
                    color: #155724;
                    background-color: #d4edda;
                    border-color: #c3e6cb;
                    padding: 10px;
                    margin-bottom: 20px;
                    border-radius: 5px;
                    font-size: 14px;
                }
                .alert-danger {
                    color: #721c24;
                    background-color: #f8d7da;
                    border-color: #f5c6cb;
                    padding: 10px;
                    margin-bottom: 20px;
                    border-radius: 5px;
                    font-size: 14px;
                }
            `}</style> */}

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
