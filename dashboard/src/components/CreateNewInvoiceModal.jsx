import React, { useRef, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import useGetDoctors from "../hooks/useGetDoctors";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { createNewInvoiceApi } from "../api/invoiceApi";

const CreateNewInvoiceModal = ({
  visible,
  setVisible,
  onRefresh = () => {},
}) => {
  const toast = useRef(null);
  const { doctors } = useGetDoctors();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    patient: "",
    doctor: "",
    price: 1000000,
    healthInsurance: false,
  });

  const handleCreateNewInvoice = async () => {
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

    if (!form.doctor || !form.patient.trim() || !form.price) {
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
      };

      const res = await createNewInvoiceApi(body);

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
      setVisible(false);
      onRefresh();
      setForm({
        patient: "",
        doctor: "",
        price: 1000000,
        healthInsurance: false,
      });
    }
  };

  return (
    <>
      <Toast ref={toast} />

      <Dialog
        header="Lập hóa đơn khám bệnh"
        visible={visible}
        style={{ width: "35vw" }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
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
          </div>

          <Button
            disabled={loading}
            className="w-full mt-5"
            type="submit"
            label="Xác nhận"
            onClick={handleCreateNewInvoice}
          />
        </div>
      </Dialog>
    </>
  );
};

export default CreateNewInvoiceModal;
