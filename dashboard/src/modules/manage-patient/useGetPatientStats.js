import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getPatientStatsApi } from "../../api/patientApi";

export default function useGetPatientStats() {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      try {
        const res = await getPatientStatsApi();
        if (res) setStats(res);
      } catch (error) {
        console.log("Lỗi thống kê số liệu bệnh nhân", error);
        toast.error("Lỗi thống kê số liệu bệnh nhân");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  return {
    stats,
    loadingStats: isLoading,
  };
}
