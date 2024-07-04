import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessagesApi, sendMessageApi } from "../api/chatApi";
import { ADMIN_ID } from "../utils/constants";
import notificationSound from "../assets/audio/notification.mp3";

export default function useMessage() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { selectedConversation: selectedUser } = useSelector(
    (state) => state.chat
  );
  const { socket } = useSelector((state) => state.socket);

  const [loading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [messages, setMessages] = useState([]);
  const [val, setVal] = useState("");

  // FETCH MESSAGES IN CONVERSATION
  useEffect(() => {
    async function fetchMessages() {
      setIsLoading(true);

      try {
        const res = await getMessagesApi(ADMIN_ID);
        console.log(res);
        setMessages(res);
      } catch (error) {
        console.log("Failed to fetch messages: ", error);
        setMessages([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMessages();
  }, [currentUser._id, currentUser?.role, dispatch, selectedUser?._id]);

  // LISTEN NEW MESSAGE COME FROM SOCKET IO
  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      const sound = new Audio(notificationSound);
      sound.play();
      setMessages([...messages, newMessage]);
    });

    return () => socket?.off("newMessage");
  }, [messages, socket]);

  // SEND NEW MESSAGE TO A USER
  const handleSendMessage = async () => {
    if (!val.trim()) return;

    setIsSending(true);

    try {
      await sendMessageApi(ADMIN_ID, { message: val });
      const res = await getMessagesApi(ADMIN_ID);
      setMessages(res);
      setVal("");
    } catch (error) {
      console.log("Failed to send a message: ", error);
    } finally {
      setIsSending(false);
    }
  };

  return { handleSendMessage, messages, loading, isSending, val, setVal };
}
