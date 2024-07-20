import useGetMedicineDetail from "./useGetMedicineDetail";
import useGetMedicineCategories from "../../hooks/useGetMedicineCategories";
import toast from "react-hot-toast";
import TitleSection from "../../components/TitleSection";
import React, { useEffect, useState } from "react";
import FieldTextarea from "../../components/FieldTextarea";
import FieldInput from "../../components/FieldInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { updateMedicineApi } from "../../api/medicineApi";
import { medicineSchema } from "../../validations/medicineSchema";
import { MEDICINE_UNITS } from "../../utils/constants";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";

const UpdateMedicine = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { categories, fetchCategories } = useGetMedicineCategories();
  const { detail, fetchDetail } = useGetMedicineDetail();

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
  });

  useEffect(() => {
    fetchCategories();
    fetchDetail(id);
  }, []);

  useEffect(() => {
    if (detail) {
      reset({ ...detail });
      setSelectedValue({
        unit: detail.unit,
        category: detail.category,
      });
    }
  }, [detail, reset]);

  const onUpdate = async (values) => {
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

      const res = await updateMedicineApi(id, body);

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
      <TitleSection>Cập nhật thuốc</TitleSection>

      <form
        onSubmit={handleSubmit(onUpdate)}
        className="space-y-8 w-full max-w-3xl mx-auto"
      >
        <div className="grid gap-5">
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
          />
        </div>

        <div className="flex items-center justify-end gap-3">
          <Button
            type="button"
            onClick={() => navigate("/medicine")}
            label="Quay về"
            severity="secondary"
          />

          <Button type="submit" label="Xác nhận" disabled={isSubmitting} />
        </div>
      </form>
    </div>
  );
};

export default UpdateMedicine;
