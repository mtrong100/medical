import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { objectIdRegex, PAYMENT_STATUS } from "../../../utils/constants";
import {
  getPrescriptionDetailApi,
  updatePrescriptionApi,
} from "../../../api/prescriptionApi";

export default function useUpdatePrescription() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [form, setForm] = useState({
    patient: null,
    doctor: null,
    status: PAYMENT_STATUS.UNPAID,
    notes: "",
  });

  useEffect(() => {
    fetchDetail();
  }, [id]);

  const fetchDetail = async () => {
    try {
      const res = await getPrescriptionDetailApi(id);
      setDetail(res);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    if (detail) {
      setForm({
        patient: detail.patientId,
        doctor: detail.doctorId,
        notes: detail.notes,
        status: detail.status,
      });
      setPrescriptions(detail.detail);
    }
  }, [detail]);

  const total = useMemo(() => {
    return prescriptions.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  }, [prescriptions]);

  const onUpdate = async () => {
    const { patient, doctor, notes, status } = form;

    if (!patient || !doctor || !notes || !status) {
      toast.error("Vui lòng điền đầy đủ thông tin");
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
      const formatArray = prescriptions.map((item) => ({
        medicine: item._id,
        quantity: item.quantity,
      }));

      const body = {
        patient,
        doctor,
        notes,
        detail: formatArray,
        total: total.toFixed(2),
        status,
      };

      const res = await updatePrescriptionApi(id, body);

      if (res) toast.success("Cập nhật hoàn tất");
    } catch (error) {
      console.log("Lỗi:", error);
      toast.error("Lỗi");
    } finally {
      setLoading(false);
      fetchDetail();
    }
  };

  const onAddMedicine = () => {
    if (!selectedMedicine) {
      toast.error("Vui lòng chọn thuốc");
      return;
    }

    const body = {
      _id: selectedMedicine?._id,
      name: selectedMedicine?.name,
      unit: selectedMedicine?.unit,
      price: selectedMedicine?.price,
      quantity,
    };

    const existedIndex = prescriptions.findIndex(
      (item) => item._id === body._id
    );

    if (existedIndex !== -1) {
      const updatedMedicineArray = [...prescriptions];
      updatedMedicineArray[existedIndex].quantity += body.quantity;
      setPrescriptions(updatedMedicineArray);
    } else {
      setPrescriptions([...prescriptions, body]);
    }

    setSelectedMedicine(null);
    setQuantity(1);
  };

  const onDeleteMedicine = (id) => {
    setPrescriptions(prescriptions.filter((item) => item._id !== id));
  };

  const onIncreaseQuantity = (id) => {
    const updatedMedicineArray = [...prescriptions];
    const index = updatedMedicineArray.findIndex((item) => item._id === id);
    if (index !== -1) {
      updatedMedicineArray[index].quantity += 1;
      setPrescriptions(updatedMedicineArray);
    }
  };

  const onDecreaseQuantity = (id) => {
    const updatedMedicineArray = [...prescriptions];
    const index = updatedMedicineArray.findIndex((item) => item._id === id);
    if (index !== -1 && updatedMedicineArray[index].quantity > 1) {
      updatedMedicineArray[index].quantity -= 1;
      setPrescriptions(updatedMedicineArray);
    }
  };

  return {
    form,
    setForm,
    loading,
    total,
    selectedMedicine,
    setSelectedMedicine,
    quantity,
    setQuantity,
    onAddMedicine,
    onDeleteMedicine,
    onIncreaseQuantity,
    onDecreaseQuantity,
    onUpdate,
    prescriptions,
  };
}
