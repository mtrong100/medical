import React, { useEffect, useState } from "react";
import { getMedicalRecordsFromPatientApi } from "../api/patientApi";
import { useSelector } from "react-redux";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { formatDate } from "../utils/helper";
import { Fieldset } from "primereact/fieldset";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";
import jsPDF from "jspdf";
import { font } from "../assets/font";

const MyMedicalRecord = () => {
  const [loading, setLoading] = useState(false);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const [visible3, setVisible3] = useState(false);
  const [recordInfo, setRecordInfo] = useState(null);

  useEffect(() => {
    const fetchMedicalRecords = async () => {
      setLoading(true);

      try {
        const res = await getMedicalRecordsFromPatientApi(currentUser._id);

        if (res) {
          setMedicalRecords(res);
        }
      } catch (error) {
        setMedicalRecords([]);
        console.log("Error fetching medical records:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicalRecords();
  }, [currentUser._id]);

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

    doc.text(`Mã hồ sơ: ${recordInfo._id}`, 14, 40);
    doc.text(`Bệnh nhân: ${recordInfo.patient.name}`, 14, 50);
    doc.text(`Bác sĩ khám: ${recordInfo.doctor.name}`, 14, 60);
    doc.text(`Chuẩn đoán bệnh: ${recordInfo.diagnosis}`, 14, 70);
    doc.text(`Ngày tạo: ${formatDate(recordInfo.createdAt)}`, 14, 80);
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
          severity="success"
          onClick={() => {
            setVisible3(true);
            setRecordInfo(rowData);
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
        value={medicalRecords}
        scrollable
        stripedRows
        showGridlines
        emptyMessage="Không tìm thấy dữ liệu"
      >
        <Column field="_id" header="Mã hồ sơ" sortable />
        <Column field="patient.name" header="Bệnh nhân" sortable />
        <Column field="doctor.name" header="Bác sĩ" sortable />
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
        visible={visible3}
        style={{ width: "50vw" }}
        onHide={() => {
          if (!visible3) return;
          setVisible3(false);
        }}
      >
        <div className="m-0">
          <div className="grid grid-cols-2 gap-5">
            <Fieldset legend="Bác sĩ khám">
              <p className="m-0">{recordInfo?.doctor?.name}</p>
            </Fieldset>
            <Fieldset legend="Bệnh nhân">
              <p className="m-0">{recordInfo?.patient?.name}</p>
            </Fieldset>
            <Fieldset legend="Chuẩn đoán">
              <p className="m-0">{recordInfo?.diagnosis}</p>
            </Fieldset>
            <Fieldset legend="Trị liệu">
              <p className="m-0">{recordInfo?.treatment}</p>
            </Fieldset>
            <Fieldset legend="Ghi chú">
              <p className="m-0">{recordInfo?.notes}</p>
            </Fieldset>
            <Fieldset legend="Ngày lập hồ sơ">
              <p className="m-0">{formatDate(recordInfo?.createdAt)}</p>
            </Fieldset>
          </div>

          <div className="mt-5 flex items-center justify-end">
            <Button
              type="submit"
              label="Xuất file hồ sơ bệnh án (PDF)"
              icon="pi pi-file-pdf"
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
