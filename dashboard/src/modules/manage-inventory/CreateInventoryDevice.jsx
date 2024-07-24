import React, { useEffect } from "react";
import TitleSection from "../../components/TitleSection";
import useGetSupplier from "../../hooks/useGetSupplier";
import { Dropdown } from "primereact/dropdown";
import useCreateInventoryDevice from "./useCreateInventoryDevice";
import useGetDevice from "../../hooks/useGetDevice";
import { Button } from "primereact/button";
import { formatCurrencyVND } from "../../utils/helper";
import { DataTable } from "primereact/datatable";
import { Column } from "jspdf-autotable";
import { useNavigate } from "react-router-dom";

const CreateInventoryDevice = () => {
  const navigate = useNavigate();
  const { suppliers, fetchSupplier } = useGetSupplier();
  const { devices, fetchDevice } = useGetDevice();
  const {
    setForm,
    form,
    setSelectedItem,
    selectedItem,
    onAddNew,
    items,
    onDelete,
    onIncreaseQuantity,
    onDecreaseQuantity,
    onCreate,
    loading,
  } = useCreateInventoryDevice();

  useEffect(() => {
    fetchSupplier();
    fetchDevice();
  }, []);

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex items-center gap-2 justify-center">
        <Button
          icon="pi pi-trash"
          rounded
          severity="danger"
          onClick={() => onDelete(rowData._id)}
        />
      </div>
    );
  };

  const quantityBodyTemplate = (rowData) => {
    return (
      <div className="flex items-center gap-5 ">
        <Button
          onClick={() => onDecreaseQuantity(rowData._id)}
          icon="pi pi-minus"
          rounded
          outlined
        />
        <div className="font-semibold text-lg">{rowData.quantity}</div>
        <Button
          onClick={() => onIncreaseQuantity(rowData._id)}
          icon="pi pi-plus"
          rounded
          outlined
        />
      </div>
    );
  };

  const priceBodyTemplate = (rowData) => {
    return <div>{formatCurrencyVND(rowData.price * rowData.quantity)}</div>;
  };

  return (
    <div>
      <TitleSection>Lập phiếu nhập thêm thiết bị y tế</TitleSection>

      <div className="mt-10 space-y-8 w-full max-w-6xl mx-auto">
        <div className="flex flex-col gap-2">
          <label>Nhà cung cấp thiết bị y tế</label>
          <Dropdown
            options={suppliers}
            filter
            filterPlaceholder="Tìm kiếm"
            optionValue="_id"
            optionLabel="name"
            placeholder="Chọn nhà cung cấp"
            className="w-full "
            scrollHeight="300px"
            value={form.supplier}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, supplier: e.value }))
            }
          />
        </div>

        <div className="flex flex-col gap-2">
          <label>Thiết bị cần nhập thêm</label>
          <div className="flex items-center gap-3">
            <Dropdown
              options={devices}
              filter
              filterPlaceholder="Tìm kiếm"
              optionLabel="name"
              placeholder="Chọn thiết bị"
              className="w-full "
              scrollHeight="300px"
              value={selectedItem}
              onChange={(e) => setSelectedItem(e.value)}
            />
            <Button
              label="Thêm thiết bị"
              icon="pi pi-plus"
              className="flex-shrink-0"
              onClick={onAddNew}
            />
          </div>
        </div>

        <div className="space-y-5">
          <h1 className="text-2xl font-semibold">
            Danh sách thiết bị cần nhập
          </h1>
          <DataTable
            scrollable
            stripedRows
            showGridlines
            emptyMessage="Không tìm thấy dữ liệu"
            value={items}
          >
            <Column field="name" header="Tên" sortable />
            <Column field="category" header="Danh mục" sortable />
            <Column
              field="price"
              header="Giá tiền"
              sortable
              body={priceBodyTemplate}
            />
            <Column
              field="quantity"
              header="Số lượng"
              body={quantityBodyTemplate}
            />
            <Column
              body={actionBodyTemplate}
              exportable={false}
              header="Thao tác"
            />
          </DataTable>
        </div>

        <div className="flex items-center justify-end gap-5">
          <Button
            type="submit"
            label="Quay về"
            severity="secondary"
            onClick={() => navigate("/device")}
          />
          <Button
            onClick={onCreate}
            type="submit"
            label="Xác nhận"
            disabled={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateInventoryDevice;
