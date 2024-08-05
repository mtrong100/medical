import useManageMedicalRecord from "./useManageMedicalRecord";
import TitleSection from "../../components/TitleSection";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/helper";
import { Fieldset } from "primereact/fieldset";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "jspdf-autotable";
import { Button } from "primereact/button";
import TableToolbar from "../../components/TableToolbar";
import { createdAtBodyTemplate } from "../../utils/columnTemplate";

const ManageMedicalRecord = () => {
  const navigate = useNavigate();
  const [detail, setDetail] = useState(null);
  const [visible, setVisible] = useState(false);
  const {
    data,
    query,
    setQuery,
    onDelete,
    dt,
    exportCSV,
    exportPdf,
    exportExcel,
  } = useManageMedicalRecord();

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex items-center gap-2">
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
          icon="pi pi-pencil"
          severity="info"
          outlined
          onClick={() => navigate(`/medical-record/update/${rowData._id}`)}
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
        <TitleSection>Quản lí hồ sơ bệnh án</TitleSection>
        <Button
          label="Lập hồ sơ bệnh án mới"
          icon="pi pi-plus"
          onClick={() => navigate("/medical-record/create")}
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
          <Column field="_id" header="Mã hồ sơ" sortable />
          <Column field="patient" header="Bệnh nhân" sortable />
          <Column field="doctor" header="Bác sĩ" sortable />
          <Column field="diagnosis" header="Chuẩn đoán bệnh" sortable />
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

      <Dialog
        header={`Thông tin hồ sơ bệnh án`}
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
        <div className="m-0">
          <div className="grid grid-cols-2 gap-5">
            <Fieldset legend="Bác sĩ">
              <p className="m-0">{detail?.doctor}</p>
            </Fieldset>
            <Fieldset legend="Bệnh nhân">
              <p className="m-0">{detail?.patient}</p>
            </Fieldset>
            <Fieldset legend="Chuẩn đoán">
              <p className="m-0">{detail?.diagnosis}</p>
            </Fieldset>
            <Fieldset legend="Trị liệu">
              <p className="m-0">{detail?.treatment}</p>
            </Fieldset>
            <Fieldset legend="Ghi chú">
              <p className="m-0">{detail?.notes}</p>
            </Fieldset>
            <Fieldset legend="Ngày lập hồ sơ">
              <p className="m-0">{formatDate(detail?.createdAt)}</p>
            </Fieldset>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ManageMedicalRecord;
