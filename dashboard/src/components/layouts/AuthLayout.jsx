import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex items-center h-screen justify-center bg-gradient-to-r from-cyan-200 to-blue-200">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
