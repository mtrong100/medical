import React from "react";
import ChatSidebar from "./ChatSidebar";
import Conversation from "./Conversation";
import { useSelector } from "react-redux";
import NonConvsersation from "./NonConvsersation";

const Chat = () => {
  const { selectedConversation } = useSelector((state) => state.chat);

  return (
    <div className="grid grid-cols-[minmax(0,_1fr)_350px] gap-2 items-start ">
      {selectedConversation ? <Conversation /> : <NonConvsersation />}
      <ChatSidebar />
    </div>
  );
};

export default Chat;
