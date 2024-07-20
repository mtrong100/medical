import toast from "react-hot-toast";
import { useState } from "react";
import { objectIdRegex } from "../../../utils/constants";
import { createInvoiceApi } from "../../../api/invoiceApi";

export default function useCreateInvoice() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    patient: null,
    doctor: null,
    price: 200000,
    healthInsurance: false,
  });

  const onCreate = async () => {
    const { patient, doctor, price, healthInsurance } = form;
    if (!doctor || !patient.trim() || !price || !healthInsurance) {
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
      };
      const res = await createInvoiceApi(body);

      if (res) toast.success("Lập hóa đơn hoàn tất");
    } catch (error) {
      console.log("Lỗi lập hóa đơn: ", error);
      toast.error("Lỗi lập hóa đơn");
    } finally {
      setLoading(false);
      setForm({
        patient: null,
        doctor: null,
        price: 200000,
        healthInsurance: false,
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
