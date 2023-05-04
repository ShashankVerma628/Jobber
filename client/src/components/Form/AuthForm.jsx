import FormInput from "./FormInput";
import FormButton from "./FormButton";

const AuthForm = ({ handleSubmit, handleInputChange }) => {
  return (
    <form className="auth-form-container" onSubmit={handleSubmit}>
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
      <FormButton type="button" text="Login" />
    </form>
  );
};

export default AuthForm;
