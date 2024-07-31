import Comment from "../models/commentModel.js";

export const getCommentCollectionService = async () => {
  try {
    const comments = await Comment.find().populate("user", "_id name avatar");

    if (!comments || comments.length === 0) {
      throw new Error("Comment not found!");
    }

    return comments;
  } catch (error) {
    console.log("Lỗi tại service getCommentCollectionService", error);
    throw new Error(error.message);
  }
};

export const createCommentService = async (data) => {
  try {
    const comment = new Comment(data);

    const saveComment = await comment.save();

    return saveComment;
  } catch (error) {
    console.log("Lỗi tại service createCommentService", error);
    throw new Error(error.message);
  }
};

export const deleteCommentService = async (id) => {
  try {
    const deletedComment = await Comment.findByIdAndDelete(id);
    if (!deletedComment) {
      throw new Error("Comment not found!");
    }
  } catch (error) {
    console.log("Lỗi tại service deleteCommentService", error);
    throw new Error(error.message);
  }
};
