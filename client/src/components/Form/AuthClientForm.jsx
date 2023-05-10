import { useState } from "react";

import FormInput from "./FormInput";
import FormButton from "./FormButton";
import Alert from "../Alert";

import { useAppContext } from "../../context/appContext";

const AuthClientForm = ({ handleSubmit, signUp }) => {
  const { authClientFormData, setAuthClientFormData } = useAppContext();

  const handleInputChange = (e) => {
    setAuthClientFormData({
      ...authClientFormData,
      [e.target.name]: e.target.value,
    });
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
              value={authClientFormData?.firstName}
            />
            <FormInput
              width="half"
              labelText="Last Name"
              name="lastName"
              onInputChange={handleInputChange}
              value={authClientFormData?.lastName}
            />
          </div>
        )}
        <FormInput
          labelText="Email Address"
          name="email"
          type="email"
          onInputChange={handleInputChange}
          value={authClientFormData?.email}
        />
        <FormInput
          type="password"
          labelText="Password"
          name="password"
          onInputChange={handleInputChange}
          value={authClientFormData?.password}
        />
        {signUp && (
          <FormInput
            labelText="Company Name"
            name="company"
            type="company"
            onInputChange={handleInputChange}
            value={authClientFormData?.company}
          />
        )}
        <FormButton type="submit" text={signUp ? "Register" : "Login"} />
      </form>
    </div>
  );
};

export default AuthClientForm;
