import toast from "react-hot-toast";
import React from "react";
import Image from "../../assets/images/image1.jpg";
import FieldInput from "../../components/FieldInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { resetPasswordSchema } from "../../validations/resetPasswordSchema";
import { resetPasswordApi, sendOtpApi } from "../../api/authApi";
import { Button } from "primereact/button";

const ResetPassword = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    trigger,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: "onchange",
    resolver: yupResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      otp: "",
    },
  });

  const onSendOtp = async () => {
    try {
      await trigger("email");
      const email = getValues("email");
      if (!email) return;
      const res = await sendOtpApi({ email });
      if (res) toast.success("Mã OTP đã được gửi qua email của bạn");
    } catch (error) {
      toast.error("Lỗi");
      console.log("Lỗi: ", error);
    }
  };

  const onResetPassword = async (values) => {
    try {
      const body = { ...values };

      const res = await resetPasswordApi(body);

      if (res) {
        toast.success("Đặt lại mật khẩu thành công");
        navigate("/login");
      }
    } catch (error) {
      toast.error("Lỗi");
      console.log("Lỗi: ", error);
    } finally {
      reset();
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
          <form
            onSubmit={handleSubmit(onResetPassword)}
            className="w-full max-w-xl"
          >
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Đặt lại mật khẩu
            </h1>

            <div className="space-y-5 mt-5">
              <FieldInput
                label="Mật khẩu"
                type="password"
                name="password"
                htmlFor="password"
                register={register}
                errorMessage={errors?.password?.message}
                placeholder="Nhập mật khẩu"
              />
              <FieldInput
                label="Xác nhận mật khẩu"
                type="password"
                name="confirmPassword"
                htmlFor="confirmPassword"
                register={register}
                errorMessage={errors?.confirmPassword?.message}
                placeholder="Xác nhận mật khẩu"
              />
              <FieldInput
                label="Email"
                type="email"
                name="email"
                htmlFor="email"
                register={register}
                errorMessage={errors?.email?.message}
                placeholder="Nhập email"
              />
              <Button
                className="w-full"
                type="button"
                severity="help"
                label="Gửi mã OTP qua email"
                onClick={onSendOtp}
              />
              <FieldInput
                label="Mã OTP"
                type="number"
                name="otp"
                htmlFor="otp"
                register={register}
                errorMessage={errors?.otp?.message}
                placeholder="Nhập mã OTP"
              />
              <Button
                className="w-full"
                type="submit"
                label="Xác nhận đặt lại mật khẩu"
                disabled={isSubmitting}
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
