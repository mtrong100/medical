import React, { useEffect, useRef, useState } from "react";
import TitleSection from "../components/TitleSection";
import { Button } from "primereact/button";
import {
  EMPLOYEE_STATUS,
  accountStatus,
  commonSpecialtiesInPrivateClinics,
  genders,
  medicalSchoolsInVietnam,
  roles,
} from "../utils/constants";
import { Toast } from "primereact/toast";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { font } from "../assets/font";
import { Tag } from "primereact/tag";
import { InputText } from "primereact/inputtext";
import useDebounce from "../hooks/useDebounce";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { deleteEmployeeApi, getAllEmployeesApi } from "../api/employeeApi";
import { Dropdown } from "primereact/dropdown";
import { formatCurrencyVND } from "../utils/helper";

const cols = [
  { field: "name", header: "Tên" },
  { field: "email", header: "Email" },
  { field: "phoneNumber", header: "SĐT" },
  { field: "gender", header: "Giới tính" },
  { field: "dateOfBirth", header: "Ngày sinh" },
  { field: "graduatedFrom", header: "Tốt nghiệp" },
  { field: "specialization", header: "Chuyên khoa" },
];

const ManageEmployee = () => {
  const navigate = useNavigate();
  const toast = useRef(null);
  const dt = useRef(null);
  const [paginator, setPaginator] = useState({
    totalPages: 1,
    currentPage: 1,
    totalResults: 0,
  });
  const [limit, setLimit] = useState(10);
  const [filters, setFilters] = useState({
    graduatedFrom: "",
    specialization: "",
    gender: "",
    role: "",
    status: "",
  });

  const [employees, setEmployees] = useState([]);
  const [query, setQuery] = useState("");
  const queryValue = useDebounce(query, 500);

  const filteredEmployee = employees.filter((item) => {
    return (
      item.name.toLowerCase().includes(queryValue.toLowerCase()) ||
      item.email.toLowerCase().includes(queryValue.toLowerCase()) ||
      item._id.includes(queryValue.toLowerCase())
    );
  });

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const params = {
          page: paginator.currentPage,
          limit,
          ...filters,
        };
        const res = await getAllEmployeesApi(params);
        if (res) {
          setEmployees(res.results);
          setPaginator({
            ...paginator,
            totalResults: res.totalResults,
            totalPages: res.totalPages,
            currentPage: res.currentPage,
          });
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, [filters, limit, paginator.currentPage]);

  const handleDeleteEmployee = async (employee) => {
    const result = await Swal.fire({
      title: "Bạn có chắc chắn?",
      text: `Bạn có muốn xoá nhân viên ${employee.name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Có, xoá nó!",
      cancelButtonText: "Không, giữ lại",
    });

    if (result.isConfirmed) {
      try {
        const response = await deleteEmployeeApi(employee._id);
        if (response) {
          Swal.fire("Đã xoá!", "Dữ liệu đã được xóa.", "success");
          setEmployees(employees.filter((d) => d._id !== employee._id));
        }
      } catch (error) {
        Swal.fire("Lỗi!", "Đã xảy ra sự cố khi xoá.", "error");
      }
    }
  };

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
          body: employees,
          styles: {
            font: "Roboto",
          },
        });
        doc.save("employees.pdf");
      });
    });
  };

  const exportExcel = () => {
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(employees);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      saveAsExcelFile(excelBuffer, "employees");
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

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex items-center gap-2">
        <Button
          icon="pi pi-eye"
          rounded
          severity="help"
          onClick={() => navigate(`/employee/${rowData._id}`)}
        />
        <Button
          icon="pi pi-pencil"
          rounded
          onClick={() => navigate(`/employee/update/${rowData._id}`)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          severity="danger"
          onClick={() => handleDeleteEmployee(rowData)}
        />
      </div>
    );
  };

  const getSeverity = (status) => {
    switch (status) {
      case EMPLOYEE_STATUS.ISFIRED:
        return "warning";

      case EMPLOYEE_STATUS.ISWORKING:
        return "success";

      case EMPLOYEE_STATUS.ISLOCKED:
        return "danger";

      default:
        return "unknown";
    }
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <Tag
        value={rowData.status}
        severity={getSeverity(rowData.status)}
        rounded
      />
    );
  };

  const salaryBodyTemplate = (rowData) => {
    return <div>{formatCurrencyVND(rowData.salary)}</div>;
  };

  const resetFilter = () => {
    setFilters({
      graduatedFrom: "",
      specialization: "",
      gender: "",
      role: "",
      status: "",
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

  return (
    <div>
      <div className="flex items-center justify-between">
        <TitleSection>Quản lí nhân viên</TitleSection>
        <Button
          label="Thêm mới"
          icon="pi pi-plus"
          onClick={() => navigate("/employee/create")}
        />
      </div>

      {/* Filter */}
      <div className="mt-5 flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 w-[200px]">
          <h1 className="text-xl font-semibold">Bộ lọc: </h1>
          <Button onClick={resetFilter} label="Đặt lại" icon="pi pi-refresh" />
        </div>

        <div className="flex-1 flex items-center gap-3">
          <Dropdown
            value={filters.gender}
            onChange={(e) => setFilters({ ...filters, gender: e.value })}
            options={genders}
            placeholder="Chọn giới tính"
            className="w-full"
          />

          <Dropdown
            value={filters.graduatedFrom}
            onChange={(e) => setFilters({ ...filters, graduatedFrom: e.value })}
            options={medicalSchoolsInVietnam}
            placeholder="Chọn trường đã tốt nghiệp"
            className="w-full"
            filter
            filterPlaceholder="Tìm kiếm"
            scrollHeight="400px"
          />

          <Dropdown
            value={filters.specialization}
            onChange={(e) =>
              setFilters({ ...filters, specialization: e.value })
            }
            options={commonSpecialtiesInPrivateClinics}
            placeholder="Chọn chuyên khoa"
            className="w-full"
            filter
            filterPlaceholder="Tìm kiếm"
            scrollHeight="400px"
          />

          <Dropdown
            value={filters.role}
            onChange={(e) => setFilters({ ...filters, role: e.value })}
            options={roles}
            placeholder="Chọn vai trò"
            className="w-full"
            filter
            filterPlaceholder="Tìm kiếm"
            scrollHeight="400px"
          />

          <Dropdown
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.value })}
            options={accountStatus}
            placeholder="Chọn trạng thái"
            className="w-full"
          />
        </div>
      </div>

      <div className="mt-5">
        <DataTable
          ref={dt}
          value={filteredEmployee}
          header={header}
          scrollable
          stripedRows
          showGridlines
          emptyMessage="Không tìm thấy nhân viên"
        >
          <Column field="_id" header="ID" sortable />
          <Column
            field="name"
            header="Tên"
            sortable
            style={{ minWidth: "200px" }}
          />
          <Column
            field="email"
            header="Email"
            sortable
            style={{ minWidth: "150px" }}
          />
          <Column
            field="phoneNumber"
            header="SĐT"
            sortable
            style={{ minWidth: "150px" }}
          />
          <Column
            field="gender"
            header="Giới tính"
            sortable
            style={{ minWidth: "150px" }}
          />
          <Column
            field="dateOfBirth"
            header="Ngày sinh"
            sortable
            style={{ minWidth: "150px" }}
          />
          <Column
            field="graduatedFrom"
            header="Tốt nghiệp"
            sortable
            style={{ minWidth: "200px" }}
          />
          <Column
            field="specialization"
            header="Chuyên khoa"
            sortable
            style={{ minWidth: "200px" }}
          />
          <Column
            field="role"
            header="Vai trò"
            sortable
            style={{ minWidth: "150px" }}
          />
          <Column
            field="salary"
            header="Lương cơ bản"
            sortable
            body={salaryBodyTemplate}
            style={{ minWidth: "200px" }}
          />
          <Column
            field="status"
            header="Trạng thái"
            exportable={false}
            body={statusBodyTemplate}
            sortable
            style={{ minWidth: "150px" }}
          />
          <Column
            body={actionBodyTemplate}
            exportable={false}
            header="Thao tác"
          />
        </DataTable>
      </div>

      {paginator.totalResults > limit && (
        <div className="flex items-center  justify-end mt-8 gap-2">
          <Button onClick={onPrevPage} icon="pi pi-angle-left" />
          <div className="flex items-center gap-2 text-xl  font-semibold">
            <p>{paginator.currentPage}</p> / <p>{paginator.totalPages}</p>
          </div>
          <Button onClick={onNextPage} icon="pi pi-angle-right" />
        </div>
      )}

      <Toast ref={toast} />
    </div>
  );
};

export default ManageEmployee;
