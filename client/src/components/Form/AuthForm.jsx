import FormInput from "./FormInput";
import FormButton from "./FormButton";
import Alert from "../Alert";

import { useAppContext } from "../../context/appContext";

const AuthForm = ({ handleSubmit, signUp }) => {
  const { authFormData, setAuthFormData } = useAppContext();

  const handleInputChange = (e) => {
    setAuthFormData({ ...authFormData, [e.target.name]: e.target.value });
  };
  return (
    <div className="form-wrapper">
      <Alert />
      <form className="form-container" onSubmit={handleSubmit}>
        {signUp && (
          <div className="name-container">
            <FormInput
              width="half"
              labelText="First Name"
              name="firstName"
              onInputChange={handleInputChange}
              value={authFormData?.firstName}
            />
            <FormInput
              width="half"
              labelText="Last Name"
              name="lastName"
              onInputChange={handleInputChange}
              value={authFormData?.lastName}
            />
          </div>
        )}
        <FormInput
          labelText="Email Address"
          name="email"
          type="email"
          onInputChange={handleInputChange}
          value={authFormData?.email}
        />
        <FormInput
          type="password"
          labelText="Password"
          name="password"
          onInputChange={handleInputChange}
          value={authFormData?.password}
        />
        <FormButton type="submit" text={signUp ? "Register" : "Login"} />
      </form>
    </div>
  );
};

export default AuthForm;
