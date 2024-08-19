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
					{/* <Link to="#">
						<button className="btn btn-success">Start Here</button>
					</Link> */}

					<div class="dropdown">
						<button class="btn btn-success dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
							Start Here
						</button>
						<ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
							<li><a class="dropdown-item" href="#">Home</a></li>
							<li><a class="dropdown-item" href="#">How it Works</a></li>
							<li><a class="dropdown-item" href="#">Services</a></li>
							<li><a class="dropdown-item" href="#">For Providers</a></li>
							<li><a class="dropdown-item" href="#">Blog/Resources</a></li>
							<li><a class="dropdown-item" href="#">Contact Us</a></li>
						</ul>
					</div>


					{/* <Link to="/demo">
						<button className="btn btn-primary">Check the Context in action</button>
					</Link> */}
				</div>
			</div>
		</nav>
	);
};
