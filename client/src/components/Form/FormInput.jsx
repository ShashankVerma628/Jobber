const FormInput = ({
  width,
  labelText,
  name,
  type,
  onInputChange,
  placeholderText,
  value,
  disabled,
}) => {
  return (
    <div className={`form-input-container ${width || "full"}`}>
      <label htmlFor={name}>{labelText}</label>
      <input
        className={`${disabled ? "form-input disabled" : "form-input"}`}
        type={type || "text"}
        name={name}
        id={name}
        placeholder={placeholderText || labelText}
        onChange={onInputChange}
        value={value}
        disabled={disabled || false}
      />
    </div>
  );
};

export default FormInput;
