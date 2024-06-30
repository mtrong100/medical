import React, { useEffect, useRef, useState } from "react";
import TitleSection from "../components/TitleSection";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { formatCurrencyVND, formatDate } from "../utils/helper";
import Swal from "sweetalert2";
import useDebounce from "../hooks/useDebounce";
import { useNavigate } from "react-router-dom";
import { font } from "../assets/font";
import { Tag } from "primereact/tag";
import { PAYMENT_STATUS } from "../utils/constants";
import {
  ddeleteMedicalServiceInvoiceApi,
  getAllMedicalServiceInvoicesApi,
} from "../api/medicalServiceInvoiceApi";

const ManageMedicalServiceInvoice = () => {
  const dt = useRef(null);
  const navigate = useNavigate();
  const [serviceInvoices, setServiceInvoices] = useState([]);
  const [loading, setLoading] = useState([]);
  const [query, setQuery] = useState("");
  const queryValue = useDebounce(query, 500);
  const [limit, setLimit] = useState(10);
  const [paginator, setPaginator] = useState({
    totalPages: 1,
    currentPage: 1,
    totalResults: 0,
  });

  const filteredServiceInvoices = serviceInvoices.filter((item) => {
    const queryLower = queryValue.toLowerCase().trim();

    return (
      item._id.includes(queryLower) ||
      item.patient.toLowerCase().includes(queryLower)
    );
  });

  useEffect(() => {
    fetchServiceInvoices();
  }, [limit, paginator.currentPage, queryValue]);

  const fetchServiceInvoices = async () => {
    setLoading(true);
    try {
      const params = {
        page: paginator.currentPage,
        limit,
        query: queryValue,
      };
      const res = await getAllMedicalServiceInvoicesApi(params);
      if (res) {
        setServiceInvoices(res.results);
        setPaginator({
          ...paginator,
          totalResults: res.totalResults,
          totalPages: res.totalPages,
          currentPage: res.currentPage,
        });
      }
    } catch (error) {
      console.log("Error fetching medical service invoices:", error);
      setServiceInvoices([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteServiceInvoice = (rowId) => {
    Swal.fire({
      title: "Xóa phiếu dịch vụ",
      text: "Bạn muôn xóa phiếu dịch vụ này?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xóa",
      cancelButtonText: "Huỷ",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await ddeleteMedicalServiceInvoiceApi(rowId);
          if (res) {
            Swal.fire("Phiếu dịch vụ đã được xóa!", "", "success");
            fetchServiceInvoices();
          }
        } catch (error) {
          console.log("Error deleting prescription:", error);
          Swal.fire("Lỗi!", "Đã xảy ra sự cố khi xoá.", "error");
        }
      }
    });
  };

  const totalBodyTemplate = (rowData) => {
    return <div>{formatCurrencyVND(rowData.total)}</div>;
  };

  /* ================ BODY TEMPLATE ====================== */

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex items-center gap-2 ">
        <Button
          icon="pi pi-eye"
          rounded
          severity="help"
          onClick={() => navigate(`/medical-service-invoice/${rowData._id}`)}
        />
        <Button
          icon="pi pi-pencil"
          rounded
          onClick={() =>
            navigate(`/medical-service-invoice/update/${rowData._id}`)
          }
        />
        <Button
          icon="pi pi-trash"
          rounded
          severity="danger"
          onClick={() => handleDeleteServiceInvoice(rowData._id)}
        />
      </div>
    );
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <Tag
        value={rowData.status}
        rounded
        severity={
          rowData.status === PAYMENT_STATUS.UNPAID ? "warning" : "success"
        }
      />
    );
  };

  const createdAtBodyTemplate = (rowData) => {
    return <div>{formatDate(rowData.createdAt)}</div>;
  };

  /* ================ FILE EXPORT FEATURE ================ */
  const cols = [
    { field: "_id", header: "Mã phiếu dịch vụ" },
    { field: "patient", header: "Bệnh nhân" },
    { field: "total", header: "Tổng tiền" },
    { field: "status", header: "Trạng thái" },
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
          body: serviceInvoices,
          styles: {
            font: "Roboto",
          },
        });
        doc.save("serviceInvoices.pdf");
      });
    });
  };

  const exportExcel = () => {
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(serviceInvoices);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      saveAsExcelFile(excelBuffer, "serviceInvoices");
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

  return (
    <div>
      <div className="flex items-center justify-between">
        <TitleSection>Quản lí phiếu dịch vụ</TitleSection>
        <Button
          label="Tạo mới"
          icon="pi pi-plus"
          onClick={() => navigate("/medical-service-invoice/create")}
        />
      </div>

      <div className="mt-5">
        <DataTable
          ref={dt}
          scrollable
          stripedRows
          showGridlines
          emptyMessage="Không tìm thấy dữ liệu"
          value={filteredServiceInvoices}
          header={header}
        >
          <Column field="_id" header="Mã phiếu dịch vụ" sortable />
          <Column field="patient" header="Bệnh nhân" sortable />
          <Column field="detail.length" header="Số dịch vụ sử dụng" sortable />
          <Column
            field="total"
            header="Tổng tiền"
            sortable
            body={totalBodyTemplate}
          />
          <Column
            field="status"
            header="Trạng thái"
            sortable
            body={statusBodyTemplate}
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
    </div>
  );
};

export default ManageMedicalServiceInvoice;
