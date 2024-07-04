import React, { useEffect, useRef, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Calendar } from "primereact/calendar";
import { formatDate, parseDate } from "../utils/helper";
import { genders } from "../utils/constants";
import FileInput from "./FileInput";
import FieldInput from "./FieldInput";
import { useSelector } from "react-redux";
import { getPatientDetailApi, updatePatientApi } from "../api/patientApi";
import { useDispatch } from "react-redux";
import { storeCurrentUser } from "../redux/slices/userSlice";
import { Image } from "primereact/image";
import { updateUserSchema } from "../validations/userSchema";
import { getUserDetailApi, updateUserApi } from "../api/userApi";
import { logoutApi } from "../api/authApi";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
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

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [date, setDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const toast = useRef(null);

  const fetchUserDetail = async () => {
    setLoading(true);
    try {
      const res = await getUserDetailApi(currentUser._id);
      if (res) {
        dispatch(storeCurrentUser(res));
      }
    } catch (error) {
      console.log("Error in fetchUserDetail", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      reset({ ...currentUser });
      setSelectedGender(currentUser?.gender);
      setSelectedStatus(currentUser?.status);
      setDate(parseDate(currentUser?.dateOfBirth));
    }
  }, [currentUser, reset]);

  const handleUpdateProfile = async (values) => {
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

      const res = await updateUserApi(currentUser._id, body);

      if (res) {
        toast.current.show({
          severity: "success",
          summary: "Cập nhật hoàn tất",
          life: 1500,
        });
      }
    } catch (error) {
      console.log("Error update profile:", error);
      toast.current.show({
        severity: "error",
        summary: "Lỗi",
        life: 1500,
      });
    } finally {
      fetchUserDetail();
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

      if (downloadURL) {
        const res = await updateUserApi(currentUser._id, {
          avatar: downloadURL,
        });

        console.log(res);

        toast.current.show({
          severity: "success",
          summary: "Cập nhật hình ảnh hoàn tất",
          life: 1500,
        });
      }
    } catch (error) {
      console.log("Lỗi tải lên ảnh avatar: ", error);
      toast.current.show({
        severity: "error",
        summary: "Lỗit",
        life: 1500,
      });
    } finally {
      setIsUploading(false);
      fetchUserDetail();
    }
  };

  const handleLogout = async () => {
    try {
      await logoutApi();
    } catch (error) {
      console.log("Error logout:", error);
      toast.current.show({
        severity: "error",
        summary: "Lỗi",
        life: 1500,
      });
    } finally {
      navigate("/login");
    }
  };

  return (
    <div>
      <Toast ref={toast} />
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

          <FileInput onUpload={handleUploadAvatar} isUploading={isUploading} />
        </div>

        <section className="w-full max-w-5xl mx-auto">
          <form
            onSubmit={handleSubmit(handleUpdateProfile)}
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
            </div>

            <div className="flex items-center justify-end gap-5">
              <Button
                type="button"
                label="Đăng xuất"
                severity="secondary"
                icon="pi pi-sign-out"
                onClick={handleLogout}
              />
              <Button
                type="submit"
                label="Cập nhật"
                disabled={isSubmitting}
                className="w-[150px]"
              />
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default UpdateProfile;
