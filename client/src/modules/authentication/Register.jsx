import toast from "react-hot-toast";
import React, { useState } from "react";
import FieldInput from "../../components/FieldInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchema } from "../../validations/userSchema";
import { useForm } from "react-hook-form";
import { registerApi } from "../../api/authApi";
import { Link, useNavigate } from "react-router-dom";
import { genders } from "../../utils/constants";
import { formatDate } from "../../utils/helper";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";

const Register = () => {
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState({
    gender: null,
    dateOfBirth: null,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onchange",
    resolver: yupResolver(userSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      email: "",
      address: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onRegister = async (values) => {
    const { dateOfBirth, gender } = selectedValue;

    if (!dateOfBirth || !gender) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }

    try {
      const body = {
        ...values,
        gender,
        dateOfBirth: formatDate(dateOfBirth),
      };

      const res = await registerApi(body);

      if (res) {
        toast.success("Đăng kí tài khoản thành công");
        navigate("/login");
      }
    } catch (error) {
      console.log("Lỗi đăng kí:", error);
      toast.error(error?.response?.data?.message);
    } finally {
      reset();
      setSelectedValue({
        gender: null,
        dateOfBirth: null,
      });
    }
  };

  return (
    <section className="min-h-screen flex">
      <div className="flex flex-1">
        <div className="w-1/2">
          <img
            src="https://www.yudaah.com/demo/free-clinic-website-template/assets/images/why.jpg"
            alt="banner-login"
            className="h-screen w-full object-cover"
          />
        </div>

        <div className="w-1/2 flex items-center justify-center p-8 bg-white">
          <form
            onSubmit={handleSubmit(onRegister)}
            className="w-full max-w-3xl"
          >
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Đăng kí tài khoản
            </h1>
            <div className="grid grid-cols-2 gap-5">
              <FieldInput
                label="Tên"
                type="text"
                name="name"
                htmlFor="name"
                register={register}
                errorMessage={errors?.name?.message}
              />

              <FieldInput
                label="Số điện thoại"
                type="text"
                name="phoneNumber"
                htmlFor="phoneNumber"
                register={register}
                errorMessage={errors?.phoneNumber?.message}
              />

              <FieldInput
                label="Địa chỉ"
                type="text"
                name="address"
                htmlFor="address"
                register={register}
                errorMessage={errors?.address?.message}
              />

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

              <FieldInput
                label="Xác nhận mật khẩu"
                type="password"
                name="confirmPassword"
                htmlFor="confirmPassword"
                register={register}
                errorMessage={errors?.confirmPassword?.message}
              />

              <div className="flex flex-col gap-2">
                <label>Ngày sinh</label>
                <Calendar
                  showIcon
                  value={selectedValue.dateOfBirth}
                  onChange={(e) =>
                    setSelectedValue((prev) => ({
                      ...prev,
                      dateOfBirth: e.value,
                    }))
                  }
                />
              </div>

              <div className="flex flex-col gap-2">
                <label>Giới tính</label>
                <Dropdown
                  options={genders}
                  placeholder="Chọn giới tính"
                  className="w-full "
                  value={selectedValue.gender}
                  onChange={(e) =>
                    setSelectedValue((prev) => ({
                      ...prev,
                      gender: e.value,
                    }))
                  }
                />
              </div>
            </div>

            <Button
              className="w-full mt-5"
              type="submit"
              label="Xác nhận"
              disabled={isSubmitting}
            />
            <div className="flex items-center gap-2 mt-5">
              <p>
                Đã có tài khoản ?{" "}
                <Link
                  className="text-blue-700 hover:underline font-medium"
                  to="/login"
                >
                  Đăng nhập
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
