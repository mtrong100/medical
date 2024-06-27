import React, { useEffect, useRef, useState } from "react";
import TitleSection from "../components/TitleSection";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { deleteMedicineApi, getAllMedicinesApi } from "../api/medicineApi";
import useDebounce from "../hooks/useDebounce";
import { InputText } from "primereact/inputtext";
import { formatCurrencyVND, formatDate } from "../utils/helper";
import { Dropdown } from "primereact/dropdown";
import { MEDICINE_UNITS } from "../utils/constants";
import { getAllMedicineCategoriesApi } from "../api/medicineCategoryApi";
import { font } from "../assets/font";
import CreateNewMedicineModal from "../components/CreateNewMedicineModal";
import UpdateMedicineModal from "../components/UpdateMedicineModal";
import Swal from "sweetalert2";

const cols = [
  { field: "_id", header: "ID" },
  { field: "name", header: "Tên" },
  { field: "unit", header: "Đơn vị" },
  { field: "price", header: "Giá tiền" },
  { field: "stock", header: "Tồn kho" },
  { field: "createdAt", header: "Ngày thêm" },
];

const ManageMedicine = () => {
  const dt = useRef(null);
  const [medicines, setMedcines] = useState([]);
  const [medicineCategories, setMedicineCategories] = useState([]);
  const [loading, setLoading] = useState([]);
  const [query, setQuery] = useState("");
  const queryValue = useDebounce(query, 500);
  const [filters, setFilters] = useState({
    unit: "",
    category: "",
  });
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [updateVal, setUpdateVal] = useState(null);

  useEffect(() => {
    fetchMedicineCategories();
  }, []);

  useEffect(() => {
    fetchMedicines();
  }, [filters]);

  const fetchMedicines = async () => {
    setLoading(true);
    try {
      const params = {
        ...filters,
      };

      const res = await getAllMedicinesApi(params);
      if (res) setMedcines(res);
    } catch (error) {
      console.log("Error fetching medicine categories:", error);
      setMedcines([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchMedicineCategories = async () => {
    try {
      const res = await getAllMedicineCategoriesApi();
      if (res) setMedicineCategories(res);
    } catch (error) {
      console.log("Error fetching medicine categories:", error);
      setMedicineCategories([]);
    }
  };

  const filteredMedicines = medicines.filter((item) => {
    return (
      item.name.toLowerCase().includes(queryValue.toLowerCase()) ||
      item._id.includes(queryValue) ||
      item.category.name.includes(queryValue)
    );
  });

  const resetFilter = () => {
    setFilters({
      unit: "",
      category: "",
    });
  };

  const deleteMedicine = async (medicine) => {
    Swal.fire({
      title: "Bạn có chắc chắn?",
      text: `Bạn có muốn xoá thuốc ${medicine.name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Có, xoá nó!",
      cancelButtonText: "Không, giữ lại",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteMedicineApi(medicine._id);
          if (res) {
            Swal.fire("Đã xoá!", "Dữ liệu đã được xóa.", "success");
            fetchMedicines();
          }
        } catch (error) {
          console.log("Error deleting medicine:", error);
          Swal.fire("Lỗi!", "Đã xảy ra sự cố khi xoá.", "error");
        }
      }
    });
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex items-center gap-2">
        <Button
          icon="pi pi-pencil"
          rounded
          onClick={() => {
            setVisible2(true);
            setUpdateVal(rowData);
          }}
        />
        <Button
          icon="pi pi-trash"
          rounded
          severity="danger"
          onClick={() => deleteMedicine(rowData)}
        />
      </div>
    );
  };

  /* ================ FILE EXPORT FEATURE ================ */
  const exportColumns = cols.map((col) => ({
    title: col.header,
    dataKey: col.field,
  }));

  const exportCSV = (selectionOnly) => {
    dt.current.exportCSV({ selectionOnly });
  };

  const exportPdf = () => {
    import("jspdf").then((jsPDF) => {
      import("jspdf-autotable").then(() => {
        const doc = new jsPDF.default(0, 0);

        // Add the custom font
        doc.addFileToVFS("Roboto-Regular.ttf", font);
        doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");
        doc.setFont("Roboto");

        doc.autoTable({
          columns: exportColumns,
          body: medicines,
          styles: {
            font: "Roboto",
          },
        });
        doc.save("medicines.pdf");
      });
    });
  };

  const exportExcel = () => {
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(medicines);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      saveAsExcelFile(excelBuffer, "medicines");
    });
  };

  const saveAsExcelFile = (buffer, fileName) => {
    import("file-saver").then((module) => {
      if (module && module.default) {
        let EXCEL_TYPE =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        let EXCEL_EXTENSION = ".xlsx";
        const data = new Blob([buffer], {
          type: EXCEL_TYPE,
        });

        module.default.saveAs(
          data,
          fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
        );
      }
    });
  };

  const header = (
    <div className="flex items-center justify-between">
      <div className="p-inputgroup max-w-md">
        <InputText
          placeholder="Tìm kiếm"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button icon="pi pi-search" />
      </div>

      <div className="flex items-center flex-shrink-0  gap-5">
        <Button
          type="button"
          icon="pi pi-file"
          label="Xuất file CSV"
          rounded
          onClick={() => exportCSV(false)}
          data-pr-tooltip="CSV"
        />
        <Button
          type="button"
          icon="pi pi-file-excel"
          severity="success"
          label="Xuất file Excel"
          rounded
          onClick={exportExcel}
          data-pr-tooltip="XLS"
        />
        <Button
          type="button"
          icon="pi pi-file-pdf"
          severity="warning"
          label="Xuất file PDF"
          rounded
          onClick={exportPdf}
          data-pr-tooltip="PDF"
        />
      </div>
    </div>
  );
  /* ====================================================== */

  const createdAtBodyTemplate = (rowData) => {
    return <div>{formatDate(rowData.createdAt)}</div>;
  };

  const priceBodyTemplate = (rowData) => {
    return <div>{formatCurrencyVND(rowData.price)}</div>;
  };

  const totalBodyTemplate = (rowData) => {
    return <div>{formatCurrencyVND(rowData.total || 0)} </div>;
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <TitleSection>Quản lí thuốc</TitleSection>
        <Button
          label="Thêm mới"
          icon="pi pi-plus"
          onClick={() => setVisible(true)}
        />
      </div>

      {/* Filter */}
      <div className="mt-5 grid grid-cols-[200px_minmax(0,_1fr)]">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">Bộ lọc: </h1>
          <Button onClick={resetFilter} label="Đặt lại" icon="pi pi-refresh" />
        </div>

        <div className="grid grid-cols-2 gap-5">
          <Dropdown
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.value })}
            filter
            filterPlaceholder="Tìm kiếm"
            options={medicineCategories}
            scrollHeight="400px"
            optionValue="_id"
            optionLabel="name"
            placeholder="Chọn danh mục thuốc"
          />
          <Dropdown
            value={filters.unit}
            onChange={(e) => setFilters({ ...filters, unit: e.value })}
            filter
            filterPlaceholder="Tìm kiếm"
            options={MEDICINE_UNITS}
            placeholder="Chọn đơn vị thuốc"
            scrollHeight="400px"
          />
        </div>
      </div>

      {/* Render data  */}
      <div className="mt-5">
        <DataTable
          ref={dt}
          value={filteredMedicines}
          header={header}
          scrollable
          stripedRows
          showGridlines
          emptyMessage="Không tìm thấy dữ liệu"
        >
          <Column field="_id" header="ID" sortable />
          <Column field="name" header="Tên" sortable />
          <Column field="unit" header="Đơn vị" sortable />
          <Column field="category.name" header="Danh mục" sortable />
          <Column
            field="price"
            header="Giá tiền"
            sortable
            body={priceBodyTemplate}
          />
          <Column field="stock" header="Tồn kho" sortable />
          <Column
            field="total"
            header="Tổng tiền"
            sortable
            body={totalBodyTemplate}
          />
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

      <CreateNewMedicineModal
        visible={visible}
        setVisible={setVisible}
        medicineCategories={medicineCategories}
        fetchMedicines={fetchMedicines}
      />

      <UpdateMedicineModal
        visible2={visible2}
        setVisible2={setVisible2}
        medicineCategories={medicineCategories}
        fetchMedicines={fetchMedicines}
        updateVal={updateVal}
      />
    </div>
  );
};

export default ManageMedicine;
