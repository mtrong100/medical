import React, { useEffect, useRef, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { doctorSchedules } from "../utils/constants";
import { Toast } from "primereact/toast";
import { formatDate, parseDate } from "../utils/helper";
import { Calendar } from "primereact/calendar";
import useGetDoctors from "../hooks/useGetDoctors";
import { InputText } from "primereact/inputtext";
import { updateAppointmentApi } from "../api/appointmentApi";

const UpdateAppointmentModal = ({
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
    date: "",
    time: "",
  });

  useEffect(() => {
    if (updateVal) {
      setForm({
        patient: updateVal?.patient?._id,
        doctor: updateVal?.doctor?._id,
        date: parseDate(updateVal?.date),
        time: updateVal?.time,
      });
    }
  }, [updateVal]);

  const handleUpdateAppointment = async () => {
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

    if (!form.doctor || !form.patient.trim() || !form.date || !form.time) {
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
        date: formatDate(form.date),
        time: form.time,
      };

      const res = await updateAppointmentApi(updateVal._id, body);

      if (res) {
        toast.current.show({
          severity: "success",
          summary: "Cập nhật lịch khám bệnh thành công",
          life: 1500,
        });
      }
    } catch (error) {
      console.log("Error updating appointment:", error);
      toast.current.show({
        severity: "error",
        summary: "Lỗi",
        life: 1500,
      });
    } finally {
      setVisible2(false);
      onRefresh();
    }
  };

  return (
    <>
      <Toast ref={toast} />

      <Dialog
        header="Cập nhật lịch khám bệnh"
        visible={visible2}
        style={{ width: "40vw" }}
        onHide={() => {
          if (!visible2) return;
          setVisible2(false);
        }}
      >
        <div className="m-0">
          <div className="grid grid-cols-2 gap-5">
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
              <label>Ngày khám bệnh</label>
              <Calendar
                id="buttondisplay"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.value })}
                showIcon
              />
            </div>

            <div className="flex flex-col gap-2">
              <label>Khung giờ</label>
              <Dropdown
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.value })}
                options={doctorSchedules}
                filter
                filterPlaceholder="Tìm kiếm"
                placeholder="Chọn khung giờ"
                className="w-full "
                scrollHeight="400px"
              />
            </div>
          </div>

          <Button
            disabled={loading}
            className="w-full"
            type="submit"
            label="Xác nhận"
            onClick={handleUpdateAppointment}
          />
        </div>
      </Dialog>
    </>
  );
};

export default UpdateAppointmentModal;
