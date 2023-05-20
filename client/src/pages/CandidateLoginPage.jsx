import { Link, useNavigate } from "react-router-dom";
import { AuthForm } from "../components";
import { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";

const LoginPage = () => {
  const [signUp, setSignup] = useState(false);

  const navigate = useNavigate();

  const {
    displayAlert,
    registerCandidate,
    user,
    authFormData,
    loginCandidate,
  } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    const { firstName, lastName, email, password } = authFormData;

    if (signUp) {
      if (!firstName || !lastName || !email || !password) {
        displayAlert();
      } else {
        const name = `${firstName} ${lastName}`;

        const newCandidate = {
          name,
          email,
          password,
        };

        registerCandidate(newCandidate);
      }
    } else {
      if (!email || !password) {
        displayAlert();
      } else {
        const candidate = {
          email,
          password,
        };

        loginCandidate(candidate);
      }
    }
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    }
  }, [user]);

  return (
    <div className="page-wrapper wrapper">
      <div className="login-page-container">
        <div className="options-wrapper">
          <h3>Log In as</h3>
          <ul className="options-container">
            <li className="options">
              <Link to="/client/login" className="options-link">
                Client
              </Link>
            </li>
            <li className="options active">
              <Link to="/login" className="options-link">
                Candidate
              </Link>
            </li>
          </ul>
        </div>
        <AuthForm handleSubmit={handleSubmit} signUp={signUp} />
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

export default LoginPage;
