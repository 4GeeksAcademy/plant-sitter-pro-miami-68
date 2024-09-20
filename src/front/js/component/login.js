import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    const response = await actions.login(email, password);
    if (response.success) {
      navigate("/account-settings");
    } else {
      setError(response.error);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-lg-6 bg-indigo">
        <h1 className="fw-normal mt-5 diphylleia-regular jobs">
          Log in to your account
        </h1>
        <p className="text-center mt-2 mb-5">
          Don't have an account?{" "}
          <a href="/signup">
            <u>Sign up</u>
          </a>
        </p>
        <div className="mb-2">
          <div data-mdb-input-init className="form-outline form-white">
            <input
              type="text"
              id="email"
              className="form-control form-control-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="form-label" htmlFor="email">
              Email
            </label>
          </div>
        </div>

        <div className="mb-2">
          <div data-mdb-input-init className="form-outline form-white">
            <input
              type="password"
              id="password"
              className="form-control form-control-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="form-label" htmlFor="password">
              Password
            </label>
          </div>
        </div>

        <div className="form-check d-flex justify-content-start mb-2 pb-3">
          <input
            className="form-check-input me-3"
            type="checkbox"
            value=""
            id="rememberMe"
          />
          <label className="form-check-label" htmlFor="rememberMe">
            Remember me
          </label>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="d-flex justify-content-center">
          <button
            type="button"
            className="btn btn-success mb-3 col-5 rounded-pill"
            onClick={handleLogin}
          >
            Log In
          </button>
        </div>
        <div className="text-center">
          <p>
            <a href="/forgot-password">
              <u>Forgot Password?</u>
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
