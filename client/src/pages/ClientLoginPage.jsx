import { Link, useNavigate } from "react-router-dom";
import { AuthClientForm } from "../components";
import { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";

const ClientLoginPage = () => {
  const [signUp, setSignup] = useState(false);

  const navigate = useNavigate();

  const {
    authClientFormData,
    user,
    displayAlert,
    registerClient,
    loginClient,
  } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    const { firstName, lastName, email, password, company } =
      authClientFormData;

    if (signUp) {
      if (!firstName || !lastName || !email || !password || !company) {
        displayAlert();
      } else {
        const name = `${firstName} ${lastName}`;

        const newClient = {
          name,
          email,
          password,
          company,
        };

        registerClient(newClient);
      }
    } else {
      if (!email || !password) {
        displayAlert();
      } else {
        const client = {
          email,
          password,
        };

        loginClient(client);
      }
    }
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/client/dashboard");
      }, 3000);
    }
  }, [user]);

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
          </ul>
        </div>
        <AuthClientForm handleSubmit={handleSubmit} signUp={signUp} />
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

export default ClientLoginPage;
