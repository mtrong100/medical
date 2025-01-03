import { useEffect, useState } from "react";
import { getEmployeesApi } from "../api/employeeApi";
import { EMPLOYEE_ROLE } from "../utils/constants";

export default function useGetDoctors() {
  const [loading, setLoading] = useState(false);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        const res = await getEmployeesApi({ role: EMPLOYEE_ROLE.DOCTOR });
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
