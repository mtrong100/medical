import React, { useRef } from "react";
import { Dialog } from "primereact/dialog";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FieldInput from "./FieldInput";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { medicalServiceSchema } from "../validations/medicalServiceSchema";
import FieldTextarea from "./FieldTextarea";
import { createNewMedicalServiceApi } from "../api/medicalServiceApi";

const CreateNewMedicalService = ({
  visible,
  setVisible,
  onRefresh = () => {},
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

  const handleCreateNewService = async (values) => {
    try {
      const body = { ...values };

      const res = await createNewMedicalServiceApi(body);

      if (res) {
        toast.current.show({
          severity: "success",
          summary: "Thao tác hoàn tất",
          life: 1500,
        });
      }
    } catch (error) {
      console.log("Error creating new service:", error);
      toast.current.show({
        severity: "error",
        summary: "Lỗi",
        life: 1500,
      });
    } finally {
      setVisible(false);
      onRefresh();
      reset();
    }
  };

  return (
    <>
      <Toast ref={toast} />

      <Dialog
        header="Form thêm dịch vụ khám mới"
        visible={visible}
        style={{ width: "30vw" }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
        <div className="m-0">
          <form onSubmit={handleSubmit(handleCreateNewService)}>
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

export default CreateNewMedicalService;
