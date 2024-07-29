import useManageMedicalServiceInvoice from "./useManageMedicalServiceInvoice";
import TitleSection from "../../components/TitleSection";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Tag } from "primereact/tag";
import { LIMIT_AMOUNT, PAYMENT_STATUS } from "../../utils/constants";
import { InputText } from "primereact/inputtext";
import { formatCurrencyVND, formatDate } from "../../utils/helper";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

const ManageMedicalServiceInvoice = () => {
  const navigate = useNavigate();
  const {
    data,
    query,
    setQuery,
    onDelete,
    paginator,
    onPrevPage,
    onNextPage,
    dt,
    exportCSV,
    exportPdf,
    exportExcel,
  } = useManageMedicalServiceInvoice();

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex items-center gap-2 ">
        <Button
          icon="pi pi-eye"
          rounded
          severity="secondary"
          onClick={() => navigate(`/medical-service-invoice/${rowData._id}`)}
        />
        <Button
          icon="pi pi-pencil"
          rounded
          severity="info"
          onClick={() =>
            navigate(`/medical-service-invoice/update/${rowData._id}`)
          }
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

  const statusBodyTemplate = (rowData) => {
    return (
      <Tag
        value={rowData.status}
        rounded
        severity={
          rowData.status === PAYMENT_STATUS.UNPAID ? "danger" : "success"
        }
      />
    );
  };

  const createdAtBodyTemplate = (rowData) => {
    return <div>{formatDate(rowData.createdAt)}</div>;
  };

  const totalBodyTemplate = (rowData) => {
    return <div>{formatCurrencyVND(rowData.total)}</div>;
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

      <div className="mt-5">
        <DataTable
          ref={dt}
          scrollable
          stripedRows
          showGridlines
          emptyMessage="Không tìm thấy dữ liệu"
          value={data}
          header={header}
        >
          <Column field="_id" header="Mã phiếu dịch vụ" sortable />
          <Column field="patient" header="Bệnh nhân" sortable />
          <Column
            field="total"
            header="Tổng tiền"
            sortable
            body={totalBodyTemplate}
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
    </div>
  );
};

export default ManageMedicalServiceInvoice;
