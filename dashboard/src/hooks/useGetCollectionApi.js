import { useEffect, useState } from "react";
import axios from "../api/axiosConfig";

export default function useGetCollectionApi(collectionName) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchCollection() {
      setLoading(true);

      try {
        const response = await axios.get(`/${collectionName}/collection`);
        setResults(response);
      } catch (error) {
        console.log("Failed to fetch collection API: ", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCollection();
  }, [collectionName]);

  return { results, loading };
}
