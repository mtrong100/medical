import React from "react";
import { useSelector } from "react-redux";
import { format } from "timeago.js";

const Message = ({ item }) => {
  const { currentUser } = useSelector((state) => state.user);

  const fromMe = item?.sender?._id === currentUser?._id;

  if (fromMe) {
    return (
      <div className="flex items-center justify-end gap-2">
        <div>
          <div className="bg-amber-300 rounded-lg p-3 max-w-xs">
            <p className="text-sm">{item?.message}</p>
          </div>

          <p className="text-right mt-1 text-gray-500 text-xs">
            {format(item?.createdAt)}
          </p>
        </div>

        <img
          className="w-[45px] h-[45px] object-cover rounded-full"
          src={item?.sender?.avatar}
          alt={item?.sender?.name}
        />
      </div>
    );
  }

  return (
    <div className="flex items-start gap-2">
      <img
        className="w-[45px] h-[45px] object-cover rounded-full"
        src={item?.sender?.avatar}
        alt={item?.sender?.name}
      />

      <div>
        <div className="bg-gray-300 rounded-lg p-3 text-black max-w-xs">
          <p className="text-sm">{item?.message}</p>
        </div>

        <p className="text-left mt-1 text-gray-500 text-xs">
          {format(item?.createdAt)}
        </p>
      </div>
    </div>
  );
};

export default Message;
