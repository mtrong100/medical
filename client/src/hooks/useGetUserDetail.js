import { useDispatch } from "react-redux";
import { getUserDetailApi } from "../api/userApi";
import { setLoading, storeCurrentUser } from "../redux/slices/userSlice";

export default function useGetUserDetail() {
  const dispatch = useDispatch();

  const fetchUserDetail = async (userId) => {
    dispatch(setLoading(true));

    try {
      const res = await getUserDetailApi(userId);
      if (res) dispatch(storeCurrentUser(res));
    } catch (error) {
      console.log("Lỗi fetch data người dùng", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { fetchUserDetail };
}
