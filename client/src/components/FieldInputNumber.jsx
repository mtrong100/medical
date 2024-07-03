import React from "react";
import { InputNumber } from "primereact/inputnumber";

const FieldInputNumber = ({ label, htmlFor, register, name, errorMessage }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor={htmlFor}>{label}</label>
      <InputNumber type="number" id={htmlFor} {...register(`${name}`)} />
      {errorMessage && <small className="text-red-500">{errorMessage}</small>}
    </div>
  );
};

export default FieldInputNumber;
