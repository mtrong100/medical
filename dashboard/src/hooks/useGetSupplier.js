import { useState } from "react";
import { getSupplierCollectionApi } from "../api/supplierApi";
import toast from "react-hot-toast";

export default function useGetSupplier() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);

    try {
      const res = await getSupplierCollectionApi();

      if (res) {
        setData(res);
      }
    } catch (error) {
      console.log("Lỗi fetch data supplier: ", error);
      toast.error("Lỗi fetch data supplier");
    } finally {
      setLoading(false);
    }
  };

  return {
    suppliers: data,
    loading,
    fetchSupplier: fetchData,
  };
}
