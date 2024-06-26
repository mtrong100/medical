import React, { useEffect, useRef, useState } from "react";
import TitleSection from "../components/TitleSection";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { employeeSchema } from "../validations/doctorSchema";
import FieldInput from "../components/FieldInput";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";
import { formatDate, getEmployeeSalary } from "../utils/helper";
import { createNewEmployeeApi } from "../api/employeeApi";
import {
  commonSpecialtiesInPrivateClinics,
  genders,
  medicalSchoolsInVietnam,
  roles,
} from "../utils/constants";
import { Image } from "primereact/image";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import FileInput from "../components/FileInput";
import { ProgressBar } from "primereact/progressbar";

const AddNewEmployee = () => {
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

  const navigate = useNavigate();
  const toast = useRef(null);
  const [date, setDate] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedGraduate, setSelectedGraduate] = useState(null);
  const [selectedSpecialization, setSelectedSpecialization] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [avatar, setAvatar] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (selectedRole) {
      reset({
        salary: getEmployeeSalary(selectedRole),
      });
    }
  }, [reset, selectedRole]);

  const handleAddNewEmployee = async (values) => {
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

    if (!selectedRole) {
      toast.current.show({
        severity: "error",
        summary: "Vui lòng chọn vai trò",
        life: 1500,
      });
      return;
    }

    try {
      const body = {
        ...values,
        gender: selectedGender,
        graduatedFrom: selectedGraduate,
        specialization: selectedSpecialization,
        role: selectedRole,
        dateOfBirth: formatDate(date),
      };

      await createNewEmployeeApi(body);

      toast.current.show({
        severity: "success",
        summary: "Thêm mới hoàn tất",
        life: 1500,
      });
    } catch (error) {
      console.log("Error: ", error);
      toast.current.show({
        severity: "error",
        summary: "Lỗi",
        life: 1500,
      });
    }
  };

  const handleUploadAvatar = async (event) => {
    setIsUploading(true);

    const file = event.target.files[0];
    if (!file) {
      setIsUploading(false);
      return;
    }
    const storage = getStorage();

    try {
      const storageRef = ref(storage, "pictures/" + file.name + Date.now());
      const uploadTask = uploadBytesResumable(storageRef, file);

      const snapshot = await uploadTask;
      const downloadURL = await getDownloadURL(snapshot.ref);

      setAvatar(downloadURL);
    } catch (error) {
      console.log("Lỗi tải lên ảnh avatar: ", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <TitleSection>Thêm mới nhân viên</TitleSection>

      <Toast ref={toast} />

      <div className="grid mt-10 grid-cols-[350px_minmax(0,1fr)] gap-5 items-start place-items-center">
        <div className="space-y-2 flex flex-col mx-auto justify-center items-center">
          {!isUploading && !avatar && (
            <div className="w-[200px] h-[200px] rounded-full border border-gray-400"></div>
          )}

          {isUploading && <ProgressBar mode="indeterminate" />}

          {!isUploading && avatar && (
            <Image
              src={avatar}
              alt="Image"
              width="200"
              preview
              imageStyle={{
                borderRadius: "100rem",
                objectFit: "cover",
                height: "200px",
              }}
            />
          )}

          <FileInput onUpload={handleUploadAvatar} isUploading={isUploading} />
        </div>

        <div className="w-full  max-w-5xl mx-auto">
          <form onSubmit={handleSubmit(handleAddNewEmployee)}>
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

              <div className="flex flex-col gap-2">
                <label>Tốt nghiệp</label>
                <Dropdown
                  value={selectedGraduate}
                  onChange={(e) => setSelectedGraduate(e.value)}
                  options={medicalSchoolsInVietnam}
                  placeholder="Chọn trường đã tốt nghiệp"
                  className="w-full "
                />
              </div>

              <div className="flex flex-col gap-2">
                <label>Chuyên khoa</label>
                <Dropdown
                  value={selectedSpecialization}
                  onChange={(e) => setSelectedSpecialization(e.value)}
                  options={commonSpecialtiesInPrivateClinics}
                  placeholder="Chọn chuyên khoa"
                  className="w-full "
                />
              </div>

              <div className="flex flex-col gap-2">
                <label>Vai trò</label>
                <Dropdown
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.value)}
                  options={roles}
                  placeholder="Chọn vai trò"
                  className="w-full "
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

            <div className="mt-8 flex justify-center items-center gap-5">
              <Button type="submit" label="Xác nhận" disabled={isSubmitting} />
              <Button
                type="button"
                onClick={() => navigate("/employee")}
                label="Quay về"
                severity="secondary"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewEmployee;
