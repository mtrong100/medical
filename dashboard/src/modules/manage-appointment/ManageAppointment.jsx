import useManageAppointment from "./useManageAppointment";
import TitleSection from "../../components/TitleSection";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/helper";
import { Fieldset } from "primereact/fieldset";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import TableToolbar from "../../components/TableToolbar";
import { appointmentStatusBodyTemplate } from "../../utils/columnTemplate";
import useGetAppointmentStats from "./useGetAppointmentStats";
import AppointmentByMonthChart from "./AppointmentByMonthChart";
import AppointmentStatusChart from "./AppointmentStatusChart";

const ManageAppointment = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [detail, setDetail] = useState(null);
  const { loadingStats, stats } = useGetAppointmentStats();
  const {
    data,
    query,
    setQuery,
    onDelete,
    dt,
    exportCSV,
    exportPdf,
    exportExcel,
  } = useManageAppointment();

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
          icon="pi pi-pencil"
          outlined
          severity="info"
          onClick={() => navigate(`/appointment/update/${rowData._id}`)}
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
        <TitleSection>Quản lí lịch khám bệnh</TitleSection>
        <Button
          label="Tạo lịch khám bệnh mới"
          icon="pi pi-plus"
          onClick={() => navigate("/appointment/create")}
        />
      </div>

      <div className="mt-5 grid grid-cols-[minmax(0,_1fr)_400px] gap-5">
        <AppointmentByMonthChart
          loading={loadingStats}
          labels={stats?.months}
          dataSet={stats?.appointmentCountByMonth}
        />
        <AppointmentStatusChart
          loading={loadingStats}
          dataSet={stats?.appointmentStatus}
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
          <Column field="_id" header="Mã lịch khám bệnh" sortable />
          <Column field="patient" header="Bệnh nhân" sortable />
          <Column field="doctor" header="Bác sĩ" sortable />
          <Column field="date" header="Ngày khám" sortable />
          <Column field="time" header="Khung giờ" sortable />
          <Column
            field="status"
            header="Trạng thái"
            sortable
            body={appointmentStatusBodyTemplate}
          />
          <Column
            body={actionBodyTemplate}
            exportable={false}
            header="Thao tác"
          />
        </DataTable>
      </div>

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

export default ManageAppointment;
