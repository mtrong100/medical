import useGetDoctors from "../../../hooks/useGetDoctors";
import useCreateInvoice from "../hooks/useCreateInvoice";
import TitleSection from "../../../components/TitleSection";
import React from "react";
import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";

const CreateInvoice = () => {
  const navigate = useNavigate();
  const { doctors } = useGetDoctors();
  const { form, loading, setForm, onCreate } = useCreateInvoice();

  return (
    <div>
      <TitleSection>Lập hóa đơn khám bệnh mới</TitleSection>

      <div className="my-10">
        <div className="space-y-5 w-full max-w-3xl mx-auto">
          <div className="flex flex-col gap-2">
            <label htmlFor="patient">Mã bệnh nhân</label>
            <InputText
              value={form.patient}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, patient: e.target.value }))
              }
            />
          </div>

          <div className="flex flex-col gap-2">
            <label>Bác sĩ</label>
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
            <label htmlFor="price">Giá tiền</label>
            <InputText
              id="price"
              type="number"
              value={form.price}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, price: e.target.value }))
              }
            />
          </div>

          <div className="flex align-items-center">
            <Checkbox
              inputId="healthInsurance"
              checked={form.healthInsurance}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, healthInsurance: e.checked }))
              }
            />
            <label htmlFor="healthInsurance" className="ml-2">
              Sử dụng BHYT
            </label>
          </div>

          <div className="flex items-center justify-end gap-5">
            <Button
              type="button"
              onClick={() => navigate("/invoice")}
              label="Quay về"
              severity="secondary"
            />
            <Button
              disabled={loading}
              type="submit"
              label="Xác nhận"
              onClick={onCreate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateInvoice;
