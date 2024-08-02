import React from "react";
import { formatDate } from "../../utils/helper";

const Comment = ({ cmt, onDelete }) => {
  return (
    <div className="flex items-start p-4 ">
      <img
        src={cmt?.avatar}
        alt={cmt?.user}
        className="w-12 h-12 rounded-full mr-4"
      />
      <div>
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold">{cmt?.user}</h4>
          <span className="text-sm text-gray-500 ml-2">
            {formatDate(cmt?.createdAt)}
          </span>
        </div>
        <p className="mt-1 text-gray-700">{cmt?.content}</p>
        <button
          onClick={() => onDelete(cmt?._id)}
          className="text-red-500 text-sm font-medium"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Comment;
