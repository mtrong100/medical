import useManageDevice from "./useManageDevice";
import TitleSection from "../../components/TitleSection";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatCurrencyVND, formatDate } from "../../utils/helper";
import { Fieldset } from "primereact/fieldset";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "jspdf-autotable";
import { Button } from "primereact/button";
import TableToolbar from "../../components/TableToolbar";
import {
  priceBodyTemplate,
  totalPriceStockTemplate,
} from "../../utils/columnTemplate";

const ManageDevice = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [detail, setDetail] = useState(null);
  const {
    dt,
    data,
    query,
    setQuery,
    onDelete,
    exportCSV,
    exportPdf,
    exportExcel,
  } = useManageDevice();

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
          onClick={() => navigate(`/device/update/${rowData._id}`)}
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
        <TitleSection>Quản lí thiết bị</TitleSection>
        <div className="flex items-center gap-5">
          <Button
            label="Nhập thêm thiết bị"
            severity="help"
            icon="pi pi-cart-plus"
            onClick={() => navigate("/inventory-device/create")}
          />
          <Button
            label="Tạo mới thiết bị"
            icon="pi pi-plus"
            onClick={() => navigate("/device/create")}
          />
        </div>
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
          <Column field="_id" header="Mã thiết bị" sortable />
          <Column field="name" header="Tên" sortable />
          <Column field="category" header="Danh mục" sortable />
          <Column
            field="price"
            header="Đơn giá"
            sortable
            body={priceBodyTemplate}
          />
          <Column field="stock" header="Tồn kho" sortable />
          <Column header="Tổng tiền" sortable body={totalPriceStockTemplate} />
          <Column
            body={actionBodyTemplate}
            exportable={false}
            header="Thao tác"
          />
        </DataTable>
      </div>

      <Dialog
        header={`Thông tin thiết bị`}
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
            <Fieldset legend="Danh mục">
              <p className="m-0">{detail?.category}</p>
            </Fieldset>
            <Fieldset legend="Đơn giá">
              <p className="m-0">{formatCurrencyVND(detail?.price)}</p>
            </Fieldset>
            <Fieldset legend="Tồn kho">
              <p className="m-0">{detail?.stock}</p>
            </Fieldset>
            <Fieldset legend="Tổng tiền">
              <p className="m-0">
                {formatCurrencyVND(detail?.price * detail?.stock)}
              </p>
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

export default ManageDevice;
