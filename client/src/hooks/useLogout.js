import { useNavigate } from "react-router-dom";
import { logoutApi } from "../api/authApi";
import { useDispatch } from "react-redux";
import { storeCurrentUser } from "../redux/slices/userSlice";

export default function useLogout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = async () => {
    try {
      await logoutApi();
    } catch (error) {
      console.log("Error logout:", error);
    } finally {
      navigate("/login");
      dispatch(storeCurrentUser(null));
    }
  };

  return { onLogout };
}
