import React from "react";
import { Link } from "react-router-dom";
import logo2 from "../../img/Logo2.png";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-white">
			<div className="container">
				<img className="logo" src={logo2}/>
				<h1 className="diphylleia-regular title">Plant Sitter Pro</h1>
				<div className="ml-auto">
					<Link to="#">
						<button className="btn btn-success">Start Here</button>
					</Link>
					{/* <Link to="/demo">
						<button className="btn btn-primary">Check the Context in action</button>
					</Link> */}
				</div>
			</div>
		</nav>
	);
};
