import useGetSupplierDetail from "./useGetSupplierDetail";
import toast from "react-hot-toast";
import TitleSection from "../../components/TitleSection";
import React, { useEffect } from "react";
import FieldInput from "../../components/FieldInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { updateSupplierApi } from "../../api/supplierApi";
import { supplierSchema } from "../../validations/supplierSchema";
import { Button } from "primereact/button";

const UpdateSupplier = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { detail, fetchDetail } = useGetSupplierDetail();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onchange",
    resolver: yupResolver(supplierSchema),
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
      const res = await updateSupplierApi(id, body);
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
      <TitleSection>Cập nhật nhà cung cấp</TitleSection>

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
                placeholder="Nhập tên nhà cung cấp"
              />

              <FieldInput
                label="Email"
                type="email"
                name="email"
                htmlFor="email"
                register={register}
                errorMessage={errors?.email?.message}
                placeholder="Nhập email nhà cung cấp"
              />

              <FieldInput
                label="Số điện thoại"
                type="text"
                name="phone"
                htmlFor="phone"
                register={register}
                errorMessage={errors?.phone?.message}
                placeholder="Nhập sđt nhà cung cấp"
              />

              <FieldInput
                label="Địa chỉ"
                type="text"
                name="address"
                htmlFor="address"
                register={register}
                errorMessage={errors?.address?.message}
                placeholder="Nhập địa chỉ nhà cung cấp"
              />
            </div>

            <div className="flex items-center justify-end gap-3">
              <Button
                type="button"
                onClick={() => navigate("/supplier")}
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

export default UpdateSupplier;
