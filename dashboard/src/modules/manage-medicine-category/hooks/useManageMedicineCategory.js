import useDebounce from "../../../hooks/useDebounce";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useEffect, useRef, useState } from "react";
import { LIMIT_AMOUNT } from "../../../utils/constants";
import { font } from "../../../assets/font";
import {
  deleteMedicineCategoryApi,
  getMedicineCategoriesApi,
} from "../../../api/medicineCategoryApi";

export default function useManageMedicineCategory() {
  const dt = useRef(null);
  const [categories, setCategories] = useState([]);
  const [loading, setloading] = useState(false);
  const [query, setQuery] = useState("");
  const queryValue = useDebounce(query, 500);
  const [paginator, setPaginator] = useState({
    totalPages: 1,
    currentPage: 1,
    totalResults: 0,
  });

  useEffect(() => {
    fetchCategories();
  }, [paginator.currentPage]);

  const fetchCategories = async () => {
    setloading(true);

    try {
      const params = {
        page: paginator.currentPage,
        limit: LIMIT_AMOUNT,
      };

      const res = await getMedicineCategoriesApi(params);

      if (res) {
        setCategories(res.results);
        setPaginator({
          ...paginator,
          totalResults: res.totalResults,
          totalPages: res.totalPages,
          currentPage: res.currentPage,
        });
      }
    } catch (error) {
      console.log("Lỗi fetch data danh mục thuốc: ", error);
      toast.error("Lỗi fetch data danh mục thuốc");
    } finally {
      setloading(false);
    }
  };

  const filteredQuery = categories.filter((item) => {
    const lowerCaseQuery = queryValue.toLowerCase();

    return (
      item.name.toLowerCase().includes(lowerCaseQuery) ||
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
          const res = await deleteMedicineCategoryApi(itemId);
          if (res) Swal.fire("Đã xoá!", "Dữ liệu đã được xóa.", "success");
        } catch (error) {
          console.log("Đã xảy ra sự cố khi xoá: ", error);
          Swal.fire("Lỗi!", "Đã xảy ra sự cố khi xoá.", "error");
        } finally {
          fetchCategories();
        }
      }
    });
  };

  const onPrevPage = () => {
    if (paginator.currentPage === 1) return;
    setPaginator((prev) => ({ ...prev, currentPage: prev.currentPage - 1 }));
  };

  const onNextPage = () => {
    if (paginator.currentPage === paginator.totalPages) return;
    setPaginator((prev) => ({ ...prev, currentPage: prev.currentPage + 1 }));
  };

  const cols = [
    { field: "_id", header: "ID" },
    { field: "name", header: "Tên" },
    { field: "medicineCount", header: "Số lượng" },
    { field: "createdAt", header: "Ngày thêm" },
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
        doc.text("Danh sách danh mục thuốc", 14, 22);

        doc.autoTable({
          startY: 30,
          columns: exportColumns,
          body: categories,
          styles: {
            font: "Roboto",
          },
        });

        doc.save("danh-muc-thuoc.pdf");
      });
    });
  };

  const exportExcel = () => {
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(categories);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      saveAsExcelFile(excelBuffer, "danh-muc-thuoc");
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
    query,
    setQuery,
    fetchCategories,
    onDelete,
    onPrevPage,
    onNextPage,
    paginator,
    exportCSV,
    exportPdf,
    exportExcel,
    dt,
  };
}
