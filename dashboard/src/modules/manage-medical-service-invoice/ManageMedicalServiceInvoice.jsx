import useManageMedicalServiceInvoice from "./useManageMedicalServiceInvoice";
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
import useGetMedicalServiceInvocieStats from "./useGetMedicalServiceInvocieStats";
import MedicalServiceInvoiceByMonthChart from "./MedicalServiceInvoiceByMonthChart";
import MedicalServiceInvoiceStatusChart from "./MedicalServiceInvoiceStatusChart";

const ManageMedicalServiceInvoice = () => {
  const navigate = useNavigate();
  const { loadingStats, stats } = useGetMedicalServiceInvocieStats();
  const {
    data,
    query,
    setQuery,
    onDelete,
    dt,
    exportCSV,
    exportPdf,
    exportExcel,
  } = useManageMedicalServiceInvoice();

  console.log(stats);

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex items-center gap-2 ">
        <Button
          icon="pi pi-eye"
          outlined
          severity="secondary"
          onClick={() => navigate(`/medical-service-invoice/${rowData._id}`)}
        />
        <Button
          icon="pi pi-pencil"
          outlined
          severity="info"
          onClick={() =>
            navigate(`/medical-service-invoice/update/${rowData._id}`)
          }
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
        <TitleSection>Quản lí phiếu dịch vụ</TitleSection>
        <Button
          label="Lập phiếu dịch vụ mới"
          icon="pi pi-plus"
          onClick={() => navigate("/medical-service-invoice/create")}
        />
      </div>

      <div className="mt-5 grid grid-cols-[minmax(0,1fr),450px] gap-5">
        <MedicalServiceInvoiceByMonthChart
          loading={loadingStats}
          labels={stats?.months}
          dataSet={stats?.invoicesCountByMonth}
        />
        <MedicalServiceInvoiceStatusChart
          loading={loadingStats}
          dataSet={stats?.invoiceStatus}
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
          <Column field="_id" header="Mã phiếu dịch vụ" sortable />
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

export default ManageMedicalServiceInvoice;
