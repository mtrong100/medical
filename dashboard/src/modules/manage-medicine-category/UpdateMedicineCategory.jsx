import toast from "react-hot-toast";
import React, { useEffect, useState } from "react";
import { updateMedicineCategoryApi } from "../../api/medicineCategoryApi";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

const UpdateMedicineCategory = ({
  visible2,
  setVisible2,
  detail,
  onReload,
}) => {
  const [newValue, setNewValue] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (detail) {
      setNewValue(detail?.name);
    }
  }, [detail]);

  const onCreate = async () => {
    if (!newValue.trim()) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }

    setLoading(true);

    try {
      const res = await updateMedicineCategoryApi(detail?._id, {
        name: newValue,
      });

      if (res) toast.success("Cập nhật hoàn tất");
    } catch (error) {
      console.log("Lỗi cập nhật:", error);
      toast.error("Lỗi cập nhật");
    } finally {
      setLoading(false);
      setVisible2(false);
      onReload();
    }
  };

  return (
    <Dialog
      header="Cập nhật danh mục"
      visible={visible2}
      style={{ width: "30vw" }}
      onHide={() => {
        if (!visible2) return;
        setVisible2(false);
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
          disabled={loading}
          label="Xác nhận"
          className="w-full mt-5"
        />
      </div>
    </Dialog>
  );
};

export default UpdateMedicineCategory;
