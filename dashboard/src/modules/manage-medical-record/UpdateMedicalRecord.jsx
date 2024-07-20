import useGetMedicalRecordDetail from "./useGetMedicalRecordDetail";
import useGetDoctors from "../../hooks/useGetDoctors";
import toast from "react-hot-toast";
import TitleSection from "../../components/TitleSection";
import React, { useEffect, useState } from "react";
import FieldTextarea from "../../components/FieldTextarea";
import FieldInput from "../../components/FieldInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { updateMedicalRecordApi } from "../../api/medicalRecordApi";
import { medicalRecordSchema } from "../../validations/medicalRecordSchema";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";

const UpdateMedicalRecord = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { detail, fetchDetail } = useGetMedicalRecordDetail();
  const { doctors } = useGetDoctors();
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    fetchDetail(id);
  }, []);

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

  useEffect(() => {
    if (detail) {
      reset({ ...detail });
      setSelectedDoctor(detail.doctor);
    }
  }, [detail, reset]);

  const onUpdate = async (values) => {
    if (!selectedDoctor) {
      toast.error("Vui lý chọn bác sĩ khám bệnh");
      return;
    }

    try {
      const body = {
        ...values,
        doctor: selectedDoctor,
      };

      const res = await updateMedicalRecordApi(id, body);

      if (res) toast.success("Cập nhật hoàn tất");
    } catch (error) {
      console.log("Lỗi cập nhật: ", error);
      toast.error("Lỗi cập nhật");
    } finally {
      reset();
      setSelectedDoctor(null);
      fetchDetail(id);
    }
  };

  return (
    <div>
      <TitleSection>Lập hồ sơ bệnh án</TitleSection>

      <form
        onSubmit={handleSubmit(onUpdate)}
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
        </div>

        <div className="flex items-center justify-end gap-3">
          <Button
            type="button"
            onClick={() => navigate("/medical-record")}
            label="Quay về"
            severity="secondary"
          />

          <Button type="submit" label="Xác nhận" disabled={isSubmitting} />
        </div>
      </form>
    </div>
  );
};

export default UpdateMedicalRecord;
