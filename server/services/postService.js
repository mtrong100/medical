import Post from "../models/postModel.js";

export const getPostCollectionService = async () => {
  try {
    const posts = await Post.find();

    if (!posts || posts.length === 0) {
      throw new Error("Không tìm thấy collection bài đăng");
    }

    return posts;
  } catch (error) {
    console.log("Lỗi tại service getPostCollectionService", error);
    throw new Error(error.message);
  }
};

export const getPostsService = async (page, limit, category) => {
  try {
    const filter = {};

    if (category) {
      filter.category = category;
    }

    const skip = (page - 1) * limit;
    const total = await Post.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    const data = await Post.find(filter)
      .skip(skip)
      .limit(parseInt(limit))
      .populate([
        {
          path: "author",
          select: "name avatar",
        },
        {
          path: "comments",
          populate: {
            path: "user",
            select: "name",
          },
        },
      ])
      .sort({ createdAt: -1 });

    const formattedResults = data.map((post) => {
      return {
        _id: post._id,
        title: post.title,
        image: post.image,
        content: post.content,
        author: post.author.name,
        authorId: post.author._id,
        category: post.category,
        views: post.views,
        comments: post.comments,
        totalComments: post.comments.length,
        createdAt: post.createdAt,
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
    console.log("Lỗi tại service getPostsService", error);
    throw new Error(error.message);
  }
};

export const getPostDetailService = async (id) => {
  try {
    const post = await Post.findById(id);

    if (!post) {
      throw new Error("Không tìm thấy bài đăng");
    }

    return post;
  } catch (error) {
    console.log("Lỗi tại service getPostDetailService", error);
    throw new Error(error.message);
  }
};

export const createPostService = async (data) => {
  try {
    const post = new Post(data);

    const savePost = await post.save();

    return savePost;
  } catch (error) {
    console.log("Lỗi tại service createPostService", error);
    throw new Error(error.message);
  }
};

export const updatePostService = async (id, data) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!updatedPost) {
      throw new Error("Không tìm thấy bài đăng");
    }

    return updatedPost;
  } catch (error) {
    console.log("Lỗi tại service updatePostService", error);
    throw new Error(error.message);
  }
};

export const deletePostService = async (id) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(id);
    if (!deletedPost) {
      throw new Error("Không tìm thấy bài đăng");
    }
  } catch (error) {
    console.log("Lỗi tại service deletePostService", error);
    throw new Error(error.message);
  }
};
