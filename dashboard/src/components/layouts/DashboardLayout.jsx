import useGetUserDetail from "../../hooks/useGetUserDetail";
import DashboardSidebar from "../shared/DashboardSidebar";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { fetchUserDetail } = useGetUserDetail();

  useEffect(() => {
    fetchUserDetail(currentUser?._id);
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
