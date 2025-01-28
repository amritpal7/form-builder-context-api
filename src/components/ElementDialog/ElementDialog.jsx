import React, { useState, useRef, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
const ElementDialog = ({ element, onCancel, onSave }) => {
  const getOptionsInput =
    (element.type === "radio" ||
      element.type === "select" ||
      element.type === "checkbox") &&
    element.options;

  const [formState, setFormState] = useState({
    name: element.name || "",
    required: element.required || false,
    options:
      getOptionsInput ||
      (element.type === "radio" ||
      element.type === "select" ||
      element.type === "checkbox"
        ? [""]
        : null),
  });

  const nameInputRef = useRef(null);
  const optionRefs = useRef([]);

  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, []);

  const handleInputChange = (field, value) => {
    setFormState({ ...formState, [field]: value });
  };

  const handleAddOption = () => {
    if (formState.options) {
      const newOptions = [...formState.options, ""];
      setFormState({ ...formState, options: newOptions });

      setTimeout(() => {
        const lastOptionIndex = newOptions.length - 1;
        if (optionRefs.current[lastOptionIndex]) {
          optionRefs.current[lastOptionIndex].focus();
        }
      }, 0);
    }
  };

  const handleChangeOption = (index, value) => {
    if (formState.options) {
      const updatedOptions = [...formState.options];
      updatedOptions[index] = value;
      setFormState({ ...formState, options: updatedOptions });
    }
  };

  const handleSave = () => {
    if (!formState.name.trim()) {
      toast.error("Enter field name first!");
      return;
    }
    const updatedElement = { ...element, ...formState };
    onSave(updatedElement);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
      <div className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-6 rounded shadow-lg w-96">
        <h3 className="text-lg font-bold mb-4">
          Configure{" "}
          <span className="text-red-500 italic underline capitalize">
            {element.type}
          </span>{" "}
          element{": "}
        </h3>
        <div className="mb-4">
          <label className="block mb-1">Name:</label>
          <input
            type="text"
            ref={nameInputRef}
            value={formState.name}
            onChange={e => handleInputChange("name", e.target.value)}
            placeholder="Enter field name..."
            className="w-full p-2 border border-gray-300 dark:border-gray-700 dark:text-gray-900 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formState.required}
              onChange={e => handleInputChange("required", e.target.checked)}
              className="mr-2"
            />
            Required
          </label>
        </div>

        {formState.options && (
          <div className="mb-4">
            <label className="block mb-2">Options:</label>
            <div className="overflow-y-auto max-h-40">
              {formState.options.map((option, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    ref={el => (optionRefs.current[index] = el)}
                    value={option}
                    onChange={e => handleChangeOption(index, e.target.value)}
                    className="flex-grow p-2 border rounded mr-2 dark:text-gray-800"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setFormState(prevState => ({
                        ...prevState,
                        options: prevState.options.filter(
                          (_, i) => i !== index
                        ),
                      }))
                    }
                    className="px-2 py-1 bg-red-500 text-white rounded"
                  >
                    <FaTrash className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={handleAddOption}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Add Option
            </button>
          </div>
        )}
        <div className="flex justify-end space-x-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-500 dark:bg-green-700 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ElementDialog;
