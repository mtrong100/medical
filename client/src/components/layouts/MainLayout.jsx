import React from "react";
import Header from "../shared/Header";
import { Outlet } from "react-router-dom";
// import Footer from "../shared/Footer";
// import Scrolltop from "../Scrolltop";
import { useDispatch } from "react-redux";
// import Newsletter from "../Newsletter";
// import Chatbox from "../Chatbox";

const MainLayout = () => {
  const dispatch = useDispatch();

  return (
    <>
      <Header />
      <section className="page-container">
        <Outlet />
      </section>
      {/* <Scrolltop /> */}
      {/* <Newsletter /> */}
      {/* <Footer /> */}
    </>
  );
};

export default MainLayout;
