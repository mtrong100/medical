import React from "react";
import { InputText } from "primereact/inputtext";

const FieldInput = ({
  label,
  htmlFor,
  register,
  name,
  errorMessage,
  type,
  placeholder,
}) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor={htmlFor}>{label}</label>
      <InputText
        type={type}
        id={htmlFor}
        {...register(`${name}`)}
        placeholder={placeholder}
      />
      {errorMessage && <small className="text-red-500">{errorMessage}</small>}
    </div>
  );
};

export default FieldInput;
