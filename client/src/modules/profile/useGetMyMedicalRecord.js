import { useState } from "react";
import { getMedicalRecordsFromPatientApi } from "../../api/patientApi";
import toast from "react-hot-toast";

export default function useGetMyMedicalRecord() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = async (userId) => {
    setLoading(true);

    try {
      const res = await getMedicalRecordsFromPatientApi(userId);

      if (res) setData(res);
    } catch (error) {
      console.log("Lỗi fetch data hồ sơ bệnh án:", error);
      toast.error("Lỗi fetch data hồ sơ bệnh án:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    data,
    fetchData,
  };
}
