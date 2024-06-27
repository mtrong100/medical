import React, { useRef, useState } from "react";
import { Dialog } from "primereact/dialog";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { medicineSchema } from "../validations/medicineSchema";
import FieldInput from "./FieldInput";
import { Dropdown } from "primereact/dropdown";
import FieldTextarea from "./FieldTextarea";
import { Button } from "primereact/button";
import { MEDICINE_UNITS } from "../utils/constants";
import { createNewMedicineApi } from "../api/medicineApi";
import { Toast } from "primereact/toast";

const CreateNewMedicineModal = ({
  medicineCategories = [],
  visible,
  setVisible,
  fetchMedicines = () => {},
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onchange",
    resolver: yupResolver(medicineSchema),
    defaultValues: {
      name: "",
      unit: "",
      price: 0,
      stock: 1000,
      description: "",
    },
  });

  const [selectedUnit, setSelectedUnit] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const toast = useRef(null);

  const handleCreateNewMedicine = async (values) => {
    try {
      const body = {
        ...values,
        unit: selectedUnit,
        category: selectedCategory,
      };

      await createNewMedicineApi(body);

      toast.current.show({
        severity: "success",
        summary: "Thêm mới hoàn tất",
        life: 1500,
      });
    } catch (error) {
      console.log("Error creating new medicine:", error);
      toast.current.show({
        severity: "error",
        summary: "Lỗi",
        life: 1500,
      });
    } finally {
      setVisible(false);
      fetchMedicines();
      reset();
    }
  };

  return (
    <>
      <Toast ref={toast} />

      <Dialog
        header="Nhập thuốc mới"
        visible={visible}
        style={{ width: "30vw" }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
        <div className="m-0">
          <form onSubmit={handleSubmit(handleCreateNewMedicine)}>
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
              <FieldInput
                label="Tồn kho"
                type="number"
                name="stock"
                htmlFor="stock"
                register={register}
                errorMessage={errors?.stock?.message}
              />
              <div className="flex flex-col gap-2">
                <label>Đơn vị</label>
                <Dropdown
                  value={selectedUnit}
                  onChange={(e) => setSelectedUnit(e.value)}
                  filter
                  filterPlaceholder="Tìm kiếm"
                  options={MEDICINE_UNITS}
                  placeholder="Chọn đơn vị"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label>Danh mục</label>
                <Dropdown
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.value)}
                  filter
                  filterPlaceholder="Tìm kiếm"
                  options={medicineCategories}
                  optionValue="_id"
                  optionLabel="name"
                  placeholder="Chọn danh mục thuốc"
                />
              </div>
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

export default CreateNewMedicineModal;
