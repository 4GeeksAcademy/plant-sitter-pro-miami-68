import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap'; // Make sure to install react-bootstrap

export const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
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
            setShowModal(true);
            setTimeout(() => {
                setShowModal(false);
                navigate('/login');
            }, 5000);
        } else {
            setError(data.error);
        }
    };

    return (
        <div>
            <h1>Forgot Password</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Enter your email"
            />
            <button onClick={handleSubmit}>Submit</button>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Email Sent</Modal.Title>
                </Modal.Header>
                <Modal.Body>You will receive an email if your email address is associated with your account. Check your email for the link.</Modal.Body>
            </Modal>
        </div>
    );
};
