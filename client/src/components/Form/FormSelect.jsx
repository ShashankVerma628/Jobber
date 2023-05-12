const FormSelect = ({ label, name, value, options, onChange }) => {
  return (
    <label className="form-select">
      {label}
      <select name={name} value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option?.id} value={option?.value}>
            {option?.value}
          </option>
        ))}
      </select>
    </label>
  );
};

export default FormSelect;
