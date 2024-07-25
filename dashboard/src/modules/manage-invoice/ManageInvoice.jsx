import useManageInvoice from "./useManageInvoice";
import TitleSection from "../../components/TitleSection";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tag } from "primereact/tag";
import { LIMIT_AMOUNT, PAYMENT_STATUS } from "../../utils/constants";
import { InputText } from "primereact/inputtext";
import { formatCurrencyVND, formatDate } from "../../utils/helper";
import { Fieldset } from "primereact/fieldset";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

const ManageInvoice = () => {
  const navigate = useNavigate();
  const [detail, setDetail] = useState(null);
  const [visible, setVisible] = useState(false);
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
    onExportPDF,
  } = useManageInvoice();

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

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex items-center gap-2 ">
        <Button
          icon="pi pi-eye"
          rounded
          severity="secondary"
          onClick={() => {
            setVisible(true);
            setDetail(rowData);
          }}
        />
        <Button
          icon="pi pi-print"
          rounded
          severity="help"
          onClick={() => onExportPDF(rowData)}
        />
        <Button
          icon="pi pi-pencil"
          rounded
          onClick={() => navigate(`/invoice/update/${rowData._id}`)}
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
        value={rowData.paymentStatus}
        rounded
        severity={
          rowData.paymentStatus === PAYMENT_STATUS.UNPAID ? "danger" : "success"
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

  const priceBodyTemplate = (rowData) => {
    return <div>{formatCurrencyVND(rowData.price)}</div>;
  };

  const healthInsuranceBodyTemplate = (rowData) => {
    return (
      <Tag
        value={rowData.healthInsurance ? "Có" : "Không"}
        rounded
        severity={rowData.healthInsurance ? "secondary" : "danger"}
      />
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <TitleSection>Quản lí hóa đơn khám bệnh</TitleSection>
        <Button
          label="Lập hóa đơn khám bệnh mới"
          icon="pi pi-plus"
          onClick={() => navigate("/invoice/create")}
        />
      </div>

      {/* Render data  */}
      <div className="mt-5">
        <DataTable
          ref={dt}
          value={data}
          header={header}
          scrollable
          stripedRows
          showGridlines
          emptyMessage="Không tìm thấy dữ liệu"
        >
          <Column field="_id" header="Mã hóa đơn" sortable />
          <Column field="patient" header="Bệnh nhân" sortable />
          <Column field="doctor" header="Bác sĩ" sortable />
          <Column
            field="price"
            header="Giá tiền"
            sortable
            body={priceBodyTemplate}
          />
          <Column
            field="healthInsurance"
            header="BHYT"
            sortable
            body={healthInsuranceBodyTemplate}
          />
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
            header="Ngày lập"
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

      <Dialog
        header={`Thông tin hóa đơn khám bệnh`}
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
        <div className="m-0">
          <div className="grid grid-cols-2 gap-5">
            <Fieldset legend="Mã lịch khám bệnh">
              <p className="m-0">{detail?._id}</p>
            </Fieldset>
            <Fieldset legend="Bệnh nhân">
              <p className="m-0">{detail?.patient}</p>
            </Fieldset>
            <Fieldset legend="Bác sĩ">
              <p className="m-0">{detail?.doctor}</p>
            </Fieldset>
            <Fieldset legend="Giá tiền">
              <p className="m-0">{formatCurrencyVND(detail?.price)}</p>
            </Fieldset>
            <Fieldset legend="Áp dụng BHYT">
              <p className="m-0">
                {detail?.healthInsurance
                  ? "Có sử dụng BHYT"
                  : "Không sử dụng BHYT"}
              </p>
            </Fieldset>
            <Fieldset legend="Tổng tiền">
              <p className="m-0">{formatCurrencyVND(detail?.total)}</p>
            </Fieldset>
            <Fieldset legend="Trạng thái">
              <p className="m-0">{detail?.paymentStatus}</p>
            </Fieldset>
            <Fieldset legend="Ngày tạo">
              <p className="m-0">{formatDate(detail?.createdAt)}</p>
            </Fieldset>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ManageInvoice;
