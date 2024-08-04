import useManageInventory from "./useManageInventory";
import TitleSection from "../../components/TitleSection";
import React, { useState } from "react";
import { formatCurrencyVND, formatDate } from "../../utils/helper";
import { Fieldset } from "primereact/fieldset";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "jspdf-autotable";
import { Button } from "primereact/button";
import TableToolbar from "../../components/TableToolbar";
import {
  itemQuantityBodyTemplate,
  itemTypeBodyTemplate,
  priceBodyTemplate,
  statusBodyTemplate,
  sumTotalBodyTemplate,
  totalPriceColumn,
} from "../../utils/columnTemplate";

const ManageInventory = () => {
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
    onExportSinglePDF,
    onUpdateStatus,
  } = useManageInventory();

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex items-center gap-2 ">
        <Button
          icon="pi pi-eye"
          severity="secondary"
          outlined
          onClick={() => {
            setVisible(true);
            setDetail(rowData);
          }}
        />
        <Button
          icon="pi pi-credit-card"
          severity="success"
          outlined
          onClick={() => onUpdateStatus(rowData._id)}
        />
        <Button
          icon="pi pi-print"
          severity="help"
          outlined
          onClick={() => onExportSinglePDF(rowData)}
        />
        <Button
          icon="pi pi-trash"
          severity="danger"
          outlined
          onClick={() => onDelete(rowData._id)}
        />
      </div>
    );
  };

  return (
    <div>
      <TitleSection>Quản lí kho</TitleSection>

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
          <Column field="_id" header="Mã phiếu" sortable />
          <Column field="supplier" header="Nhà cung cấp" sortable />
          <Column
            field="itemType"
            header="Mặc hàng"
            sortable
            body={itemTypeBodyTemplate}
          />
          <Column header="Số lượng" sortable body={itemQuantityBodyTemplate} />
          <Column
            field="total"
            header="Tổng tiền"
            sortable
            body={totalPriceColumn}
          />
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
      </div>

      <Dialog
        header={`Thông tin chi tiết phiếu nhập kho`}
        visible={visible}
        style={{ width: "60vw" }}
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
            <Fieldset legend="Nhà cung cấp">
              <p className="m-0">{detail?.supplier}</p>
            </Fieldset>
            <Fieldset legend="Mặc hàng">
              <p className="m-0">
                {detail?.itemType === "Device" ? "Thiết bị y tế" : "Thuốc"}
              </p>
            </Fieldset>
            <Fieldset legend="Tổng tiền">
              <p className="m-0">{formatCurrencyVND(detail?.total)}</p>
            </Fieldset>
            <Fieldset legend="Trạng thái">
              <p className="m-0">{detail?.status}</p>
            </Fieldset>
            <Fieldset legend="Ngày tạo">
              <p className="m-0">{formatDate(detail?.createdAt)}</p>
            </Fieldset>
          </div>

          <div className="space-y-5 mt-5">
            <h1 className="text-2xl font-semibold">Danh sách vật tư y tế</h1>
            <DataTable
              scrollable
              stripedRows
              showGridlines
              emptyMessage="Không tìm thấy dữ liệu"
              value={detail?.items}
            >
              <Column field="name" header="Tên" sortable />
              <Column
                field="price"
                header="Đơn giá"
                sortable
                body={priceBodyTemplate}
              />
              <Column field="quantity" header="Số lượng" />
              <Column header="Tồng tiền" sortable body={sumTotalBodyTemplate} />
            </DataTable>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ManageInventory;
