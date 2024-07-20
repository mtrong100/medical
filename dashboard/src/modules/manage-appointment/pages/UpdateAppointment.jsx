import useUpdateAppointment from "../hooks/useUpdateAppointment";
import useGetDoctors from "../../../hooks/useGetDoctors";
import TitleSection from "../../../components/TitleSection";
import React from "react";
import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { appointmentStatus, doctorSchedules } from "../../../utils/constants";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";

const UpdateAppointment = () => {
  const navigate = useNavigate();
  const { doctors } = useGetDoctors();
  const { form, loading, setForm, onUpdate } = useUpdateAppointment();

  return (
    <div>
      <TitleSection>Cập nhật lịch khám bệnh</TitleSection>

      <div className="my-10 ">
        <div className="space-y-5 w-full max-w-3xl mx-auto">
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

          <div className="flex flex-col gap-2">
            <label>Trạng thái</label>
            <Dropdown
              options={appointmentStatus}
              placeholder="Chọn trạng thái"
              value={form.status}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, status: e.value }))
              }
            />
          </div>

          <div className="flex items-center justify-end gap-5">
            <Button
              type="button"
              onClick={() => navigate("/appointment")}
              label="Quay về"
              severity="secondary"
            />
            <Button
              disabled={loading}
              type="submit"
              label="Xác nhận"
              onClick={onUpdate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateAppointment;
