import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../validations/loginSchema";
import FieldInput from "../components/FieldInput";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { loginApi } from "../api/userApi";
import { useDispatch } from "react-redux";
import { storeCurrentUser } from "../redux/slices/userSlice";

const Login = () => {
  const toast = useRef(null);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onchange",
    resolver: yupResolver(loginSchema),
    defaultValues: {
      password: "",
      email: "",
    },
  });

  const handleLogin = async (values) => {
    try {
      const body = { ...values };

      const res = await loginApi(body);

      dispatch(storeCurrentUser(res));

      toast.current.show({
        severity: "success",
        summary: "Đăng nhập thành công",
        life: 1500,
      });
    } catch (error) {
      console.log("Error: ", error.message);
      toast.current.show({
        severity: "error",
        summary: "Lỗi",
        life: 1500,
      });
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-sm p-10 max-w-xl w-full">
      <h1 className="font-bold text-4xl text-center">
        Medical Dashboard Login
      </h1>
      <Toast ref={toast} />
      <form onSubmit={handleSubmit(handleLogin)} className="mt-6 space-y-5">
        <FieldInput
          label="Email"
          type="email"
          name="email"
          htmlFor="email"
          register={register}
          errorMessage={errors?.email?.message}
        />
        <FieldInput
          label="Mật khẩu"
          type="password"
          name="password"
          htmlFor="password"
          register={register}
          errorMessage={errors?.password?.message}
        />
        <Button
          type="submit"
          label="Đăng nhập"
          className="w-full"
          disabled={isSubmitting}
        />
      </form>
    </div>
  );
};

export default Login;
