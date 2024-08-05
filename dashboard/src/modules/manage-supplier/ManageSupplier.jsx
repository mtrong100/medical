import useManageSupplier from "./useManageSupplier";
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

const ManageSupplier = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [detail, setDetail] = useState(null);
  const {
    data,
    query,
    setQuery,
    onDelete,
    dt,
    exportCSV,
    exportPdf,
    exportExcel,
  } = useManageSupplier();

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
          onClick={() => navigate(`/supplier/update/${rowData._id}`)}
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
        <TitleSection>Quản lí nhà cung cấp</TitleSection>
        <Button
          label="Thêm mới nhà cung cấp"
          icon="pi pi-plus"
          onClick={() => navigate("/supplier/create")}
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
          <Column field="_id" header="Mã nhà cung cấp" sortable />
          <Column field="name" header="Tên" sortable />
          <Column field="email" header="Email" sortable />
          <Column field="phone" header="SDT" sortable />
          <Column field="address" header="Địa chỉ" sortable />
          <Column
            body={actionBodyTemplate}
            exportable={false}
            header="Thao tác"
          />
        </DataTable>
      </div>

      <Dialog
        header={`Thông tin nhà cung cấp`}
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
            <Fieldset legend="Tên">
              <p className="m-0">{detail?.name}</p>
            </Fieldset>
            <Fieldset legend="Email">
              <p className="m-0">{detail?.email}</p>
            </Fieldset>
            <Fieldset legend="SDT">
              <p className="m-0">{detail?.phone}</p>
            </Fieldset>
            <Fieldset legend="Địa chỉ">
              <p className="m-0">{detail?.address}</p>
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

export default ManageSupplier;
