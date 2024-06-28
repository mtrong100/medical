import React, { useEffect, useState } from "react";
import TitleSection from "../components/TitleSection";
import { useParams } from "react-router-dom";

const PrescriptionDetail = () => {
  const { id } = useParams();
  const [prescription, setPrescription] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, []);

  const fetchPrescriptionDetail = async () => {
    setLoading(true);
    try {
      // api
    } catch (error) {
      console.log("Error: ", error);
      setPrescription(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <TitleSection>Thông tin đơn thuốc</TitleSection>

      <div className="mt-10"></div>
    </div>
  );
};

export default PrescriptionDetail;
