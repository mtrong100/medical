import { useEffect, useState } from "react";
import { getConvsersationsApi } from "../api/chatApi";

export default function useGetConversation() {
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState([]);

  useEffect(() => {
    async function fetchConversations() {
      setLoading(true);
      try {
        const res = await getConvsersationsApi();
        setConversation(res);
      } catch (error) {
        console.log("Failed to fetch conversations: ", error);
      } finally {
        setLoading(false);
      }
    }
    fetchConversations();
  }, []);

  return { loading, conversation };
}
