import React from "react";
import { GoSearch } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedConversation } from "../../redux/slices/chatSlice";
import useGetConversation from "../../hooks/useGetConversation";

const ChatSidebar = () => {
  const { loading, conversation } = useGetConversation();

  return (
    <aside className="sticky top-0  bg-white overflow-y-auto border-blue-gray-100 border h-[calc(100vh_-_20px)] w-full p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="rounded-full py-3 px-5 flex items-center gap-3 border-2 border-gray-300">
        <GoSearch size={22} />
        <input
          type="text"
          className="outline-none border-none w-full bg-transparent "
          placeholder="Search users..."
        />
      </div>

      <ul className="mt-5 space-y-1">
        {loading && (
          <p className="text-center my-5 text-lg opacity-60 font-semibold">
            Loading...
          </p>
        )}

        {!loading && conversation.length === 0 && (
          <p className="text-center my-5 text-lg opacity-60 font-semibold">
            User not found
          </p>
        )}

        {!loading &&
          conversation.length > 0 &&
          conversation.map((item) => <UserChat key={item?._id} item={item} />)}
      </ul>
    </aside>
  );
};

export default ChatSidebar;

function UserChat({ item }) {
  const dispatch = useDispatch();
  const { selectedConversation } = useSelector((state) => state.chat);
  const { onlineUsers } = useSelector((state) => state.socket);
  const { currentUser } = useSelector((state) => state.user);

  const sender = item.participants?.find(
    (participant) => participant?._id !== currentUser?._id
  );

  const isOnline = onlineUsers.some(
    (user) => user?.userId === item?.participants?.[0]?._id
  );

  const isSelected = selectedConversation?._id === item?._id;

  return (
    <li
      onClick={() => dispatch(setSelectedConversation(sender))}
      className={`${
        isSelected ? "bg-amber-300" : "hover:bg-gray-100"
      }  p-2 cursor-pointer rounded-md`}
    >
      <div className="flex items-center gap-3 relative">
        <div className="w-[50px] h-[50px] ">
          <img
            src={sender?.avatar}
            alt={sender?.name}
            className="img-cover rounded-full"
          />
        </div>

        <h4 className="font-semibold">{sender?.name}</h4>

        {isOnline && (
          <span className="absolute top-0 right-0 h-4 w-4 flex items-center justify-center bg-green-500  rounded-full"></span>
        )}
      </div>
    </li>
  );
}
