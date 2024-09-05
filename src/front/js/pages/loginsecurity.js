import React, { useState, useContext } from "react";
import { Context } from "./../store/appContext";
// import './../../styles/LoginSecurity.css';

const LoginSecurity = () => {
  const { actions } = useContext(Context);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Simple password validation
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match.");
      return;
    }

    const result = await actions.updatePassword(currentPassword, newPassword);
    if (result.success) {
      alert("Password updated successfully.");
    } else {
      alert(`Error: ${result.error}`);
    }
  };

  return (
    <div className="login-security">
      <h2>Login & Security</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Current Password:</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Confirm New Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update Password</button>
      </form>
    </div>
  );
};

export default LoginSecurity;
