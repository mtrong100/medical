import React, { useEffect, useRef, useState } from "react";
import TitleSection from "../components/TitleSection";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import useDebounce from "../hooks/useDebounce";
import { InputText } from "primereact/inputtext";
import { formatDate } from "../utils/helper";
import { Dropdown } from "primereact/dropdown";
import { genders } from "../utils/constants";
import { font } from "../assets/font";
import Swal from "sweetalert2";
import { Dialog } from "primereact/dialog";
import { Fieldset } from "primereact/fieldset";
import { deletePatientApi, getAllPatientsApi } from "../api/patientApi";
import CreateNewPatientModal from "../components/CreateNewPatientModal";
import UpdatePatientModal from "../components/UpdatePatientModal";

const cols = [
  { field: "_id", header: "ID" },
  { field: "name", header: "Tên" },
  { field: "dateOfBirth", header: "Ngày sinh" },
  { field: "gender", header: "Giới tính" },
  { field: "phoneNumber", header: "SĐT" },
  { field: "email", header: "Email" },
];

const ManagePatient = () => {
  const dt = useRef(null);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState([]);
  const [query, setQuery] = useState("");
  const queryValue = useDebounce(query, 500);
  const [selectedGender, setSelectedGender] = useState(null);
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
  const [updateVal, setUpdateVal] = useState(null);
  const [paginator, setPaginator] = useState({
    totalPages: 1,
    currentPage: 1,
    totalResults: 0,
  });
  const [limit, setLimit] = useState(10);
  const [patientInfo, setPatientInfo] = useState(null);

  useEffect(() => {
    fechPatients();
  }, [selectedGender, limit, paginator.currentPage]);

  const fechPatients = async () => {
    setLoading(true);
    try {
      const params = {
        page: paginator.currentPage,
        limit,
        gender: selectedGender,
      };

      const res = await getAllPatientsApi(params);
      if (res) {
        setPatients(res.results);
        setPaginator({
          ...paginator,
          totalResults: res.totalResults,
          totalPages: res.totalPages,
          currentPage: res.currentPage,
        });
      }
    } catch (error) {
      console.log("Error fetching medicine categories:", error);
      setPatients([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredPatients = patients.filter((item) => {
    return (
      item.name.toLowerCase().includes(queryValue.toLowerCase()) ||
      item._id.includes(queryValue)
    );
  });

  const resetFilter = () => {
    setSelectedGender(null);
  };

  const deletePatient = async (patient) => {
    Swal.fire({
      title: "Bạn có chắc chắn?",
      text: `Bạn có muốn xoá bệnh nhân ${patient.name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Có, xoá nó!",
      cancelButtonText: "Không, giữ lại",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await deletePatientApi(patient._id);
          if (res) {
            Swal.fire("Đã xoá!", "Dữ liệu đã được xóa.", "success");
            fechPatients();
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
            setPatientInfo(rowData);
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
          onClick={() => deletePatient(rowData)}
        />
      </div>
    );
  };

  /* ================ FILE EXPORT FEATURE ================ */
  const exportColumns = cols.map((col) => ({
    title: col.header,
    dataKey: col.field,
  }));

  const exportCSV = (selectionOnly) => {
    dt.current.exportCSV({ selectionOnly });
  };

  const exportPdf = () => {
    import("jspdf").then((jsPDF) => {
      import("jspdf-autotable").then(() => {
        const doc = new jsPDF.default(0, 0);

        // Add the custom font
        doc.addFileToVFS("Roboto-Regular.ttf", font);
        doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");
        doc.setFont("Roboto");

        doc.autoTable({
          columns: exportColumns,
          body: patients,
          styles: {
            font: "Roboto",
          },
        });
        doc.save("patients.pdf");
      });
    });
  };

  const exportExcel = () => {
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(patients);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      saveAsExcelFile(excelBuffer, "patients");
    });
  };

  const saveAsExcelFile = (buffer, fileName) => {
    import("file-saver").then((module) => {
      if (module && module.default) {
        let EXCEL_TYPE =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        let EXCEL_EXTENSION = ".xlsx";
        const data = new Blob([buffer], {
          type: EXCEL_TYPE,
        });

        module.default.saveAs(
          data,
          fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
        );
      }
    });
  };

  const header = (
    <div className="flex items-center justify-between">
      <div className="p-inputgroup max-w-md">
        <InputText
          placeholder="Tìm kiếm"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button icon="pi pi-search" />
      </div>

      <div className="flex items-center flex-shrink-0  gap-5">
        <Button
          type="button"
          icon="pi pi-file"
          label="Xuất file CSV"
          rounded
          onClick={() => exportCSV(false)}
          data-pr-tooltip="CSV"
        />
        <Button
          type="button"
          icon="pi pi-file-excel"
          severity="success"
          label="Xuất file Excel"
          rounded
          onClick={exportExcel}
          data-pr-tooltip="XLS"
        />
        <Button
          type="button"
          icon="pi pi-file-pdf"
          severity="warning"
          label="Xuất file PDF"
          rounded
          onClick={exportPdf}
          data-pr-tooltip="PDF"
        />
      </div>
    </div>
  );
  /* ====================================================== */

  const onPrevPage = () => {
    if (paginator.currentPage === 1) return;
    setPaginator((prev) => ({ ...prev, currentPage: prev.currentPage - 1 }));
  };

  const onNextPage = () => {
    if (paginator.currentPage === paginator.totalPages) return;
    setPaginator((prev) => ({ ...prev, currentPage: prev.currentPage + 1 }));
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <TitleSection>Quản lí bệnh nhân</TitleSection>
        <Button
          label="Thêm mới"
          icon="pi pi-plus"
          onClick={() => setVisible(true)}
        />
      </div>

      {/* Filter */}
      <div className="mt-5 flex items-center gap-5">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">Bộ lọc: </h1>
          <Button onClick={resetFilter} label="Đặt lại" icon="pi pi-refresh" />
        </div>

        <Dropdown
          value={selectedGender}
          onChange={(e) => setSelectedGender(e.value)}
          options={genders}
          placeholder="Chọn giới tính"
          className="w-[350px]"
        />
      </div>

      {/* Render data  */}
      <div className="mt-5">
        <DataTable
          ref={dt}
          value={filteredPatients}
          header={header}
          scrollable
          stripedRows
          showGridlines
          emptyMessage="Không tìm thấy dữ liệu"
        >
          {cols.map((col) => (
            <Column
              key={col.field}
              field={col.field}
              header={col.header}
              sortable
            />
          ))}
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

      <CreateNewPatientModal
        visible={visible}
        setVisible={setVisible}
        onRefresh={fechPatients}
      />

      <UpdatePatientModal
        visible2={visible2}
        setVisible2={setVisible2}
        onRefresh={fechPatients}
        updateVal={updateVal}
      />

      <Dialog
        header={`Thông tin bệnh nhân ${patientInfo?.name}`}
        visible={visible3}
        style={{ width: "50vw" }}
        onHide={() => {
          if (!visible3) return;
          setVisible3(false);
        }}
      >
        <div className="m-0">
          <div className="grid grid-cols-2 gap-5">
            <Fieldset legend="ID">
              <p className="m-0">{patientInfo?._id}</p>
            </Fieldset>
            <Fieldset legend="Tên">
              <p className="m-0">{patientInfo?.name}</p>
            </Fieldset>
            <Fieldset legend="Tên">
              <p className="m-0">{patientInfo?.dateOfBirth}</p>
            </Fieldset>
            <Fieldset legend="Tên">
              <p className="m-0">{patientInfo?.gender}</p>
            </Fieldset>
            <Fieldset legend="Tên">
              <p className="m-0">{patientInfo?.phoneNumber}</p>
            </Fieldset>
            <Fieldset legend="Tên">
              <p className="m-0">{patientInfo?.email}</p>
            </Fieldset>
            <Fieldset legend="Tên">
              <p className="m-0">{patientInfo?.address}</p>
            </Fieldset>
            <Fieldset legend="Ngày thêm">
              <p className="m-0">{formatDate(patientInfo?.createdAt)}</p>
            </Fieldset>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ManagePatient;
