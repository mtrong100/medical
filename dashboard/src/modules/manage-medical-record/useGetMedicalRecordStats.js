import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getMedicalRecordStatsApi } from "../../api/medicalRecordApi";

export default function useGetMedicalRecordStats() {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      try {
        const res = await getMedicalRecordStatsApi();
        if (res) setStats(res);
      } catch (error) {
        console.log("Lỗi thống kê số liệu hồ sơ bệnh án", error);
        toast.error("Lỗi thống kê số liệu hồ sơ bệnh án");
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
