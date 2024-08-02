import { useEffect, useState } from "react";
import { deleteCommentApi, getCommentsInPostApi } from "../../api/commentApi";
import toast from "react-hot-toast";

const LIMIT = 20;

export default function useGetCommentsInPost() {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [limit, setLimit] = useState(LIMIT);
  const [isDeleting, setIsDeleting] = useState(false);

  const [paginator, setPaginator] = useState({
    totalPages: 1,
    currentPage: 1,
    totalResults: 0,
  });

  useEffect(() => {
    fetchComments();
  }, [limit]);

  const fetchComments = async (postId) => {
    if (!postId) return;

    setIsLoading(true);

    try {
      const params = {
        limit,
      };

      const res = await getCommentsInPostApi(postId, params);
      if (res) {
        setComments(res.results);
      }
    } catch (error) {
      console.log("Failed to fetch comments: ", error);
      setComments([]);
    } finally {
      setIsLoading(false);
    }
  };

  const onDeleteComment = async (id, postId) => {
    setIsDeleting(true);
    try {
      await deleteCommentApi(id);
    } catch (error) {
      console.log("Failed to delete comment: ", error);
      toast.error(error.message);
    } finally {
      setIsDeleting(false);
      fetchComments(postId);
    }
  };

  const loadMoreComments = () => {
    setLimit((prev) => prev + LIMIT);
  };

  return {
    comments,
    isLoading,
    loadMoreComments,
    fetchComments,
    onDeleteComment,
    LIMIT,
  };
}
