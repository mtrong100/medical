import Conversation from "../models/conversationModel.js";

export const getConversation = async (req, res) => {
  try {
    const conversation = await Conversation.find().populate({
      path: "participants",
      select: "name avatar _id",
    });

    if (!conversation) {
      return res.status(404).json("Conversation not found!");
    }

    return res.status(200).json(conversation);
  } catch (error) {
    return res.status(500).json(error);
  }
};
  