import useGetMyMedicalRecord from "./useGetMyMedicalRecord";
import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import { useSelector } from "react-redux";
import { ProgressSpinner } from "primereact/progressspinner";
import { formatDate } from "../../utils/helper";
import { font } from "../../assets/font";
import { Fieldset } from "primereact/fieldset";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

const MyMedicalRecord = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { loading, data, fetchData } = useGetMyMedicalRecord();
  const [visible, setVisible] = useState(false);
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    fetchData(currentUser._id);
  }, []);

  const handleExportPDF = () => {
    const doc = new jsPDF();

    // Add the custom font
    doc.addFileToVFS("Roboto-Regular.ttf", font);
    doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");
    doc.setFont("Roboto");

    // Tiêu đề hồ sơ bệnh án
    doc.setFontSize(18);
    doc.text("Hồ sơ bệnh án", 14, 22);

    // Nội dung hồ sơ bệnh án
    doc.setFontSize(12);

    doc.text(`Mã hồ sơ: ${detail._id}`, 14, 40);
    doc.text(`Bệnh nhân: ${detail.patient}`, 14, 50);
    doc.text(`Bác sĩ khám: ${detail.doctor}`, 14, 60);
    doc.text(`Chuẩn đoán bệnh: ${detail.diagnosis}`, 14, 70);
    doc.text(`Ngày tạo: ${formatDate(detail.createdAt)}`, 14, 80);
    // Xuất file PDF
    doc.save(`ho-so-benh-an.pdf`);
  };

  const createdAtBodyTemplate = (rowData) => {
    return <div>{formatDate(rowData.createdAt)}</div>;
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex items-center gap-2">
        <Button
          icon="pi pi-eye"
          rounded
          severity="secondary"
          onClick={() => {
            setVisible(true);
            setDetail(rowData);
          }}
        />
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center my-20">
        <ProgressSpinner />
      </div>
    );
  }

  return (
    <div>
      <DataTable
        value={data}
        scrollable
        stripedRows
        showGridlines
        emptyMessage="Không tìm thấy dữ liệu"
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
            <Fieldset legend="Bác sĩ khám">
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

          <div className="mt-5 flex items-center justify-end">
            <Button
              type="submit"
              label="Xuất hồ sơ bệnh án"
              icon="pi pi-print"
              severity="warning"
              onClick={handleExportPDF}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default MyMedicalRecord;
