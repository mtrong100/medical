import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Calendar } from "primereact/calendar";
import { TabView, TabPanel } from "primereact/tabview";
import { useNavigate, useParams } from "react-router-dom";
import { getPatientDetailApi, updatePatientApi } from "../api/patientApi";
import { ProgressSpinner } from "primereact/progressspinner";
import TitleSection from "../components/TitleSection";
import { Image } from "primereact/image";
import FileInput from "../components/FileInput";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
  updatePatientPasswordSchema,
  updatePatientSchema,
} from "../validations/patientSchema";
import FieldInput from "../components/FieldInput";
import { formatDate, parseDate } from "../utils/helper";
import { genders, patientStatus } from "../utils/constants";

const UpdatePatient = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const toast = useRef(null);

  useEffect(() => {
    fetchPatientDetail();
  }, []);

  const fetchPatientDetail = async () => {
    setLoading(true);
    try {
      const res = await getPatientDetailApi(id);
      if (res) setPatient(res);
    } catch (error) {
      console.log("Error in fetchPatientDetail", error);
    } finally {
      setLoading(false);
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
        await updatePatientApi(id, { avatar: downloadURL });
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
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ProgressSpinner />
      </div>
    );
  }

  return (
    <div>
      <TitleSection>Cập nhật bệnh nhân</TitleSection>
      <Toast ref={toast} />

      <div className="grid mt-10 grid-cols-[350px_minmax(0,1fr)] gap-5 items-start place-items-center">
        <div className="space-y-2 flex flex-col mx-auto justify-center items-center">
          <Image
            src={patient?.avatar}
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
          <TabView>
            <TabPanel header="Cập nhật thông tin cá nhân">
              <div className="m-0">
                <UpdatePatientInfo
                  onRefresh={fetchPatientDetail}
                  patientDetail={patient}
                />
              </div>
            </TabPanel>
            <TabPanel header="Cập nhật mật khẩu">
              <div className="m-0">
                <UpdatePatientPassword patientId={id} />
              </div>
            </TabPanel>
          </TabView>
        </section>
      </div>
    </div>
  );
};

export default UpdatePatient;

function UpdatePatientInfo({ onRefresh, patientDetail }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onchange",
    resolver: yupResolver(updatePatientSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      email: "",
      address: "",
    },
  });

  const navigate = useNavigate();
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [date, setDate] = useState(null);
  const toast = useRef(null);

  useEffect(() => {
    if (patientDetail) {
      reset({ ...patientDetail });
      setSelectedGender(patientDetail?.gender);
      setSelectedStatus(patientDetail?.status);
      setDate(parseDate(patientDetail?.dateOfBirth));
    }
  }, [patientDetail, reset]);

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

      await updatePatientApi(patientDetail._id, body);

      toast.current.show({
        severity: "success",
        summary: "Cập nhật hoàn tất",
        life: 1500,
      });
    } catch (error) {
      console.log("Error update patient:", error);
      toast.current.show({
        severity: "error",
        summary: "Lỗi",
        life: 1500,
      });
    } finally {
      onRefresh();
    }
  };

  return (
    <div>
      <Toast ref={toast} />
      <form onSubmit={handleSubmit(handleUpdatePatient)} className="space-y-5">
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
        </div>

        <div className="flex items-center justify-end gap-5">
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
  );
}

function UpdatePatientPassword({ patientId }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onchange",
    resolver: yupResolver(updatePatientPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const navigate = useNavigate();
  const toast = useRef(null);

  const handleUpdatePassword = async (values) => {
    try {
      const body = { ...values };
      console.log(body);

      await updatePatientApi(patientId, body);

      toast.current.show({
        severity: "success",
        summary: "Thay đổi mật khẩu thành công",
        life: 1500,
      });
    } catch (error) {
      console.log("Error: ", error);
      toast.current.show({
        severity: "error",
        summary: "Lỗi",
        life: 1500,
      });
    } finally {
      reset();
    }
  };

  return (
    <div>
      <Toast ref={toast} />

      <form onSubmit={handleSubmit(handleUpdatePassword)} className="space-y-5">
        <div className="grid grid-cols-2 gap-5">
          <FieldInput
            label="Mật khẩu mới"
            type="password"
            name="password"
            htmlFor="password"
            register={register}
            errorMessage={errors?.password?.message}
          />
          <FieldInput
            label="Xác nhận mật khẩu"
            type="password"
            name="confirmPassword"
            htmlFor="confirmPassword"
            register={register}
            errorMessage={errors?.confirmPassword?.message}
          />
        </div>

        <div className="flex items-center gap-5 justify-end ">
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
  );
}
