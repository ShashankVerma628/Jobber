import { Link } from "react-router-dom";
import { FormButton, FormInput } from "../components";
import { useState } from "react";

const LoginClientPage = () => {
  const [signUp, setSignup] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleInputChange = () => {};
  return (
    <div className="page-wrapper wrapper">
      <div className="login-page-container">
        <div className="options-wrapper">
          <h3>Log In as</h3>
          <ul className="options-container">
            <li className="options active">
              <Link to="/client/login" className="options-link">
                Client
              </Link>
            </li>
            <li className="options">
              <Link to="/login" className="options-link">
                Candidate
              </Link>
            </li>
            <li className="options">
              <Link to="/admin/login" className="options-link">
                Admin
              </Link>
            </li>
          </ul>
        </div>
        <div className="login-form-wrapper">
          <form className="auth-form-container" onSubmit={handleSubmit}>
            {signUp && (
              <div className="name-container">
                <FormInput
                  width="half"
                  labelText="First Name"
                  name="fistName"
                  onInputChange={handleInputChange}
                />
                <FormInput
                  width="half"
                  labelText="Last Name"
                  name="lastName"
                  onInputChange={handleInputChange}
                />
              </div>
            )}
            <FormInput
              labelText="Email Address"
              name="email"
              type="email"
              onInputChange={handleInputChange}
            />
            <FormInput
              type="password"
              labelText="Password"
              name="password"
              onInputChange={handleInputChange}
            />
            <FormButton type="button" text={signUp ? "Register" : "Login"} />
          </form>
        </div>
        <div className="change-auth-container">
          <p>
            {signUp
              ? "Already have an account ?  "
              : "Don't have an account ?  "}
            <button
              className="change-auth-btn"
              onClick={() => setSignup((prev) => !prev)}
            >
              {signUp ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginClientPage;
