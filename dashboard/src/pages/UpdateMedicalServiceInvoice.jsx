import React, { useEffect, useMemo, useRef, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import TitleSection from "../components/TitleSection";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { formatCurrencyVND } from "../utils/helper";
import { useNavigate, useParams } from "react-router-dom";
import { PAYMENT_STATUS, paymentStatus } from "../utils/constants";
import useGetMedicalServices from "../hooks/useGetMedicalServices";
import {
  getMedicalServiceInvoiceDetailApi,
  updateMedicalServiceInvoiceApi,
} from "../api/medicalServiceInvoiceApi";

const UpdateMedicalServiceInvoice = () => {
  const { id } = useParams();
  const toast = useRef(null);
  const navigate = useNavigate();
  const { services } = useGetMedicalServices();
  const [loading, setLoading] = useState(false);
  const [selectedServiceArray, setSelectedServiceArray] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(PAYMENT_STATUS.UNPAID);
  const [selectedService, setSelectedService] = useState(null);
  const [patient, setPatient] = useState("");
  const [service, setService] = useState(null);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    fetchMedicalServiceInvoiceDetail();
  }, []);

  const fetchMedicalServiceInvoiceDetail = async () => {
    setPending(true);
    try {
      const res = await getMedicalServiceInvoiceDetailApi(id);
      setService(res);
    } catch (error) {
      console.log("Error: ", error);
      setService(null);
    } finally {
      setPending(false);
    }
  };

  useEffect(() => {
    if (service) {
      setPatient(service.patientId);
      setSelectedServiceArray(service.detail);
      setSelectedStatus(service.status);
    }
  }, [service]);

  const handleUpdateMedicalServiceInvoice = async () => {
    const objectIdRegex = /^[0-9a-fA-F]{24}$/;

    if (!patient.trim()) {
      toast.current.show({
        severity: "error",
        summary: "Vui lòng nhập mã bệnh nhân",
        life: 1500,
      });
      return;
    }

    if (patient && !objectIdRegex.test(patient)) {
      toast.current.show({
        severity: "error",
        summary:
          "Mã bệnh nhân phải là một ObjectId hợp lệ (24 ký tự hexadecimal)",
        life: 1500,
      });
      return;
    }

    if (selectedServiceArray.length === 0) {
      toast.current.show({
        severity: "error",
        summary: "Vui lòng chọn dịch vụ khám",
        life: 1500,
      });
      return;
    }

    setLoading(true);

    try {
      const formatArray = selectedServiceArray.map((item) => ({
        service: item._id,
      }));

      const body = {
        patient: patient,
        detail: formatArray,
        total: total.toFixed(2),
        status: selectedStatus,
      };

      const res = await updateMedicalServiceInvoiceApi(id, body);

      if (res) {
        toast.current.show({
          severity: "success",
          summary: "Theo tác hoàn tất",
          life: 1500,
        });
      }
    } catch (error) {
      console.log("Error updating medical service invoice:", error);
      toast.current.show({
        severity: "error",
        summary: "Lỗi",
        life: 1500,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddServiceToTable = async () => {
    if (!selectedService) {
      toast.current.show({
        severity: "error",
        summary: "Vui loại chọn dịch vụ",
        life: 1500,
      });
      return;
    }

    const body = {
      _id: selectedService?._id,
      name: selectedService?.name,
      price: selectedService?.price,
    };

    const isExist = selectedServiceArray.find((item) => item._id === body._id);

    if (isExist) {
      toast.current.show({
        severity: "error",
        summary: "Dịch vụ đã được chọn rồi",
        life: 1500,
      });
      return;
    }

    if (!isExist) {
      setSelectedServiceArray([...selectedServiceArray, body]);
    }
  };

  const handleDeleteService = (id) => {
    setSelectedServiceArray(
      selectedServiceArray.filter((item) => item._id !== id)
    );
  };

  const total = useMemo(() => {
    return selectedServiceArray.reduce((acc, item) => acc + item.price, 0);
  }, [selectedServiceArray]);

  const priceBodyTemplate = (rowData) => {
    return <div>{formatCurrencyVND(rowData.price)}</div>;
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex items-center ">
        <Button
          icon="pi pi-trash"
          rounded
          severity="danger"
          onClick={() => handleDeleteService(rowData._id)}
        />
      </div>
    );
  };

  return (
    <div>
      <TitleSection>Cập nhật phiếu dịch vụ</TitleSection>
      <Toast ref={toast} />

      <div className="space-y-5 mt-8">
        <div className="grid grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="patient">Mã bệnh nhân</label>
            <InputText
              id="patient"
              value={patient}
              onChange={(e) => setPatient(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label>Dịch vụ khám</label>
            <div className="flex items-center gap-2">
              <Dropdown
                value={selectedService}
                onChange={(e) => setSelectedService(e.value)}
                options={services}
                placeholder="Chọn dịch vụ"
                optionLabel="name"
                filter
                filterPlaceholder="Tìm kiếm"
                className="w-full"
                scrollHeight="400px"
              />
              <Button
                type="submit"
                label="Thêm dịch vụ"
                className="flex-shrink-0"
                onClick={handleAddServiceToTable}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label>Trạng thái</label>
            <Dropdown
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.value)}
              options={paymentStatus}
              placeholder="Chọn trạng thái"
              className="w-full "
            />
          </div>
        </div>
      </div>

      {/* Service table  */}
      <div className="mt-5 space-y-3">
        <h1 className="text-2xl font-semibold">Danh sách dịch vụ khám</h1>
        <DataTable
          scrollable
          stripedRows
          showGridlines
          emptyMessage="Không tìm thấy dữ liệu"
          value={selectedServiceArray}
        >
          <Column field="_id" header="Mã dịch vụ" sortable />
          <Column field="name" header="Tên dịch vụ" sortable />
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

      <div className="flex items-center justify-end gap-3 mt-8">
        <Button
          type="submit"
          label="Quay về"
          className="w-[200px]"
          severity="secondary"
          onClick={() => navigate("/medical-service-invoice")}
        />
        <Button
          onClick={handleUpdateMedicalServiceInvoice}
          type="submit"
          label="Xác nhận"
          disabled={loading}
          className="w-[200px]"
        />
      </div>
    </div>
  );
};

export default UpdateMedicalServiceInvoice;
