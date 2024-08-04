import Comment from "../models/commentModel.js";
import Post from "../models/postModel.js";
import { MONTH_NAMES } from "../utils/constanst.js";

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
      ])
      .sort({ createdAt: -1 });

    const formattedResults = await Promise.all(
      data.map(async (post) => {
        const comments = await Comment.find({ post: post._id }).populate(
          "user",
          "_id name avatar"
        );

        return {
          _id: post._id,
          title: post.title,
          image: post.image,
          content: post.content,
          author: post.author.name,
          authorId: post.author._id,
          category: post.category,
          views: post.views,
          totalComments: comments.length,
          createdAt: post.createdAt,
        };
      })
    );

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
    const post = await Post.findById(id).populate({
      path: "author",
      select: "name avatar",
    });

    if (!post) {
      throw new Error("Không tìm thấy bài đăng");
    }

    const result = {
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

    return result;
  } catch (error) {
    console.log("Lỗi tại service getPostDetailService", error);
    throw new Error(error.message);
  }
};

export const getPostStatsService = async () => {
  try {
    const posts = await Post.find();

    const postStatsByMonthObj = {};
    MONTH_NAMES.forEach((month) => {
      postStatsByMonthObj[month] = {
        postCount: 0,
        viewCount: 0,
        commentCount: 0,
      };
    });

    const postCountByCategoryObj = {};

    for (const post of posts) {
      const comments = await Comment.find({ post: post._id });

      const month = new Date(post.createdAt).toLocaleString("default", {
        month: "long",
      });
      if (postStatsByMonthObj[month]) {
        postStatsByMonthObj[month].postCount += 1;
        postStatsByMonthObj[month].viewCount += post.views;
        postStatsByMonthObj[month].commentCount += comments.length;
      }

      if (post.category in postCountByCategoryObj) {
        postCountByCategoryObj[post.category] += 1;
      } else {
        postCountByCategoryObj[post.category] = 1;
      }
    }

    const results = {
      months: Object.keys(postStatsByMonthObj),
      totalPostsByMonth: Object.values(postStatsByMonthObj).map(
        (stats) => stats.postCount
      ),
      totalViewsByMonth: Object.values(postStatsByMonthObj).map(
        (stats) => stats.viewCount
      ),
      totalCommentsByMonth: Object.values(postStatsByMonthObj).map(
        (stats) => stats.commentCount
      ),
      categories: Object.keys(postCountByCategoryObj),
      totalPostsByCategory: Object.values(postCountByCategoryObj),
    };

    // const postsUploadedByMonth = {
    //   labels: Object.keys(postStatsByMonthObj),
    //   postCount: Object.values(postStatsByMonthObj).map(
    //     (stats) => stats.postCount
    //   ),
    //   viewCount: Object.values(postStatsByMonthObj).map(
    //     (stats) => stats.viewCount
    //   ),
    //   commentCount: Object.values(postStatsByMonthObj).map(
    //     (stats) => stats.commentCount
    //   ),
    // };

    // const postsByCategory = {
    //   labels: Object.keys(postCountByCategoryObj),
    //   postCount: Object.values(postCountByCategoryObj),
    // };

    return results;
  } catch (error) {
    console.log("Lỗi tại service getPostStatsService", error);
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

export const viewPostService = async (id) => {
  try {
    const post = await Post.findById(id);
    if (!post) {
      throw new Error("Không tìm thấy bài đăng");
    }
    post.views += 1;
    post.save();
  } catch (error) {
    console.log("Lỗi tại service postViewService", error);
    throw new Error(error.message);
  }
};
