import useDebounce from "../../hooks/useDebounce";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useEffect, useRef, useState } from "react";
import { font } from "../../assets/font";
import { LIMIT_AMOUNT } from "../../utils/constants";
import { deleteSupplierApi, getSuppliersApi } from "../../api/supplierApi";

export default function useManageSupplier() {
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

      const res = await getSuppliersApi(params);

      if (res) {
        setData(res.results);
      }
    } catch (error) {
      console.log("Lỗi fetch data supplier: ", error);
      toast.error("Lỗi fetch data supplier");
    } finally {
      setLoading(false);
    }
  };

  const filteredQuery = data.filter((item) => {
    const lowerCaseQuery = queryValue.toLowerCase();

    return (
      item.name.toLowerCase().includes(lowerCaseQuery) ||
      item.email.toLowerCase().includes(lowerCaseQuery) ||
      item.phone.toLowerCase().includes(lowerCaseQuery) ||
      item.address.toLowerCase().includes(lowerCaseQuery) ||
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
          const res = await deleteSupplierApi(itemId);
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
    { field: "name", header: "Tên" },
    { field: "email", header: "Email" },
    { field: "phone", header: "SDT" },
    { field: "address", header: "Địa chỉ" },
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
        doc.text("Danh sách nhà cung cấp", 14, 22);

        doc.autoTable({
          startY: 30,
          columns: exportColumns,
          body: data,
          styles: {
            font: "Roboto",
          },
        });

        doc.save("danh-sach-nha-cung-cap.pdf");
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

      saveAsExcelFile(excelBuffer, "danh-sach-nha-cung-cap");
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
  };
}
