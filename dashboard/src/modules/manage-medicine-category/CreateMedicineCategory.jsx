import toast from "react-hot-toast";
import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { createMedicineCategoryApi } from "../../api/medicineCategoryApi";
import { Button } from "primereact/button";

const CreateMedicineCategory = ({ visible, setVisible, onReload }) => {
  const [newValue, setNewValue] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const onCreate = async () => {
    if (!newValue.trim()) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }

    setIsAdding(true);

    try {
      const res = await createMedicineCategoryApi({ name: newValue });
      if (res) toast.success("Tạo mới hoàn tất");
    } catch (error) {
      console.log("Lỗi tạo mới:", error);
      toast.error("Lỗi tạo mới");
    } finally {
      setIsAdding(false);
      setNewValue("");
      setVisible(false);
      onReload();
    }
  };

  return (
    <Dialog
      header="Thêm mới danh mục"
      visible={visible}
      style={{ width: "30vw" }}
      onHide={() => {
        if (!visible) return;
        setVisible(false);
      }}
    >
      <div className="m-0">
        <div className="flex flex-col gap-2">
          <label htmlFor="category">Danh mục thuốc</label>
          <InputText
            id="category"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
          />
        </div>
        <Button
          onClick={onCreate}
          disabled={isAdding}
          label="Xác nhận"
          className="w-full mt-5"
        />
      </div>
    </Dialog>
  );
};

export default CreateMedicineCategory;
