import React, { useEffect, useRef } from "react";
import { IoMdSend } from "react-icons/io";
import Message from "./Message";
import { useSelector } from "react-redux";
import useMessage from "../hooks/useMessage";
import { ProgressSpinner } from "primereact/progressspinner";

const Conversation = () => {
  const scrollRef = useRef();
  const { onlineUsers } = useSelector((state) => state.socket);
  const { selectedConversation: selectedUser } = useSelector(
    (state) => state.chat
  );
  const { handleSendMessage, messages, loading, isSending, val, setVal } =
    useMessage();

  const isOnline = onlineUsers.some(
    (user) => user?.userId === selectedUser?._id
  );

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="w-full bg-white border ">
      <header className="bg-gray-100 shadow-sm border p-4 w-full rounded-sm">
        <div className="flex items-center gap-2 justify-between">
          <h3 className="font-semibold">{selectedUser?.name}</h3>
          <span className="text-green-500 font-medium">
            {isOnline ? "Online" : ""}
          </span>
        </div>
      </header>

      <main className="p-4 space-y-4 overflow-y-auto h-[640px]">
        {loading && <ProgressSpinner className="h-6 w-6" />}

        {!loading &&
          messages.length > 0 &&
          messages.map((item) => (
            <div ref={scrollRef} key={item?._id}>
              <Message item={item} />
            </div>
          ))}
      </main>

      <form>
        <div className="rounded-sm py-3 px-5 flex items-center gap-3 border-2 border-gray-300">
          <input
            type="text"
            className="outline-none border-none w-full bg-transparent"
            placeholder="Send message..."
            value={val}
            onChange={(e) => setVal(e.target.value)}
          />
          <button disabled={isSending} onClick={handleSendMessage}>
            <IoMdSend
              className="cursor-pointer hover:text-amber-500 opacity-50 hover:opacity-100"
              size={25}
            />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Conversation;
