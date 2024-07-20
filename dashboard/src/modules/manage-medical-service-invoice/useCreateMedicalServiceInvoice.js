import toast from "react-hot-toast";
import { useMemo, useState } from "react";
import { objectIdRegex, PAYMENT_STATUS } from "../../utils/constants";
import { createMedicalServiceInvoiceApi } from "../../api/medicalServiceInvoiceApi";

export default function useCreateMedicalServiceInvoice() {
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [form, setForm] = useState({
    patient: null,
    status: PAYMENT_STATUS.UNPAID,
  });

  const total = useMemo(() => {
    return services.reduce((acc, item) => acc + item.price, 0);
  }, [services]);

  const onCreate = async () => {
    const { patient, status } = form;

    if (!patient || !status) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }

    if (services.length === 0) {
      toast.error("Vui lòng chọn dịch vụ");
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
      const formatArray = services.map((item) => ({
        service: item._id,
      }));

      const body = {
        patient,
        detail: formatArray,
        total: total.toFixed(2),
        status,
      };

      const res = await createMedicalServiceInvoiceApi(body);

      if (res) toast.success("Tạo mới hoàn tất");
    } catch (error) {
      console.log("Lỗi:", error);
      toast.error("Lỗi");
    } finally {
      setLoading(false);
      setServices([]);
      setSelectedService(null);
      setForm({
        patient: null,
        status: PAYMENT_STATUS.UNPAID,
      });
    }
  };

  const onAddService = () => {
    if (!selectedService) {
      toast.error("Vui lòng chọn dịch vụ");
      return;
    }

    const body = {
      _id: selectedService?._id,
      name: selectedService?.name,
      price: selectedService?.price,
    };

    const isExistedService = services.find((item) => item._id === body._id);

    if (isExistedService) {
      toast.info("Dịch vụ này đã được chọn rồi");
      return;
    }

    if (!isExistedService) {
      setServices([...services, body]);
    }
  };

  const onDeleteService = (id) => {
    setServices(services.filter((item) => item._id !== id));
  };

  return {
    form,
    setForm,
    loading,
    total,
    onCreate,
    onAddService,
    onDeleteService,
    servicesUsed: services,
    selectedService,
    setSelectedService,
  };
}
