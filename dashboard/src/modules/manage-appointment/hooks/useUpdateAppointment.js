import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { objectIdRegex } from "../../../utils/constants";
import { formatDate, parseDate } from "../../../utils/helper";
import {
  getAppointmentDetailApi,
  updateAppointmentApi,
} from "../../../api/appointmentApi";

export default function useUpdateAppointment() {
  const { id } = useParams();
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    patient: null,
    doctor: null,
    date: null,
    time: null,
    status: null,
  });

  useEffect(() => {
    fetchDetail();
  }, []);

  useEffect(() => {
    if (detail) {
      setForm({
        patient: detail?.patientId,
        doctor: detail?.doctorId,
        date: parseDate(detail?.date),
        time: detail?.time,
        status: detail?.status,
      });
    }
  }, [detail]);

  const fetchDetail = async () => {
    try {
      const res = await getAppointmentDetailApi(id);
      if (res) setDetail(res);
    } catch (error) {
      console.log("Lỗi fetch data detail", error);
      toast.error("Lỗi fetch data detail");
    }
  };

  const onUpdate = async () => {
    const { patient, doctor, date, time, status } = form;

    if (!doctor || !patient || !date || !time || !status) {
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
        status,
      };

      const res = await updateAppointmentApi(id, body);

      if (res) toast.success("Cập nhật lịch khám bệnh thành công");
    } catch (error) {
      console.log("Lỗi cập nhật lịch khám bệnh: ", error);
      toast.error("Lỗi cập nhật lịch khám bệnh");
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    loading,
    setForm,
    onUpdate,
  };
}
