import React, { useEffect, useRef, useState } from "react";
import TitleSection from "../components/TitleSection";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { formatCurrencyVND, formatDate } from "../utils/helper";
import Swal from "sweetalert2";
import useDebounce from "../hooks/useDebounce";
import { useNavigate } from "react-router-dom";
import { font } from "../assets/font";
import { Tag } from "primereact/tag";
import { doctorSchedules, APPOINTMENT_STATUS } from "../utils/constants";
import { Dialog } from "primereact/dialog";
import { Fieldset } from "primereact/fieldset";
import CreateNewAppointmentModal from "../components/CreateNewAppointmentModal";
import UpdateAppointmentModal from "../components/UpdateAppointmentModal";
import { getAllAppointmentsApi } from "../api/appointmentApi";

const ManageAppointment = () => {
  const dt = useRef(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState([]);
  const [query, setQuery] = useState("");
  const queryValue = useDebounce(query, 500);
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
  const [updateVal, setUpdateVal] = useState(null);
  const [limit, setLimit] = useState(10);
  const [paginator, setPaginator] = useState({
    totalPages: 1,
    currentPage: 1,
    totalResults: 0,
  });

  useEffect(() => {
    fetchAppointments();
  }, [limit, paginator.currentPage]);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const params = {
        page: paginator.currentPage,
        limit,
      };

      const res = await getAllAppointmentsApi(params);
      if (res) {
        setAppointments(res.results);
        setPaginator({
          ...paginator,
          totalResults: res.totalResults,
          totalPages: res.totalPages,
          currentPage: res.currentPage,
        });
      }
    } catch (error) {
      console.log("Error fetching appointments:", error);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredAppointments = appointments.filter((item) => {
    const queryLower = queryValue.toLowerCase();

    return (
      item.patient.name.toLowerCase().includes(queryLower) ||
      item.doctor.name.toLowerCase().includes(queryLower) ||
      item._id.includes(queryLower)
    );
  });

  console.log(appointments);

  /* ================ FILE EXPORT FEATURE ================ */
  const cols = [
    { field: "_id", header: "Mã lịch khám bệnh" },
    { field: "patient.name", header: "Bệnh nhân" },
    { field: "doctor.name", header: "Bác sĩ" },
    { field: "date", header: "Ngày khám" },
    { field: "time", header: "Khung giờ" },
  ];

  const exportColumns = cols.map((col) => ({
    title: col.header,
    dataKey: col.field,
  }));

  const exportCSV = (selectionOnly) => {
    dt.current.exportCSV({ selectionOnly });
  };

  const exportPdf = () => {
    import("jspdf").then((jsPDF) => {
      import("jspdf-autotable").then(() => {
        const doc = new jsPDF.default(0, 0);

        // Add the custom font
        doc.addFileToVFS("Roboto-Regular.ttf", font);
        doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");
        doc.setFont("Roboto");

        const formattedAppointments = appointments.map((appointment) => ({
          _id: appointment._id,
          "patient.name": appointment.patient.name,
          "doctor.name": appointment.doctor.name,
          date: appointment.date,
          time: appointment.time,
        }));

        doc.autoTable({
          columns: exportColumns,
          body: formattedAppointments,
          styles: {
            font: "Roboto",
          },
        });
        doc.save("appointments.pdf");
      });
    });
  };

  const exportExcel = () => {
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(appointments);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      saveAsExcelFile(excelBuffer, "appointments");
    });
  };

  const saveAsExcelFile = (buffer, fileName) => {
    import("file-saver").then((module) => {
      if (module && module.default) {
        let EXCEL_TYPE =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        let EXCEL_EXTENSION = ".xlsx";
        const data = new Blob([buffer], {
          type: EXCEL_TYPE,
        });

        module.default.saveAs(
          data,
          fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
        );
      }
    });
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

  /* ================ BODY TEMPLATE ====================== */

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex items-center gap-2 ">
        <Button icon="pi pi-eye" rounded severity="help" />
        <Button icon="pi pi-pencil" rounded />
        <Button icon="pi pi-trash" rounded severity="danger" />
      </div>
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <TitleSection>Quản lí lịch khám bệnh</TitleSection>
        <Button
          label="Tạo mới"
          icon="pi pi-plus"
          onClick={() => setVisible(true)}
        />
      </div>

      {/* Render data  */}
      <div className="mt-5">
        <DataTable
          ref={dt}
          value={filteredAppointments}
          header={header}
          scrollable
          stripedRows
          showGridlines
          emptyMessage="Không tìm thấy dữ liệu"
        >
          <Column field="_id" header="Mã lịch khám bệnh" sortable />
          <Column field="patient.name" header="Bệnh nhân" sortable />
          <Column field="doctor.name" header="Bác sĩ" sortable />
          <Column field="date" header="Ngày khám" sortable />
          <Column field="time" header="Khung giờ" sortable />
          <Column field="status" header="Trạng thái" sortable />
          <Column
            body={actionBodyTemplate}
            exportable={false}
            header="Thao tác"
          />
        </DataTable>
      </div>

      <CreateNewAppointmentModal visible={visible} setVisible={setVisible} />

      <UpdateAppointmentModal visible2={visible2} setVisible2={setVisible2} />
    </div>
  );
};

export default ManageAppointment;
