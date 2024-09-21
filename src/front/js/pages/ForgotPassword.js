import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Modal } from 'react-bootstrap'; // Make sure to install react-bootstrap
import "../../styles/forgotpassword.css"; // Link to your CSS file

export const ForgotPassword = () => {
	const { store } = useContext(Context);
	const [hasToken, setHasToken] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setErrMsg] = useState('');
	const [message, setMessage] = useState("");
	const [showModal, setShowModal] = useState(false);

	const navigate = useNavigate();
	const token = store.token;

	useEffect(() => {
		if (token) {
			setHasToken(true);
		}
	}, [token]);

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	function validateEmail(email) {
		return emailRegex.test(email);
	}

	const handleEmailChange = (event) => {
		const enteredEmail = event.target.value;
		setEmail(enteredEmail);
		if (validateEmail(enteredEmail)) {
			setErrMsg("");
		}
	};

	async function handleSubmit(event) {
		if (e.type === "keydown" && e.key !== "Enter") return;
		event.preventDefault();
		if (!hasToken) {
			// No token, this means the user is in the "Reset Password" stage
			if (!validateEmail(email)) {
				setErrMsg("Please enter a valid email.");
				return;
			}
			try {
				const response = await fetch(process.env.BACKEND_URL + "/api/forgot-password", {
					method: "POST",
					headers: { 'Content-Type': "application/json" },
					body: JSON.stringify({ email: email.toLowerCase() })
				});
				const data = await response.json();
				if (response.ok) {
					setMessage("An email has been sent to reset your password.");
					setShowModal(true);
					setTimeout(() => {
						setShowModal(false);
						navigate('/login');
					}, 5000);
				} else {
					setErrMsg(data.message || "Something went wrong.");
				}
			} catch (error) {
				setErrMsg(error.message);
			}
		} else {
			// Token exists, the user is in the "Change Password" stage
			if (password !== confirmPassword) {
				setErrMsg("Passwords do not match.");
				return;
			}
			try {
				const response = await fetch(`${process.env.BACKEND_URL}/api/change-password`, {
					method: "PUT",
					headers: {
						'Content-Type': "application/json",
						'Authorization': "Bearer " + sessionStorage.getItem("token")
					},
					body: JSON.stringify({
						password: password,
					})
				});
				const data = await response.json();
				if (response.ok) {
					alert("Password successfully changed.");
					navigate('/account-settings');
				} else {
					setErrMsg(data.message || "Something went wrong.");
				}
			} catch (error) {
				setErrMsg(error.message);
			}
		}
	}

	return (
		<>
			<form onSubmit={handleSubmit} className="forgot-password-container">
				<h2 className="forgot-password-header">{!hasToken ? "Reset Password" : "Change Password"}</h2>
				{!hasToken ? (
					<div className="forgot-password-form-group">
						<label htmlFor="email" className="forgot-password-label">Email</label>
						<input
							type="email"
							className="forgot-password-input"
							placeholder="Enter your email"
							onChange={handleEmailChange}
							required
						/>
					</div>
				) : (
					<>
						<div className="forgot-password-form-group">
							<label htmlFor="password" className="forgot-password-label">New Password</label>
							<input
								type="password"
								className="forgot-password-input"
								placeholder="New Password"
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</div>
						<div className="forgot-password-form-group">
							<label htmlFor="confirmPassword" className="forgot-password-label">Confirm New Password</label>
							<input
								type="password"
								className="forgot-password-input"
								placeholder="Confirm New Password"
								onChange={(e) => setConfirmPassword(e.target.value)}
								required
							/>
						</div>
					</>
				)}
				{error && <div className="forgot-password-error">{error}</div>}
				<div style={{ textAlign: 'center' }}>
					<button type="submit" className="forgot-password-button">Submit</button>
				</div>
			</form>

			<Modal show={showModal} onHide={() => setShowModal(false)}>
				<Modal.Header closeButton className="modal-header">
					<Modal.Title>Email Sent</Modal.Title>
				</Modal.Header>
				<Modal.Body className="modal-body">
					{message}
				</Modal.Body>
			</Modal>
		</>
	);
};
