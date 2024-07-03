import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { NAV_LINKS } from "../../utils/constants";
import { FaHandHoldingMedical } from "react-icons/fa";
import { Button } from "primereact/button";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  return (
    <header className="z-50 sticky top-0">
      <div className=" h-max max-w-full rounded-none  p-4 bg-blue-600">
        <section className="page-container">
          <div className="flex items-center justify-between text-white text-sm">
            <p>Call: +0123 456 789</p>
            <div className="flex items-center gap-5">
              <i className="pi pi-facebook"></i>
              <i className="pi pi-linkedin"></i>
              <i className="pi pi-tiktok"></i>
              <i className="pi pi-youtube"></i>
            </div>
          </div>

          <div className="flex items-center justify-between mt-5">
            <Link
              to="/"
              className="text-3xl text-white font-bold flex items-center gap-3"
            >
              <FaHandHoldingMedical />
              Medical
            </Link>

            {currentUser ? (
              <p className="text-white">
                Xin chào!{" "}
                <strong className="text-lg">{currentUser?.name}</strong>
              </p>
            ) : (
              <Button
                label="Đăng nhập"
                raised
                outlined
                icon="pi pi-sign-in"
                className="bg-white text-slate-900"
                onClick={() => navigate("/login")}
              />
            )}
          </div>
        </section>
      </div>
      <div className="h-[60px] bg-white flex items-center border-b border-gray-300 ">
        <div className="page-container flex items-center justify-center">
          <ul className="flex items-center gap-8">
            {NAV_LINKS.map((item) => {
              const isActive = item.link === location.pathname;

              if (item.link === "/profile" && !currentUser) {
                return null;
              }

              return (
                <Link
                  className={`${
                    isActive
                      ? "text-blue-600 font-semibold"
                      : "hover:text-blue-600"
                  }  transition-all font-semibold`}
                  to={item.link}
                  key={item.name}
                >
                  {item.name}
                </Link>
              );
            })}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
