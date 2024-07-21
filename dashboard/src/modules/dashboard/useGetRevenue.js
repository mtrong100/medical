import { useEffect, useState } from "react";
import { getRevenueApi } from "../../api/stastisticApi";
import toast from "react-hot-toast";

export default function useGetRevenue() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getRevenueApi();
      if (res) setData(res.totalRevenue);
    } catch (error) {
      console.log("Lỗi fetch data revenue", error);
      toast.error("Lỗi fetch data revenue");
    }
  };

  return { revenue: data, fetchData };
}
