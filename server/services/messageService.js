import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";
import { getUserSocketId, io } from "../socket/socket.js";

export const sendMessageService = async (senderId, receiverId, message) => {
  try {
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      sender: senderId,
      receiver: receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await Promise.all([conversation.save(), newMessage.save()]);

    const messageResponse = await Message.findById(newMessage._id)
      .populate("sender", "_id name avatar")
      .populate("receiver", "_id name avatar");

    // Get receiver's socket ID
    const receiverSocketId = getUserSocketId(receiverId);

    // Emit the message to client by socket
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", messageResponse);
    }

    return messageResponse;
  } catch (error) {
    console.log("Error in sendMessageService: ", error.message);
    throw new Error("Failed to send message");
  }
};

export const getMessagesService = async (senderId, userToChatId) => {
  try {
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate({
      path: "messages",
      populate: [
        { path: "sender", select: "name avatar" },
        { path: "receiver", select: "name avatar" },
      ],
    });

    if (!conversation) return [];

    return conversation.messages;
  } catch (error) {
    console.log("Error in getMessagesService: ", error.message);
    throw new Error("Failed to retrieve messages");
  }
};
