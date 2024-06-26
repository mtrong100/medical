import { Outlet } from "react-router-dom";
import DashboardSidebar from "../shared/DashboardSidebar";

const DashboardLayout = () => {
  return (
    <section className="relative flex items-start ">
      <DashboardSidebar />
      <main className="p-4 w-full overflow-hidden">
        <Outlet />
      </main>
    </section>
  );
};

export default DashboardLayout;
