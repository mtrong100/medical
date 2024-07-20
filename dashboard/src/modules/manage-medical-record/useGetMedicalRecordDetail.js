import toast from "react-hot-toast";
import { useState } from "react";
import { getMedicalRecordDetailApi } from "../../api/medicalRecordApi";

export default function useGetMedicalRecordDetail() {
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDetail = async (id) => {
    setLoading(true);

    try {
      const res = await getMedicalRecordDetailApi(id);
      if (res) setDetail(res);
    } catch (error) {
      console.log("Lỗi fetch data detail", error);
      toast.error("Lỗi fetch data detail");
    } finally {
      setLoading(false);
    }
  };

  return {
    detail,
    loading,
    fetchDetail,
  };
}
