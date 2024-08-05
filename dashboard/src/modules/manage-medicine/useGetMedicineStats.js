import { useEffect, useState } from "react";
import { getMedicineStatsApi } from "../../api/medicineApi";
import toast from "react-hot-toast";

export default function useGetMedicineStats() {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      try {
        const res = await getMedicineStatsApi();
        if (res) setStats(res);
      } catch (error) {
        console.log("Lỗi thống kê thông số thuốc", error);
        toast.error("Lỗi thống kê thông số thuốc");
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
