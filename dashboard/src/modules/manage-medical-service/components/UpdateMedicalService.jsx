import toast from "react-hot-toast";
import React, { useEffect } from "react";
import FieldTextarea from "../../../components/FieldTextarea";
import FieldInput from "../../../components/FieldInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { updateMedicalServiceApi } from "../../../api/medicalServiceApi";
import { medicalServiceSchema } from "../../../validations/medicalServiceSchema";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

const UpdateMedicalService = ({ visible2, setVisible2, detail, onReload }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onchange",
    resolver: yupResolver(medicalServiceSchema),
  });

  useEffect(() => {
    if (detail) {
      reset({ ...detail });
    }
  }, [detail, reset]);

  const onUpdate = async (values) => {
    try {
      const body = { ...values };

      const res = await updateMedicalServiceApi(detail?._id, body);

      if (res) toast.success("Tạo mới hoàn tất");
    } catch (error) {
      console.log("Lỗi tạo mới:", error);
      toast.error("Lỗi tạo mới");
    } finally {
      setVisible2(false);
      onReload();
    }
  };

  return (
    <Dialog
      header="Cập nhật dịch vụ khám"
      visible={visible2}
      style={{ width: "30vw" }}
      onHide={() => {
        if (!visible2) return;
        setVisible2(false);
      }}
    >
      <div className="m-0">
        <form onSubmit={handleSubmit(onUpdate)}>
          <div className="space-y-5">
            <FieldInput
              label="Tên"
              type="text"
              name="name"
              htmlFor="name"
              register={register}
              errorMessage={errors?.name?.message}
            />

            <FieldInput
              label="Giá tiền"
              type="number"
              name="price"
              htmlFor="price"
              register={register}
              errorMessage={errors?.price?.message}
            />

            <FieldTextarea
              label="Mô tả"
              type="text"
              name="description"
              htmlFor="description"
              register={register}
              errorMessage={errors?.description?.message}
            />

            <Button
              className="w-full"
              type="submit"
              label="Xác nhận"
              disabled={isSubmitting}
            />
          </div>
        </form>
      </div>
    </Dialog>
  );
};

export default UpdateMedicalService;
