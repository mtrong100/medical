import {
  getMessagesService,
  sendMessageService,
} from "../services/messageService.js";
import mongoose from "mongoose";

export const sendMessage = async (req, res) => {
  const { message } = req.body;
  const { id: receiverId } = req.params;
  const senderId = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(receiverId)) {
    return res.status(404).json({ message: "ID không đúng định dạng" });
  }

  try {
    const messageResponse = await sendMessageService(
      senderId,
      receiverId,
      message
    );

    return res.status(201).json(messageResponse);
  } catch (error) {
    console.log("Lổi tại controller sendMessage", error);
    return res.status(500).json({ message: error.message });
  }
};

export const getMessages = async (req, res) => {
  const { id: userToChatId } = req.params;
  const senderId = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(userToChatId)) {
    return res.status(404).json({ message: "ID không đúng định dạng" });
  }

  try {
    const messages = await getMessagesService(senderId, userToChatId);

    return res.status(200).json(messages);
  } catch (error) {
    console.log("Lỗi tại controller getMessages: ", error);
    return res.status(500).json({ message: error.message });
  }
};
