import { useState } from "react";
import { getAppointmentsFromPatientApi } from "../../api/patientApi";
import toast from "react-hot-toast";

export default function useGetMyAppointment() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = async (userId) => {
    setLoading(true);

    try {
      const res = await getAppointmentsFromPatientApi(userId);

      if (res) setData(res);
    } catch (error) {
      console.log("Lỗi fetch data lịch khám bệnh:", error);
      toast.error("Lỗi fetch data lịch khám bệnh:", error);
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
