import mongoose from "mongoose";
import {
  createPostService,
  deletePostService,
  getPostCollectionService,
  getPostDetailService,
  getPostsService,
  getPostStatsService,
  viewPostService,
  updatePostService,
} from "../services/postService.js";

export const getPostCollection = async (req, res) => {
  try {
    const posts = await getPostCollectionService();
    return res.status(200).json(posts);
  } catch (error) {
    console.log("Lỗi tại controller getPostCollection", error);
    return res.status(500).json({ message: error.message });
  }
};

export const getPosts = async (req, res) => {
  const { page = 1, limit = 10, category } = req.query;

  try {
    const posts = await getPostsService(page, limit, category);
    return res.status(200).json(posts);
  } catch (error) {
    console.log("Lỗi tại controller getPosts", error);
    return res.status(500).json({ message: error.message });
  }
};

export const getPostDetail = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "ID không đúng định dạng" });
  }

  try {
    const post = await getPostDetailService(id);
    return res.status(200).json(post);
  } catch (error) {
    console.log("Lỗi tại controller getPostDetail", error);
    return res.status(500).json({ message: error.message });
  }
};

export const getPostStats = async (req, res) => {
  try {
    const results = await getPostStatsService();
    return res.status(200).json(results);
  } catch (error) {
    console.log("Lỗi tại controller getPostStats", error);
    return res.status(500).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  try {
    const post = await createPostService(req.body);
    return res.status(201).json(post);
  } catch (error) {
    console.log("Lỗi tại controller createPost", error);
    return res.status(500).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "ID không đúng định dạng" });
  }

  try {
    const post = await updatePostService(id, req.body);
    return res.status(200).json(post);
  } catch (error) {
    console.log("Lỗi tại controller updatePost", error);
    return res.status(500).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "ID không đúng định dạng" });
  }

  try {
    await deletePostService(id);
    return res.status(200).json({ message: "Xóa thành công" });
  } catch (error) {
    console.log("Lỗi tại controller deletePost", error);
    return res.status(500).json({ message: error.message });
  }
};

export const viewPost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "ID không đúng định dạng" });
  }

  try {
    await viewPostService(id);
    return res.status(200).json({ message: "Cập nhật lượt xem hoàn tất" });
  } catch (error) {
    console.log("Lỗi tại controller viewPost", error);
    return res.status(500).json({ message: error.message });
  }
};
