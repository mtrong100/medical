import React from "react";
import { useDispatch, useSelector } from "react-redux";

const ManageMedicalRecords = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  return <div>ManageMedicalRecords</div>;
};

export default ManageMedicalRecords;
