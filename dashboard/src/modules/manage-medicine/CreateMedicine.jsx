import useGetMedicineCategories from "../../hooks/useGetMedicineCategories";
import toast from "react-hot-toast";
import TitleSection from "../../components/TitleSection";
import React, { useEffect, useState } from "react";
import FieldTextarea from "../../components/FieldTextarea";
import FieldInput from "../../components/FieldInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { medicineSchema } from "../../validations/medicineSchema";
import { MEDICINE_UNITS } from "../../utils/constants";
import { Dropdown } from "primereact/dropdown";
import { createMedicineApi } from "../../api/medicineApi";
import { Button } from "primereact/button";

const CreateMedicine = () => {
  const navigate = useNavigate();
  const { categories, fetchCategories } = useGetMedicineCategories();
  const [selectedValue, setSelectedValue] = useState({
    unit: null,
    category: null,
  });

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
      stock: 500,
      description: "",
    },
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const onCreate = async (values) => {
    const { unit, category } = selectedValue;

    if (!unit || !category) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }

    try {
      const body = {
        ...values,
        unit,
        category,
      };

      console.log(body);

      const res = await createMedicineApi(body);

      if (res) toast.success("Tạo mới hoàn tất");
    } catch (error) {
      console.log("Lỗi tạo mới: ", error);
      toast.error("Lỗi tạo mới");
    } finally {
      reset();
      setSelectedValue({
        unit: null,
        category: null,
      });
    }
  };

  return (
    <div>
      <TitleSection>Tạo mới thuốc</TitleSection>

      <form
        onSubmit={handleSubmit(onCreate)}
        className="space-y-8 w-full max-w-3xl mx-auto mt-10"
      >
        <div className="grid gap-5">
          <FieldInput
            label="Tên"
            type="text"
            name="name"
            htmlFor="name"
            register={register}
            errorMessage={errors?.name?.message}
            placeholder="Tên thuốc"
          />

          <FieldInput
            label="Giá tiền"
            type="number"
            name="price"
            htmlFor="price"
            register={register}
            errorMessage={errors?.price?.message}
            placeholder="Giá tiền"
          />

          <FieldInput
            label="Tồn kho"
            type="number"
            name="stock"
            htmlFor="stock"
            register={register}
            errorMessage={errors?.stock?.message}
            placeholder="Tồn kho"
          />

          <div className="flex flex-col gap-2">
            <label>Đơn vị</label>
            <Dropdown
              filter
              filterPlaceholder="Tìm kiếm"
              options={MEDICINE_UNITS}
              placeholder="Chọn đơn vị thuốc"
              scrollHeight="400px"
              value={selectedValue.unit}
              onChange={(e) =>
                setSelectedValue((prev) => ({ ...prev, unit: e.value }))
              }
            />
          </div>

          <div className="flex flex-col gap-2">
            <label>Danh mục</label>
            <Dropdown
              filter
              filterPlaceholder="Tìm kiếm"
              options={categories}
              scrollHeight="400px"
              optionValue="_id"
              optionLabel="name"
              placeholder="Chọn danh mục thuốc"
              value={selectedValue.category}
              onChange={(e) =>
                setSelectedValue((prev) => ({ ...prev, category: e.value }))
              }
            />
          </div>

          <FieldTextarea
            label="Mô tả"
            type="text"
            name="description"
            htmlFor="description"
            register={register}
            errorMessage={errors?.description?.message}
            placeholder="Mô tả"
          />
        </div>

        <div className="flex items-center justify-end gap-3">
          <Button
            type="button"
            onClick={() => navigate("/medicine")}
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
  );
};

export default CreateMedicine;
