const FormInput = ({ width, labelText, name, type, onInputChange, value }) => {
  return (
    <div className={`form-input-container ${width || "full"}`}>
      <label htmlFor={name}>{labelText}</label>
      <input
        className="form-input"
        type={type || "text"}
        name={name}
        id={name}
        placeholder={labelText}
        onChange={onInputChange}
        value={value}
      />
    </div>
  );
};

export default FormInput;
