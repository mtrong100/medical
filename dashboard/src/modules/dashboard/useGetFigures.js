import { useEffect, useState } from "react";
import { getFiguresApi } from "../../api/stastisticApi";
import toast from "react-hot-toast";

export default function useGetFirgures() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getFiguresApi();
      if (res) setData(res);
    } catch (error) {
      console.log("Lỗi fetch data figures", error);
      toast.error("Lỗi fetch data figures");
    }
  };

  return { figures: data, fetchData };
}
