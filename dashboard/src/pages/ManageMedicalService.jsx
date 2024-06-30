import React, { useEffect, useRef, useState } from "react";
import TitleSection from "../components/TitleSection";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import useDebounce from "../hooks/useDebounce";
import { InputText } from "primereact/inputtext";
import { formatCurrencyVND, formatDate } from "../utils/helper";
import { font } from "../assets/font";
import Swal from "sweetalert2";
import {
  deleteMedicalServiceApi,
  getAllMedicalServicesApi,
} from "../api/medicalServiceApi";
import { Dialog } from "primereact/dialog";
import { Fieldset } from "primereact/fieldset";
import CreateNewMedicalService from "../components/CreateNewMedicalService";
import UpdateMedicalService from "../components/UpdateMedicalService";
import { ProgressSpinner } from "primereact/progressspinner";

const ManageMedicalService = () => {
  const dt = useRef(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const queryValue = useDebounce(query, 500);
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
  const [updateVal, setUpdateVal] = useState(null);
  const [serviceInfo, setServiceInfo] = useState(null);

  const filteredServices = services.filter((item) => {
    const queryLower = queryValue.toLowerCase();

    return (
      item.name.toLowerCase().includes(queryLower) ||
      item._id.includes(queryLower)
    );
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await getAllMedicalServicesApi();
      if (res) {
        setServices(res);
      }
    } catch (error) {
      console.log("Error fetching medicine categories:", error);
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteService = async (service) => {
    Swal.fire({
      title: "Bạn có chắc chắn?",
      text: `Bạn có muốn xoá dịch vụ ${service.name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Có, xoá nó!",
      cancelButtonText: "Không, giữ lại",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteMedicalServiceApi(service._id);
          if (res) {
            Swal.fire("Đã xoá!", "Dữ liệu đã được xóa.", "success");
            fetchServices();
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
            setServiceInfo(rowData);
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
          onClick={() => deleteService(rowData)}
        />
      </div>
    );
  };

  const createdAtBodyTemplate = (rowData) => {
    return <div>{formatDate(rowData.createdAt)}</div>;
  };

  const priceBodyTemplate = (rowData) => {
    return <div>{formatCurrencyVND(rowData.price)}</div>;
  };

  /* ================ FILE EXPORT FEATURE ================ */
  const cols = [
    { field: "_id", header: "Mã dịch vụ" },
    { field: "name", header: "Tên dịch vụ" },
    { field: "price", header: "Giá dịch vụ" },
    { field: "createdAt", header: "Ngày tạo" },
  ];

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
          body: services,
          styles: {
            font: "Roboto",
          },
        });
        doc.save("services.pdf");
      });
    });
  };

  const exportExcel = () => {
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(services);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      saveAsExcelFile(excelBuffer, "prescriptions");
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ProgressSpinner />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <TitleSection>Quản lí dịch vụ khám</TitleSection>
        <Button
          label="Thêm mới"
          icon="pi pi-plus"
          onClick={() => setVisible(true)}
        />
      </div>

      {/* Render data  */}
      <div className="mt-5">
        <DataTable
          ref={dt}
          value={filteredServices}
          header={header}
          scrollable
          stripedRows
          showGridlines
          emptyMessage="Không tìm thấy dữ liệu"
        >
          <Column field="_id" header="Mã dịch vụ" sortable />
          <Column field="name" header="Tên dịch vụ" sortable />
          <Column
            field="price"
            header="Giá dịch vụ"
            sortable
            body={priceBodyTemplate}
          />
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

      <CreateNewMedicalService
        visible={visible}
        setVisible={setVisible}
        onRefresh={fetchServices}
      />

      <UpdateMedicalService
        visible2={visible2}
        setVisible2={setVisible2}
        onRefresh={fetchServices}
        updateVal={updateVal}
      />

      <Dialog
        header={`Thông tin dịch vụ ${serviceInfo?.name}`}
        visible={visible3}
        style={{ width: "50vw" }}
        onHide={() => {
          if (!visible3) return;
          setVisible3(false);
        }}
      >
        <div className="m-0">
          <div className="grid grid-cols-2 gap-5">
            <Fieldset legend="Mã dịch vụ">
              <p className="m-0">{serviceInfo?._id}</p>
            </Fieldset>
            <Fieldset legend="Tên dịch vụ">
              <p className="m-0">{serviceInfo?.name}</p>
            </Fieldset>
            <Fieldset legend="Giá dịch vụ">
              <p className="m-0">{formatCurrencyVND(serviceInfo?.price)}</p>
            </Fieldset>
            <Fieldset legend="Mô tả dịch vụ">
              <p className="m-0">{serviceInfo?.description}</p>
            </Fieldset>
            <Fieldset legend="Ngày tạo">
              <p className="m-0">{formatDate(serviceInfo?.createdAt)}</p>
            </Fieldset>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ManageMedicalService;
