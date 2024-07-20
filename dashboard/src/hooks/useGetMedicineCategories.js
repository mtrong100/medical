import toast from "react-hot-toast";
import { useState } from "react";
import { getMedicineCategoryCollectionApi } from "../api/medicineCategoryApi";

export default function useGetMedicineCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);

    try {
      const res = await getMedicineCategoryCollectionApi();
      if (res) setCategories(res);
    } catch (error) {
      console.log("Lỗi fetch data danh mục thuốc: ", error);
      toast.error("Lỗi fetch data danh mục thuốc");
    } finally {
      setLoading(false);
    }
  };

  return {
    categories,
    loading,
    fetchCategories,
  };
}
