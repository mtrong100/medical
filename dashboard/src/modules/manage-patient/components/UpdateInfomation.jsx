import toast from "react-hot-toast";
import React, { useEffect, useState } from "react";
import FieldInput from "../../../components/FieldInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { updatePatientSchema } from "../../../validations/patientSchema";
import { updatePatientApi } from "../../../api/patientApi";
import { formatDate, parseDate } from "../../../utils/helper";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { accountStatus, genders } from "../../../utils/constants";
import useGetPatientDetail from "../hooks/useGetPatientDetail";

const UpdateInfomation = ({ data }) => {
  const navigate = useNavigate();
  const { fetchDetail } = useGetPatientDetail();

  const [selectedValue, setSelectedValue] = useState({
    gender: null,
    status: null,
    dateOfBirth: null,
  });

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

  useEffect(() => {
    if (data) {
      reset({ ...data });
      setSelectedValue({
        gender: data.gender,
        status: data.status,
        dateOfBirth: parseDate(data.dateOfBirth),
      });
    }
  }, [data, reset]);

  const onUpdate = async (values) => {
    const { dateOfBirth, gender, status } = selectedValue;

    if (!dateOfBirth || !gender || !status) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }

    try {
      const body = {
        ...values,
        gender,
        status,
        dateOfBirth: formatDate(dateOfBirth),
      };

      const res = await updatePatientApi(data._id, body);
      if (res) toast.success("Thao tác cập nhật hoàn tất");
    } catch (error) {
      console.log("Lỗi cập nhật: ", error);
      toast.error("Lỗi cập nhật");
    } finally {
      fetchDetail(data._id);
    }
  };

  return (
    <form onSubmit={handleSubmit(onUpdate)} className="space-y-8">
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
              setSelectedValue((prev) => ({ ...prev, dateOfBirth: e.value }))
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
          <label>Trạng thái</label>
          <Dropdown
            placeholder="Chọn trạng thái"
            className="w-full "
            options={accountStatus}
            value={selectedValue.status}
            onChange={(e) =>
              setSelectedValue((prev) => ({ ...prev, status: e.value }))
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
  );
};

export default UpdateInfomation;
