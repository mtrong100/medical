import useGetDoctors from "../../hooks/useGetDoctors";
import toast from "react-hot-toast";
import TitleSection from "../../components/TitleSection";
import React, { useEffect, useState } from "react";
import FieldInput from "../../components/FieldInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { formatDate, parseDate } from "../../utils/helper";
import { Dropdown } from "primereact/dropdown";
import { doctorSchedules, genders } from "../../utils/constants";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { bookingAppointmentApi } from "../../api/appointmentApi";
import { appointmentSchema } from "../../validations/appointmentSchema";
import Image from "../../assets/images/medical-marketing-2.webp";

const BookAppointment = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const { doctors } = useGetDoctors();
  const [selectedValue, setSelectedValue] = useState({
    doctor: null,
    date: null,
    time: null,
    dateOfBirth: null,
    gender: null,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onchange",
    resolver: yupResolver(appointmentSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      email: "",
    },
  });

  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    if (currentUser) {
      reset({ ...currentUser });
      setSelectedValue({
        ...selectedValue,
        dateOfBirth: parseDate(currentUser.dateOfBirth),
        gender: currentUser.gender,
      });
    }
  }, []);

  const onBookAppointment = async (values) => {
    const { doctor, time, gender, dateOfBirth, date } = selectedValue;
    if (!doctor || !time || !gender || !dateOfBirth || !date) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }

    try {
      const body = {
        ...values,
        doctor,
        date: formatDate(date),
        time,
        dateOfBirth: formatDate(dateOfBirth),
        gender,
      };

      const res = await bookingAppointmentApi(body);

      if (res) toast.success("Đặt lịch khám bệnh thành công");
    } catch (error) {
      console.log("Lỗi đặt lịch khám bệnh: ", error);
      toast.error("Lỗi đặt lịch khám bệnh");
    }
  };

  return (
    <section className="mb-20">
      <div className="h-[300px] w-full mb-10">
        <img src={Image} alt="banner" className="w-full h-full object-cover" />
      </div>

      <div className="page-container">
        <TitleSection>Đặt lịch khám bệnh</TitleSection>

        <form
          onSubmit={handleSubmit(onBookAppointment)}
          className="space-y-8 mt-5"
        >
          <div className="grid grid-cols-2 gap-5">
            <FieldInput
              label="Tên"
              type="text"
              name="name"
              htmlFor="name"
              register={register}
              errorMessage={errors?.name?.message}
            />

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

            <FieldInput
              label="Số điện thoại"
              type="text"
              name="phoneNumber"
              htmlFor="phoneNumber"
              register={register}
              errorMessage={errors?.phoneNumber?.message}
            />

            <FieldInput
              label="Email"
              type="email"
              name="email"
              htmlFor="email"
              register={register}
              errorMessage={errors?.email?.message}
            />

            <div className="flex flex-col gap-2">
              <label>Ngày khám bệnh</label>
              <Calendar
                showIcon
                placeholder="Chọn ngày khám bệnh"
                value={selectedValue.date}
                onChange={(e) =>
                  setSelectedValue((prev) => ({
                    ...prev,
                    date: e.value,
                  }))
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label>Khung giờ</label>
              <Dropdown
                options={doctorSchedules}
                filter
                filterPlaceholder="Tìm kiếm"
                placeholder="Chọn khung giờ"
                className="w-full "
                scrollHeight="400px"
                value={selectedValue.time}
                onChange={(e) =>
                  setSelectedValue((prev) => ({
                    ...prev,
                    time: e.value,
                  }))
                }
              />
            </div>

            <div className="flex flex-col gap-2">
              <label>Bác sĩ</label>
              <Dropdown
                options={doctors}
                filter
                filterPlaceholder="Tìm kiếm"
                optionValue="_id"
                optionLabel="name"
                placeholder="Chọn bác sĩ khám bệnh"
                className="w-full "
                scrollHeight="300px"
                value={selectedValue.doctor}
                onChange={(e) =>
                  setSelectedValue((prev) => ({
                    ...prev,
                    doctor: e.value,
                  }))
                }
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3">
            <Button
              type="button"
              severity="secondary"
              label="Quay về"
              onClick={() => navigate("/")}
            />
            <Button
              disabled={isSubmitting}
              type="submit"
              label="Đặt lịch khám ngay"
              icon="pi pi-calendar"
            />
          </div>
        </form>
      </div>
    </section>
  );
};

export default BookAppointment;
