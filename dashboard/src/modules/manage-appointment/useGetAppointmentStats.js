import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getAppointmentStatsApi } from "../../api/appointmentApi";

export default function useGetAppointmentStats() {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      try {
        const res = await getAppointmentStatsApi();
        if (res) setStats(res);
      } catch (error) {
        console.log("Lỗi thống kê số liệu lịch khám", error);
        toast.error("Lỗi thống kê số liệu lịch khám");
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
