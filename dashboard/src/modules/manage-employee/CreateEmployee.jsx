import useUploadImage from "../../hooks/useUploadImage";
import toast from "react-hot-toast";
import TitleSection from "../../components/TitleSection";
import React, { useEffect, useState } from "react";
import FileInput from "../../components/FileInput";
import FieldInput from "../../components/FieldInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Image } from "primereact/image";
import { formatDate, getEmployeeSalary } from "../../utils/helper";
import { employeeSchema } from "../../validations/employeeSchema";
import { Dropdown } from "primereact/dropdown";
import { createEmployeeApi } from "../../api/employeeApi";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import {
  commonSpecialtiesInPrivateClinics,
  DEFAULT_AVATAR,
  genders,
  medicalSchoolsInVietnam,
  roles,
} from "../../utils/constants";

const CreateEmployee = () => {
  const navigate = useNavigate();
  const { image, onUpload, isUploading } = useUploadImage();
  const [selectedValue, setSelectedValue] = useState({
    gender: null,
    dateOfBirth: null,
    role: null,
    graduatedFrom: null,
    specialization: null,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onchange",
    resolver: yupResolver(employeeSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      email: "",
      address: "",
      salary: 0,
    },
  });

  useEffect(() => {
    if (selectedValue.role) {
      reset({
        salary: getEmployeeSalary(selectedValue.role),
      });
    }
  }, [reset, selectedValue.role]);

  const handleAddNewEmployee = async (values) => {
    const { gender, role, graduatedFrom, specialization, dateOfBirth } =
      selectedValue;

    if (!gender || !role || !dateOfBirth) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }

    try {
      const body = {
        ...values,
        gender,
        graduatedFrom,
        specialization,
        role,
        dateOfBirth: formatDate(dateOfBirth),
      };

      const res = await createEmployeeApi(body);
      if (res) toast.success("Tạo mới hoàn tất");
    } catch (error) {
      console.log("Lỗi tạo mới: ", error);
      toast.error("Lỗi tạo mới");
    } finally {
      reset();
      setSelectedValue({
        gender: null,
        dateOfBirth: null,
        role: null,
        graduatedFrom: null,
        specialization: null,
      });
    }
  };

  return (
    <div>
      <TitleSection>Thêm mới nhân viên</TitleSection>

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

        <div className="w-full  max-w-5xl mx-auto">
          <form
            onSubmit={handleSubmit(handleAddNewEmployee)}
            className="space-y-8"
          >
            <div className="grid grid-cols-2 gap-5">
              <FieldInput
                label="Tên"
                type="text"
                name="name"
                htmlFor="name"
                register={register}
                errorMessage={errors?.name?.message}
                placeholder="Tên nhân viên"
              />

              <FieldInput
                label="Số điện thoại"
                type="text"
                name="phoneNumber"
                htmlFor="phoneNumber"
                register={register}
                errorMessage={errors?.phoneNumber?.message}
                placeholder="Số điện thoại"
              />

              <FieldInput
                label="Địa chỉ"
                type="text"
                name="address"
                htmlFor="address"
                register={register}
                errorMessage={errors?.address?.message}
                placeholder="Địa chỉ"
              />

              <FieldInput
                label="Email"
                type="email"
                name="email"
                htmlFor="email"
                register={register}
                errorMessage={errors?.email?.message}
                placeholder="Email"
              />

              <div className="flex flex-col gap-2">
                <label>Ngày sinh</label>
                <Calendar
                  showIcon
                  value={selectedValue.dateOfBirth}
                  placeholder="Ngày sinh"
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

              <div className="flex flex-col gap-2">
                <label>Tốt nghiệp</label>
                <Dropdown
                  options={medicalSchoolsInVietnam}
                  placeholder="Chọn trường đã tốt nghiệp"
                  className="w-full "
                  value={selectedValue.graduatedFrom}
                  onChange={(e) =>
                    setSelectedValue((prev) => ({
                      ...prev,
                      graduatedFrom: e.value,
                    }))
                  }
                />
              </div>

              <div className="flex flex-col gap-2">
                <label>Chuyên khoa</label>
                <Dropdown
                  options={commonSpecialtiesInPrivateClinics}
                  placeholder="Chọn chuyên khoa"
                  className="w-full "
                  value={selectedValue.specialization}
                  onChange={(e) =>
                    setSelectedValue((prev) => ({
                      ...prev,
                      specialization: e.value,
                    }))
                  }
                />
              </div>

              <div className="flex flex-col gap-2">
                <label>Vai trò</label>
                <Dropdown
                  options={roles}
                  placeholder="Chọn vai trò"
                  className="w-full "
                  value={selectedValue.role}
                  onChange={(e) =>
                    setSelectedValue((prev) => ({ ...prev, role: e.value }))
                  }
                />
              </div>

              <FieldInput
                label="Lương cơ bản"
                type="number"
                name="salary"
                htmlFor="salary"
                register={register}
                errorMessage={errors?.salary?.message}
              />
            </div>

            <div className="flex items-center justify-end gap-3">
              <Button
                type="button"
                onClick={() => navigate("/employee")}
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
      </div>
    </div>
  );
};

export default CreateEmployee;
