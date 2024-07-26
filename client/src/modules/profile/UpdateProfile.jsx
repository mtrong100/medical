import useUpdateAvatar from "./useUpdateAvatar";
import useLogout from "../../hooks/useLogout";
import useGetUserDetail from "../../hooks/useGetUserDetail";
import toast from "react-hot-toast";
import React, { useEffect, useState } from "react";
import FileInput from "../../components/FileInput";
import FieldInput from "../../components/FieldInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { updateUserSchema } from "../../validations/userSchema";
import { updateUserApi } from "../../api/userApi";
import { Image } from "primereact/image";
import { genders } from "../../utils/constants";
import { formatDate, parseDate } from "../../utils/helper";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";

const UpdateProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { fetchUserDetail } = useGetUserDetail();
  const { isUploading, onUpload } = useUpdateAvatar(fetchUserDetail);
  const { onLogout } = useLogout();
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
    resolver: yupResolver(updateUserSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      email: "",
      address: "",
    },
  });

  useEffect(() => {
    if (currentUser) {
      reset({ ...currentUser });
      setSelectedValue({
        gender: currentUser?.gender,
        dateOfBirth: parseDate(currentUser?.dateOfBirth),
      });
    }
  }, [currentUser, reset]);

  const onUpdate = async (values) => {
    const { dateOfBirth, gender } = selectedValue;

    if (!dateOfBirth || !gender) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }
    try {
      const body = {
        ...values,
        gender,
        dateOfBirth: formatDate(dateOfBirth),
      };

      const res = await updateUserApi(currentUser._id, body);

      if (res) toast.success("Cập nhật hồ sơ thành công");
    } catch (error) {
      console.log("Lỗi cập nhật hồ sơ:", error);
      toast.error(error?.response?.data?.message);
    } finally {
      fetchUserDetail(currentUser._id);
    }
  };

  return (
    <section>
      <div className="grid mt-10 grid-cols-[300px_minmax(0,1fr)] gap-5 items-start place-items-center">
        <div className="space-y-2 flex flex-col mx-auto justify-center items-center">
          <Image
            src={currentUser?.avatar}
            alt="Image"
            width="200"
            preview
            imageStyle={{
              borderRadius: "100rem",
              objectFit: "cover",
              height: "200px",
            }}
          />

          <FileInput
            onUpload={(event) => onUpload(event, currentUser._id)}
            isUploading={isUploading}
          />
        </div>

        <section className="w-full max-w-5xl mx-auto">
          <form onSubmit={handleSubmit(onUpdate)} className="space-y-8">
            <div className="grid grid-cols-2 gap-5">
              <FieldInput
                label="Tên"
                type="text"
                name="name"
                htmlFor="name"
                register={register}
                errorMessage={errors?.name?.message}
                placeholder="Nhập tên"
              />

              <FieldInput
                label="Số điện thoại"
                type="phoneNumber"
                name="phoneNumber"
                htmlFor="phoneNumber"
                register={register}
                errorMessage={errors?.phoneNumber?.message}
                placeholder="Nhập số điện thoại"
              />

              <FieldInput
                label="Địa chỉ"
                type="address"
                name="address"
                htmlFor="address"
                register={register}
                errorMessage={errors?.address?.message}
                placeholder="Nhập địa chỉ"
              />
              <FieldInput
                label="Email"
                type="email"
                name="email"
                htmlFor="email"
                register={register}
                errorMessage={errors?.email?.message}
                placeholder="Nhập email"
              />

              <div className="flex flex-col gap-2">
                <label>Ngày sinh</label>
                <Calendar
                  showIcon
                  placeholder="Chọn ngày sinh"
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
                    setSelectedValue((prev) => ({
                      ...prev,
                      gender: e.value,
                    }))
                  }
                />
              </div>
            </div>

            <div className="flex items-center justify-between gap-5">
              <Button
                type="button"
                label="Đăng xuất"
                severity="danger"
                icon="pi pi-sign-out"
                onClick={onLogout}
              />
              <Button
                type="submit"
                severity="success"
                label="Cập nhật hồ sơ "
                disabled={isSubmitting}
                icon="pi pi-user-edit"
              />
            </div>
          </form>
        </section>
      </div>
    </section>
  );
};

export default UpdateProfile;
