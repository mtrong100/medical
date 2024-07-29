import useGetMedicalServices from "../../hooks/useGetMedicalServices";
import useCreateMedicalServiceInvoice from "./useCreateMedicalServiceInvoice";
import TitleSection from "../../components/TitleSection";
import React from "react";
import { useNavigate } from "react-router-dom";
import { paymentStatus } from "../../utils/constants";
import { InputText } from "primereact/inputtext";
import { formatCurrencyVND } from "../../utils/helper";
import { Dropdown } from "primereact/dropdown";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

const CreateMedicalServiceInvoice = () => {
  const navigate = useNavigate();
  const { services } = useGetMedicalServices();
  const {
    form,
    setForm,
    loading,
    total,
    onCreate,
    onAddService,
    onDeleteService,
    servicesUsed,
    selectedService,
    setSelectedService,
  } = useCreateMedicalServiceInvoice();

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex items-center ">
        <Button
          icon="pi pi-trash"
          rounded
          severity="danger"
          onClick={() => onDeleteService(rowData._id)}
        />
      </div>
    );
  };

  const priceBodyTemplate = (rowData) => {
    return <div>{formatCurrencyVND(rowData.price)}</div>;
  };

  return (
    <div>
      <TitleSection>Tạo phiếu dịch vụ mới</TitleSection>

      <div className="my-10">
        <div className="grid grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="patient">Mã bệnh nhân</label>
            <InputText
              value={form.patient}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, patient: e.target.value }))
              }
              placeholder="Mã bệnh nhân"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label>Dịch vụ khám</label>
            <div className="flex items-center gap-2">
              <Dropdown
                options={services}
                placeholder="Chọn dịch vụ"
                optionLabel="name"
                filter
                filterPlaceholder="Tìm kiếm"
                className="w-full"
                scrollHeight="400px"
                value={selectedService}
                onChange={(e) => setSelectedService(e.value)}
              />
              <Button
                type="submit"
                label="Thêm dịch vụ"
                className="flex-shrink-0"
                onClick={onAddService}
              />
            </div>
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
        </div>
      </div>

      {/* Service table  */}
      <div className="mt-5 space-y-5">
        <h1 className="text-2xl font-semibold">Danh sách dịch vụ khám</h1>
        <DataTable
          scrollable
          stripedRows
          showGridlines
          emptyMessage="Không tìm thấy dữ liệu"
          value={servicesUsed}
        >
          <Column field="name" header="Tên" sortable />
          <Column
            field="price"
            header="Giá tiền"
            sortable
            body={priceBodyTemplate}
          />
          <Column
            body={actionBodyTemplate}
            exportable={false}
            header="Thao tác"
          />
        </DataTable>
      </div>

      <div className="flex items-center justify-end mt-5">
        <p className="text-xl font-semibold">
          Tổng tiền: {formatCurrencyVND(total)}
        </p>
      </div>

      <div className="flex items-center justify-end gap-5 mt-8">
        <Button
          type="submit"
          label="Quay về"
          severity="secondary"
          onClick={() => navigate("/medical-service-invoice")}
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
  );
};

export default CreateMedicalServiceInvoice;
