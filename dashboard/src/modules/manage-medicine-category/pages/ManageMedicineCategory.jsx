import useManageMedicineCategory from "../hooks/useManageMedicineCategory";
import UpdateMedicineCategory from "../components/UpdateMedicineCategory";
import TitleSection from "../../../components/TitleSection";
import React, { useState } from "react";
import CreateMedicineCategory from "../components/CreateMedicineCategory";
import { LIMIT_AMOUNT } from "../../../utils/constants";
import { InputText } from "primereact/inputtext";
import { formatDate } from "../../../utils/helper";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

const ManageMedicineCategory = () => {
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [detail, setDetail] = useState(null);

  const {
    data,
    query,
    setQuery,
    fetchCategories,
    onDelete,
    onPrevPage,
    onNextPage,
    paginator,
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
          rounded
          onClick={() => {
            setVisible2(true);
            setDetail(rowData);
          }}
        />
        <Button
          icon="pi pi-trash"
          rounded
          severity="danger"
          onClick={() => onDelete(rowData._id)}
        />
      </div>
    );
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
          value={data}
          header={header}
          scrollable
          stripedRows
          showGridlines
          emptyMessage="Không tìm thấy nhân viên"
        >
          <Column field="_id" header="ID" sortable />
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

      {/* Pagination */}
      {paginator.totalResults > LIMIT_AMOUNT && (
        <div className="flex items-center  justify-end mt-8 gap-2">
          <Button
            severity="secondary"
            onClick={onPrevPage}
            icon="pi pi-angle-left"
          />
          <div className="flex items-center gap-2 text-xl font-semibold">
            <p>{paginator.currentPage}</p> / <p>{paginator.totalPages}</p>
          </div>
          <Button
            severity="secondary"
            onClick={onNextPage}
            icon="pi pi-angle-right"
          />
        </div>
      )}

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
