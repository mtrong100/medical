import { useEffect, useState } from "react";
import { getMonthlyRevenueApi } from "../../api/stastisticApi";
import toast from "react-hot-toast";

export default function useGetMonthlyRevenue() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getMonthlyRevenueApi();
      if (res) setData(res);
    } catch (error) {
      console.log("Lỗi fetch data monthlyRevenues", error);
      toast.error("Lỗi fetch data monthlyRevenues");
    }
  };

  return { monthlyRevenues: data, fetchData };
}
