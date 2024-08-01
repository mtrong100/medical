import React from "react";
import { Link } from "react-router-dom";
import { Tag } from "primereact/tag";

const PostCard = ({ data }) => {
  return (
    <article className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm hover:shadow-lg transition-all">
      <Link to={`/post/${data?._id}`}>
        <img
          alt={data?.title}
          src={data?.image}
          className="h-56 w-full object-cover"
        />
      </Link>

      <div className="p-4 sm:p-6">
        <Tag
          value={data?.category}
          severity="success"
          rounded
          className="mb-3"
        ></Tag>

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

        <Link
          to={`/post/${data?._id}`}
          className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600"
        >
          Xem chi tiết
          <span
            aria-hidden="true"
            className="block transition-all group-hover:ms-0.5 rtl:rotate-180"
          >
            &rarr;
          </span>
        </Link>
      </div>
    </article>
  );
};

export default PostCard;
