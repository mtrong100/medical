import { useState } from "react";
import { getDeviceDetailApi } from "../../api/deviceApi";
import toast from "react-hot-toast";

export default function useGetDeviceDetail() {
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDetail = async (id) => {
    setLoading(true);
    try {
      const res = await getDeviceDetailApi(id);
      if (res) setDetail(res);
    } catch (error) {
      console.log("Lỗi fetch data detail", error);
      toast.error("Lỗi fetch data detail");
    } finally {
      setLoading(false);
    }
  };

  return {
    detail,
    loading,
    fetchDetail,
  };
}
