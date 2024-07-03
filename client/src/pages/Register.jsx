import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { patientSchema } from "../validations/patientSchema";
import FieldInput from "../components/FieldInput";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Link, useNavigate } from "react-router-dom";
import { createNewPatientApi } from "../api/patientApi";
import { formatDate } from "../utils/helper";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { genders } from "../utils/constants";

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onchange",
    resolver: yupResolver(patientSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      email: "",
      address: "",
      password: "",
    },
  });

  const toast = useRef(null);
  const navigate = useNavigate();
  const [selectedGender, setSelectedGender] = useState(null);
  const [date, setDate] = useState(null);

  const handleRegister = async (values) => {
    if (!date) {
      toast.current.show({
        severity: "error",
        summary: "Vui lòng chọn ngày sinh",
        life: 1500,
      });
      return;
    }

    if (!selectedGender) {
      toast.current.show({
        severity: "error",
        summary: "Vui lòng chọn giới tính",
        life: 1500,
      });
      return;
    }

    try {
      const body = {
        ...values,
        gender: selectedGender,
        dateOfBirth: formatDate(date),
      };

      const res = await createNewPatientApi(body);

      if (res) {
        toast.current.show({
          severity: "success",
          summary: "Tạo tài khoản thành công",
          life: 1500,
        });

        navigate("/login");
      }
    } catch (error) {
      console.log("Error creating new medicine:", error);
      toast.current.show({
        severity: "error",
        summary: "Lỗi",
        life: 1500,
      });
    } finally {
      reset();
      setSelectedGender(null);
      setDate(null);
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

        <Toast ref={toast} />

        <div className="w-1/2 flex items-center justify-center p-8 bg-white">
          <form
            onSubmit={handleSubmit(handleRegister)}
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
                type="phoneNumber"
                name="phoneNumber"
                htmlFor="phoneNumber"
                register={register}
                errorMessage={errors?.phoneNumber?.message}
              />

              <FieldInput
                label="Địa chỉ"
                type="address"
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

              <div className="flex flex-col gap-2">
                <label>Ngày sinh</label>
                <Calendar
                  id="buttondisplay"
                  value={date}
                  onChange={(e) => setDate(e.value)}
                  showIcon
                />
              </div>

              <div className="flex flex-col gap-2">
                <label>Giới tính</label>
                <Dropdown
                  value={selectedGender}
                  onChange={(e) => setSelectedGender(e.value)}
                  options={genders}
                  placeholder="Chọn giới tính"
                  className="w-full "
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
