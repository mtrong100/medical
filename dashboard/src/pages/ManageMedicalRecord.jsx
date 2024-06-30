import React, { useEffect, useState } from "react";
import TitleSection from "../components/TitleSection";
import { Button } from "primereact/button";
import useDebounce from "../hooks/useDebounce";
import {
  deleteMedicalRecordApi,
  getAllMedicalRecordsApi,
} from "../api/medicalRecordApi";
import { DataTable } from "primereact/datatable";
import { Column } from "jspdf-autotable";
import { InputText } from "primereact/inputtext";
import { formatDate } from "../utils/helper";
import { Fieldset } from "primereact/fieldset";
import { Dialog } from "primereact/dialog";
import CreateNewMedicalRecordModal from "../components/CreateNewMedicalRecordModal";
import UpdateMedicalRecordModal from "../components/UpdateMedicalRecordModal";
import Swal from "sweetalert2";

const ManageMedicalRecord = () => {
  const [loading, setLoading] = useState([]);
  const [query, setQuery] = useState("");
  const [medicalRecords, setMedicalRecords] = useState([]);
  const queryValue = useDebounce(query, 500);
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
  const [updateVal, setUpdateVal] = useState(null);
  const [limit, setLimit] = useState(10);
  const [recordInfo, setRecordInfo] = useState(null);
  const [paginator, setPaginator] = useState({
    totalPages: 1,
    currentPage: 1,
    totalResults: 0,
  });

  useEffect(() => {
    fetchMedicalRecords();
  }, [paginator.currentPage]);

  const filteredMedicalRecords = medicalRecords.filter((item) => {
    const queryLower = queryValue.toLowerCase();
    return (
      item._id.toString().includes(queryLower) ||
      item.patient.name.toLowerCase().includes(queryLower) ||
      item.doctor.name.toLowerCase().includes(queryLower)
    );
  });

  const fetchMedicalRecords = async () => {
    setLoading(true);

    const params = {
      page: paginator.currentPage,
      limit,
    };

    try {
      const res = await getAllMedicalRecordsApi(params);

      if (res) {
        setMedicalRecords(res.results);
        setPaginator({
          ...paginator,
          totalResults: res.totalResults,
          totalPages: res.totalPages,
          currentPage: res.currentPage,
        });
      }
    } catch (error) {
      setMedicalRecords([]);
      console.log("Error fetching medical records:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteMedicalRecord = async (record) => {
    Swal.fire({
      title: "Bạn có chắc chắn?",
      text: `Bạn có muốn xoá hồ sơ bệnh án này không?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Có, xoá nó!",
      cancelButtonText: "Không, giữ lại",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteMedicalRecordApi(record._id);
          if (res) {
            Swal.fire("Đã xoá!", "Dữ liệu đã được xóa.", "success");
            fetchMedicalRecords();
          }
        } catch (error) {
          console.log("Error deleting medicine:", error);
          Swal.fire("Lỗi!", "Đã xảy ra sự cố khi xoá.", "error");
        }
      }
    });
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex items-center gap-2">
        <Button
          icon="pi pi-eye"
          rounded
          severity="help"
          onClick={() => {
            setVisible3(true);
            setRecordInfo(rowData);
          }}
        />
        <Button
          icon="pi pi-pencil"
          rounded
          onClick={() => {
            setVisible2(true);
            setUpdateVal(rowData);
          }}
        />
        <Button
          icon="pi pi-trash"
          rounded
          severity="danger"
          onClick={() => deleteMedicalRecord(rowData)}
        />
      </div>
    );
  };

  const header = (
    <div className="flex items-center justify-end">
      <div className="p-inputgroup max-w-md">
        <InputText
          placeholder="Tìm kiếm"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button icon="pi pi-search" />
      </div>
    </div>
  );

  /*  =================== Pagination =================== */
  const onPrevPage = () => {
    if (paginator.currentPage === 1) return;
    setPaginator((prev) => ({ ...prev, currentPage: prev.currentPage - 1 }));
  };

  const onNextPage = () => {
    if (paginator.currentPage === paginator.totalPages) return;
    setPaginator((prev) => ({ ...prev, currentPage: prev.currentPage + 1 }));
  };

  /* ====================================================== */

  const createdAtBodyTemplate = (rowData) => {
    return <div>{formatDate(rowData.createdAt)}</div>;
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <TitleSection>Quản lí hồ sơ bệnh án</TitleSection>
        <Button
          label="Thêm mới"
          icon="pi pi-plus"
          onClick={() => setVisible(true)}
        />
      </div>

      {/* Filters */}

      {/* Render data table */}
      <div className="mt-5">
        <DataTable
          value={filteredMedicalRecords}
          header={header}
          scrollable
          stripedRows
          showGridlines
          emptyMessage="Không tìm thấy dữ liệu"
        >
          <Column field="_id" header="Mã hồ sơ" sortable />
          <Column field="patient.name" header="Bệnh nhân" sortable />
          <Column field="doctor.name" header="Bác sĩ" sortable />
          <Column field="diagnosis" header="Chuẩn đoán bệnh" sortable />
          <Column
            field="createdAt"
            header="Ngày tạo"
            sortable
            body={createdAtBodyTemplate}
          />
          <Column
            body={actionBodyTemplate}
            exportable={false}
            header="Thao tác"
          />
        </DataTable>
      </div>

      {/* Paginator */}
      {paginator.totalResults > limit && (
        <div className="flex items-center  justify-end mt-8 gap-2">
          <Button onClick={onPrevPage} icon="pi pi-angle-left" />
          <div className="flex items-center gap-2 text-xl  font-semibold">
            <p>{paginator.currentPage}</p> / <p>{paginator.totalPages}</p>
          </div>
          <Button onClick={onNextPage} icon="pi pi-angle-right" />
        </div>
      )}

      <CreateNewMedicalRecordModal
        visible={visible}
        setVisible={setVisible}
        onRefresh={fetchMedicalRecords}
      />
      <UpdateMedicalRecordModal
        visible2={visible2}
        setVisible2={setVisible2}
        onRefresh={fetchMedicalRecords}
        updateVal={updateVal}
      />

      <Dialog
        header={`Thông tin hồ sơ bệnh án`}
        visible={visible3}
        style={{ width: "50vw" }}
        onHide={() => {
          if (!visible3) return;
          setVisible3(false);
        }}
      >
        <div className="m-0">
          <div className="grid grid-cols-2 gap-5">
            <Fieldset legend="Bác sĩ khám">
              <p className="m-0">{recordInfo?.doctor?.name}</p>
            </Fieldset>
            <Fieldset legend="Bệnh nhân">
              <p className="m-0">{recordInfo?.patient?.name}</p>
            </Fieldset>
            <Fieldset legend="Chuẩn đoán">
              <p className="m-0">{recordInfo?.diagnosis}</p>
            </Fieldset>
            <Fieldset legend="Trị liệu">
              <p className="m-0">{recordInfo?.treatment}</p>
            </Fieldset>
            <Fieldset legend="Ghi chú">
              <p className="m-0">{recordInfo?.notes}</p>
            </Fieldset>
            <Fieldset legend="Ngày lập hồ sơ">
              <p className="m-0">{formatDate(recordInfo?.createdAt)}</p>
            </Fieldset>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ManageMedicalRecord;
