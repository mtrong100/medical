import useGetDoctors from "../../hooks/useGetDoctors";
import TitleSection from "../../components/TitleSection";
import React from "react";
import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import useCreateAppointment from "./useCreateAppointment";
import { doctorSchedules } from "../../utils/constants";

const CreateAppointment = () => {
  const navigate = useNavigate();
  const { doctors } = useGetDoctors();
  const { form, loading, setForm, onCreate } = useCreateAppointment();

  return (
    <div>
      <TitleSection>Tạo lịch khám bệnh mới</TitleSection>

      <div className="my-10 ">
        <div className="space-y-5 w-full max-w-3xl mx-auto">
          <div className="flex flex-col gap-2">
            <label>Mã bệnh nhân</label>
            <InputText
              value={form.patient}
              placeholder="Mã bệnh nhân"
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
            <label>Ngày khám bệnh</label>
            <Calendar
              showIcon
              value={form.date}
              onChange={(e) => setForm((prev) => ({ ...prev, date: e.value }))}
              placeholder="Ngày khám bệnh"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label>Khung giờ</label>
            <Dropdown
              options={doctorSchedules}
              filter
              filterPlaceholder="Tìm kiếm"
              placeholder="Chọn khung giờ"
              className="w-full "
              scrollHeight="400px"
              value={form.time}
              onChange={(e) => setForm((prev) => ({ ...prev, time: e.value }))}
            />
          </div>

          <div className="flex items-center justify-end gap-5">
            <Button
              type="button"
              onClick={() => navigate("/appointment")}
              label="Quay về"
              icon="pi pi-arrow-left"
              severity="secondary"
            />
            <Button
              disabled={loading}
              type="submit"
              label="Xác nhận"
              icon="pi pi-check-circle"
              onClick={onCreate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAppointment;
