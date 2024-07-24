import useGetDeviceDetail from "./useGetDeviceDetail";
import toast from "react-hot-toast";
import TitleSection from "../../components/TitleSection";
import React, { useEffect } from "react";
import FieldInput from "../../components/FieldInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { updateDeviceApi } from "../../api/deviceApi";
import { deviceSchema } from "../../validations/deviceSchema";
import { Button } from "primereact/button";

const UpdateDevice = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { detail, fetchDetail } = useGetDeviceDetail();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onchange",
    resolver: yupResolver(deviceSchema),
  });

  useEffect(() => {
    fetchDetail(id);
  }, []);

  useEffect(() => {
    if (detail) {
      reset({ ...detail });
    }
  }, [detail, reset]);

  const onUpdate = async (values) => {
    try {
      const body = { ...values };
      const res = await updateDeviceApi(id, body);
      if (res) toast.success("Cập nhật hoàn tất");
    } catch (error) {
      console.log("Lỗi cập nhật: ", error);
      toast.error("Lỗi cập nhật");
    } finally {
      fetchDetail(id);
    }
  };

  return (
    <div>
      <TitleSection>Cập nhật thiết bị</TitleSection>

      <div className="mt-20">
        <div className="w-full  max-w-4xl mx-auto">
          <form onSubmit={handleSubmit(onUpdate)} className="space-y-8">
            <div className="grid  gap-5">
              <FieldInput
                label="Tên"
                type="text"
                name="name"
                htmlFor="name"
                register={register}
                errorMessage={errors?.name?.message}
                placeholder="Nhập tên thiết bị"
              />

              <FieldInput
                label="Danh mục"
                type="text"
                name="category"
                htmlFor="category"
                register={register}
                errorMessage={errors?.category?.message}
                placeholder="Nhập danh mục"
              />

              <FieldInput
                label="Giá tiền"
                type="number"
                name="price"
                htmlFor="price"
                register={register}
                errorMessage={errors?.price?.message}
              />

              <FieldInput
                label="Tồn kho"
                type="number"
                name="stock"
                htmlFor="stock"
                register={register}
                errorMessage={errors?.stock?.message}
              />
            </div>

            <div className="flex items-center justify-end gap-3">
              <Button
                type="button"
                onClick={() => navigate("/device")}
                label="Quay về"
                severity="secondary"
              />

              <Button type="submit" label="Xác nhận" disabled={isSubmitting} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateDevice;
