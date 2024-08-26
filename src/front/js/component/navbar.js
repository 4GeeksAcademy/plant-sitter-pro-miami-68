import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo2 from "../../img/Logo2.png";

export const Navbar = () => {
	const navigate = useNavigate();
	return (
		<nav className="navbar navbar-light bg-white">
			<div className="container">
				<img className="logo" src={logo2}/>
				<h1 className="diphylleia-regular title">Plant Sitter Pro</h1>
				<div className="ml-auto">
					<div className="dropdown">
						<button className="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
							Start Here
						</button>
						<ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
							<li>
								<a 
									className="dropdown-item" 
									onClick={
                                        () => {
                                            navigate('/')
                                        }
                                    }
								>
									Home
								</a>
							</li>
							<li><a className="dropdown-item" href="#">How it Works</a></li>
							<li>
								<a 
									className="dropdown-item" 
									onClick={
                                        () => {
                                            navigate('/client-map')
                                        }
                                    }
								>
									Services
								</a>
							</li>
							<li>
								<a 
									className="dropdown-item" 
									onClick={
                                        () => {
                                            navigate('/provider-map')
                                        }
                                    }
								>
									For Providers
								</a>
							</li>
							<li><a className="dropdown-item" href="#">Blog/Resources</a></li>
							<li><a className="dropdown-item" href="#">Contact Us</a></li>
							<li><hr className="dropdown-divider" /></li>
							<li>
								<a 
									className="dropdown-item" 
									onClick={() => navigate('/login')}
								>
									Log In
								</a>
							</li>
							<li>
								<a 
									className="dropdown-item" 
									onClick={() => navigate('/SignUp')}
								>
									Sign Up
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</nav>
	);
};
