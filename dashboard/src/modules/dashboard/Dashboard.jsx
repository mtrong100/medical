import TitleSection from "../../components/TitleSection";
import React from "react";
import FigureBlock from "./FigureBlock";
import DiagramBlock from "./DiagramBlock";

const Dashboard = () => {
  return (
    <div>
      <TitleSection>Quản lí chung</TitleSection>
      <FigureBlock />
      <div className="mt-10">
        <DiagramBlock />
      </div>
    </div>
  );
};

export default Dashboard;
