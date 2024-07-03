import React, { useRef, useState } from "react";
import { Dialog } from "primereact/dialog";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FieldInput from "./FieldInput";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { genders } from "../utils/constants";
import { Toast } from "primereact/toast";
import { patientSchema } from "../validations/patientSchema";
import { formatDate } from "../utils/helper";
import { createNewPatientApi } from "../api/patientApi";
import { Calendar } from "primereact/calendar";

const CreateNewPatientModal = ({
  visible,
  setVisible,
  onRefresh = () => {},
}) => {
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

  const [selectedGender, setSelectedGender] = useState(null);
  const [date, setDate] = useState(null);

  const toast = useRef(null);

  const handleCreateNewMedicine = async (values) => {
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

      await createNewPatientApi(body);

      toast.current.show({
        severity: "success",
        summary: "Thêm mới hoàn tất",
        life: 1500,
      });
    } catch (error) {
      console.log("Error creating new medicine:", error);
      toast.current.show({
        severity: "error",
        summary: "Lỗi",
        life: 1500,
      });
    } finally {
      setVisible(false);
      onRefresh();
      reset();
      setSelectedGender(null);
      setDate(null);
    }
  };

  return (
    <>
      <Toast ref={toast} />

      <Dialog
        header="Form thêm bệnh nhân mới"
        visible={visible}
        style={{ width: "35vw" }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
        <div className="m-0">
          <form onSubmit={handleSubmit(handleCreateNewMedicine)}>
            <div className="space-y-3">
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

              <Button
                className="w-full"
                type="submit"
                label="Xác nhận"
                disabled={isSubmitting}
              />
            </div>
          </form>
        </div>
      </Dialog>
    </>
  );
};

export default CreateNewPatientModal;
