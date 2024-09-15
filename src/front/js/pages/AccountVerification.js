import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext"; // Import the flux context

export const AccountVerification = () => {
    const { token } = useParams();  // Get the token from the URL
    const navigate = useNavigate();
    const { actions } = React.useContext(Context);  // Use the flux actions
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [verified, setVerified] = useState(false);

    useEffect(() => {
        const verifyAccount = async () => {
            const result = await actions.verifyUser(token); // Call the verify action
            if (result.success) {
                setVerified(true);
                setMessage("Your email has been verified successfully.");
                setTimeout(() => {
                    navigate("/account");  // Redirect to account page after 5 seconds
                }, 5000);
            } else {
                setMessage(result.error || "There was a problem verifying your email.");
            }
            setLoading(false);
        };

        verifyAccount();
    }, [token, navigate, actions]);

    return (
        <div className="container text-center mt-5">
            <h1>{loading ? "Verifying your email..." : message}</h1>
            {verified && (
                <>
                    <p>You will be redirected to your account shortly.</p>
                    <button className="btn btn-primary mt-4" onClick={() => navigate("/account")}>
                        Go to Account Page Now
                    </button>
                </>
            )}
        </div>
    );
};
