import React, { useEffect, useRef, useState } from "react";
import TitleSection from "../components/TitleSection";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import {
  createNewMedicineCategoryApi,
  deleteMedicineCategoryApi,
  getAllMedicineCategoriesApi,
  updateMedicineCategoryApi,
} from "../api/medicineCategoryApi";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import useDebounce from "../hooks/useDebounce";
import { InputText } from "primereact/inputtext";
import { formatDate } from "../utils/helper";
import { Dialog } from "primereact/dialog";
import Swal from "sweetalert2";
import { Toast } from "primereact/toast";

const ManageMedicineCategory = () => {
  const navigate = useNavigate();
  const dt = useRef(null);
  const toast = useRef(null);
  const [medicineCategories, setMedicineCategories] = useState([]);
  const [loading, setloading] = useState(false);
  const [query, setQuery] = useState("");
  const queryValue = useDebounce(query, 500);
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [newValue, setNewValue] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateValue, setUpdateValue] = useState("");
  const [updateCategory, setUpdateCategory] = useState(null);

  const filteredCategories = medicineCategories.filter((item) => {
    return (
      item.name.toLowerCase().includes(queryValue.toLowerCase()) ||
      item._id.includes(queryValue)
    );
  });

  useEffect(() => {
    fetchMedicineCategories();
  }, []);

  useEffect(() => {
    if (updateCategory) {
      setUpdateValue(updateCategory?.name);
    }
  }, [updateCategory]);

  const handleAddNewCategory = async () => {
    if (!newValue.trim()) {
      toast.current.show({
        severity: "error",
        summary: "Vui lòng nhập tên danh mục",
        life: 1500,
      });

      return;
    }

    setIsAdding(true);
    try {
      const res = await createNewMedicineCategoryApi({ name: newValue });
      if (res) {
        setVisible(false);
        setNewValue("");
        fetchMedicineCategories();
      }
    } catch (error) {
      console.log("Error adding new category:", error);
    } finally {
      setIsAdding(false);
    }
  };

  const handleUpdateCategory = async () => {
    if (!updateValue.trim()) {
      toast.current.show({
        severity: "error",
        summary: "Vui lòng nhập tên danh mục",
        life: 1500,
      });

      return;
    }

    setIsUpdating(true);
    try {
      const res = await updateMedicineCategoryApi(updateCategory?._id, {
        name: updateValue,
      });
      if (res) {
        setVisible2(false);
        setUpdateValue("");
        fetchMedicineCategories();
      }
    } catch (error) {
      console.log("Error updating category:", error);
    } finally {
      setIsUpdating(false);
      setUpdateCategory(null);
    }
  };

  const handleDeleteCategory = async (id) => {
    Swal.fire({
      title: "Bạn có chắc chắn?",
      text: "Bạn sẽ không thể hoàn tác điều này!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Vâng, xóa nó đi!",
      cancelButtonText: "Hủy bỏ",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteMedicineCategoryApi(id);
          if (res) {
            Swal.fire("Đã xóa!", "Danh mục đã được xóa.", "success");
            fetchMedicineCategories();
          }
        } catch (error) {
          console.log("Lỗi khi xóa danh mục:", error);
          Swal.fire("Lỗi!", `${error.message}`, "error");
        }
      }
    });
  };

  const fetchMedicineCategories = async () => {
    setloading(true);
    try {
      const res = await getAllMedicineCategoriesApi();
      if (res) setMedicineCategories(res);
    } catch (error) {
      console.log("Error fetching medicine categories:", error);
      setMedicineCategories([]);
    } finally {
      setloading(false);
    }
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex items-center gap-2">
        <Button
          icon="pi pi-pencil"
          rounded
          onClick={() => {
            setVisible2(true);
            setUpdateCategory(rowData);
          }}
        />
        <Button
          icon="pi pi-trash"
          rounded
          severity="danger"
          onClick={() => handleDeleteCategory(rowData._id)}
        />
      </div>
    );
  };

  const header = (
    <div className="flex items-center justify-end">
      <div className="p-inputgroup max-w-md">
        <InputText
          placeholder="Tìm kiếm"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button icon="pi pi-search" />
      </div>
    </div>
  );

  const createdAtBodyTemplate = (rowData) => {
    return <div>{formatDate(rowData.createdAt)}</div>;
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <TitleSection>Quản lí danh mục thuốc</TitleSection>
        <Button
          label="Thêm mới"
          icon="pi pi-plus"
          onClick={() => setVisible(true)}
        />
      </div>

      <div className="mt-5">
        <DataTable
          ref={dt}
          value={filteredCategories}
          header={header}
          scrollable
          stripedRows
          showGridlines
          emptyMessage="Không tìm thấy nhân viên"
        >
          <Column field="_id" header="ID" sortable />
          <Column field="name" header="Danh mục thuốc" sortable />
          <Column field="medicineCount" header="Số lượng thuốc" sortable />
          <Column
            field="createdAt"
            header="Ngày thêm"
            sortable
            body={createdAtBodyTemplate}
          />
          <Column
            body={actionBodyTemplate}
            exportable={false}
            header="Thao tác"
          />
        </DataTable>
      </div>

      {/* Add new dialog */}
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
            onClick={handleAddNewCategory}
            disabled={isAdding}
            label="Xác nhận"
            className="w-full mt-5"
          />
        </div>
      </Dialog>

      {/* Update dialog */}
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
              value={updateValue}
              onChange={(e) => setUpdateValue(e.target.value)}
            />
          </div>
          <Button
            onClick={handleUpdateCategory}
            disabled={isUpdating}
            label="Xác nhận"
            className="w-full mt-5"
          />
        </div>
      </Dialog>

      <Toast ref={toast} />
    </div>
  );
};

export default ManageMedicineCategory;
