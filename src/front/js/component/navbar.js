import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import logo2 from "../../img/Logo2.png";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const token = store.token;

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleLogout = () => {
    actions.logout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-light bg-white">
      <div className="container navbar-banner">
        <img
          className="logo"
          src={logo2}
          alt="Logo"
          onClick={handleLogoClick}
          style={{ cursor: "pointer" }}
        />
        {/* <h1 className="diphylleia-regular title">Plant Sitter Pro</h1> */}
        <div className="ml-auto">
          <div className="dropdown">
            <button
              className="btn dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Start Here
            </button>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="dropdownMenuButton1"
            >
              <li>
                <a className="dropdown-item"
                  href="#"
                  onClick={() => navigate("/")}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => navigate("/how-it-works")}
                >
                  How it Works
                </a>
              </li>
              {/* <li>
                <a
                  className="dropdown-item"
                  onClick={() => navigate("/client-map")}
                >
                  Hire a Plant Sitter
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  onClick={() => navigate("/provider-map")}
                >
                  Become a Plant Sitter
                </a>
              </li> */}
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => navigate("/blog")}
                >
                  Blog/Resources
                </a>
              </li>
              <li>
                <a className="dropdown-item"
                  href="#"
                  onClick={() => navigate("/contact-us")}
                >
                  Contact Us
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              {token ? (
                <>
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() => navigate("/account-settings")}
                    >
                      Account
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item"
                      href="#"
                      onClick={handleLogout}
                    >
                      Log Out
                    </a>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <a
                      className="dropdown-item"
                      onClick={() => navigate("/login")}
                    >
                      Log In
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      onClick={() => navigate("/signup")}
                    >
                      Sign Up
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
