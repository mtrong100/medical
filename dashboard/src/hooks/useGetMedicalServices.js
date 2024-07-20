import { useEffect, useState } from "react";
import { getMedicalServicesApi } from "../api/medicalServiceApi";

export default function useGetMedicalServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await getMedicalServicesApi({ limit: 100 });
      if (res) setServices(res.results);
    } catch (error) {
      console.log("Error fetching medicine categories:", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, services };
}
