import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; // For routing
import { Context } from "./../store/appContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import "../../styles/LoginSecurity.css"

const LoginSecurity = () => {
  const { actions } = useContext(Context);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle the state
  };

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
      navigate("/personal-info"); // Redirect to the profile page after success
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
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"} // Toggle input type
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye} // Toggle between icons
              className="toggle-password-icon"
              onClick={togglePasswordVisibility} // Click to toggle
              style={{ color: "rgb(70,108,70)", cursor: "pointer" }} // Green color for the icon
            />
          </div>
        </div>
        <div className="form-group">
          <label>New Password:</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"} // Toggle input type
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              className="toggle-password-icon"
              onClick={togglePasswordVisibility}
              style={{ color: "rgb(70,108,70)", cursor: "pointer" }} // Green color for the icon
            />
          </div>
        </div>
        <div className="form-group">
          <label>Confirm New Password:</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"} // Toggle input type
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              className="toggle-password-icon"
              onClick={togglePasswordVisibility}
              style={{ color: "rgb(70,108,70)", cursor: "pointer" }} // Green color for the icon
            />
          </div>
        </div>
        <button type="submit">Update Password</button>
      </form>
    </div>
  );
};

export default LoginSecurity;




// import React, { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom"; // For routing
// import { Context } from "./../store/appContext";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
// import "../../styles/LoginSecurity.css"

// const LoginSecurity = () => {
//   const { actions } = useContext(Context);
//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
  
//   const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  
//   const navigate = useNavigate(); // Initialize the useNavigate hook

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword); // Toggle the state
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Simple password validation
//     if (newPassword !== confirmPassword) {
//       alert("New passwords do not match.");
//       return;
//     }

//     const result = await actions.updatePassword(currentPassword, newPassword);
//     if (result.success) {
//       alert("Password updated successfully.");
//       navigate("/personal-info"); // Redirect to the profile page after success
//     } else {
//       alert(`Error: ${result.error}`);
//     }
//   };

//   return (
//     <div className="login-security">
//       <h2>Login & Security</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>Current Password:</label>
//           <div className="password-wrapper">
//             <input
//               type={showPassword ? "text" : "password"} // Toggle input type
//               value={currentPassword}
//               onChange={(e) => setCurrentPassword(e.target.value)}
//               required
//             />
//             <FontAwesomeIcon
//               icon={showPassword ? faEyeSlash : faEye} // Toggle between icons
//               style={{ color: "#000000", cursor: "pointer" }}
//               onClick={togglePasswordVisibility}
//             />
//           </div>
//         </div>
//         <div className="form-group">
//           <label>New Password:</label>
//           <div className="password-wrapper">
//             <input
//               type={showPassword ? "text" : "password"} // Toggle input type
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//               required
//             />
//             <FontAwesomeIcon
//               icon={showPassword ? faEyeSlash : faEye}
//               style={{ color: "#000000", cursor: "pointer" }}
//               onClick={togglePasswordVisibility}
//             />
//           </div>
//         </div>
//         <div className="form-group">
//           <label>Confirm New Password:</label>
//           <div className="password-wrapper">
//             <input
//               type={showPassword ? "text" : "password"} // Toggle input type
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               required
//             />
//             <FontAwesomeIcon
//               icon={showPassword ? faEyeSlash : faEye}
//               style={{ color: "#000000", cursor: "pointer" }}
//               onClick={togglePasswordVisibility}
//             />
//           </div>
//         </div>
//         <button type="submit">Update Password</button>
//       </form>
//     </div>
//   );
// };

// export default LoginSecurity;





// import React, { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom"; // Import useNavigate
// import { Context } from "./../store/appContext";
// import "../../styles/LoginSecurity.css"

// const LoginSecurity = () => {
//   const { actions } = useContext(Context);
//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
  
//   const navigate = useNavigate(); // Initialize the useNavigate hook

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Simple password validation
//     if (newPassword !== confirmPassword) {
//       alert("New passwords do not match.");
//       return;
//     }

//     const result = await actions.updatePassword(currentPassword, newPassword);
//     if (result.success) {
//       alert("Password updated successfully.");
//       navigate("/provider-profile-completed"); // Redirect to the profile page after success
//     } else {
//       alert(`Error: ${result.error}`);
//     }
//   };

//   return (
//     <div className="login-security">
//       <h2>Change Password</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>Current Password:</label>
//           <input
//             type="password"
//             value={currentPassword}
//             onChange={(e) => setCurrentPassword(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>New Password:</label>
//           <input
//             type="password"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Confirm New Password:</label>
//           <input
//             type="password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Update Password</button>
//       </form>
//     </div>
//   );
// };

// export default LoginSecurity;
