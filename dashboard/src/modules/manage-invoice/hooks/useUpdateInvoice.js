import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { objectIdRegex } from "../../../utils/constants";
import {
  getInvoiceDetailApi,
  updatePupdateInvoiceApi,
} from "../../../api/invoiceApi";
import { useParams } from "react-router-dom";

export default function useUpdateInvoice() {
  const { id } = useParams();
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    patient: null,
    doctor: null,
    price: 200000,
    healthInsurance: false,
    paymentStatus: null,
  });

  useEffect(() => {
    fetchDetail();
  }, []);

  useEffect(() => {
    if (detail) {
      setForm({
        patient: detail?.patientId,
        doctor: detail?.doctorId,
        price: detail?.price,
        healthInsurance: detail?.healthInsurance,
        paymentStatus: detail?.paymentStatus,
      });
    }
  }, [detail]);

  const fetchDetail = async () => {
    try {
      const res = await getInvoiceDetailApi(id);
      if (res) setDetail(res);
    } catch (error) {
      console.log("Lỗi fetch data detail", error);
      toast.error("Lỗi fetch data detail");
    }
  };

  const onUpdate = async () => {
    const { patient, doctor, price, healthInsurance, paymentStatus } = form;
    if (
      !doctor ||
      !patient.trim() ||
      !price ||
      !healthInsurance ||
      !paymentStatus
    ) {
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
        price,
        healthInsurance,
        paymentStatus,
      };
      const res = await updatePupdateInvoiceApi(id, body);

      if (res) toast.success("Cập nhật hóa đơn hoàn tất");
    } catch (error) {
      console.log("Lỗi cập nhật hóa đơn: ", error);
      toast.error("Lỗi cập nhật hóa đơn");
    } finally {
      setLoading(false);
      fetchDetail();
    }
  };

  return {
    form,
    loading,
    setForm,
    onUpdate,
  };
}
