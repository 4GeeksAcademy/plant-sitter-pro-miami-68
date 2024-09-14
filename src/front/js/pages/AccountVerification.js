import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export const AccountVerification = () => {
     const { token } = useParams();  // Get the token from the URL
//     const navigate = useNavigate();
//     const [message, setMessage] = useState("");
//     const [loading, setLoading] = useState(true);
//     const [verified, setVerified] = useState(false);

//     useEffect(() => {
//         const verifyAccount = async () => {
//             try {
//                 const response = await fetch(`${process.env.BACKEND_URL}/api/verify/${token}`);
//                 const result = await response.json();

//                 if (response.ok) {
//                     setVerified(true);
//                     setMessage("Your email has been verified successfully.");
//                     setTimeout(() => {
//                         navigate("/account");  // Redirect to account page after 5 seconds
//                     }, 5000);
//                 } else {
//                     setMessage(result.error || "There was a problem verifying your email.");
//                 }
//             } catch (error) {
//                 setMessage("An error occurred while verifying your email.");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         verifyAccount();
//     }, [token, navigate]);

    return (
        <div className="container text-center mt-5">
            {/* <h1>{loading ? "Verifying your email..." : message}</h1>
            {verified && (
                <>
                    <p>You will be redirected to your account shortly.</p>
                    <button className="btn btn-primary mt-4" onClick={() => navigate("/account")}>
                        Go to Account Page Now
                    </button>
                </>
            )} */}
            <h1> Authentication page </h1>
        </div>
    );
};
