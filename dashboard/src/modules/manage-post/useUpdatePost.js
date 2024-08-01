import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getPostDetailApi, updatePostApi } from "../../api/postApi";
import { useParams } from "react-router-dom";

export default function useUpdatePost() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [detail, setDetail] = useState(null);
  const [form, setForm] = useState({
    title: "",
    content: "",
    author: "",
    image: "",
    category: null,
  });

  useEffect(() => {
    fetchDetail();
  }, []);

  useEffect(() => {
    if (detail) {
      setForm({
        title: detail?.title,
        content: detail?.content,
        author: detail?.author,
        image: detail?.image,
        category: detail?.category,
      });
    }
  }, [detail]);

  const fetchDetail = async () => {
    try {
      const res = await getPostDetailApi(id);
      if (res) setDetail(res);
    } catch (error) {
      console.log("Lỗi fetch data detail post", error);
      toast.error("Lỗi fetch data detail post");
    }
  };

  const onUpdate = async (userId) => {
    const { title, content, category, image } = form;

    if (!title.trim() || !content || !category || !image) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }

    setIsLoading(true);

    try {
      const body = {
        title,
        content,
        image,
        author: userId,
        category,
      };

      const res = await updatePostApi(id, body);
      if (res) toast.success("Cập nhật bài viết thành công");
    } catch (error) {
      console.log("Lỗi cập nhật bài viết:", error);
      toast.error("Lỗi cập nhật bài viết");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    form,
    setForm,
    onUpdate,
  };
}
