import { useEffect, useState } from "react";
import { getEmployeesApi } from "../api/employeeApi";

export default function useGetDoctors() {
  const [loading, setLoading] = useState(false);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        const res = await getEmployeesApi({ role: "Bác sĩ" });
        if (res) setDoctors(res.results);
      } catch (error) {
        console.log("Error fetching doctors:", error);
        setDoctors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  return { loading, doctors };
}
