import { useEffect, useState } from "react";
import { getPostDetailApi } from "../api/postApi";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";

export default function useGetPostDetail() {
  const { id } = useParams();
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDetail();
  }, []);

  const fetchDetail = async () => {
    setLoading(true);

    try {
      const res = await getPostDetailApi(id);
      if (res) setDetail(res);
    } catch (error) {
      console.log("Lỗi fetch data detail post", error);
      toast.error("Lỗi fetch data detail post");
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
