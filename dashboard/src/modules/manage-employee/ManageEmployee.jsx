import useManageEmployee from "./useManageEmployee";
import TitleSection from "../../components/TitleSection";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tag } from "primereact/tag";
import { InputText } from "primereact/inputtext";
import { Fieldset } from "primereact/fieldset";
import { Dropdown } from "primereact/dropdown";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import {
  formatCurrencyVND,
  formatDate,
  getEmployeeServerity,
} from "../../utils/helper";
import {
  LIMIT_AMOUNT,
  commonSpecialtiesInPrivateClinics,
  employeeStatus,
  genders,
  medicalSchoolsInVietnam,
  roles,
} from "../../utils/constants";

const ManageEmployee = () => {
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
  } = useManageEmployee();

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
          rounded
          severity="info"
          onClick={() => navigate(`/employee/update/${rowData._id}`)}
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
        severity={getEmployeeServerity(rowData.status)}
        rounded
      />
    );
  };

  const salaryBodyTemplate = (rowData) => {
    return <div>{formatCurrencyVND(rowData.salary)}</div>;
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <TitleSection>Quản lí nhân viên</TitleSection>
        <Button
          label="Thêm mới nhân viên"
          icon="pi pi-plus"
          onClick={() => navigate("/employee/create")}
        />
      </div>

      {/* Filter */}
      <div className="mt-5 flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 w-[200px]">
          <h1 className="text-xl font-semibold">Bộ lọc: </h1>
          <Button
            onClick={onResetFilter}
            label="Đặt lại"
            icon="pi pi-refresh"
          />
        </div>

        <div className="flex-1 flex items-center gap-3">
          <Dropdown
            options={genders}
            placeholder="Chọn giới tính"
            className="w-full"
            value={selectedFilter.gender}
            onChange={(e) =>
              setSelectedFilter((prev) => ({ ...prev, gender: e.value }))
            }
          />

          <Dropdown
            options={roles}
            placeholder="Chọn vai trò"
            className="w-full"
            filter
            filterPlaceholder="Tìm kiếm"
            scrollHeight="400px"
            value={selectedFilter.role}
            onChange={(e) =>
              setSelectedFilter((prev) => ({ ...prev, role: e.value }))
            }
          />

          <Dropdown
            options={commonSpecialtiesInPrivateClinics}
            placeholder="Chọn chuyên khoa"
            className="w-full"
            filter
            filterPlaceholder="Tìm kiếm"
            scrollHeight="400px"
            value={selectedFilter.specialization}
            onChange={(e) =>
              setSelectedFilter((prev) => ({
                ...prev,
                specialization: e.value,
              }))
            }
          />

          <Dropdown
            options={medicalSchoolsInVietnam}
            placeholder="Chọn trường đã tốt nghiệp"
            className="w-full"
            filter
            filterPlaceholder="Tìm kiếm"
            scrollHeight="400px"
            value={selectedFilter.graduatedFrom}
            onChange={(e) =>
              setSelectedFilter((prev) => ({ ...prev, graduatedFrom: e.value }))
            }
          />

          <Dropdown
            options={employeeStatus}
            placeholder="Chọn trạng thái"
            className="w-full"
            value={selectedFilter.status}
            onChange={(e) =>
              setSelectedFilter((prev) => ({ ...prev, status: e.value }))
            }
          />
        </div>
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
          emptyMessage="Không tìm thấy nhân viên"
        >
          <Column field="_id" header="Mã nhân viên" sortable />
          <Column field="name" header="Tên" sortable />
          <Column field="gender" header="Giới tính" sortable />
          <Column field="dateOfBirth" header="Ngày sinh" sortable />
          <Column field="phoneNumber" header="SĐT" sortable />
          <Column field="role" header="Vai trò" sortable />
          <Column
            field="salary"
            header="Lương"
            sortable
            body={salaryBodyTemplate}
          />
          <Column
            field="status"
            header="Trạng thái"
            exportable={false}
            body={statusBodyTemplate}
            sortable
          />
          <Column
            body={actionBodyTemplate}
            exportable={false}
            header="Thao tác"
          />
        </DataTable>
      </div>

      {/* Pagiantion */}
      {paginator.totalResults > LIMIT_AMOUNT && (
        <div className="flex items-center  justify-end mt-8 gap-2">
          <Button
            severity="secondary"
            onClick={onPrevPage}
            icon="pi pi-angle-left"
          />
          <div className="flex items-center gap-2 text-xl  font-semibold">
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
            <Fieldset legend="Tốt nghiệp">
              <p className="m-0">{detail?.graduatedFrom}</p>
            </Fieldset>
            <Fieldset legend="Chuyên khoa">
              <p className="m-0">{detail?.specialization}</p>
            </Fieldset>
            <Fieldset legend="Trạng thái tài khoản">
              <p className="m-0">{detail?.status}</p>
            </Fieldset>
            <Fieldset legend="Lương cơ bản">
              <p className="m-0">{formatCurrencyVND(detail?.salary)}</p>
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

export default ManageEmployee;
