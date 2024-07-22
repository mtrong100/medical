import React from "react";
import Header from "../shared/Header";
import { Outlet } from "react-router-dom";
// import Footer from "../shared/Footer";
// import Scrolltop from "../Scrolltop";
import { useDispatch, useSelector } from "react-redux";
import Chatbox from "../../modules/chat/Chatbox";
import Banner from "../Banner";
// import Newsletter from "../Newsletter";
// import Chatbox from "../Chatbox";

const MainLayout = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  return (
    <>
      <Header />
      <section>
        <Outlet />
      </section>
      {currentUser && <Chatbox />}
      {/* <Scrolltop /> */}
      {/* <Newsletter /> */}
      {/* <Footer /> */}
    </>
  );
};

export default MainLayout;
