import useDebounce from "../../hooks/useDebounce";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useEffect, useRef, useState } from "react";
import { LIMIT_AMOUNT } from "../../utils/constants";
import { font } from "../../assets/font";
import { deleteMedicineApi, getMedicinesApi } from "../../api/medicineApi";

export default function useManageMedicine() {
  const dt = useRef(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const queryValue = useDebounce(query, 500);
  const [selectedFilter, setSelectedFilter] = useState({
    unit: null,
    category: null,
  });

  useEffect(() => {
    fetchData();
  }, [selectedFilter]);

  const fetchData = async () => {
    setLoading(true);

    try {
      const { unit, category } = selectedFilter;

      const params = {
        page: 1,
        limit: LIMIT_AMOUNT,
        unit,
        category,
      };

      const res = await getMedicinesApi(params);

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
      item.name.toLowerCase().includes(lowerCaseQuery) ||
      item._id.toLowerCase().includes(lowerCaseQuery) ||
      item.category.toLowerCase().includes(lowerCaseQuery)
    );
  });

  const onResetFilter = () => {
    setSelectedFilter({
      category: null,
      unit: null,
    });
    setQuery("");
  };

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
          const res = await deleteMedicineApi(itemId);
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
    { field: "_id", header: "ID" },
    { field: "name", header: "Tên" },
    { field: "category", header: "Danh mục" },
    { field: "unit", header: "Đơn vị" },
    { field: "price", header: "Giá tiền" },
    { field: "stock", header: "Tồn kho" },
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
        doc.text("Danh sách thuốc", 14, 22);

        doc.autoTable({
          startY: 30,
          columns: exportColumns,
          body: data,
          styles: {
            font: "Roboto",
          },
        });

        doc.save("danh-sach-thuoc.pdf");
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

      saveAsExcelFile(excelBuffer, "danh-sach-thuoc");
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
    selectedFilter,
    setSelectedFilter,
    onResetFilter,
    onDelete,
    dt,
    exportCSV,
    exportPdf,
    exportExcel,
  };
}
