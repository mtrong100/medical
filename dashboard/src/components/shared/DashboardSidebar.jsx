import React from "react";
import { FaHandHoldingMedical } from "react-icons/fa6";
import { Divider } from "primereact/divider";
import { Link, useLocation } from "react-router-dom";
import { SIDEBAR_LINKS } from "../../utils/constants";

const DashboardSidebar = () => {
  const location = useLocation();

  return (
    <div className="w-[300px] sticky top-0 left-0  border-right h-screen p-3 shadow-sm flex-shrink-0 bg-blue-900 text-white z-10">
      <h1 className="text-center text-3xl font-bold flex items-center gap-2 justify-center">
        <FaHandHoldingMedical />
        Medical
      </h1>

      <Divider />

      <ul className="space-y-2">
        {SIDEBAR_LINKS.map((link) => {
          const activeLink = location.pathname === link.link;

          return (
            <Link
              key={link.name}
              to={link.link}
              className={`${
                activeLink
                  ? "bg-white/20 font-semibold"
                  : "hover:bg-white/10 font-medium"
              } flex cursor-pointer items-center gap-3 px-5 rounded-md h-[45px] transition-all`}
            >
              <i className={link.icon}></i>
              <span>{link.name}</span>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default DashboardSidebar;
