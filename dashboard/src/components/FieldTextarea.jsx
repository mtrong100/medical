import React from "react";
import { InputTextarea } from "primereact/inputtextarea";

const FieldInput = ({ label, htmlFor, register, name, errorMessage, type }) => {
  return (
    <div className="flex flex-column gap-2">
      <label htmlFor={htmlFor}>{label}</label>
      <InputTextarea type={type} id={htmlFor} {...register(`${name}`)} />
      {errorMessage && <small className="text-red-500">{errorMessage}</small>}
    </div>
  );
};

export default FieldInput;
