import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const { currentUser } = useSelector((state) => state.user);
  console.log("🚀 ~ Home ~ currentUser:", currentUser);

  return <div>Home</div>;
};

export default Home;
