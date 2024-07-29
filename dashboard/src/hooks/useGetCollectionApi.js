import { useEffect, useState } from "react";
import axios from "../api/axiosConfig";
import toast from "react-hot-toast";

export default function useGetCollectionApi(collectionName) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchCollection() {
      setLoading(true);

      try {
        const response = await axios.get(`/${collectionName}/collection`);
        if (response) setResults(response);
      } catch (error) {
        console.log("Failed to fetch collection API: ", error);
        toast.error("Failed to fetch collection API");
      } finally {
        setLoading(false);
      }
    }
    fetchCollection();
  }, [collectionName]);

  return { results, loading };
}
