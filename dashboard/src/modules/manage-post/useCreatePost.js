import { useState } from "react";
import toast from "react-hot-toast";
import { createPostApi } from "../../api/postApi";

export default function useCreatePost() {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    content: "",
    author: "",
    image: "",
    category: null,
  });

  const onCreate = async (userId) => {
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

      const res = await createPostApi(body);
      if (res) toast.success("Tạo bài viết thành công");
    } catch (error) {
      console.log("Lỗi tạo mới bài viết:", error);
      toast.error("Lỗi tạo mới bài viết");
    } finally {
      setIsLoading(false);
      setForm({
        title: "",
        content: "",
        author: "",
        category: null,
      });
    }
  };

  return {
    isLoading,
    form,
    setForm,
    onCreate,
  };
}
