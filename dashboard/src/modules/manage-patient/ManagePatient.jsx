import useManagePatient from "./useManagePatient";
import TitleSection from "../../components/TitleSection";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/helper";
import { Fieldset } from "primereact/fieldset";
import { Dropdown } from "primereact/dropdown";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { genders } from "../../utils/constants";
import TableToolbar from "../../components/TableToolbar";
import useGetPatientStats from "./useGetPatientStats";
import PatientGenderPieChart from "./PatientGenderPieChart";
import PatientsByMonthChart from "./PatientsByMonthChart";

const ManagePatient = () => {
  const navigate = useNavigate();
  const [detail, setDetail] = useState(null);
  const [visible, setVisible] = useState(false);
  const { loadingStats, stats } = useGetPatientStats();
  console.log("🚀 ~ ManagePatient ~ stats:", stats);
  const {
    data,
    query,
    setQuery,
    selectedFilter,
    setSelectedFilter,
    onResetFilter,
    onDelete,
    dt,
    exportCSV,
    exportPdf,
    exportExcel,
  } = useManagePatient();

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
          onClick={() => navigate(`/patient/update/${rowData._id}`)}
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
        <TitleSection>Quản lí bệnh nhân</TitleSection>
        <Button
          label="Thêm mới bệnh nhân"
          icon="pi pi-plus"
          onClick={() => navigate("/patient/create")}
        />
      </div>

      <div className="mt-5 grid grid-cols-[minmax(0,_1fr)_400px] gap-5">
        <PatientsByMonthChart
          loading={loadingStats}
          labels={stats?.months}
          dataSet={stats?.patientsCountByMonth}
        />
        <PatientGenderPieChart loading={loadingStats} dataSet={stats?.counts} />
      </div>

      {/* Filter */}
      <div className="mt-5 flex items-center gap-3">
        <Button
          onClick={onResetFilter}
          label="Đặt lại"
          icon="pi pi-refresh"
          size="small"
        />

        <Dropdown
          options={genders}
          placeholder="Chọn giới tính"
          className="w-[350px]"
          value={selectedFilter.gender}
          onChange={(e) =>
            setSelectedFilter((prev) => ({ ...prev, gender: e.value }))
          }
        />
      </div>

      {/* Table */}
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
          <Column field="_id" header="Mã bệnh nhân" sortable />
          <Column field="name" header="Tên" sortable />
          <Column field="gender" header="Giới tính" sortable />
          <Column field="dateOfBirth" header="Ngày sinh" sortable />
          <Column field="email" header="Email" sortable />
          <Column field="phoneNumber" header="SĐT" sortable />
          <Column
            body={actionBodyTemplate}
            exportable={false}
            header="Thao tác"
          />
        </DataTable>
      </div>

      {/* Detail Modal */}
      <Dialog
        header={`Thông tin bệnh nhân ${detail?.name}`}
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
        <div className="m-0">
          <div className="grid grid-cols-2 gap-5">
            <Fieldset legend="ID">
              <p className="m-0">{detail?._id}</p>
            </Fieldset>
            <Fieldset legend="Hình ảnh">
              <img
                src={detail?.avatar}
                alt={detail?.name}
                className="rounded-full w-[50px] h-[50px] object-cover"
              />
            </Fieldset>
            <Fieldset legend="Tên">
              <p className="m-0">{detail?.name}</p>
            </Fieldset>
            <Fieldset legend="Ngày sinh">
              <p className="m-0">{detail?.dateOfBirth}</p>
            </Fieldset>
            <Fieldset legend="Giới tính">
              <p className="m-0">{detail?.gender}</p>
            </Fieldset>
            <Fieldset legend="SĐT">
              <p className="m-0">{detail?.phoneNumber}</p>
            </Fieldset>
            <Fieldset legend="Email">
              <p className="m-0">{detail?.email}</p>
            </Fieldset>
            <Fieldset legend="Địa chỉ">
              <p className="m-0">{detail?.address}</p>
            </Fieldset>
            <Fieldset legend="Trạng thái tài khoản">
              <p className="m-0">{detail?.status}</p>
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

export default ManagePatient;
