import React from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { currentUser } = useSelector((state) => state.user);
  console.log("🚀 ~ Dashboard ~ currentUser:", currentUser);

  return <div>Dashboard</div>;
};

export default Dashboard;
