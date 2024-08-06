import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getInvoiceStatsApi } from "../../api/invoiceApi";

export default function useGetInvoiceStats() {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      try {
        const res = await getInvoiceStatsApi();
        if (res) setStats(res);
      } catch (error) {
        console.log("Lỗi thống kê số liệu hóa đơn khám bệnh", error);
        toast.error("Lỗi thống kê số liệu hóa đơn khám bệnh");
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
