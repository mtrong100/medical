import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getMedicalServiceInvoicesStatsApi } from "../../api/medicalServiceInvoiceApi";

export default function useGetMedicalServiceInvocieStats() {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      try {
        const res = await getMedicalServiceInvoicesStatsApi();
        if (res) setStats(res);
      } catch (error) {
        console.log("Lỗi thống kê số phiếu dịch vụ", error);
        toast.error("Lỗi thống kê số phiếu dịch vụ");
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
