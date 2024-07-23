import React from "react";
import Banner from "../components/Banner";
import Introduce from "../components/Introduce";
import KeyFeature from "../components/KeyFeature";
import Faq from "../components/Faq";
import Map from "../components/Map";

const Home = () => {
  return (
    <div>
      <Banner />
      <div className="my-32">
        <Introduce />
      </div>
      <KeyFeature />
      <div className="my-32">
        <Faq />
      </div>
      <Map />
    </div>
  );
};

export default Home;
