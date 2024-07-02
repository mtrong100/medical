import React, { useEffect, useRef, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import useGetDoctors from "../hooks/useGetDoctors";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { updatePupdateInvoiceApi } from "../api/invoiceApi";
import { paymentStatus } from "../utils/constants";

const UpdateInvoiceModal = ({
  visible2,
  setVisible2,
  onRefresh = () => {},
  updateVal,
}) => {
  const toast = useRef(null);
  const { doctors } = useGetDoctors();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    patient: "",
    doctor: "",
    price: 1000000,
    healthInsurance: false,
    status: "",
  });

  useEffect(() => {
    if (updateVal) {
      setForm({
        patient: updateVal?.patient?._id,
        doctor: updateVal?.doctor?._id,
        price: updateVal?.price,
        healthInsurance: updateVal?.healthInsurance,
        status: updateVal?.paymentStatus,
      });
    }
  }, [updateVal]);

  const handleUpdateInvoice = async () => {
    const objectIdRegex = /^[0-9a-fA-F]{24}$/;

    if (form.patient && !objectIdRegex.test(form.patient)) {
      toast.current.show({
        severity: "error",
        summary:
          "Mã bệnh nhân phải là một ObjectId hợp lệ (24 ký tự hexadecimal)",
        life: 1500,
      });
      return;
    }

    if (!form.doctor || !form.patient.trim() || !form.price || !form.status) {
      toast.current.show({
        severity: "error",
        summary: "Vui lòng điền đầy đủ vào form",
        life: 1500,
      });
      return;
    }

    setLoading(true);

    try {
      const body = {
        patient: form.patient,
        doctor: form.doctor,
        price: form.price,
        healthInsurance: form.healthInsurance,
        status: form.status,
      };

      const res = await updatePupdateInvoiceApi(updateVal._id, body);

      if (res) {
        toast.current.show({
          severity: "success",
          summary: "Thao tác hoàn tất",
          life: 1500,
        });
      }
    } catch (error) {
      console.log("error", error);
      toast.current.show({
        severity: "error",
        summary: `Lỗi! ${error.message}`,
        life: 1500,
      });
    } finally {
      setLoading(false);
      setVisible2(false);
      onRefresh();
    }
  };

  return (
    <>
      <Toast ref={toast} />

      <Dialog
        header="Cập nhật hóa đơn khám bệnh"
        visible={visible2}
        style={{ width: "35vw" }}
        onHide={() => {
          if (!visible2) return;
          setVisible2(false);
        }}
      >
        <div className="m-0">
          <div className="space-y-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="patient">Mã bệnh nhân</label>
              <InputText
                id="patient"
                value={form.patient}
                onChange={(e) => setForm({ ...form, patient: e.target.value })}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label>Bác sĩ</label>
              <Dropdown
                value={form.doctor}
                onChange={(e) => setForm({ ...form, doctor: e.value })}
                options={doctors}
                filter
                filterPlaceholder="Tìm kiếm"
                optionValue="_id"
                optionLabel="name"
                placeholder="Chọn bác sĩ khám bệnh"
                className="w-full "
                scrollHeight="300px"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="price">Giá tiền</label>
              <InputText
                id="price"
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              />
            </div>

            <div className="flex align-items-center">
              <Checkbox
                inputId="healthInsurance"
                onChange={(e) =>
                  setForm({ ...form, healthInsurance: e.checked })
                }
                checked={form.healthInsurance}
              />
              <label htmlFor="healthInsurance" className="ml-2">
                Health Insurance
              </label>
            </div>

            <div className="flex flex-col gap-2">
              <label>Trạng thái</label>
              <Dropdown
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.value })}
                options={paymentStatus}
                placeholder="Chọn trạng thái"
                className="w-full "
              />
            </div>
          </div>

          <Button
            disabled={loading}
            className="w-full mt-5"
            type="submit"
            label="Xác nhận"
            onClick={handleUpdateInvoice}
          />
        </div>
      </Dialog>
    </>
  );
};

export default UpdateInvoiceModal;
