import React from "react";
import { useSelector } from "react-redux";
import Banner from "../components/Banner";

const Home = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div>
      <Banner />
    </div>
  );
};

export default Home;
