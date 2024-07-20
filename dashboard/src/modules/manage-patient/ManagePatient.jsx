import useManagePatient from "./useManagePatient";
import TitleSection from "../../components/TitleSection";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tag } from "primereact/tag";
import { InputText } from "primereact/inputtext";
import { formatDate, getAccountSeverity } from "../../utils/helper";
import { Fieldset } from "primereact/fieldset";
import { Dropdown } from "primereact/dropdown";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { accountStatus, genders, LIMIT_AMOUNT } from "../../utils/constants";

const ManagePatient = () => {
  const navigate = useNavigate();
  const [detail, setDetail] = useState(null);
  const [visible, setVisible] = useState(false);

  const {
    data,
    query,
    setQuery,
    selectedFilter,
    setSelectedFilter,
    onResetFilter,
    onDelete,
    paginator,
    onPrevPage,
    onNextPage,
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
          rounded
          severity="secondary"
          onClick={() => {
            setVisible(true);
            setDetail(rowData);
          }}
        />
        <Button
          icon="pi pi-pencil"
          severity="info"
          rounded
          onClick={() => navigate(`/patient/update/${rowData._id}`)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          severity="danger"
          onClick={() => onDelete(rowData._id)}
        />
      </div>
    );
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <Tag
        value={rowData.status}
        severity={getAccountSeverity(rowData.status)}
        rounded
      />
    );
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

  return (
    <div>
      <div className="flex items-center justify-between">
        <TitleSection>Quản lí bệnh nhân</TitleSection>
        <Button
          label="Thêm mới"
          icon="pi pi-plus"
          onClick={() => navigate("/patient/create")}
        />
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

        <Dropdown
          options={accountStatus}
          placeholder="Chọn trạng thái"
          className="w-[350px]"
          value={selectedFilter.status}
          onChange={(e) =>
            setSelectedFilter((prev) => ({ ...prev, status: e.value }))
          }
        />
      </div>

      {/* Table */}
      <div className="mt-5">
        <DataTable
          ref={dt}
          value={data}
          header={header}
          scrollable
          stripedRows
          showGridlines
          emptyMessage="Không tìm thấy dữ liệu"
        >
          <Column field="_id" header="ID" sortable />
          <Column field="name" header="Tên" sortable />
          <Column field="gender" header="Giới tính" sortable />
          <Column field="dateOfBirth" header="Ngày sinh" sortable />
          <Column field="email" header="Email" sortable />
          <Column field="phoneNumber" header="SĐT" sortable />
          <Column
            body={statusBodyTemplate}
            header="Trạng thái"
            exportable={false}
          />
          <Column
            body={actionBodyTemplate}
            exportable={false}
            header="Thao tác"
          />
        </DataTable>
      </div>

      {/* Pagination */}
      {paginator.totalResults > LIMIT_AMOUNT && (
        <div className="flex items-center  justify-end mt-8 gap-2">
          <Button
            severity="secondary"
            onClick={onPrevPage}
            icon="pi pi-angle-left"
          />
          <div className="flex items-center gap-2 text-xl font-semibold">
            <p>{paginator.currentPage}</p> / <p>{paginator.totalPages}</p>
          </div>
          <Button
            severity="secondary"
            onClick={onNextPage}
            icon="pi pi-angle-right"
          />
        </div>
      )}

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
