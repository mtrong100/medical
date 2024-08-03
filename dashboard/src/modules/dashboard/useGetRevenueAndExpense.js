import { useEffect, useState } from "react";
import { getMonthlyRevenueAndExpenseApi } from "../../api/stastisticApi";
import toast from "react-hot-toast";

export default function useGetRevenueAndExpense() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await getMonthlyRevenueAndExpenseApi();
      if (res) setData(res);
    } catch (error) {
      console.log("Lỗi fetch data revenue and expense", error);
      toast.error("Lỗi fetch data revenue and expense");
      setData([]);
    } finally {
      setIsLoading(false);
    }
  };

  const labelResults = data.map((item) => item.month);
  const revenueResults = data.map((item) => item.revenue);
  const expenseResults = data.map((item) => item.expense);

  return {
    labelResults,
    revenueResults,
    expenseResults,
    isLoading,
  };
}
