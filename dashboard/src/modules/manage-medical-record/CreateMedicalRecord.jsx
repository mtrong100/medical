import useGetDoctors from "../../hooks/useGetDoctors";
import toast from "react-hot-toast";
import TitleSection from "../../components/TitleSection";
import React, { useState } from "react";
import FieldTextarea from "../../components/FieldTextarea";
import FieldInput from "../../components/FieldInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { medicalRecordSchema } from "../../validations/medicalRecordSchema";
import { Dropdown } from "primereact/dropdown";
import { createMedicalRecordApi } from "../../api/medicalRecordApi";
import { Button } from "primereact/button";

const CreateMedicalRecord = () => {
  const navigate = useNavigate();
  const { doctors } = useGetDoctors();
  const [selectedDoctor, setSelectedDoctor] = useState(null);

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

  const onCreate = async (values) => {
    if (!selectedDoctor) {
      toast.error("Vui lý chọn bác sĩ khám bệnh");
      return;
    }

    try {
      const body = {
        ...values,
        doctor: selectedDoctor,
      };

      const res = await createMedicalRecordApi(body);

      if (res) toast.success("Tạo mới hoàn tất");
    } catch (error) {
      console.log("Lỗi tạo mới: ", error);
      toast.error("Lỗi tạo mới");
    } finally {
      reset();
      setSelectedDoctor(null);
    }
  };

  return (
    <div>
      <TitleSection>Lập hồ sơ bệnh án</TitleSection>

      <form
        onSubmit={handleSubmit(onCreate)}
        className="space-y-8 w-full max-w-3xl mx-auto my-10"
      >
        <div className="space-y-5">
          <FieldInput
            label="Mã bệnh nhân"
            type="text"
            name="patient"
            htmlFor="patient"
            register={register}
            errorMessage={errors?.patient?.message}
            placeholder="Mã bệnh nhân"
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
            placeholder="Chuẩn đoán bệnh"
          />

          <FieldTextarea
            label="Phương pháp trị liệu"
            name="treatment"
            htmlFor="treatment"
            register={register}
            errorMessage={errors?.treatment?.message}
            placeholder="Phương pháp trị liệu"
          />

          <FieldTextarea
            label="Ghi chú"
            name="notes"
            htmlFor="notes"
            register={register}
            placeholder="Ghi chú"
          />
        </div>

        <div className="flex items-center justify-end gap-3">
          <Button
            type="button"
            onClick={() => navigate("/medical-record")}
            label="Quay về"
            severity="secondary"
            icon="pi pi-arrow-left"
          />

          <Button
            type="submit"
            label="Xác nhận"
            disabled={isSubmitting}
            icon="pi pi-check-circle"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateMedicalRecord;
