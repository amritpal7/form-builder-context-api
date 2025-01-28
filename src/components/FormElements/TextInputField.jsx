import React from "react";

const TextInputField = ({ name, required }) => {
  return (
    <div>
      <label className="block mb-1 font-semibold">
        {name}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="text"
        className="w-full border rounded p-2"
        required={required}
      />
    </div>
  );
};

export default TextInputField;
