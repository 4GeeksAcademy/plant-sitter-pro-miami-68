import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";

import { Context } from "../store/appContext";

export const AccountVerification = () => {
    let [searchParams,] = useSearchParams();  // Get the token from the URL
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [verified, setVerified] = useState(false);

    const {store, actions} = useContext(Context)
    useEffect(() => {
        const verifyAccount = async () => {
            try {
                const token = searchParams.get("token")
                const response = await fetch(`${process.env.BACKEND_URL}/api/verify?token=${token}`,{
                    headers:{
                        "Content-Type":"application/json"
                    }
                });
                const result = await response.json();
                console.log(response,result,token)

                if (response.ok) {
                    setVerified(true);
                    setMessage("Your email has been verified successfully.");
                    actions.logToken(token)
                    setTimeout(() => {
                        navigate("/account-settings");  // Redirect to account page after 5 seconds
                    }, 5000);
                } else {
                    setMessage(result.error || "There was a problem verifying your email.");
                }
            } catch (error) {
                setMessage(`An error occurred while verifying your email.${error}`);
            } finally {
                setLoading(false);
            }
        };


        verifyAccount();
    }, []);

    return (
        <div className="container text-center mt-5">
            <h1>{loading ? "Verifying your email..." : message}</h1>
            {verified && (
                <>
                    <p>You will be redirected to your account shortly.</p>
                    <button className="btn btn-primary mt-4" onClick={() => navigate("/account-settings")}>
                        Go to Account Page Now
                    </button>
                </>
            )}
            {/* <h1> Authentication page </h1> */}
        </div>
    );
};
