import useManageInvoice from "./useManageInvoice";
import TitleSection from "../../components/TitleSection";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatCurrencyVND, formatDate } from "../../utils/helper";
import { Fieldset } from "primereact/fieldset";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import TableToolbar from "../../components/TableToolbar";
import {
  createdAtBodyTemplate,
  healthInsuranceBodyTemplate,
  invoiceStatusBodyTemplate,
  priceBodyTemplate,
  totalPriceColumn,
} from "../../utils/columnTemplate";
import useGetInvoiceStats from "./useGetInvoiceStats";
import InvoiceByDoctor from "./InvoiceByDoctor";
import InvoiceStatusChart from "./InvoiceStatusChart";
import InvoiceHealthInsuranceChart from "./InvoiceHealthInsuranceChart";

const ManageInvoice = () => {
  const navigate = useNavigate();
  const [detail, setDetail] = useState(null);
  const [visible, setVisible] = useState(false);
  const { loadingStats, stats } = useGetInvoiceStats();
  const {
    data,
    query,
    setQuery,
    onDelete,
    dt,
    exportCSV,
    exportPdf,
    exportExcel,
    onExportPDF,
  } = useManageInvoice();

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex items-center gap-2 ">
        <Button
          icon="pi pi-eye"
          outlined
          severity="secondary"
          onClick={() => {
            setVisible(true);
            setDetail(rowData);
          }}
        />
        <Button
          icon="pi pi-print"
          outlined
          severity="help"
          onClick={() => onExportPDF(rowData)}
        />
        <Button
          icon="pi pi-pencil"
          outlined
          onClick={() => navigate(`/invoice/update/${rowData._id}`)}
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
        <TitleSection>Quản lí hóa đơn khám bệnh</TitleSection>
        <Button
          label="Lập hóa đơn khám bệnh mới"
          icon="pi pi-plus"
          onClick={() => navigate("/invoice/create")}
        />
      </div>

      <div className="mt-5 grid grid-cols-[minmax(0,1fr),350px,350px] gap-5">
        <InvoiceByDoctor
          loading={loadingStats}
          dataSet={stats?.invoiceCountByDoctor}
          labels={stats?.doctors}
        />
        <InvoiceHealthInsuranceChart
          loading={loadingStats}
          dataSet={stats?.invoiceHealthInsurance}
        />
        <InvoiceStatusChart
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
            body={totalPriceColumn}
          />
          <Column
            field="status"
            header="Trạng thái"
            sortable
            body={invoiceStatusBodyTemplate}
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
