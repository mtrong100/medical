import useManageMedicineCategory from "./useManageMedicineCategory";
import UpdateMedicineCategory from "./UpdateMedicineCategory";
import TitleSection from "../../components/TitleSection";
import React, { useState } from "react";
import CreateMedicineCategory from "./CreateMedicineCategory";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import TableToolbar from "../../components/TableToolbar";
import { createdAtBodyTemplate } from "../../utils/columnTemplate";
import useGetMedicineStats from "../manage-medicine/useGetMedicineStats";
import MedicineCategoryChart from "./MedicineCategoryChart";
import PatientGenderPieChart from "./MedicineCategoryPieChart";

const ManageMedicineCategory = () => {
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [detail, setDetail] = useState(null);
  const { loadingStats, stats } = useGetMedicineStats();
  const {
    data,
    query,
    setQuery,
    fetchCategories,
    onDelete,
    exportCSV,
    exportPdf,
    exportExcel,
    dt,
  } = useManageMedicineCategory();

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex items-center gap-2">
        <Button
          icon="pi pi-pencil"
          outlined
          onClick={() => {
            setVisible2(true);
            setDetail(rowData);
          }}
        />
        <Button
          icon="pi pi-trash"
          outlined
          severity="danger"
          onClick={() => onDelete(rowData._id)}
        />
      </div>
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <TitleSection>Quản lí danh mục thuốc</TitleSection>
        <Button
          label="Thêm danh mục mới"
          icon="pi pi-plus"
          onClick={() => setVisible(true)}
        />
      </div>

      <div className="mt-5 grid grid-cols-[minmax(0,_1fr)_400px] gap-5">
        <MedicineCategoryChart
          loading={loadingStats}
          dataSet={stats?.medicineCount}
          labels={stats?.categories}
        />
        <PatientGenderPieChart
          loading={loadingStats}
          dataSet={stats?.medicineCount}
          labels={stats?.categories}
        />
      </div>

      <div className="mt-5">
        <DataTable
          ref={dt}
          value={data}
          paginator
          rows={5}
          paginatorLeft
          rowsPerPageOptions={[5, 10, 25, 50]}
          scrollable
          stripedRows
          showGridlines
          emptyMessage="Không tìm thấy dữ liệu"
          className="bg-white border-gray-200 shadow-sm border rounded-md"
          header={
            <TableToolbar
              query={query}
              setQuery={setQuery}
              onExportCSV={exportCSV}
              onExportPdf={exportPdf}
              onExportExcel={exportExcel}
            />
          }
        >
          <Column field="_id" header="Mã danh mục" sortable />
          <Column field="name" header="Tên" sortable />
          <Column field="medicineCount" header="Số lượng" sortable />
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

      <CreateMedicineCategory
        visible={visible}
        setVisible={setVisible}
        onReload={fetchCategories}
      />

      <UpdateMedicineCategory
        visible2={visible2}
        setVisible2={setVisible2}
        detail={detail}
        onReload={fetchCategories}
      />
    </div>
  );
};

export default ManageMedicineCategory;
