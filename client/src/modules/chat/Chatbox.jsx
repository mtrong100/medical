import useMessage from "../../hooks/useMessage";
import React, { useEffect, useRef, useState } from "react";
import Message from "../../components/Message";
import { ProgressSpinner } from "primereact/progressspinner";
import { IoMdSend } from "react-icons/io";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

const Chatbox = () => {
  const scrollRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const { handleSendMessage, messages, loading, isSending, val, setVal } =
    useMessage();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="fixed bottom-24 right-6 z-50">
      <div className="relative">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center cursor-pointer rounded-full w-[50px] h-[50px] bg-blue-600"
        >
          <IoChatbubbleEllipsesOutline size={25} color="white" />
        </div>
        {isOpen && (
          <div
            className="absolute right-16 -bottom-20"
            style={{ zIndex: "99999" }}
          >
            <div className="w-[360px]  bg-white rounded-lg shadow-lg border-blue-gray-300 overflow-hidden ">
              <header className="bg-gray-100 shadow-sm border py-3 px-5 w-full rounded-sm">
                <div className="flex items-center gap-2 justify-between">
                  <h3 className="font-semibold"></h3>
                  <span className="text-green-500 font-medium text-sm">
                    Online
                  </span>
                </div>
              </header>

              <main className="p-4 space-y-4 overflow-y-auto h-[350px]">
                {loading && <ProgressSpinner />}

                {!loading && messages?.length === 0 && (
                  <p className="text-center text-gray-500 ">
                    Chưa có tin nhắn nào
                  </p>
                )}

                {!loading &&
                  messages?.map((item) => (
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
                    placeholder="Nhắn tin..."
                    value={val}
                    onChange={(e) => setVal(e.target.value)}
                  />
                  <button disabled={isSending} onClick={handleSendMessage}>
                    <IoMdSend
                      className="cursor-pointer hover:text-red-500 opacity-50 hover:opacity-100"
                      size={25}
                    />
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chatbox;
