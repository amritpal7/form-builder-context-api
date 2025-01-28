import React, { useEffect } from "react";
import TextInputField from "../FormElements/TextInputField";
import RadioInputField from "../FormElements/RadioInputField";
import SelectIpnutField from "../FormElements/SelectIpnutField";
import CheckboxInputField from "../FormElements/CheckboxInputField";
// FormElement handles rendering of individual form elements
const FormElement = ({ type, name, required, options }) => {
  switch (type) {
    case "text":
      return <TextInputField name={name} required={required} />;
    case "radio":
      return (
        <RadioInputField name={name} required={required} options={options} />
      );

    case "select":
      return (
        <SelectIpnutField name={name} required={required} options={options} />
      );

    case "checkbox":
      return (
        <CheckboxInputField name={name} required={required} options={options} />
      );
    default:
      return null;
  }
};

export default FormElement;
