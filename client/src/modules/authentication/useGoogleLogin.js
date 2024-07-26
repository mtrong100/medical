import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { storeCurrentUser } from "../../redux/slices/userSlice";
import { googleLoginApi } from "../../api/authApi";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../utils/firebase";
import toast from "react-hot-toast";

export default function useGoogleLogin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleGoogleLogin = async () => {
    setLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      const results = await signInWithPopup(auth, provider);

      const req = {
        name: results?.user?.displayName,
        email: results?.user?.email,
        avatar: results?.user?.photoURL,
      };

      const res = await googleLoginApi(req);

      dispatch(storeCurrentUser(res));

      toast.success("Đăng nhập hoàn tất");

      navigate("/");
    } catch (error) {
      toast.error("Lỗi");
      console.log("Lỗi: ", error);
    } finally {
      setLoading(false);
    }
  };

  return { handleGoogleLogin, loading };
}
