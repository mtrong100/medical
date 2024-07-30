import toast from "react-hot-toast";
import { useState } from "react";
import { objectIdRegex } from "../../utils/constants";
import { formatDate } from "../../utils/helper";
import { createAppointmentApi } from "../../api/appointmentApi";

export default function useCreateAppointment() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    patient: "",
    doctor: null,
    date: null,
    time: null,
  });

  const onCreate = async () => {
    const { patient, doctor, date, time } = form;
    if (!doctor || !patient.trim() || !date || !time) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }

    if (patient && !objectIdRegex.test(patient)) {
      toast.error(
        "Mã bệnh nhân phải là một ObjectId hợp lệ (24 ký tự hexadecimal)"
      );
      return;
    }

    setLoading(true);

    try {
      const body = {
        patient,
        doctor,
        date: formatDate(date),
        time,
      };

      const res = await createAppointmentApi(body);

      if (res) toast.success("Tạo lịch khám bệnh thành công");
    } catch (error) {
      console.log("Lỗi tạo lịch khám bệnh: ", error);
      toast.error("Lỗi tạo lịch khám bệnh");
    } finally {
      setLoading(false);
      setForm({
        patient: "",
        doctor: null,
        date: null,
        time: null,
      });
    }
  };

  return {
    form,
    loading,
    setForm,
    onCreate,
  };
}
