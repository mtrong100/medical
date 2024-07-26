import useGetMedicineCollection from "../../hooks/useGetMedicineCollection";
import useGetDoctors from "../../hooks/useGetDoctors";
import useCreatePrescription from "./useCreatePrescription";
import TitleSection from "../../components/TitleSection";
import React from "react";
import { useNavigate } from "react-router-dom";
import { paymentStatus } from "../../utils/constants";
import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { formatCurrencyVND } from "../../utils/helper";
import { Dropdown } from "primereact/dropdown";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

const CreatePrescription = () => {
  const navigate = useNavigate();
  const { doctors } = useGetDoctors();
  const { medicines } = useGetMedicineCollection();
  const {
    form,
    setForm,
    loading,
    total,
    selectedMedicine,
    setSelectedMedicine,
    quantity,
    setQuantity,
    onAddMedicine,
    onDeleteMedicine,
    onIncreaseQuantity,
    onDecreaseQuantity,
    onCreate,
    prescriptions,
  } = useCreatePrescription();

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex items-center gap-2 justify-center">
        <Button
          icon="pi pi-trash"
          rounded
          severity="danger"
          onClick={() => onDeleteMedicine(rowData._id)}
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
      <TitleSection>Kê toa đơn thuốc mới</TitleSection>

      <div className="my-10 space-y-8 w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <label>Mã bệnh nhân</label>
            <InputText
              value={form.patient}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, patient: e.target.value }))
              }
            />
          </div>

          <div className="flex flex-col gap-2">
            <label>Bác sĩ kê toa thuốc</label>
            <Dropdown
              options={doctors}
              filter
              filterPlaceholder="Tìm kiếm"
              optionValue="_id"
              optionLabel="name"
              placeholder="Chọn bác sĩ khám bệnh"
              className="w-full "
              scrollHeight="300px"
              value={form.doctor}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, doctor: e.value }))
              }
            />
          </div>

          <div className="flex flex-col gap-2">
            <label>Trạng thái</label>
            <Dropdown
              options={paymentStatus}
              placeholder="Chọn trạng thái"
              className="w-full "
              value={form.status}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, status: e.value }))
              }
            />
          </div>

          <div className="flex flex-col gap-2">
            <label>Ghi chú</label>
            <InputTextarea
              rows={3}
              cols={30}
              value={form.notes}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, notes: e.target.value }))
              }
            />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-5">
          <div className="flex flex-col gap-2">
            <label>Chọn thuốc</label>
            <Dropdown
              options={medicines}
              filter
              filterPlaceholder="Tìm kiếm"
              placeholder="Chọn thuốc"
              className="w-full "
              optionLabel="name"
              scrollHeight="300px"
              value={selectedMedicine}
              onChange={(e) => setSelectedMedicine(e.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label>Đơn vị</label>
            <InputText value={selectedMedicine?.unit} readOnly />
          </div>

          <div className="flex flex-col gap-2">
            <label>Số lượng</label>
            <InputNumber
              value={quantity}
              onChange={(e) => setQuantity(e.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label>Thao tác</label>
            <Button
              onClick={onAddMedicine}
              type="button"
              label="Thêm thuốc"
              icon="pi pi-plus"
            />
          </div>
        </div>

        {/* Medicine table */}
        <div className="space-y-5">
          <h1 className="text-2xl font-semibold">
            Danh sách thuốc theo kê toa
          </h1>
          <DataTable
            scrollable
            stripedRows
            showGridlines
            emptyMessage="Không tìm thấy dữ liệu"
            value={prescriptions}
          >
            <Column field="name" header="Tên" sortable />
            <Column field="unit" header="Đơn vị" sortable />
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

        <div className="flex items-center justify-end">
          <p className="text-xl font-semibold">
            Tổng tiền: {formatCurrencyVND(total)}
          </p>
        </div>

        <div className="flex items-center justify-end gap-5">
          <Button
            type="submit"
            label="Quay về"
            severity="secondary"
            onClick={() => navigate("/prescription")}
            icon="pi pi-arrow-left"
          />
          <Button
            onClick={onCreate}
            type="submit"
            label="Xác nhận"
            disabled={loading}
            icon="pi pi-check-circle"
          />
        </div>
      </div>
    </div>
  );
};

export default CreatePrescription;
