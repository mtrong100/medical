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

export const getCommentsInPostService = async (page, limit, postId) => {
  try {
    const filter = { post: postId };

    const skip = (page - 1) * limit;
    const total = await Comment.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    const data = await Comment.find(filter)
      .skip(skip)
      .limit(parseInt(limit))
      .populate([
        {
          path: "user",
          select: "name avatar",
        },
      ])
      .sort({ createdAt: -1 });

    if (!data || data.length === 0) {
      throw new Error("Comment not found!");
    }

    const formattedResults = data.map((comment) => {
      return {
        _id: comment._id,
        content: comment.content,
        avatar: comment.user.avatar,
        user: comment.user.name,
        userId: comment.user._id,
        createdAt: comment.createdAt,
      };
    });

    return {
      results: formattedResults,
      totalResults: total,
      totalPages,
      currentPage: parseInt(page),
      limit: parseInt(limit),
    };
  } catch (error) {
    console.log("Lỗi tại service getCommentsInPostService", error);
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
