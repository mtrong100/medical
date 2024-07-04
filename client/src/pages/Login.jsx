import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginPatientSchema } from "../validations/patientSchema";
import FieldInput from "../components/FieldInput";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { storeCurrentUser } from "../redux/slices/userSlice";
import { loginApi } from "../api/authApi";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onchange",
    resolver: yupResolver(loginPatientSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const toast = useRef(null);
  const navigate = useNavigate();
  const disppatch = useDispatch();

  const handleLogin = async (values) => {
    try {
      const body = { ...values };

      const res = await loginApi(body);

      if (res) {
        disppatch(storeCurrentUser(res));

        toast.current.show({
          severity: "success",
          summary: "Đăng nhập thành công",
          life: 1500,
        });

        navigate("/");
      }
    } catch (error) {
      console.log("Error: ", error.message);
      toast.current.show({
        severity: "error",
        summary: "Lỗi",
        life: 1500,
      });
    } finally {
      reset();
    }
  };

  return (
    <section className="min-h-screen flex">
      <div className="flex flex-1">
        <div className="w-1/2">
          <img
            src="https://www.yudaah.com/demo/free-clinic-website-template/assets/images/slider/slider_3.jpg"
            alt="banner-login"
            className="h-screen w-full object-cover"
          />
        </div>

        <Toast ref={toast} />

        <div className="w-1/2 flex items-center justify-center p-8 bg-white">
          <form
            onSubmit={handleSubmit(handleLogin)}
            className="w-full max-w-xl"
          >
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Đăng nhập</h1>
            <div className="space-y-5">
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
                className="w-full"
                type="submit"
                label="Xác nhận"
                disabled={isSubmitting}
              />
            </div>
            <div className="flex items-center gap-2 mt-5">
              <p>
                Chưa có tài khoản ?{" "}
                <Link
                  className="text-blue-700 hover:underline font-medium"
                  to="/register"
                >
                  Đăng kí
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
