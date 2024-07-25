import useManageInventory from "./useManageInventory";
import TitleSection from "../../components/TitleSection";
import React, { useState } from "react";
import jsPDF from "jspdf";
import { Tag } from "primereact/tag";
import { LIMIT_AMOUNT, PAYMENT_STATUS } from "../../utils/constants";
import { InputText } from "primereact/inputtext";
import { formatCurrencyVND, formatDate } from "../../utils/helper";
import { font } from "../../assets/font";
import { Fieldset } from "primereact/fieldset";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "jspdf-autotable";
import { Button } from "primereact/button";

const ManageInventory = () => {
  const [visible, setVisible] = useState(false);
  const [detail, setDetail] = useState(null);
  const {
    data,
    query,
    setQuery,
    onDelete,
    paginator,
    onPrevPage,
    onNextPage,
    dt,
    exportCSV,
    exportPdf,
    exportExcel,
  } = useManageInventory();

  const onExportPDF = () => {
    const doc = new jsPDF();

    doc.addFileToVFS("Roboto-Regular.ttf", font);
    doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");
    doc.setFont("Roboto");

    doc.setFontSize(18);
    doc.text("Hóa đơn nhập kho", 14, 22);

    doc.setFontSize(12);
    doc.text(`Mã hóa đơn: ${detail._id}`, 14, 40);
    doc.text(`Nhà cung cấp: ${detail.supplier}`, 14, 50);
    doc.text(
      `Mặc hàng: ${detail.itemType === "Device" ? "Thiết bị y tế" : "Thuốc"}`,
      14,
      60
    );
    doc.text(`Trạng thái: ${detail.status}`, 14, 70);
    doc.text(
      `Ngày lập phiếu: ${new Date(detail.createdAt).toLocaleDateString()}`,
      14,
      80
    );

    // Tạo bảng chi tiết thuốc
    const tableColumn = ["Tên", "Danh mục", "Đơn giá", "Số lượng", "Tổng tiền"];

    const tableRows = [];

    detail.items.forEach((item) => {
      const medicineData = [
        item.name,
        item.category,
        item.price.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        }),
        item.quantity,
        (item.price * item.quantity).toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        }),
      ];
      tableRows.push(medicineData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 90,
      theme: "striped",
      styles: {
        font: "Roboto",
      },
      headStyles: { fillColor: [22, 160, 133] },
    });

    // Tổng cộng
    const finalY = doc.previousAutoTable.finalY;
    doc.setFontSize(12);
    doc.text(
      `Tổng cộng: ${detail.total.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      })}`,
      14,
      finalY + 10
    );

    // Xuất file PDF
    doc.save(`hoa-don-nhap-kho.pdf`);
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
          icon="pi pi-trash"
          rounded
          severity="danger"
          onClick={() => onDelete(rowData._id)}
        />
      </div>
    );
  };

  const priceBodyTemplate = (rowData) => {
    return <div>{formatCurrencyVND(rowData.total)}</div>;
  };

  const price2BodyTemplate = (rowData) => {
    return <div>{formatCurrencyVND(rowData.price)}</div>;
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <Tag
        value={rowData.status}
        rounded
        severity={
          rowData.status === PAYMENT_STATUS.UNPAID ? "danger" : "success"
        }
      />
    );
  };

  const itemTypeBodyTemplate = (rowData) => {
    return (
      <Tag
        value={rowData.itemType === "Device" ? "Thiết bị y tế" : "Thuốc"}
        rounded
        severity={rowData.itemType === "Device" ? "warning" : "secondary"}
      />
    );
  };

  const quantityBodyTemplate = (rowData) => {
    return <div>{rowData?.items?.length || 0}</div>;
  };

  const totalBodyTemplate = (rowData) => {
    return <div>{formatCurrencyVND(rowData.price * rowData.quantity)}</div>;
  };

  return (
    <div>
      <TitleSection>Quản lí phiếu nhập kho</TitleSection>

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
          <Column field="supplier" header="Nhà cung cấp" sortable />
          <Column
            field="itemType"
            header="Mặc hàng"
            sortable
            body={itemTypeBodyTemplate}
          />
          <Column header="Số lượng" sortable body={quantityBodyTemplate} />
          <Column
            field="total"
            header="Tổng tiền"
            sortable
            body={priceBodyTemplate}
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
              <Column field="category" header="Danh mục" sortable />
              <Column
                field="price"
                header="Đơn giá"
                sortable
                body={price2BodyTemplate}
              />
              <Column field="quantity" header="Số lượng" />
              <Column header="Tồng tiền" sortable body={totalBodyTemplate} />
            </DataTable>
          </div>

          <div className="mt-8 text-right">
            <Button
              type="submit"
              label="Xuất hóa đơn nhập kho"
              icon="pi pi-print"
              severity="warning"
              onClick={onExportPDF}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ManageInventory;
