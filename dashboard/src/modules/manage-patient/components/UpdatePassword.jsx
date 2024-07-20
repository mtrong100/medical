import toast from "react-hot-toast";
import React from "react";
import FieldInput from "../../../components/FieldInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { updatePatientPasswordSchema } from "../../../validations/patientSchema";
import { updatePatientApi } from "../../../api/patientApi";
import { Button } from "primereact/button";

const UpdatePassword = (id) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onchange",
    resolver: yupResolver(updatePatientPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onUpdatePassword = async (values) => {
    try {
      const body = { ...values };

      const res = await updatePatientApi(id, body);

      if (res) toast.success("Cập nhật mật khẩu hoàn tất");
    } catch (error) {
      console.log("Lỗi cập nhật mật khẩu: ", error);
      toast.error("Lỗi mật khẩu");
    } finally {
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onUpdatePassword)} className="space-y-8">
      <div className="grid grid-cols-2 gap-5">
        <FieldInput
          label="Mật khẩu mới"
          type="password"
          name="password"
          htmlFor="password"
          register={register}
          errorMessage={errors?.password?.message}
        />
        <FieldInput
          label="Xác nhận mật khẩu"
          type="password"
          name="confirmPassword"
          htmlFor="confirmPassword"
          register={register}
          errorMessage={errors?.confirmPassword?.message}
        />
      </div>

      <div className="flex items-center justify-end gap-3">
        <Button
          type="button"
          onClick={() => navigate("/patient")}
          label="Quay về"
          severity="secondary"
        />
        <Button type="submit" label="Xác nhận" disabled={isSubmitting} />
      </div>
    </form>
  );
};

export default UpdatePassword;
