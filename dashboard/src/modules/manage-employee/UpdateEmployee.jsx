import useUpdateAvatar from "./useUpdateAvatar";
import useGetEmployeeDetail from "./useGetEmployeeDetail";
import toast from "react-hot-toast";
import TitleSection from "../../components/TitleSection";
import React, { useEffect, useState } from "react";
import FileInput from "../../components/FileInput";
import FieldInput from "../../components/FieldInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { updatedEmployeeSchema } from "../../validations/employeeSchema";
import { TabView, TabPanel } from "primereact/tabview";
import { ProgressSpinner } from "primereact/progressspinner";
import { InputTextarea } from "primereact/inputtextarea";
import { Image } from "primereact/image";
import { formatDate, getEmployeeSalary, parseDate } from "../../utils/helper";
import { Editor } from "primereact/editor";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import {
  terminatedEmployeeApi,
  updateEmployeeApi,
} from "../../api/employeeApi";
import {
  commonSpecialtiesInPrivateClinics,
  employeeStatus,
  genders,
  medicalSchoolsInVietnam,
  roles,
  terminationReasons,
} from "../../utils/constants";

const UpdateEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { detail, loading, fetchDetail } = useGetEmployeeDetail();
  const { isUploading, onUpload } = useUpdateAvatar(fetchDetail);
  const [text, setText] = useState("");
  const [pending, setPending] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [selectedReason, setSelectedReason] = useState(null);
  const [otherReason, setOtherReason] = useState("");
  const [selectedValue, setSelectedValue] = useState({
    gender: null,
    dateOfBirth: null,
    role: null,
    graduatedFrom: null,
    specialization: null,
    status: null,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onchange",
    resolver: yupResolver(updatedEmployeeSchema),
  });

  useEffect(() => {
    fetchDetail(id);
  }, []);

  useEffect(() => {
    if (detail) {
      reset({ ...detail });
      setSelectedValue({
        gender: detail?.gender,
        dateOfBirth: parseDate(detail?.dateOfBirth),
        role: detail?.role,
        graduatedFrom: detail?.graduatedFrom,
        specialization: detail?.specialization,
        status: detail?.status,
      });
    }
  }, [detail, reset]);

  useEffect(() => {
    if (selectedValue.role) {
      reset({
        salary: getEmployeeSalary(selectedValue.role),
      });
    }
  }, [reset, selectedValue.role]);

  const onUpdate = async (values) => {
    const { gender, role, graduatedFrom, specialization, dateOfBirth, status } =
      selectedValue;

    if (
      !gender ||
      !graduatedFrom ||
      !specialization ||
      !role ||
      !dateOfBirth ||
      !status
    ) {
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
        status,
        dateOfBirth: formatDate(dateOfBirth),
      };

      const res = await updateEmployeeApi(id, body);

      if (res) toast.success("Cập nhật hoàn tất");
    } catch (error) {
      console.log("Lỗi cập nhật: ", error);
      toast.error("Lỗi cập nhật");
    } finally {
      fetchDetail(detail._id);
    }
  };

  const onUpdateDesc = async () => {
    setPending(true);

    try {
      const body = { description: text };
      const res = await updateEmployeeApi(id, body);
      if (res) toast.success("Cập nhật hoàn tất");
    } catch (error) {
      console.log("Lỗi cập nhật: ", error);
      toast.error("Lỗi cập nhật");
    } finally {
      setPending(false);
      fetchDetail(id);
    }
  };

  const onTerminate = async () => {
    if (!selectedReason && !otherReason) {
      toast.error("Vui lòng chọn hoặc điền lí do buộc thôi việc");
      return;
    }

    setIsSending(true);

    try {
      const body = {
        name: detail?.name,
        email: detail?.email,
        reason: selectedReason || otherReason,
      };

      const res = await terminatedEmployeeApi(id, body);

      if (res) toast.success("Gửi email buộc thôi việc hoàn tất");
    } catch (error) {
      console.log("Lỗi thao tác: ", error);
      toast.error("Lỗi thao tác");
    } finally {
      setIsSending(false);
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
      <TitleSection>Cập nhật nhân viên</TitleSection>

      <section className="mt-10">
        <div className="grid grid-cols-[350px_minmax(0,1fr)] gap-5 items-start place-items-center">
          <div className="space-y-2 flex flex-col mx-auto justify-center items-center">
            <Image
              src={detail?.avatar}
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
              onUpload={(event) => onUpload(event, id)}
              isUploading={isUploading}
            />
          </div>

          <section className="w-full max-w-5xl mx-auto">
            <TabView>
              <TabPanel header="Thông tin cá nhân">
                <div className="m-0">
                  <form onSubmit={handleSubmit(onUpdate)} className="space-y-8">
                    <div className="grid grid-cols-2 gap-5">
                      <FieldInput
                        label="Tên"
                        name="name"
                        htmlFor="name"
                        register={register}
                        errorMessage={errors?.name?.message}
                        placeholder="Tên nhân viên"
                      />

                      <FieldInput
                        label="Số điện thoại"
                        name="phoneNumber"
                        htmlFor="phoneNumber"
                        register={register}
                        errorMessage={errors?.phoneNumber?.message}
                        placeholder="Số điện thoại"
                      />

                      <FieldInput
                        label="Địa chỉ"
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
                          placeholder="Ngày sinh"
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
                            setSelectedValue((prev) => ({
                              ...prev,
                              role: e.value,
                            }))
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

                      <div className="flex flex-col gap-2">
                        <label>Trạng thái</label>
                        <Dropdown
                          options={employeeStatus}
                          placeholder="Chọn trạng thái"
                          className="w-full "
                          value={selectedValue.status}
                          onChange={(e) =>
                            setSelectedValue((prev) => ({
                              ...prev,
                              status: e.value,
                            }))
                          }
                        />
                      </div>
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
              </TabPanel>
              <TabPanel header="Giới thiệu">
                <div className="m-0">
                  <Editor
                    value={text}
                    onTextChange={(e) => setText(e.htmlValue)}
                    style={{ height: "320px" }}
                  />

                  <div className="flex items-center gap-3 justify-end mt-5">
                    <Button
                      type="button"
                      onClick={() => navigate("/employee")}
                      label="Quay về"
                      severity="secondary"
                      icon="pi pi-arrow-left"
                    />
                    <Button
                      type="button"
                      label="Xác nhận"
                      disabled={pending}
                      onClick={onUpdateDesc}
                      icon="pi pi-check-circle"
                    />
                  </div>
                </div>
              </TabPanel>
              <TabPanel header="Thao tác khác">
                <div className="m-0">
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

                    <div className="flex items-center gap-3 justify-end">
                      <Button
                        type="button"
                        onClick={() => navigate("/employee")}
                        label="Quay về"
                        severity="secondary"
                        icon="pi pi-arrow-left"
                      />

                      <Button
                        type="submit"
                        label="Gửi email"
                        onClick={onTerminate}
                        disabled={isSending}
                        icon="pi pi-envelope"
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

export default UpdateEmployee;
