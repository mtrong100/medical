import mongoose from "mongoose";
import {
  createCommentService,
  deleteCommentService,
  getCommentCollectionService,
} from "../services/commentService.js";

export const getCommentCollection = async (req, res) => {
  try {
    const comments = await getCommentCollectionService();
    return res.status(200).json(comments);
  } catch (error) {
    console.log("Lỗi tại controller getCommentCollection", error);
    return res.status(500).json({ message: error.message });
  }
};

export const createComment = async (req, res) => {
  try {
    const comment = await createCommentService(req.body);
    return res.status(201).json(comment);
  } catch (error) {
    console.log("Lỗi tại controller createComment", error);
    return res.status(500).json({ message: error.message });
  }
};

export const deleteComment = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "ID không đúng định dạng" });
  }

  try {
    await deleteCommentService(id);
    return res.status(200).json({ message: "Xóa hoàn tất" });
  } catch (error) {
    console.log("Lỗi tại controller deleteComment", error);
    return res.status(500).json({ message: error.message });
  }
};
