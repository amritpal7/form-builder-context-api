import React, { useState, createContext } from "react";

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formElements, setFormElements] = useState([]);

  const addFormElement = curr_formElement => {
    setFormElements(prevFormElements => [
      ...prevFormElements,
      curr_formElement,
    ]);
  };

  return (
    <FormContext.Provider value={{ formElements, addFormElement }}>
      {children}
    </FormContext.Provider>
  );
};

export default FormContext;
