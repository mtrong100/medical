import React from "react";
import { useSelector } from "react-redux";
import Banner from "../components/Banner";
import Introduce from "../components/Introduce";
import KeyFeature from "../components/KeyFeature";

const Home = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div>
      <Banner />
      <div className="my-32">
        <Introduce />
      </div>
      <KeyFeature />
    </div>
  );
};

export default Home;
