import useGetUserDetail from "../../hooks/useGetUserDetail";
import ScrollTop from "../ScrollTop";
import React, { useEffect } from "react";
import Header from "../shared/Header";
import Footer from "../shared/Footer";
import Chatbox from "../../modules/chat/Chatbox";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const MainLayout = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { fetchUserDetail } = useGetUserDetail();

  useEffect(() => {
    fetchUserDetail(currentUser?._id);
  }, []);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Header />
      <section>
        <Outlet />
      </section>
      {currentUser && <Chatbox />}
      <ScrollTop />
      <Footer />
    </>
  );
};

export default MainLayout;
