import useGetMyAppointment from "./useGetMyAppointment";
import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import { useSelector } from "react-redux";
import { Tag } from "primereact/tag";
import { ProgressSpinner } from "primereact/progressspinner";
import { formatDate, getAppointmentSeverity } from "../../utils/helper";
import { font } from "../../assets/font";
import { Fieldset } from "primereact/fieldset";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

const MyAppointment = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { loading, data, fetchData } = useGetMyAppointment();
  const [visible, setVisible] = useState(false);
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    fetchData(currentUser._id);
  }, []);

  const handleExportPDF = (rowData) => {
    const doc = new jsPDF();

    // Add the custom font
    doc.addFileToVFS("Roboto-Regular.ttf", font);
    doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");
    doc.setFont("Roboto");

    doc.setFontSize(18);
    doc.text("Lịch khám bệnh", 14, 22);

    doc.setFontSize(12);

    doc.text(`Mã lịch khám: ${rowData._id}`, 14, 40);
    doc.text(`Bệnh nhân: ${rowData.patient}`, 14, 50);
    doc.text(`Bác sĩ khám: ${rowData.doctor}`, 14, 60);
    doc.text(`Ngày khám: ${formatDate(rowData.date)}`, 14, 70);
    doc.text(`Khung giờ: ${rowData.time}`, 14, 80);
    doc.text(`Trạng thái: ${rowData.status}`, 14, 90);

    // Xuất file PDF
    doc.save(`lich-kham-benh.pdf`);
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <Tag
        value={rowData.status}
        severity={getAppointmentSeverity(rowData.status)}
        rounded
      />
    );
  };

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
          severity="success"
          onClick={() => handleExportPDF(rowData)}
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
        scrollable
        stripedRows
        showGridlines
        emptyMessage="Không tìm thấy dữ liệu"
        value={data}
      >
        <Column field="_id" header="Mã lịch khám bệnh" sortable />
        <Column field="patient" header="Bệnh nhân" sortable />
        <Column field="doctor" header="Bác sĩ" sortable />
        <Column field="date" header="Ngày khám" sortable />
        <Column field="time" header="Khung giờ" sortable />
        <Column
          field="status"
          header="Trạng thái"
          sortable
          body={statusBodyTemplate}
        />
        <Column
          body={actionBodyTemplate}
          exportable={false}
          header="Thao tác"
        />
      </DataTable>

      <Dialog
        header={`Thông tin lịch khám bệnh`}
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
            <Fieldset legend="Ngày khám">
              <p className="m-0">{detail?.date}</p>
            </Fieldset>
            <Fieldset legend="Khung giờ">
              <p className="m-0">{detail?.time}</p>
            </Fieldset>
            <Fieldset legend="Trạng thái">
              <p className="m-0">{detail?.status}</p>
            </Fieldset>
            <Fieldset legend="Ngày đặt lịch">
              <p className="m-0">{formatDate(detail?.createdAt)}</p>
            </Fieldset>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default MyAppointment;
