import React from "react";

const CheckboxInputField = ({ name, required, options }) => {
  return (
    <div>
      <label className="block mb-1 font-semibold">
        {name}
        {required && <span className="text-red-500">*</span>}
      </label>
      <div className="space-y-1">
        {options.map((option, i) => (
          <label key={i} className="block">
            <input
              type="checkbox"
              name={name}
              value={option}
              className="mr-2"
              required={required}
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
};

export default CheckboxInputField;
