import React from "react";

const NonConversation = () => {
  return (
    <div className="flex items-center justify-center flex-col h-screen">
      <h2 className="text-xl font-semibold mb-4">No conversation selected</h2>
      <p className="text-gray-600">
        Please select a conversation to start chatting.
      </p>
    </div>
  );
};

export default NonConversation;
