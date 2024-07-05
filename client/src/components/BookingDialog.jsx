import React, { useEffect, useRef, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { doctorSchedules, genders } from "../utils/constants";
import { Toast } from "primereact/toast";
import { formatDate, parseDate } from "../utils/helper";
import { Calendar } from "primereact/calendar";
import useGetDoctors from "../hooks/useGetDoctors";
import { bookingNewAppointmentApi } from "../api/appointmentApi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { appointmentSchema } from "../validations/appointmentSchema";
import FieldInput from "./FieldInput";
import { useSelector } from "react-redux";

const BookingDialog = ({ visible, setVisible }) => {
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
      address: "",
    },
  });

  const toast = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const { doctors } = useGetDoctors();
  const [filteredDoctors, setFilteredDoctors] = useState(doctors);
  const [selectedValue, setSelectedValue] = useState({
    doctor: "",
    date: "",
    time: "",
    dateOfBirth: "",
    gender: "",
  });

  useEffect(() => {
    if (currentUser) {
      setSelectedValue({
        ...selectedValue,
        dateOfBirth: parseDate(currentUser.dateOfBirth),
        gender: currentUser.gender,
      });

      reset({ ...currentUser });
    }
  }, [currentUser, reset, selectedValue]);

  const handleCreateNewAppointment = async (values) => {
    if (
      !selectedValue.doctor ||
      !selectedValue.date ||
      !selectedValue.time ||
      !selectedValue.dateOfBirth ||
      !selectedValue.gender
    ) {
      toast.current.show({
        severity: "error",
        summary: "Vui lòng điền đầy đủ vào form",
        life: 1500,
      });
      return;
    }

    try {
      const body = {
        ...values,
        doctor: selectedValue.doctor,
        date: formatDate(selectedValue.date),
        time: selectedValue.time,
        dateOfBirth: formatDate(selectedValue.dateOfBirth),
        gender: selectedValue.gender,
      };

      const res = await bookingNewAppointmentApi(body);

      if (res) {
        console.log(res);
        toast.current.show({
          severity: "success",
          summary: "Đặt lịch khám bệnh thành công",
          life: 1500,
        });
      }
    } catch (error) {
      console.log("Error creating new appointment:", error);
      toast.current.show({
        severity: "error",
        summary: `Lỗi!`,
        life: 1500,
      });
    } finally {
      setVisible(false);
      reset();
      setSelectedValue({
        doctor: "",
        date: "",
        time: "",
      });
    }
  };

  useEffect(() => {
    if (selectedValue.doctor) {
      setFilteredDoctors(
        doctors.filter((doctor) => doctor._id === selectedValue.doctor)
      );
    } else {
      setFilteredDoctors(doctors);
    }
  }, [selectedValue.doctor, doctors]);

  return (
    <>
      <Toast ref={toast} />

      <Dialog
        header="Đặt lịch khám bệnh"
        visible={visible}
        style={{ width: "45vw" }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
        <div className="m-0">
          <form
            onSubmit={handleSubmit(handleCreateNewAppointment)}
            className="space-y-5"
          >
            <div className=" grid grid-cols-2 gap-5">
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

              <div className="flex flex-col gap-2">
                <label>Ngày sinh</label>
                <Calendar
                  id="buttondisplay"
                  value={selectedValue.dateOfBirth}
                  onChange={(e) =>
                    setSelectedValue({ ...selectedValue, dateOfBirth: e.value })
                  }
                  showIcon
                />
              </div>

              <div className="flex flex-col gap-2">
                <label>Giới tính</label>
                <Dropdown
                  value={selectedValue.gender}
                  onChange={(e) =>
                    setSelectedValue({ ...selectedValue, gender: e.value })
                  }
                  options={genders}
                  placeholder="Chọn giới tính"
                  className="w-full "
                />
              </div>

              <div className="flex flex-col gap-2">
                <label>Ngày khám bệnh</label>
                <Calendar
                  id="buttondisplay"
                  value={selectedValue.date}
                  onChange={(e) =>
                    setSelectedValue({ ...selectedValue, date: e.value })
                  }
                  showIcon
                  placeholder="Chọn ngày khám bệnh"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label>Khung giờ</label>
                <Dropdown
                  value={selectedValue.time}
                  onChange={(e) =>
                    setSelectedValue({ ...selectedValue, time: e.value })
                  }
                  options={doctorSchedules}
                  filter
                  filterPlaceholder="Tìm kiếm"
                  placeholder="Chọn khung giờ"
                  className="w-full "
                  scrollHeight="400px"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label>Bác sĩ</label>
                <Dropdown
                  value={selectedValue.doctor}
                  onChange={(e) =>
                    setSelectedValue({ ...selectedValue, doctor: e.value })
                  }
                  options={doctors}
                  filter
                  filterPlaceholder="Tìm kiếm"
                  optionValue="_id"
                  optionLabel="name"
                  placeholder="Chọn bác sĩ khám bệnh"
                  className="w-full "
                  scrollHeight="300px"
                />
              </div>
            </div>

            <div className="flex items-center flex-wrap">
              {filteredDoctors.map((doctor) => (
                <div
                  key={doctor?._id}
                  className="card w-60 flex flex-col justify-center items-center bg-white shadow-md rounded-md overflow-hidden"
                >
                  <img
                    src={doctor?.avatar}
                    alt={doctor?.name}
                    className="w-40 h-40 object-cover rounded-full"
                  />
                  <div className="p-4">
                    <h2 className="text-lg font-semibold">{doctor?.name}</h2>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end gap-3">
              <Button
                type="button"
                severity="danger"
                label="Hủy"
                icon="pi pi-times"
                onClick={() => setVisible(false)}
              />
              <Button
                disabled={isSubmitting}
                type="submit"
                label="Xác nhận đặt lịch khám"
                icon="pi pi-calendar"
              />
            </div>
          </form>
        </div>
      </Dialog>
    </>
  );
};

export default BookingDialog;
