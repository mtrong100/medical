import React, { useEffect, useRef, useState } from "react";
import TitleSection from "../components/TitleSection";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { formatCurrencyVND, formatDate } from "../utils/helper";
import Swal from "sweetalert2";
import useDebounce from "../hooks/useDebounce";
import { font } from "../assets/font";
import { Tag } from "primereact/tag";
import { PAYMENT_STATUS } from "../utils/constants";
import { Dialog } from "primereact/dialog";
import { Fieldset } from "primereact/fieldset";
import CreateNewInvoiceModal from "../components/CreateNewInvoiceModal";
import { deleteInvoiceApi, getAllInvoicesApi } from "../api/invoiceApi";
import jsPDF from "jspdf";
import UpdateInvoiceModal from "../components/UpdateInvoiceModal";

const ManageInvoice = () => {
  const dt = useRef(null);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState([]);
  const [query, setQuery] = useState("");
  const queryValue = useDebounce(query, 500);
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
  const [updateVal, setUpdateVal] = useState(null);
  const [limit, setLimit] = useState(10);
  const [invoiceDetails, setInvoiceDetails] = useState(null);
  const [paginator, setPaginator] = useState({
    totalPages: 1,
    currentPage: 1,
    totalResults: 0,
  });

  useEffect(() => {
    fetchInvoices();
  }, [limit, paginator.currentPage]);

  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const params = {
        page: paginator.currentPage,
        limit,
      };

      const res = await getAllInvoicesApi(params);
      if (res) {
        setInvoices(res.results);
        setPaginator({
          ...paginator,
          totalResults: res.totalResults,
          totalPages: res.totalPages,
          currentPage: res.currentPage,
        });
      }
    } catch (error) {
      console.log("Error fetching invoices:", error);
      setInvoices([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredInvoices = invoices.filter((item) => {
    const queryLower = queryValue.toLowerCase();

    return (
      item.patient.name.toLowerCase().includes(queryLower) ||
      item.doctor.name.toLowerCase().includes(queryLower) ||
      item._id.includes(queryLower)
    );
  });

  const handleDeleteInvoice = async (id) => {
    Swal.fire({
      title: "Bạn có chắc chắn?",
      text: `Bạn có muốn xóa hóa đơn này?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Có, xoá nó!",
      cancelButtonText: "Không, giữ lại",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteInvoiceApi(id);
          if (res) {
            Swal.fire("Đã xoá!", "Dữ liệu đã được xóa.", "success");
            fetchInvoices();
          }
        } catch (error) {
          console.log("Error deleting medicine:", error);
          Swal.fire("Lỗi!", "Đã xảy ra sự cố khi xoá.", "error");
        }
      }
    });
  };

  /* ================ FILE EXPORT FEATURE ================ */
  const cols = [
    { field: "_id", header: "Mã hóa đơn" },
    { field: "patient.name", header: "Bệnh nhân" },
    { field: "doctor.name", header: "Bác sĩ" },
    { field: "price", header: "Giá tiền" },
    { field: "healthInsurance", header: "Áp dụng BHYT" },
    { field: "total", header: "Tổng tiền" },
    { field: "createdAt", header: "Ngày tạo" },
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

        const formattedAppointments = invoices.map((item) => ({
          _id: item._id,
          "patient.name": item.patient.name,
          "doctor.name": item.doctor.name,
          price: formatCurrencyVND(item.price),
          healthInsurance: item.healthInsurance,
          total: formatCurrencyVND(item.total),
          createdAt: formatDate(item.createdAt),
        }));

        doc.autoTable({
          columns: exportColumns,
          body: formattedAppointments,
          styles: {
            font: "Roboto",
          },
        });
        doc.save("invoices.pdf");
      });
    });
  };

  const exportExcel = () => {
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(invoices);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      saveAsExcelFile(excelBuffer, "invoices");
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

  const handleExportPDF = () => {
    const doc = new jsPDF();

    // Add the custom font
    doc.addFileToVFS("Roboto-Regular.ttf", font);
    doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");
    doc.setFont("Roboto");

    // Tiêu đề hóa đơn
    doc.setFontSize(18);
    doc.text("Hóa đơn khám bệnh", 14, 22);

    // Thông tin bệnh nhân và bác sĩ
    doc.setFontSize(12);
    doc.text(`Mã hóa đơn: ${invoiceDetails._id}`, 14, 40);
    doc.text(`Bệnh nhân: ${invoiceDetails.patient.name}`, 14, 50);
    doc.text(`Bác sĩ: ${invoiceDetails.doctor.name}`, 14, 60);
    doc.text(
      `Ngày tạo: ${new Date(invoiceDetails.createdAt).toLocaleDateString()}`,
      14,
      70
    );
    doc.text(
      `Giá tiền khám: ${formatCurrencyVND(invoiceDetails.price)}`,
      14,
      80
    );
    doc.text(
      `Bảo hiểm y tế: ${invoiceDetails.healthInsurance ? "Có" : "Không"}`,
      14,
      90
    );
    doc.text(
      `Tổng giá tiền: ${formatCurrencyVND(invoiceDetails.total)}`,
      14,
      100
    );

    // Xuất file PDF
    doc.save(`hoa-don-kham-benh.pdf`);
  };

  /* ================ BODY TEMPLATE ====================== */

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex items-center gap-2 ">
        <Button
          icon="pi pi-eye"
          rounded
          severity="help"
          onClick={() => {
            setVisible3(true);
            setInvoiceDetails(rowData);
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
          onClick={() => handleDeleteInvoice(rowData._id)}
        />
      </div>
    );
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <Tag
        value={rowData.paymentStatus}
        rounded
        severity={
          rowData.paymentStatus === PAYMENT_STATUS.UNPAID
            ? "warning"
            : "success"
        }
      />
    );
  };

  const createdAtBodyTemplate = (rowData) => {
    return <div>{formatDate(rowData.createdAt)}</div>;
  };

  const totalBodyTemplate = (rowData) => {
    return <div>{formatCurrencyVND(rowData.total)}</div>;
  };

  const priceBodyTemplate = (rowData) => {
    return <div>{formatCurrencyVND(rowData.price)}</div>;
  };

  const healthInsuranceBodyTemplate = (rowData) => {
    return (
      <Tag
        value={
          rowData.healthInsurance ? "Có sử dụng BHYT" : "Không sử dụng BHYT"
        }
        rounded
        severity={rowData.healthInsurance ? "contrast" : "danger"}
      />
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <TitleSection>Quản lí hóa đơn khám bệnh</TitleSection>
        <Button
          label="Tạo mới"
          icon="pi pi-plus"
          onClick={() => setVisible(true)}
        />
      </div>

      {/* Render data  */}
      <div className="mt-5">
        <DataTable
          ref={dt}
          value={filteredInvoices}
          header={header}
          scrollable
          stripedRows
          showGridlines
          emptyMessage="Không tìm thấy dữ liệu"
        >
          <Column field="_id" header="Mã hóa đơn" sortable />
          <Column field="patient.name" header="Bệnh nhân" sortable />
          <Column field="doctor.name" header="Bác sĩ" sortable />
          <Column
            field="price"
            header="Giá tiền"
            sortable
            body={priceBodyTemplate}
          />
          <Column
            field="healthInsurance"
            header="Áp dụng BHYT"
            sortable
            body={healthInsuranceBodyTemplate}
          />
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

      <CreateNewInvoiceModal
        visible={visible}
        setVisible={setVisible}
        onRefresh={fetchInvoices}
      />

      <UpdateInvoiceModal
        visible2={visible2}
        setVisible2={setVisible2}
        onRefresh={fetchInvoices}
        updateVal={updateVal}
      />

      <Dialog
        header={`Thông tin hóa đơn khám bệnh`}
        visible={visible3}
        style={{ width: "50vw" }}
        onHide={() => {
          if (!visible3) return;
          setVisible3(false);
        }}
      >
        <div className="m-0">
          <div className="grid grid-cols-2 gap-5">
            <Fieldset legend="Mã lịch khám bệnh">
              <p className="m-0">{invoiceDetails?._id}</p>
            </Fieldset>
            <Fieldset legend="Bệnh nhân">
              <p className="m-0">{invoiceDetails?.patient?.name}</p>
            </Fieldset>
            <Fieldset legend="Bác sĩ">
              <p className="m-0">{invoiceDetails?.doctor?.name}</p>
            </Fieldset>
            <Fieldset legend="Giá tiền">
              <p className="m-0">{formatCurrencyVND(invoiceDetails?.price)}</p>
            </Fieldset>
            <Fieldset legend="Áp dụng BHYT">
              <p className="m-0">
                {invoiceDetails?.healthInsurance
                  ? "Có sử dụng BHYT"
                  : "Không sử dụng BHYT"}
              </p>
            </Fieldset>
            <Fieldset legend="Tổng tiền">
              <p className="m-0">{formatCurrencyVND(invoiceDetails?.total)}</p>
            </Fieldset>
            <Fieldset legend="Trạng thái">
              <p className="m-0">{invoiceDetails?.paymentStatus}</p>
            </Fieldset>
            <Fieldset legend="Ngày tạo">
              <p className="m-0">{formatDate(invoiceDetails?.createdAt)}</p>
            </Fieldset>
          </div>
          <div className="mt-5 flex items-center justify-end">
            <Button
              type="submit"
              label="Xuất hóa đơn khám bệnh (PDF)"
              icon="pi pi-file-pdf"
              severity="warning"
              onClick={handleExportPDF}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ManageInvoice;
