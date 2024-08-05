import useManagePrescription from "./useManagePrescription";
import TitleSection from "../../components/TitleSection";
import React from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import TableToolbar from "../../components/TableToolbar";
import {
  createdAtBodyTemplate,
  statusBodyTemplate,
  totalPriceColumn,
} from "../../utils/columnTemplate";

const ManagePrescription = () => {
  const navigate = useNavigate();
  const {
    data,
    query,
    setQuery,
    onDelete,
    dt,
    exportCSV,
    exportPdf,
    exportExcel,
  } = useManagePrescription();

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex items-center gap-2 ">
        <Button
          icon="pi pi-eye"
          outlined
          severity="secondary"
          onClick={() => navigate(`/prescription/${rowData._id}`)}
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
        <TitleSection>Quản lí hóa đơn thuốc</TitleSection>
        <Button
          label="Kê toa đơn thuốc mới"
          icon="pi pi-plus"
          onClick={() => navigate("/prescription/create")}
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
          <Column field="_id" header="Mã hóa đơn" sortable />
          <Column field="doctor" header="Bác sĩ" sortable />
          <Column field="patient" header="Bệnh nhân" sortable />
          <Column
            field="total"
            header="Tổng tiền"
            sortable
            body={totalPriceColumn}
          />
          <Column
            field="status"
            header="Trạng thái"
            sortable
            body={statusBodyTemplate}
          />
          <Column
            field="createdAt"
            header="Ngày tạo"
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
    </div>
  );
};

export default ManagePrescription;
