import React from "react";
import TitleSection from "../../components/TitleSection";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Fieldset } from "primereact/fieldset";
import { formatCurrencyVND, formatDate } from "../../utils/helper";
import "jspdf-autotable";
import { ProgressSpinner } from "primereact/progressspinner";
import useGetPrescriptionDetail from "./useGetPrescriptionDetail";

const PrescriptionDetail = () => {
  const navigate = useNavigate();
  const { detail, loading, onExportPDF } = useGetPrescriptionDetail();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ProgressSpinner />
      </div>
    );
  }

  const priceBodyTemplate = (rowData) => {
    return <div>{formatCurrencyVND(rowData.price * rowData.quantity)}</div>;
  };

  const price2BodyTemplate = (rowData) => {
    return <div>{formatCurrencyVND(rowData.price)}</div>;
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <TitleSection>Thông tin đơn thuốc </TitleSection>
        <Button
          type="submit"
          label="Xuất hóa đơn thuốc"
          icon="pi pi-print"
          severity="warning"
          onClick={onExportPDF}
        />
      </div>

      <div className="mt-10 w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-2 gap-5">
          <Fieldset legend="Mã đơn thuốc">
            <p className="m-0">{detail?._id}</p>
          </Fieldset>
          <Fieldset legend="Bệnh nhân">
            <p className="m-0">{detail?.patient}</p>
          </Fieldset>
          <Fieldset legend="Bác sĩ kê toa">
            <p className="m-0">{detail?.doctor}</p>
          </Fieldset>
          <Fieldset legend="Ngày kê toa">
            <p className="m-0">{formatDate(detail?.createdAt)}</p>
          </Fieldset>
          <Fieldset legend="Ghi chú">
            <p className="m-0">{detail?.notes}</p>
          </Fieldset>
          <Fieldset legend="Tổng tiền thuốc">
            <p className="m-0">{formatCurrencyVND(detail?.total)}</p>
          </Fieldset>
        </div>

        <div className="mt-8 space-y-5">
          <h1 className="text-2xl font-semibold">
            Danh sách thuốc theo kê toa
          </h1>
          <DataTable
            scrollable
            stripedRows
            showGridlines
            emptyMessage="Không tìm thấy dữ liệu"
            value={detail?.detail}
          >
            <Column field="name" header="Tên" sortable />
            <Column field="unit" header="Đơn vị" sortable />
            <Column
              field="price"
              header="Đơn giá"
              body={price2BodyTemplate}
              sortable
            />
            <Column field="quantity" header="Số lượng" sortable />
            <Column header="Tổng" sortable body={priceBodyTemplate} />
          </DataTable>
        </div>

        <div className="flex items-center mt-10 justify-end ">
          <Button
            type="submit"
            label="Quay về"
            severity="secondary"
            onClick={() => navigate("/prescription")}
            icon="pi pi-arrow-left"
          />
        </div>
      </div>
    </div>
  );
};

export default PrescriptionDetail;
