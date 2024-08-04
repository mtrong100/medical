import useDebounce from "../../hooks/useDebounce";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import { useEffect, useRef, useState } from "react";
import { LIMIT_AMOUNT } from "../../utils/constants";
import { font } from "../../assets/font";
import {
  deleteInventoryApi,
  getInventoriesApi,
  updateInventoryApi,
} from "../../api/inventoryApi";

export default function useManageInventory() {
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

      const res = await getInventoriesApi(params);

      if (res) {
        setData(res.results);
      }
    } catch (error) {
      console.log("Lỗi fetch data device: ", error);
      toast.error("Lỗi fetch data device");
    } finally {
      setLoading(false);
    }
  };

  const filteredQuery = data.filter((item) => {
    const lowerCaseQuery = queryValue.toLowerCase();

    return (
      item.supplier.toLowerCase().includes(lowerCaseQuery) ||
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
          const res = await deleteInventoryApi(itemId);
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

  const onUpdateStatus = async (itemId) => {
    try {
      const res = await updateInventoryApi(itemId);
      if (res) toast.success("Cập nhật trạng thái thanh toán hoàn tất");
    } catch (error) {
      console.log("Đã xảy ra sự cố: ", error.message);
      toast.error(error.message);
    } finally {
      fetchData();
    }
  };

  const cols = [
    { field: "supplier", header: "Nhà cung cấp" },
    { field: "itemType", header: "Loại" },
    { field: "total", header: "Tổng tiền" },
    { field: "status", header: "Trạng thái" },
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
        doc.text("Danh sách phiếu nhập kho", 14, 22);

        doc.autoTable({
          startY: 30,
          columns: exportColumns,
          body: data,
          styles: {
            font: "Roboto",
          },
        });

        doc.save("danh-sach-phieu-nhap-kho.pdf");
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

      saveAsExcelFile(excelBuffer, "danh-sach-phieu-nhap-kho");
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

  const onExportSinglePDF = (rowData) => {
    const doc = new jsPDF();

    doc.addFileToVFS("Roboto-Regular.ttf", font);
    doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");
    doc.setFont("Roboto");

    doc.setFontSize(18);
    doc.text("Hóa đơn nhập kho", 14, 22);

    doc.setFontSize(12);
    doc.text(`Mã hóa đơn: ${rowData._id}`, 14, 40);
    doc.text(`Nhà cung cấp: ${rowData.supplier}`, 14, 50);
    doc.text(
      `Mặc hàng: ${rowData.itemType === "Device" ? "Thiết bị y tế" : "Thuốc"}`,
      14,
      60
    );
    doc.text(`Trạng thái: ${rowData.status}`, 14, 70);
    doc.text(
      `Ngày lập phiếu: ${new Date(rowData.createdAt).toLocaleDateString()}`,
      14,
      80
    );

    // Tạo bảng chi tiết thuốc
    const tableColumn = ["Tên", "Đơn giá", "Số lượng", "Tổng tiền"];

    const tableRows = [];

    rowData.items.forEach((item) => {
      const data = [
        item.name,
        item.price.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        }),
        item.quantity,
        (item.price * item.quantity).toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        }),
      ];
      tableRows.push(data);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 90,
      theme: "striped",
      styles: {
        font: "Roboto",
      },
      headStyles: { fillColor: [22, 160, 133] },
    });

    // Tổng cộng
    const finalY = doc.previousAutoTable.finalY;
    doc.setFontSize(12);
    doc.text(
      `Tổng cộng: ${rowData.total.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      })}`,
      14,
      finalY + 10
    );

    // Xuất file PDF
    doc.save(`hoa-don-nhap-kho.pdf`);
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
    onExportSinglePDF,
    onUpdateStatus,
  };
}
