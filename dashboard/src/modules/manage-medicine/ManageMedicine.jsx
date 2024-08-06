import useManageMedicine from "./useManageMedicine";
import useGetMedicineCategories from "../../hooks/useGetMedicineCategories";
import TitleSection from "../../components/TitleSection";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MEDICINE_UNITS } from "../../utils/constants";
import { formatCurrencyVND, formatDate } from "../../utils/helper";
import { Fieldset } from "primereact/fieldset";
import { Dropdown } from "primereact/dropdown";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import TableToolbar from "../../components/TableToolbar";
import {
  priceBodyTemplate,
  totalPriceStockTemplate,
} from "../../utils/columnTemplate";
import useGetMedicineStats from "./useGetMedicineStats";
import MedicineStatsLineChart from "./MedicineStatsLineChart";

const ManageMedicine = () => {
  const navigate = useNavigate();
  const [detail, setDetail] = useState(null);
  const [visible, setVisible] = useState(false);
  const { loadingStats, stats } = useGetMedicineStats();
  const { categories, fetchCategories } = useGetMedicineCategories();
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
  } = useManageMedicine();

  useEffect(() => {
    fetchCategories();
  }, []);

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
          onClick={() => navigate(`/medicine/update/${rowData._id}`)}
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
        <TitleSection>Quản lí dược phẩm & thuốc</TitleSection>
        <div className="flex items-center gap-5">
          <Button
            label="Nhập thêm thuốc"
            severity="help"
            icon="pi pi-cart-plus"
            onClick={() => navigate("/inventory-medicine/create")}
          />
          <Button
            label="Tạo mới thuốc"
            icon="pi pi-plus"
            onClick={() => navigate("/medicine/create")}
          />
        </div>
      </div>

      <div className="mt-5">
        <MedicineStatsLineChart
          loading={loadingStats}
          labels={stats?.categories}
          dataSet={stats?.averagePrices}
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
          <Column field="_id" header="Mã thuốc" sortable />
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
            header="Đơn giá"
            sortable
            body={priceBodyTemplate}
          />
          <Column field="stock" header="Tồn kho" sortable />
          <Column
            field="total"
            header="Tổng tiền"
            sortable
            body={totalPriceStockTemplate}
          />
          <Column
            body={actionBodyTemplate}
            exportable={false}
            header="Thao tác"
          />
        </DataTable>
      </div>

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
