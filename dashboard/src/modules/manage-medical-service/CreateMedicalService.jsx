import toast from "react-hot-toast";
import React from "react";
import FieldTextarea from "../../components/FieldTextarea";
import FieldInput from "../../components/FieldInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { medicalServiceSchema } from "../../validations/medicalServiceSchema";
import { Dialog } from "primereact/dialog";
import { createMedicalServiceApi } from "../../api/medicalServiceApi";
import { Button } from "primereact/button";

const CreateMedicalService = ({ visible, setVisible, onReload }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onchange",
    resolver: yupResolver(medicalServiceSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
    },
  });

  const onCreate = async (values) => {
    try {
      const body = { ...values };

      const res = await createMedicalServiceApi(body);

      if (res) toast.success("Tạo mới hoàn tất");
    } catch (error) {
      console.log("Lỗi tạo mới:", error);
      toast.error("Lỗi tạo mới");
    } finally {
      setVisible(false);
      onReload();
      reset();
    }
  };

  return (
    <Dialog
      header="Tạo mới dịch vụ khám"
      visible={visible}
      style={{ width: "30vw" }}
      onHide={() => {
        if (!visible) return;
        setVisible(false);
      }}
    >
      <div className="m-0">
        <form onSubmit={handleSubmit(onCreate)}>
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

export default CreateMedicalService;
