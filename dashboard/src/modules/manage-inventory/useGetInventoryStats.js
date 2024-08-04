import { useEffect, useState } from "react";
import { getInventoryStatsApi } from "../../api/inventoryApi";
import toast from "react-hot-toast";

export default function useGetInventoryStats() {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await getInventoryStatsApi();
      if (res) setStats(res);
    } catch (error) {
      console.log("Lỗi fetch data inventory stats", error);
      toast.error("Lỗi fetch data inventory stats");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    stats,
    loadingStats: isLoading,
  };
}
