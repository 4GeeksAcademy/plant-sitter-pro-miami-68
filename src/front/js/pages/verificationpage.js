import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';
import "../../styles/verify.css"; // Assuming we will add styles here

export const VerifyEmail = () => {
    const { token } = useParams();
    const { actions } = React.useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        const verify = async () => {
            const response = await actions.verifyEmail(token);
            if (response.success) {
                alert('Email verified successfully!');
                navigate('/profile'); // Redirect to profile page after verification
            } else {
                alert(response.error);
                navigate('/login'); // Redirect to login in case of an error
            }
        };
        verify();
    }, [token, actions, navigate]);

    return (
        <div className="verify-email-container">
            <h1 className="verify-message">Verifying your email...</h1>
        </div>
    );
};
