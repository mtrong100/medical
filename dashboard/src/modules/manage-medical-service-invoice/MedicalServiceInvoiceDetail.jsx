import useMedicalInvoiceDetail from "./useMedicalInvoiceDetail";
import TitleSection from "../../components/TitleSection";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ProgressSpinner } from "primereact/progressspinner";
import { formatCurrencyVND, formatDate } from "../../utils/helper";
import { Fieldset } from "primereact/fieldset";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import "jspdf-autotable";

const MedicalServiceInvoiceDetail = () => {
  const navigate = useNavigate();
  const { detail, loading, onExportPDF } = useMedicalInvoiceDetail();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ProgressSpinner />
      </div>
    );
  }

  const priceBodyTemplate = (rowData) => {
    return <div>{formatCurrencyVND(rowData.price)}</div>;
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <TitleSection>Thông tin phiếu dịch vụ</TitleSection>
        <Button
          type="submit"
          label="Xuất phiếu dịch vụ"
          icon="pi pi-print"
          severity="warning"
          onClick={onExportPDF}
        />
      </div>

      <div className="mt-10">
        <div className="grid grid-cols-2 gap-5">
          <Fieldset legend="Mã phiếu dịch vụ">
            <p className="m-0">{detail?._id}</p>
          </Fieldset>
          <Fieldset legend="Bệnh nhân">
            <p className="m-0">{detail?.patient}</p>
          </Fieldset>
          <Fieldset legend="Tổng tiền">
            <p className="m-0">{formatCurrencyVND(detail?.total)}</p>
          </Fieldset>
          <Fieldset legend="Trạng thái">
            <p className="m-0">{detail?.status}</p>
          </Fieldset>
          <Fieldset legend="Ngày tạo">
            <p className="m-0">{formatDate(detail?.createdAt)}</p>
          </Fieldset>
        </div>

        <div className="mt-5 space-y-5">
          <h1 className="text-2xl font-semibold">Danh sách sử dụng dịch vụ</h1>
          <DataTable
            scrollable
            stripedRows
            showGridlines
            emptyMessage="Không tìm thấy dữ liệu"
            value={detail?.detail}
          >
            <Column field="name" header="Tên" sortable />
            <Column header="Giá tiền" sortable body={priceBodyTemplate} />
          </DataTable>
        </div>

        <div className="flex items-center mt-10 justify-end ">
          <Button
            type="submit"
            label="Quay về"
            severity="secondary"
            onClick={() => navigate("/medical-service-invoice")}
            icon="pi pi-arrow-left"
          />
        </div>
      </div>
    </div>
  );
};

export default MedicalServiceInvoiceDetail;
