import React, { useEffect, useState } from "react";
import { getAppointmentsFromPatientApi } from "../api/patientApi";
import { useSelector } from "react-redux";
import { ProgressSpinner } from "primereact/progressspinner";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { APPOINTMENT_STATUS } from "../utils/constants";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Fieldset } from "primereact/fieldset";
import { formatDate } from "../utils/helper";
import jsPDF from "jspdf";
import { font } from "../assets/font";

const MyAppointment = () => {
  const [myAppointments, setMyAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [visible3, setVisible3] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState(null);

  useEffect(() => {
    const fetchMyAppointments = async () => {
      setLoading(true);
      try {
        const res = await getAppointmentsFromPatientApi(currentUser._id);
        if (res) setMyAppointments(res);
      } catch (error) {
        console.log("Error in fetchMyAppointments", error);
        setMyAppointments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMyAppointments();
  }, [currentUser._id]);

  const handleExportPDF = () => {
    const doc = new jsPDF();

    // Add the custom font
    doc.addFileToVFS("Roboto-Regular.ttf", font);
    doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");
    doc.setFont("Roboto");

    doc.setFontSize(18);
    doc.text("Lịch khám bệnh", 14, 22);

    doc.setFontSize(12);

    doc.text(`Mã lịch khám: ${appointmentDetails._id}`, 14, 40);
    doc.text(`Bệnh nhân: ${appointmentDetails.patient.name}`, 14, 50);
    doc.text(`Bác sĩ khám: ${appointmentDetails.doctor.name}`, 14, 60);
    doc.text(`Ngày khám: ${formatDate(appointmentDetails.date)}`, 14, 70);
    doc.text(`Khung giờ: ${appointmentDetails.time}`, 14, 80);
    doc.text(`Trạng thái: ${appointmentDetails.status}`, 14, 90);

    // Xuất file PDF
    doc.save(`lich-kham-benh.pdf`);
  };

  const getSeverity = (status) => {
    switch (status) {
      case APPOINTMENT_STATUS.PENDING:
        return "warning";

      case APPOINTMENT_STATUS.COMPLETED:
        return "success";

      case APPOINTMENT_STATUS.CANCELLED:
        return "danger";

      default:
        return "unknown";
    }
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <Tag
        value={rowData.status}
        severity={getSeverity(rowData.status)}
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
          severity="success"
          onClick={() => {
            setVisible3(true);
            setAppointmentDetails(rowData);
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
        scrollable
        stripedRows
        showGridlines
        emptyMessage="Không tìm thấy dữ liệu"
        value={myAppointments}
      >
        <Column field="_id" header="Mã lịch khám bệnh" sortable />
        <Column field="patient.name" header="Bệnh nhân" sortable />
        <Column field="doctor.name" header="Bác sĩ" sortable />
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
        visible={visible3}
        style={{ width: "50vw" }}
        onHide={() => {
          if (!visible3) return;
          setVisible3(false);
        }}
      >
        <div className="m-0">
          <div className="grid grid-cols-2 gap-5">
            <Fieldset legend="Mã lịch khám bệnh">
              <p className="m-0">{appointmentDetails?._id}</p>
            </Fieldset>
            <Fieldset legend="Bệnh nhân">
              <p className="m-0">{appointmentDetails?.patient?.name}</p>
            </Fieldset>
            <Fieldset legend="Bác sĩ">
              <p className="m-0">{appointmentDetails?.doctor?.name}</p>
            </Fieldset>
            <Fieldset legend="Ngày khám">
              <p className="m-0">{appointmentDetails?.date}</p>
            </Fieldset>
            <Fieldset legend="Khung giờ">
              <p className="m-0">{appointmentDetails?.time}</p>
            </Fieldset>
            <Fieldset legend="Trạng thái">
              <p className="m-0">{appointmentDetails?.status}</p>
            </Fieldset>
            <Fieldset legend="Ngày đặt lịch">
              <p className="m-0">{formatDate(appointmentDetails?.createdAt)}</p>
            </Fieldset>
          </div>

          <div className="mt-5 flex items-center justify-end">
            <Button
              type="submit"
              label="Xuất file lịch khám bệnh (PDF)"
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

export default MyAppointment;
