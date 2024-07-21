import toast from "react-hot-toast";
import React from "react";
import FieldInput from "../../components/FieldInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { userLoginSchema } from "../../validations/userSchema";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Toast } from "primereact/toast";
import { storeCurrentUser } from "../../redux/slices/userSlice";
import { loginApi } from "../../api/authApi";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "primereact/button";

const Login = () => {
  const navigate = useNavigate();
  const disppatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onchange",
    resolver: yupResolver(userLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onLogin = async (values) => {
    try {
      const body = { ...values };

      const res = await loginApi(body);

      if (res) {
        disppatch(storeCurrentUser(res));
        toast.success("Đăng nhập thành công");
        navigate("/");
      }
    } catch (error) {
      console.log("Lỗi đăng nhập:", error);
      toast.error(error?.response?.data?.message);
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
          <form onSubmit={handleSubmit(onLogin)} className="w-full max-w-xl">
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
