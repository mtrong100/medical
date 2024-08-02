import React from "react";
import { useNavigate } from "react-router-dom";
import { Tag } from "primereact/tag";
import toast from "react-hot-toast";
import { viewPostApi } from "../api/postApi";

const PostCard = ({ data }) => {
  const navigate = useNavigate();

  const onViewPost = async (postId) => {
    try {
      const res = await viewPostApi(postId);
      if (res) navigate(`/post/${postId}`);
    } catch (error) {
      console.log("Error:", error);
      toast.error(error.message);
    }
  };

  return (
    <article className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm hover:shadow-lg transition-all">
      <div onClick={() => onViewPost(data?._id)}>
        <img
          alt={data?.title}
          src={data?.image}
          className="h-56 w-full object-cover"
        />
      </div>

      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-3">
          <Tag value={data?.category} severity="success" rounded></Tag>
          <div className="flex items-center gap-1">
            <i className="pi pi-eye"></i>
            <span>{data?.views}</span>
          </div>
        </div>

        <h3 className="text-lg font-medium text-gray-900 line-clamp-2 min-h-[56px]">
          {data?.title}
        </h3>

        <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae
          dolores, possimus pariatur animi temporibus nesciunt praesentium
          dolore sed nulla ipsum eveniet corporis quidem, mollitia itaque minus
          soluta, voluptates neque explicabo tempora nisi culpa eius atque
          dignissimos. Molestias explicabo corporis voluptatem?
        </p>

        <div
          onClick={() => onViewPost(data?._id)}
          className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600"
        >
          Xem chi tiết
          <span
            aria-hidden="true"
            className="block transition-all group-hover:ms-0.5 rtl:rotate-180"
          >
            &rarr;
          </span>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
