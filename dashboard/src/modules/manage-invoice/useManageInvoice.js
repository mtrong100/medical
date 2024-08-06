import useDebounce from "../../hooks/useDebounce";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useEffect, useRef, useState } from "react";
import { font } from "../../assets/font";
import { LIMIT_AMOUNT } from "../../utils/constants";
import { deleteInvoiceApi, getInvoicesApi } from "../../api/invoiceApi";
import jsPDF from "jspdf";
import { formatCurrencyVND } from "../../utils/helper";

export default function useManageInvoice() {
  const dt = useRef(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const queryValue = useDebounce(query, 500);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);

    try {
      const params = {
        page: 1,
        limit: LIMIT_AMOUNT,
      };

      const res = await getInvoicesApi(params);

      if (res) {
        setData(res.results);
      }
    } catch (error) {
      console.log("Lỗi fetch data: ", error);
      toast.error("Lỗi fetch data");
    } finally {
      setLoading(false);
    }
  };

  const filteredQuery = data.filter((item) => {
    const lowerCaseQuery = queryValue.toLowerCase();

    return (
      item.patient.toLowerCase().includes(lowerCaseQuery) ||
      item.doctor.toLowerCase().includes(lowerCaseQuery) ||
      item._id.toLowerCase().includes(lowerCaseQuery)
    );
  });

  const onDelete = async (itemId) => {
    Swal.fire({
      title: "Bạn có chắc chắn?",
      text: `Bạn có muốn xoá dữ liệu này?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Có, xoá nó!",
      cancelButtonText: "Không, giữ lại",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteInvoiceApi(itemId);
          if (res) Swal.fire("Đã xoá!", "Dữ liệu đã được xóa.", "success");
        } catch (error) {
          console.log("Đã xảy ra sự cố khi xoá: ", error);
          Swal.fire("Lỗi!", "Đã xảy ra sự cố khi xoá.", "error");
        } finally {
          fetchData();
        }
      }
    });
  };

  const cols = [
    { field: "_id", header: "Mã hóa đơn" },
    { field: "patient", header: "Bệnh nhân" },
    { field: "doctor", header: "Bác sĩ" },
    { field: "price", header: "Giá tiền" },
    { field: "healthInsurance", header: "BHYT" },
    { field: "total", header: "Tổng tiền" },
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

        doc.addFileToVFS("Roboto-Regular.ttf", font);
        doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");
        doc.setFont("Roboto");

        doc.setFontSize(18);
        doc.text("Danh sách hóa đơn khám bệnh", 14, 22);

        doc.autoTable({
          startY: 30,
          columns: exportColumns,
          body: data,
          styles: {
            font: "Roboto",
          },
        });

        doc.save("danh-sach-hoa-don-kham-benh.pdf");
      });
    });
  };

  const exportExcel = () => {
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(data);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      saveAsExcelFile(excelBuffer, "danh-sach-hoa-don-kham-benh");
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

  const onExportPDF = (rowData) => {
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
    doc.text(`Mã hóa đơn: ${rowData._id}`, 14, 40);
    doc.text(`Bệnh nhân: ${rowData.patient}`, 14, 50);
    doc.text(`Bác sĩ: ${rowData.doctor}`, 14, 60);
    doc.text(
      `Ngày tạo: ${new Date(rowData.createdAt).toLocaleDateString()}`,
      14,
      70
    );
    doc.text(`Giá tiền khám: ${formatCurrencyVND(rowData.price)}`, 14, 80);
    doc.text(
      `Bảo hiểm y tế: ${
        rowData.healthInsurance ? "Có sử dụng" : "Không sử dụng"
      }`,
      14,
      90
    );

    doc.text(`Tổng giá tiền: ${formatCurrencyVND(rowData.total)}`, 14, 100);

    // Xuất file PDF
    doc.save(`hoa-don-kham-benh.pdf`);
  };

  return {
    data: filteredQuery,
    loading,
    query,
    setQuery,
    onDelete,
    dt,
    exportCSV,
    exportPdf,
    exportExcel,
    onExportPDF,
  };
}
