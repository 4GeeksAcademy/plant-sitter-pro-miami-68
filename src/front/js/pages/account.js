import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "./../store/appContext";
import './../../styles/AccountSettings.css';

const AccountSettings = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            actions.getUser().catch((error) => {
                console.error("Failed to get user data", error);
                navigate('/login');
            });
        }
    }, []);

    const handleDeleteAccount = async (e) => {
        if (e.type === "keydown" && e.key !== "Enter") return;
        e.preventDefault();
        if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            const result = await actions.deleteUser();
            if (result.success) {
                alert("Your account has been deleted successfully.");
                navigate('/login');
            } else {
                alert(`Error: ${result.error}`);
            }
        }
    };

    return (
        <div className="account-settings">
            {store.user ? (
                <>
                    <header className="account-header">
                        <h2>{store.user.first_name} {store.user.last_name}</h2>
                        <p>{store.user.email}</p>
                    </header>
                    <div className="settings-grid">
                        {settingsOptions.map((option, index) => (
                            <Link to={option.link} className="settings-card" key={index}>
                                <h3>{option.title}</h3>
                                <p>{option.description}</p>
                            </Link>
                        ))}
                    </div>
                    <footer className="account-footer">
                        <p>Need to delete your account? <a href="#" onClick={handleDeleteAccount} className="delete-account-link">Take care of that now</a></p>
                    </footer>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

const settingsOptions = [
    { title: 'Personal info', description: 'Provide personal details and how we can reach you', link: '/personal-info' },
    { title: 'Login & Security', description: 'Update your password and secure your account', link: '/login-security' },
    { title: 'Payment History', description: 'Review your payments and update your payment method', link: '/payments-payouts' },
    { title: 'Plant Sitters - See Your Jobs', description: "See upcoming jobs, past jobs, and jobs you've applied to", link: '/provider-profile' },
    { title: 'Plant Owners - See Your Job Posts', description: 'See past and present jobs post', link: '/job-posts' },
    { title: 'Manage Subscription', description: 'Cancel, Renew, or Update Your Subscription Here', link: '/cancel' }
];

export default AccountSettings;