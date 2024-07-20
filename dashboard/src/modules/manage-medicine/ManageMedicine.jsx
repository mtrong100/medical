import useManageMedicine from "./useManageMedicine";
import useGetMedicineCategories from "../../hooks/useGetMedicineCategories";
import TitleSection from "../../components/TitleSection";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LIMIT_AMOUNT, MEDICINE_UNITS } from "../../utils/constants";
import { InputText } from "primereact/inputtext";
import { formatCurrencyVND, formatDate } from "../../utils/helper";
import { Fieldset } from "primereact/fieldset";
import { Dropdown } from "primereact/dropdown";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

const ManageMedicine = () => {
  const navigate = useNavigate();
  const [detail, setDetail] = useState(null);
  const [visible, setVisible] = useState(false);
  const { categories, fetchCategories } = useGetMedicineCategories();
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
  } = useManageMedicine();

  useEffect(() => {
    fetchCategories();
  }, []);

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
          severity="info"
          rounded
          onClick={() => navigate(`/medicine/update/${rowData._id}`)}
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
    return <div>{formatCurrencyVND(rowData.price)}</div>;
  };

  const totalBodyTemplate = (rowData) => {
    return <div>{formatCurrencyVND(rowData.total || 0)} </div>;
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <TitleSection>Quản lí thuốc</TitleSection>
        <Button
          label="Thêm mới"
          icon="pi pi-plus"
          onClick={() => navigate("/medicine/create")}
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
          filter
          filterPlaceholder="Tìm kiếm"
          options={categories}
          scrollHeight="400px"
          optionValue="_id"
          optionLabel="name"
          placeholder="Chọn danh mục thuốc"
          className="w-[600px]"
          value={selectedFilter.category}
          onChange={(e) =>
            setSelectedFilter((prev) => ({ ...prev, category: e.value }))
          }
        />

        <Dropdown
          filter
          filterPlaceholder="Tìm kiếm"
          options={MEDICINE_UNITS}
          placeholder="Chọn đơn vị thuốc"
          scrollHeight="400px"
          className="w-[500px]"
          value={selectedFilter.unit}
          onChange={(e) =>
            setSelectedFilter((prev) => ({ ...prev, unit: e.value }))
          }
        />
      </div>

      {/*Table  */}
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
          <Column field="unit" header="Đơn vị" sortable />
          <Column
            field="category"
            header="Danh mục"
            sortable
            style={{ width: "300px" }}
          />
          <Column
            field="price"
            header="Giá tiền"
            sortable
            body={priceBodyTemplate}
          />
          <Column field="stock" header="Tồn kho" sortable />
          <Column
            field="total"
            header="Tổng tiền"
            sortable
            body={totalBodyTemplate}
          />
          <Column
            body={actionBodyTemplate}
            exportable={false}
            header="Thao tác"
          />
        </DataTable>
      </div>

      {/* Paginator */}
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

      {/* Detail modal */}
      <Dialog
        header={`Thông tin thuốc ${detail?.name}`}
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
            <Fieldset legend="Đơn vị">
              <p className="m-0">{detail?.unit}</p>
            </Fieldset>
            <Fieldset legend="Giá tiền">
              <p className="m-0">{formatCurrencyVND(detail?.price)}</p>
            </Fieldset>
            <Fieldset legend="Tồn kho">
              <p className="m-0">{detail?.stock}</p>
            </Fieldset>
            <Fieldset legend="Tổng tiền">
              <p className="m-0">{formatCurrencyVND(detail?.total)}</p>
            </Fieldset>
            <Fieldset legend="Ngày thêm">
              <p className="m-0">{formatDate(detail?.createdAt)}</p>
            </Fieldset>
          </div>
          <Fieldset legend="Mô tả">
            <p className="m-0">{detail?.description}</p>
          </Fieldset>
        </div>
      </Dialog>
    </div>
  );
};

export default ManageMedicine;
