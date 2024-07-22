import React, { useEffect } from "react";
import Header from "../shared/Header";
import { Navigate, Outlet } from "react-router-dom";
import Footer from "../shared/Footer";
import { useSelector } from "react-redux";
import Chatbox from "../../modules/chat/Chatbox";
import useGetUserDetail from "../../hooks/useGetUserDetail";
// import Scrolltop from "../Scrolltop";
// import Newsletter from "../Newsletter";
// import Chatbox from "../Chatbox";

const MainLayout = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { fetchUserDetail } = useGetUserDetail();

  useEffect(() => {
    fetchUserDetail(currentUser._id);
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
      {/* <Scrolltop /> */}
      {/* <Newsletter /> */}
      <Footer />
    </>
  );
};

export default MainLayout;
