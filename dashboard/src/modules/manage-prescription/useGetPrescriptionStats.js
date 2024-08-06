import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getPrescriptionStatsApi } from "../../api/prescriptionApi";

export default function useGetPrescriptionStats() {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      try {
        const res = await getPrescriptionStatsApi();
        if (res) setStats(res);
      } catch (error) {
        console.log("Lỗi thống kê số liệu hóa đơn thuốc", error);
        toast.error("Lỗi thống kê số liệu hóa đơn thuốc");
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
