import { useEffect, useState } from "react";
import { getAllMedicalServicesApi } from "../api/medicalServiceApi";

export default function useGetMedicalServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await getAllMedicalServicesApi();
      if (res) {
        setServices(res);
      }
    } catch (error) {
      console.log("Error fetching medicine categories:", error);
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  return { loading, services };
}
