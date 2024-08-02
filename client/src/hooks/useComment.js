import { useEffect, useState } from "react";
import {
  createCommentApi,
  deleteCommentApi,
  getCommentsInPostApi,
} from "../api/commentApi";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { LIMIT_AMOUNT } from "../utils/constants";

export default function useComment() {
  const { id: postId } = useParams();
  const [textValue, setTextValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [limit, setLimit] = useState(LIMIT_AMOUNT);
  const [paginator, setPaginator] = useState({
    totalPages: 1,
    currentPage: 1,
    totalResults: 0,
  });

  useEffect(() => {
    fetchComments();
  }, [postId, paginator.currentPage, limit]);

  const fetchComments = async () => {
    setIsLoading(true);

    try {
      const params = {
        page: paginator.currentPage,
        limit,
      };

      const res = await getCommentsInPostApi(postId, params);
      if (res) {
        console.log(res);
        setComments(res.results);
        setPaginator({
          ...paginator,
          totalResults: res.totalResults,
          totalPages: res.totalPages,
          currentPage: res.currentPage,
        });
      }
    } catch (error) {
      console.log("Failed to fetch comments: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onCreateComment = async (userId, postId) => {
    if (!textValue.trim() && !userId && !postId) return;

    setIsSending(true);

    try {
      const body = {
        post: postId,
        user: userId,
        content: textValue,
      };

      await createCommentApi(body);
    } catch (error) {
      console.log("Failed to create comment: ", error);
      toast.error(error.message);
    } finally {
      setIsSending(false);
      setTextValue("");
      fetchComments();
    }
  };

  const onDeleteComment = async (id) => {
    setIsDeleting(true);
    try {
      await deleteCommentApi(id);
    } catch (error) {
      console.log("Failed to delete comment: ", error);
      toast.error(error.message);
    } finally {
      setIsDeleting(false);
      fetchComments();
    }
  };

  const loadMoreComments = () => {
    setLimit((prev) => prev + LIMIT_AMOUNT);
  };

  return {
    textValue,
    isSending,
    isDeleting,
    setTextValue,
    onCreateComment,
    onDeleteComment,
    comments,
    isLoading,
    loadMoreComments,
  };
}
