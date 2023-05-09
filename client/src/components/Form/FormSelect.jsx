import React from "react";

const FormSelect = ({ label, name, value, options, onChange }) => {
  return (
    <label>
      {label}
      <select value={value} onChange={onChange}>
        {options.map((option) => (
          <option value={option?.value}>{option?.value}</option>
        ))}
      </select>
    </label>
  );
};

export default FormSelect;
