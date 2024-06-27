import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { medicalRecordSchema } from "../validations/medicalRecordSchema";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import FieldTextarea from "./FieldTextarea";
import { Button } from "primereact/button";
import FieldInput from "./FieldInput";
import { Dropdown } from "primereact/dropdown";
import useGetDoctors from "../hooks/useGetDoctors";
import { updateMedicalRecordApi } from "../api/medicalRecordApi";

const UpdateMedicalRecordModal = ({
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
    resolver: yupResolver(medicalRecordSchema),
    defaultValues: {
      patient: "",
      diagnosis: "",
      treatment: "",
      notes: "",
    },
  });

  const toast = useRef(null);
  const { doctors } = useGetDoctors();
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    if (updateVal) {
      reset({ ...updateVal, patient: updateVal.patient?._id });
      setSelectedDoctor(updateVal.doctor?._id);
    }
  }, [reset, updateVal]);

  const handleUpdateMedicalRecord = async (values) => {
    if (!selectedDoctor) {
      toast.current.show({
        severity: "error",
        summary: "Vui lý chọn bác sĩ khám bệnh",
        life: 1500,
      });
      return;
    }

    try {
      const body = {
        ...values,
        doctor: selectedDoctor,
      };

      const res = await updateMedicalRecordApi(updateVal._id, body);
      if (res) {
        toast.current.show({
          severity: "success",
          summary: "Thao tác hoàn tất",
          life: 1500,
        });
      }
    } catch (error) {
      console.log("Error creating new medical record:", error);
      toast.current.show({
        severity: "error",
        summary: "Lỗi",
        life: 1500,
      });
    } finally {
      onRefresh();
      setVisible2(false);
    }
  };

  return (
    <>
      <Toast ref={toast} />

      <Dialog
        header="Form cập nhật hồ sơ bệnh án"
        visible={visible2}
        style={{ width: "30vw" }}
        onHide={() => {
          if (!visible2) return;
          setVisible2(false);
        }}
      >
        <div className="m-0">
          <form onSubmit={handleSubmit(handleUpdateMedicalRecord)}>
            <div className="space-y-3">
              <FieldInput
                label="Mã bệnh nhân"
                type="text"
                name="patient"
                htmlFor="patient"
                register={register}
                errorMessage={errors?.patient?.message}
              />
              <div className="flex flex-col gap-2">
                <label>Bác sĩ</label>
                <Dropdown
                  value={selectedDoctor}
                  onChange={(e) => setSelectedDoctor(e.value)}
                  options={doctors}
                  filter
                  filterPlaceholder="Tìm kiếm"
                  optionValue="_id"
                  placeholder="Chọn bác sĩ khám bệnh"
                  className="w-full "
                  optionLabel="name"
                  scrollHeight="300px"
                />
              </div>
              <FieldInput
                label="Chuẩn đoán bệnh"
                name="diagnosis"
                htmlFor="diagnosis"
                register={register}
                errorMessage={errors?.diagnosis?.message}
              />
              <FieldTextarea
                label="Phương pháp trị liệu"
                name="treatment"
                htmlFor="treatment"
                register={register}
                errorMessage={errors?.treatment?.message}
              />
              <FieldTextarea
                label="Ghi chú"
                name="notes"
                htmlFor="notes"
                register={register}
                errorMessage={errors?.notes?.message}
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
      </Dialog>
    </>
  );
};

export default UpdateMedicalRecordModal;
