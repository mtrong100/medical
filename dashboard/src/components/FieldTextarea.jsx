import React from "react";
import { InputTextarea } from "primereact/inputtextarea";

const FieldTextarea = ({
  label,
  htmlFor,
  register,
  name,
  errorMessage,
  type,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor}>{label}</label>
      <InputTextarea
        rows={4}
        cols={30}
        type={type}
        id={htmlFor}
        {...register(`${name}`)}
      />
      {errorMessage && <small className="text-red-500">{errorMessage}</small>}
    </div>
  );
};

export default FieldTextarea;
