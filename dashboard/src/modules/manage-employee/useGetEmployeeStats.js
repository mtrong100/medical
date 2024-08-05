import { useEffect, useState } from "react";
import { getEmployeeStatsApi } from "../../api/employeeApi";
import toast from "react-hot-toast";

export default function useGetEmployeeStats() {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await getEmployeeStatsApi();
        if (res) setStats(res);
      } catch (error) {
        console.log("Lỗi thống kê số liệu nhân viên", error);
        toast.error("Lỗi thống kê số liệu nhân viên");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    stats,
    loadingStats: isLoading,
  };
}
