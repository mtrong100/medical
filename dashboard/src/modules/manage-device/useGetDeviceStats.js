import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getDeviceStatsApi } from "../../api/deviceApi";

export default function useGetDeviceStats() {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      try {
        const res = await getDeviceStatsApi();
        if (res) setStats(res);
      } catch (error) {
        console.log("Lỗi thống kê số liệu vật tư", error);
        toast.error("Lỗi thống kê số liệu vật tư");
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
