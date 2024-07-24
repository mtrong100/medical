import { useState } from "react";
import { getSupplierDetailApi } from "../../api/supplierApi";

export default function useGetSupplierDetail() {
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDetail = async (id) => {
    setLoading(true);
    try {
      const res = await getSupplierDetailApi(id);
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
