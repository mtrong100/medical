import React, { useEffect, useRef, useState } from "react";
import { Dialog } from "primereact/dialog";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FieldInput from "./FieldInput";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { genders, patientStatus } from "../utils/constants";
import { Toast } from "primereact/toast";
import { patientSchema } from "../validations/patientSchema";
import { formatDate, parseDate } from "../utils/helper";
import { updatePatientApi } from "../api/patientApi";
import { Calendar } from "primereact/calendar";
import { TabView, TabPanel } from "primereact/tabview";

const UpdatePatientModal = ({
  visible2,
  setVisible2,
  onRefresh = () => {},
  updateVal,
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
    },
  });

  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [date, setDate] = useState(null);
  const toast = useRef(null);

  useEffect(() => {
    if (updateVal) {
      reset({ ...updateVal });
      setSelectedGender(updateVal.gender);
      setDate(parseDate(updateVal.dateOfBirth));
    }
  }, [reset, updateVal]);

  const handleUpdatePatient = async (values) => {
    if (!date || !selectedGender || !selectedStatus) {
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
        gender: selectedGender,
        status: selectedStatus,
        dateOfBirth: formatDate(date),
      };

      await updatePatientApi(updateVal._id, body);

      toast.current.show({
        severity: "success",
        summary: "Cập nhật hoàn tất",
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
      setVisible2(false);
      onRefresh();
      reset();
    }
  };

  return (
    <>
      <Toast ref={toast} />

      <Dialog
        header="Form cập nhật bệnh nhân"
        visible={visible2}
        style={{ width: "30vw" }}
        onHide={() => {
          if (!visible2) return;
          setVisible2(false);
        }}
      >
        <div className="m-0">
          <form onSubmit={handleSubmit(handleUpdatePatient)}>
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

              <div className="flex flex-col gap-2">
                <label>Trạng thái</label>
                <Dropdown
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.value)}
                  options={patientStatus}
                  placeholder="Chọn trạng thái"
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

export default UpdatePatientModal;
