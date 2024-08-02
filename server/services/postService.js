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
    const allMonths = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Lấy dữ liệu bài viết
    const posts = await Post.find()
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

    // Khởi tạo mảng để chứa tổng số bài viết, views và comments cho mỗi tháng
    const postStatsByMonth = allMonths.map((month) => ({
      month,
      postCount: 0,
      totalViews: 0,
      totalComments: 0,
    }));

    // Tạo đối tượng để chứa tổng số bài viết trong mỗi danh mục
    const postCountByCategoryObj = {};

    // Tính tổng số bài viết, views và comments cho mỗi tháng
    posts.forEach((post) => {
      const month = new Date(post.createdAt).toLocaleString("default", {
        month: "long",
      });
      const monthStats = postStatsByMonth.find(
        (stats) => stats.month === month
      );
      if (monthStats) {
        monthStats.postCount += 1;
        monthStats.totalViews += post.views;
        monthStats.totalComments += post.comments.length;
      }

      // Tính tổng số bài viết trong mỗi danh mục
      if (post.category in postCountByCategoryObj) {
        postCountByCategoryObj[post.category] += 1;
      } else {
        postCountByCategoryObj[post.category] = 1;
      }
    });

    // Chuyển đổi đối tượng thành mảng
    const postCountByCategory = Object.keys(postCountByCategoryObj).map(
      (category) => ({
        category,
        postCount: postCountByCategoryObj[category],
      })
    );

    return {
      postsUploadedByMonth: postStatsByMonth,
      postsByCategory: postCountByCategory,
    };
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
