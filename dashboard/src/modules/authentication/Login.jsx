import toast from "react-hot-toast";
import React from "react";
import FieldInput from "../../components/FieldInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { storeCurrentUser } from "../../redux/slices/userSlice";
import { loginSchema } from "../../validations/loginSchema";
import { loginApi } from "../../api/authApi";
import { Button } from "primereact/button";
import Image from "../../assets/images/slider_3.webp";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onchange",
    resolver: yupResolver(loginSchema),
    defaultValues: {
      password: "superadmin123@",
      email: "superadmin@gmail.com",
    },
  });

  const onLogin = async (values) => {
    try {
      const body = { ...values };

      const res = await loginApi(body);

      if (res) {
        dispatch(storeCurrentUser(res));
        toast.success("Đăng nhập thành công");
        navigate("/");
      }
    } catch (error) {
      console.log("Error: ", error.message);
      toast.error("Đăng nhập thất bại");
    }
  };

  return (
    <section className="min-h-screen flex">
      <div className="flex flex-1">
        <div className="w-1/2">
          <img
            src={Image}
            alt="banner-login"
            className="h-screen w-full object-cover"
          />
        </div>

        <div className="w-1/2 flex items-center justify-center p-8 bg-white">
          <form onSubmit={handleSubmit(onLogin)} className="w-full max-w-xl">
            <h1 className="text-3xl text-center font-bold text-gray-900 mb-10">
              Quản trị hệ thống phòng khám bệnh
            </h1>
            <div className="space-y-5">
              <FieldInput
                label="Email"
                type="email"
                name="email"
                htmlFor="email"
                register={register}
                errorMessage={errors?.email?.message}
                placeholder="Nhập email"
              />
              <FieldInput
                label="Mật khẩu"
                type="password"
                name="password"
                htmlFor="password"
                register={register}
                errorMessage={errors?.password?.message}
                placeholder="Nhập mật khẩu"
              />
              <Button
                className="w-full"
                type="submit"
                label="Xác nhận"
                disabled={isSubmitting}
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
