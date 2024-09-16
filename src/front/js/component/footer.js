import React, { Component } from "react";
import { useNavigate } from "react-router-dom";

export const Footer = () => {
	const navigate = useNavigate();
	return (
		<footer className="footer mt-4 py-3 text-center">
			<p>
				<button 
					className="contactLink"
					onClick={() => navigate("/contact-us")}
				>
					Contact Us  <i className="fa-brands fa-pagelines"></i>
				</button>
			</p>
		</footer>
	)
};
