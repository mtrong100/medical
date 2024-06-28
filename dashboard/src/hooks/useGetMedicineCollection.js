import { useEffect, useState } from "react";
import { getMedicineCollectionApi } from "../api/medicineApi";

export default function useGetMedicineCollection() {
  const [medicines, setMedcines] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMedicines = async () => {
      setLoading(true);
      try {
        const res = await getMedicineCollectionApi();
        if (res) {
          setMedcines(res);
        }
      } catch (error) {
        console.log("Error fetching medicine categories:", error);
        setMedcines([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMedicines();
  }, []);

  return { loading, medicines };
}
