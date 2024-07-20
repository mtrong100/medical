import useUploadImage from "../../hooks/useUploadImage";
import toast from "react-hot-toast";
import React, { useState } from "react";
import FileInput from "../../components/FileInput";
import FieldInput from "../../components/FieldInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { patientSchema } from "../../validations/patientSchema";
import { Image } from "primereact/image";
import { DEFAULT_AVATAR, genders } from "../../utils/constants";
import { formatDate } from "../../utils/helper";
import { Dropdown } from "primereact/dropdown";
import { createPatientApi } from "../../api/patientApi";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import TitleSection from "../../components/TitleSection";

const CreatePatient = () => {
  const navigate = useNavigate();
  const { image, onUpload, isUploading } = useUploadImage();
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
    resolver: yupResolver(patientSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      email: "",
      address: "",
    },
  });

  const onCreate = async (values) => {
    const { dateOfBirth, gender } = selectedValue;

    if (!dateOfBirth || !gender) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }

    try {
      const body = {
        ...values,
        gender,
        dateOfBirth: formatDate(dateOfBirth),
      };

      const res = await createPatientApi(body);
      if (res) toast.success("Tạo mới hoàn tất");
    } catch (error) {
      console.log("Lỗi tạo mới: ", error);
      toast.error("Lỗi tạo mới");
    } finally {
      reset();
      setSelectedValue({ gender: null, dateOfBirth: null });
    }
  };

  return (
    <div>
      <TitleSection>Tạo mới bệnh nhân</TitleSection>

      <div className="grid mt-10 grid-cols-[350px_minmax(0,1fr)] gap-5 items-start place-items-center">
        <div className="space-y-2 flex flex-col mx-auto justify-center items-center">
          <Image
            src={image || DEFAULT_AVATAR}
            alt="Image"
            width="200"
            preview
            imageStyle={{
              borderRadius: "100rem",
              objectFit: "cover",
              height: "200px",
            }}
          />

          <FileInput onUpload={onUpload} isUploading={isUploading} />
        </div>

        <form
          onSubmit={handleSubmit(onCreate)}
          className="space-y-8 w-full max-w-5xl mx-auto"
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
                  setSelectedValue((prev) => ({ ...prev, gender: e.value }))
                }
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3">
            <Button
              type="button"
              onClick={() => navigate("/patient")}
              label="Quay về"
              severity="secondary"
            />

            <Button type="submit" label="Xác nhận" disabled={isSubmitting} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePatient;
