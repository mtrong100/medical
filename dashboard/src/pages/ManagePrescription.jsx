import React, { useEffect, useRef, useState } from "react";
import TitleSection from "../components/TitleSection";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { formatDate } from "../utils/helper";
import { Dropdown } from "primereact/dropdown";
import { font } from "../assets/font";
import Swal from "sweetalert2";
import { Dialog } from "primereact/dialog";
import { Fieldset } from "primereact/fieldset";
import useDebounce from "../hooks/useDebounce";
import CreateNewPrescriptionModal from "./CreateNewPrescription";
import { useNavigate } from "react-router-dom";

const ManagePrescription = () => {
  const navigate = useNavigate();
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState([]);
  const [query, setQuery] = useState("");
  const queryValue = useDebounce(query, 500);
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
  const [updateVal, setUpdateVal] = useState(null);
  const [limit, setLimit] = useState(10);
  const [prescriptionInfo, setPrescriptionInfo] = useState(null);
  const [paginator, setPaginator] = useState({
    totalPages: 1,
    currentPage: 1,
    totalResults: 0,
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <TitleSection>Quản lí kê toa đơn thuốc</TitleSection>
        <Button
          label="Thêm mới"
          icon="pi pi-plus"
          onClick={() => navigate("/prescription/create")}
        />
      </div>
    </div>
  );
};

export default ManagePrescription;
