import toast from "react-hot-toast";
import TitleSection from "../../components/TitleSection";
import React from "react";
import FieldInput from "../../components/FieldInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "primereact/button";
import { deviceSchema } from "../../validations/deviceSchema";
import { createDeviceApi } from "../../api/deviceApi";

const CreateDevice = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onchange",
    resolver: yupResolver(deviceSchema),
    defaultValues: {
      name: "",
      category: "Thiết bị y tế",
      price: 0,
      stock: 10,
    },
  });

  const onCreate = async (values) => {
    try {
      const body = { ...values };
      const res = await createDeviceApi(body);
      if (res) toast.success("Tạo mới hoàn tất");
    } catch (error) {
      console.log("Lỗi tạo mới: ", error);
      toast.error("Lỗi tạo mới");
    } finally {
      reset();
    }
  };

  return (
    <div>
      <TitleSection>Thêm mới thiết bị</TitleSection>

      <div className="mt-20">
        <div className="w-full  max-w-4xl mx-auto">
          <form onSubmit={handleSubmit(onCreate)} className="space-y-8">
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

export default CreateDevice;
