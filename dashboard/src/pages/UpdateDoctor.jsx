import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  firedDoctorApi,
  getDoctorDetailApi,
  updateDoctorApi,
} from "../api/doctorApi";
import TitleSection from "../components/TitleSection";
import { Image } from "primereact/image";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FieldInput from "../components/FieldInput";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { formatDate, parseDate } from "../utils/helper";
import {
  accountStatus,
  commonSpecialtiesInPrivateClinics,
  medicalSchoolsInVietnam,
  terminationReasons,
} from "../utils/constants";
import { ProgressSpinner } from "primereact/progressspinner";
import { TabView, TabPanel } from "primereact/tabview";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import FileInput from "../components/FileInput";
import { Editor } from "primereact/editor";
import { updatedDoctorSchema } from "../validations/doctorSchema";
import { passwordSchema } from "../validations/passwordSchema";
import { InputTextarea } from "primereact/inputtextarea";
import { Divider } from "primereact/divider";

const UpdateDoctor = () => {
  const genders = ["Nam", "Nữ"];
  const { id: doctorId } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedGraduate, setSelectedGraduate] = useState(null);
  const [selectedSpecialization, setSelectedSpecialization] = useState(null);
  const toast = useRef(null);
  const [date, setDate] = useState(null);
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [text, setText] = useState("");
  const [selectedSatus, setSelectedStatus] = useState(null);
  const [selectedReason, setSelectedReason] = useState(null);
  const [otherReason, setOtherReason] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onchange",
    resolver: yupResolver(updatedDoctorSchema),
  });

  useEffect(() => {
    fetchDoctorDetail();
  }, []);

  useEffect(() => {
    if (doctor) {
      reset({ ...doctor });
      setSelectedGender(doctor.gender);
      setSelectedGraduate(doctor.graduatedFrom);
      setSelectedSpecialization(doctor.specialization);
      setDate(parseDate(doctor.dateOfBirth));
      setText(doctor.description);
      setSelectedStatus(doctor.status);
      setAvatar(doctor.avatar);
    }
  }, [doctor, reset]);

  const fetchDoctorDetail = async () => {
    try {
      setLoading(true);
      const res = await getDoctorDetailApi(doctorId);
      setDoctor(res);
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateDoctor = async (values) => {
    if (
      !date ||
      !selectedGender ||
      !selectedGraduate ||
      !selectedSpecialization
    ) {
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
        graduatedFrom: selectedGraduate,
        specialization: selectedSpecialization,
        dateOfBirth: formatDate(date),
        avatar: avatar,
      };

      await updateDoctorApi(doctorId, body);

      toast.current.show({
        severity: "success",
        summary: "Cập nhật hoàn tất",
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

  const handleUpdateDescription = async () => {
    try {
      const body = { description: text };
      await updateDoctorApi(doctorId, body);
      toast.current.show({
        severity: "success",
        summary: "Cập nhật hoàn tất",
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

  const handleFiredDoctor = async () => {
    if (!selectedReason && !otherReason) {
      toast.current.show({
        severity: "error",
        summary: "Vui lòng chọn hoặc điền lí do buộc thôi việc",
        life: 1500,
      });
      return;
    }

    try {
      const body = {
        name: doctor?.name,
        email: doctor?.email,
        reason: selectedReason || otherReason,
      };

      await firedDoctorApi(doctorId, body);

      toast.current.show({
        severity: "success",
        summary: "Gửi email buộc thôi việc hoàn tất",
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

  const handleUpdateStatus = async () => {
    try {
      const body = { status: selectedSatus };
      await updateDoctorApi(doctorId, body);
      toast.current.show({
        severity: "success",
        summary: "Cập nhật hoàn tất",
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ProgressSpinner />
      </div>
    );
  }

  return (
    <div>
      <TitleSection>Cập nhật bác sĩ</TitleSection>

      <Toast ref={toast} />

      <section className="mt-10">
        <div className="grid grid-cols-[350px_minmax(0,1fr)] gap-5 items-start place-items-center">
          <div className="space-y-2 flex flex-col mx-auto justify-center items-center">
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

            <FileInput
              onUpload={handleUploadAvatar}
              isUploading={isUploading}
            />
          </div>

          <section className="w-full max-w-5xl mx-auto">
            <TabView>
              <TabPanel header="Cập nhật thông tin cá nhân">
                <div className="m-0">
                  <form onSubmit={handleSubmit(handleUpdateDoctor)}>
                    <div className="grid grid-cols-2 gap-5">
                      <FieldInput
                        label="Tên"
                        name="name"
                        htmlFor="name"
                        register={register}
                        errorMessage={errors?.name?.message}
                      />

                      <FieldInput
                        label="Số điện thoại"
                        name="phoneNumber"
                        htmlFor="phoneNumber"
                        register={register}
                        errorMessage={errors?.phoneNumber?.message}
                      />
                      <FieldInput
                        label="Địa chỉ"
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

                      <div className="flex flex-col gap-2 w-full">
                        <label>Ngày sinh</label>
                        <Calendar
                          id="buttondisplay"
                          value={date}
                          onChange={(e) => setDate(e.value)}
                          showIcon
                        />
                      </div>

                      <div className="flex flex-col gap-2 w-full">
                        <label>Giới tính</label>
                        <Dropdown
                          value={selectedGender}
                          onChange={(e) => setSelectedGender(e.value)}
                          options={genders}
                          placeholder="Chọn giới tính"
                          className="w-full "
                        />
                      </div>

                      <div className="flex flex-col gap-2 w-full">
                        <label>Tốt nghiệp từ trường</label>
                        <Dropdown
                          value={selectedGraduate}
                          onChange={(e) => setSelectedGraduate(e.value)}
                          options={medicalSchoolsInVietnam}
                          placeholder="Chọn trường đã tốt nghiệp"
                          className="w-full "
                        />
                      </div>

                      <div className="flex flex-col gap-2 w-full">
                        <label>Chuyên khoa</label>
                        <Dropdown
                          value={selectedSpecialization}
                          onChange={(e) => setSelectedSpecialization(e.value)}
                          options={commonSpecialtiesInPrivateClinics}
                          placeholder="Chọn chuyên khoa"
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

                    <div className="flex items-center gap-5 justify-center mt-10">
                      <Button
                        type="button"
                        onClick={() => navigate("/doctor")}
                        label="Quay về"
                        severity="secondary"
                      />
                      <Button
                        type="submit"
                        label="Xác nhận"
                        disabled={isSubmitting}
                      />
                    </div>
                  </form>
                </div>
              </TabPanel>
              <TabPanel header="Cập nhật thông tin giới thiệu">
                <div className="m-0">
                  <Editor
                    value={text}
                    onTextChange={(e) => setText(e.htmlValue)}
                    style={{ height: "320px" }}
                  />

                  <div className="flex items-center gap-5 justify-end mt-10">
                    <Button
                      type="button"
                      onClick={() => navigate("/doctor")}
                      label="Quay về"
                      severity="secondary"
                    />
                    <Button
                      type="button"
                      label="Xác nhận"
                      onClick={handleUpdateDescription}
                    />
                  </div>
                </div>
              </TabPanel>
              <TabPanel header="Cập nhật mật khẩu">
                <div className="m-0">
                  <UpdatePassowrd doctorId={doctorId} />
                </div>
              </TabPanel>
              <TabPanel header="Cập nhật tài khoản">
                <div className="m-0 space-y-5">
                  <div className="flex flex-col gap-2 ">
                    <label>Trạng thái tài khoản</label>
                    <div className="flex items-center gap-2">
                      <Dropdown
                        value={selectedSatus}
                        onChange={(e) => setSelectedStatus(e.value)}
                        options={accountStatus}
                        placeholder="Chọn trạng thái tài khoản"
                        className="flex-1"
                      />
                      <Button
                        onClick={handleUpdateStatus}
                        type="submit"
                        label="Cập nhật"
                        className="w-fit"
                      />
                    </div>
                  </div>

                  <Divider />

                  <div className="space-y-5">
                    <div className="flex flex-col gap-2 ">
                      <label>Buộc thôi việc</label>
                      <Dropdown
                        value={selectedReason}
                        onChange={(e) => setSelectedReason(e.value)}
                        options={terminationReasons}
                        placeholder="Chọn lí do buộc thôi việc"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label>Lí do khác</label>
                      <InputTextarea
                        autoResize
                        value={otherReason}
                        onChange={(e) => setOtherReason(e.target.value)}
                        placeholder="Vui lòng điền lí do khác nếu có"
                        rows={5}
                        cols={30}
                      />
                    </div>

                    <div className="flex items-center gap-5 justify-end">
                      <Button
                        type="button"
                        onClick={() => navigate("/doctor")}
                        label="Quay về"
                        severity="secondary"
                      />

                      <Button
                        type="submit"
                        label="Gửi email buộc thôi việc"
                        onClick={handleFiredDoctor}
                      />
                    </div>
                  </div>
                </div>
              </TabPanel>
            </TabView>
          </section>
        </div>
      </section>
    </div>
  );
};

export default UpdateDoctor;

function UpdatePassowrd({ doctorId }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onchange",
    resolver: yupResolver(passwordSchema),
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

      await updateDoctorApi(doctorId, body);

      toast.current.show({
        severity: "success",
        summary: "Thay đổi mật khẩu thành công",
        life: 1500,
      });

      reset();
    } catch (error) {
      console.log("Error: ", error);
      toast.current.show({
        severity: "error",
        summary: "Lỗi",
        life: 1500,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(handleUpdatePassword)} className="space-y-5">
      <Toast ref={toast} />

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

      <div className="flex items-center gap-5 justify-end mt-10">
        <Button
          type="button"
          onClick={() => navigate("/doctor")}
          label="Quay về"
          severity="secondary"
        />
        <Button type="submit" label="Xác nhận" disabled={isSubmitting} />
      </div>
    </form>
  );
}
