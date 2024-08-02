import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { setLoading } from "../redux/slices/userSlice";
import { getPostsApi } from "../api/postApi";
import useDebounce from "./useDebounce";
import { LIMIT_AMOUNT } from "../utils/constants";

export default function useGetPosts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const queryValue = useDebounce(query, 500);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [paginator, setPaginator] = useState({
    totalPages: 1,
    currentPage: 1,
    totalResults: 0,
  });

  useEffect(() => {
    fetchPosts();
  }, [paginator.currentPage, selectedCategory]);

  const fetchPosts = async () => {
    setLoading(true);

    try {
      const params = {
        page: paginator.currentPage,
        limit: LIMIT_AMOUNT,
        category: selectedCategory,
      };

      const res = await getPostsApi(params);

      if (res) {
        setPosts(res.results);
        setPaginator({
          ...paginator,
          totalResults: res.totalResults,
          totalPages: res.totalPages,
          currentPage: res.currentPage,
        });
      }
    } catch (error) {
      console.log("Failed to fetch posts: ", error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onResetFilter = () => {
    setQuery("");
    setSelectedCategory(null);
  };

  const filteredQuery = posts.filter((item) => {
    const lowerCaseQuery = queryValue.toLowerCase();

    return item.title.toLowerCase().includes(lowerCaseQuery);
  });

  const onPrevPage = () => {
    if (paginator.currentPage === 1) return;
    setPaginator((prev) => ({ ...prev, currentPage: prev.currentPage - 1 }));
  };

  const onNextPage = () => {
    if (paginator.currentPage === paginator.totalPages) return;
    setPaginator((prev) => ({ ...prev, currentPage: prev.currentPage + 1 }));
  };

  return {
    data: filteredQuery,
    isLoading,
    query,
    setQuery,
    paginator,
    setPaginator,
    onPrevPage,
    onNextPage,
    setSelectedCategory,
    selectedCategory,
    onResetFilter,
  };
}
