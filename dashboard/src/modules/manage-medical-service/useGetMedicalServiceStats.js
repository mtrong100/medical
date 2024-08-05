import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getMedicalServiceStatsApi } from "../../api/medicalServiceApi";

export default function useGetMedicalServiceStats() {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      try {
        const res = await getMedicalServiceStatsApi();
        if (res) setStats(res);
      } catch (error) {
        console.log("Lỗi thống kê số liệu dịch vụ khám", error);
        toast.error("Lỗi thống kê số liệu dịch vụ khám");
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
