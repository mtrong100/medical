import { useNavigate } from "react-router-dom";
import { logoutApi } from "../api/authApi";

export default function useLogout() {
  const navigate = useNavigate();

  const onLogout = async () => {
    try {
      await logoutApi();
    } catch (error) {
      console.log("Error logout:", error);
    } finally {
      navigate("/login");
    }
  };

  return { onLogout };
}
