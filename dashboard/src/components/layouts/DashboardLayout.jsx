import { Navigate, Outlet } from "react-router-dom";
import DashboardSidebar from "../shared/DashboardSidebar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserDetailApi } from "../../api/userApi";
import { setLoading, storeCurrentUser } from "../../redux/slices/userSlice";

const DashboardLayout = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchDetailUser = async () => {
      dispatch(setLoading(true));

      try {
        const res = await getUserDetailApi(currentUser?._id);
        if (res) dispatch(storeCurrentUser(res));
      } catch (error) {
        console.log(error);
        dispatch(storeCurrentUser(null));
      } finally {
        setLoading(false);
      }
    };
    fetchDetailUser();
  }, []);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <section className="relative flex items-start">
      <DashboardSidebar />
      <main className="p-4 w-full overflow-hidden">
        <Outlet />
      </main>
    </section>
  );
};

export default DashboardLayout;
