import React from "react";

const SelectIpnutField = ({ name, required, options }) => {
  return (
    <div>
      <label className="block mb-1 font-semibold">
        {name}
        {required && <span className="text-red-500">*</span>}
      </label>
      <select
        className="w-full border rounded p-2 dark:text-gray-800"
        required={required}
      >
        <option value="">Select an option</option>
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectIpnutField;
