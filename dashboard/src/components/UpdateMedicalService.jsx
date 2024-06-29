import React, { useEffect, useRef } from "react";
import { Dialog } from "primereact/dialog";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FieldInput from "./FieldInput";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { medicalServiceSchema } from "../validations/medicalServiceSchema";
import FieldTextarea from "./FieldTextarea";
import { updateMedicalServiceApi } from "../api/medicalServiceApi";

const UpdateMedicalService = ({
  visible2,
  setVisible2,
  onRefresh = () => {},
  updateVal,
}) => {
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

  const toast = useRef(null);

  useEffect(() => {
    if (updateVal) {
      reset({ ...updateVal });
    }
  }, [reset, updateVal]);

  const handleUpdateService = async (values) => {
    try {
      const body = { ...values };

      const res = await updateMedicalServiceApi(updateVal._id, body);

      if (res) {
        toast.current.show({
          severity: "success",
          summary: "Thao tác hoàn tất",
          life: 1500,
        });
      }
    } catch (error) {
      console.log("Error updating service:", error);
      toast.current.show({
        severity: "error",
        summary: "Lỗi",
        life: 1500,
      });
    } finally {
      setVisible2(false);
      onRefresh();
      reset();
    }
  };

  return (
    <>
      <Toast ref={toast} />

      <Dialog
        header="Form cập nhật dịch vụ khám"
        visible={visible2}
        style={{ width: "30vw" }}
        onHide={() => {
          if (!visible2) return;
          setVisible2(false);
        }}
      >
        <div className="m-0">
          <form onSubmit={handleSubmit(handleUpdateService)}>
            <div className="space-y-3">
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
    </>
  );
};

export default UpdateMedicalService;
