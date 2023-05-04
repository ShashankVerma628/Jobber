import { Link, useNavigate } from "react-router-dom";
import { FormInput, FormButton } from "../components";
import { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const LoginPage = () => {
  const [signUp, setSignup] = useState(false);
  const [values, setValues] = useState(initialState);

  const navigate = useNavigate();

  const { displayAlert, registerCandidate, user, isLoggedIn, loginCandidate } =
    useAppContext();

  const handleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { firstName, lastName, email, password } = values;

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
      }, 4000);
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
                  name="firstName"
                  onInputChange={handleInputChange}
                  value={values?.firstName}
                />
                <FormInput
                  width="half"
                  labelText="Last Name"
                  name="lastName"
                  onInputChange={handleInputChange}
                  value={values?.lastName}
                />
              </div>
            )}
            <FormInput
              labelText="Email Address"
              name="email"
              type="email"
              onInputChange={handleInputChange}
              value={values?.email}
            />
            <FormInput
              type="password"
              labelText="Password"
              name="password"
              onInputChange={handleInputChange}
              value={values?.password}
            />
            <FormButton type="submit" text={signUp ? "Register" : "Login"} />
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

export default LoginPage;
