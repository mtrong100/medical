import { useEffect, useState } from "react";
import { getPostStatsApi } from "../../api/postApi";
import toast from "react-hot-toast";

export default function useGetPostStats() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await getPostStatsApi();
      if (res) setData(res);
    } catch (error) {
      console.log("Lỗi fetch data post stats", error);
      toast.error("Lỗi fetch data post stats");
    } finally {
      setIsLoading(false);
    }
  };

  return { postStats: data, isLoading };
}
