import useDebounce from "../../../hooks/useDebounce";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useEffect, useRef, useState } from "react";
import { LIMIT_AMOUNT } from "../../../utils/constants";
import { font } from "../../../assets/font";
import { deleteEmployeeApi, getEmployeesApi } from "../../../api/employeeApi";

export default function useManageEmployee() {
  const dt = useRef(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const queryValue = useDebounce(query, 500);
  const [selectedFilter, setSelectedFilter] = useState({
    gender: null,
    status: null,
    role: null,
    graduatedFrom: null,
    specialization: null,
  });
  const [paginator, setPaginator] = useState({
    totalPages: 1,
    currentPage: 1,
    totalResults: 0,
  });

  useEffect(() => {
    fetchData();
  }, [paginator.currentPage, selectedFilter]);

  const fetchData = async () => {
    setLoading(true);

    try {
      const { gender, status, role, graduatedFrom, specialization } =
        selectedFilter;

      const params = {
        page: paginator.currentPage,
        limit: LIMIT_AMOUNT,
        gender,
        status,
        role,
        graduatedFrom,
        specialization,
      };

      const res = await getEmployeesApi(params);

      if (res) {
        setData(res.results);
        setPaginator({
          ...paginator,
          totalResults: res.totalResults,
          totalPages: res.totalPages,
          currentPage: res.currentPage,
        });
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
      item._id.toLowerCase().includes(lowerCaseQuery)
    );
  });

  const onResetFilter = () => {
    setSelectedFilter({
      gender: null,
      status: null,
      role: null,
      graduatedFrom: null,
      specialization: null,
    });
    setQuery("");
    setPaginator((prev) => ({ ...prev, currentPage: 1 }));
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
          const res = await deleteEmployeeApi(itemId);
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
    { field: "gender", header: "Giới tính" },
    { field: "dateOfBirth", header: "Ngày sinh" },
    { field: "email", header: "Email" },
    { field: "phoneNumber", header: "SĐT" },
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
        doc.text("Danh sách nhân viên", 14, 22);

        doc.autoTable({
          startY: 30,
          columns: exportColumns,
          body: data,
          styles: {
            font: "Roboto",
          },
        });

        doc.save("nhan-vien.pdf");
      });
    });
  };

  const exportExcel = () => {
    import("xlsx").then((xlsx) => {
      const exportedFields = data.map((item) => {
        return {
          _id: item._id,
          name: item.name,
          gender: item.gender,
          dateOfBirth: item.dateOfBirth,
          email: item.email,
          phoneNumber: item.phoneNumber,
        };
      });

      const worksheet = xlsx.utils.json_to_sheet(exportedFields);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      saveAsExcelFile(excelBuffer, "nhan-vien");
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
    paginator,
    setPaginator,
    onPrevPage,
    onNextPage,
    dt,
    exportCSV,
    exportPdf,
    exportExcel,
  };
}
