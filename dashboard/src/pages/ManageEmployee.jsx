import React, { useEffect, useRef, useState } from "react";
import TitleSection from "../components/TitleSection";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { employeeSchema } from "../validations/doctorSchema";
import FieldInput from "../components/FieldInput";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import {
  EMPLOYEE_STATUS,
  commonSpecialtiesInPrivateClinics,
  genders,
  medicalSchoolsInVietnam,
  roles,
} from "../utils/constants";
import { formatDate } from "../utils/helper";
import { Toast } from "primereact/toast";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { font } from "../assets/font";
import { Tag } from "primereact/tag";
import { InputText } from "primereact/inputtext";
import useDebounce from "../hooks/useDebounce";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import {
  createNewEmployeeApi,
  deleteEmployeeApi,
  getAllEmployeesApi,
} from "../api/employeeApi";

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

  const [visible, setVisible] = useState(false);
  const [date, setDate] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedGraduate, setSelectedGraduate] = useState(null);
  const [selectedSpecialization, setSelectedSpecialization] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);

  const [employees, setEmployees] = useState([]);
  const [query, setQuery] = useState("");
  const queryValue = useDebounce(query, 500);

  const filteredEmployee = employees.filter((item) => {
    return item.name.toLowerCase().includes(queryValue.toLowerCase());
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onchange",
    resolver: yupResolver(employeeSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      email: "",
      address: "",
    },
  });

  useEffect(() => {
    fetchEmployee();
  }, []);

  const fetchEmployee = async () => {
    try {
      const res = await getAllEmployeesApi();
      if (res) setEmployees(res?.results);
    } catch (error) {
      console.log("Error: ", error);
      setEmployees([]);
    }
  };

  const handleAddNewEmployee = async (values) => {
    if (!date) {
      toast.current.show({
        severity: "error",
        summary: "Vui lòng chọn ngày sinh",
        life: 1500,
      });
      return;
    }

    if (!selectedGender) {
      toast.current.show({
        severity: "error",
        summary: "Vui lòng chọn giới tính",
        life: 1500,
      });
      return;
    }

    if (!selectedRole) {
      toast.current.show({
        severity: "error",
        summary: "Vui lòng chọn vai trò",
        life: 1500,
      });
      return;
    }

    try {
      const body = {
        ...values,
        gender: selectedGender,
        graduatedFrom: selectedGraduate,
        specialization: selectedSpecialization,
        role: selectedRole,
        dateOfBirth: formatDate(date),
      };

      await createNewEmployeeApi(body);
      const res = await getAllEmployeesApi();
      setEmployees(res?.results);

      toast.current.show({
        severity: "success",
        summary: "Thêm mới hoàn tất",
        life: 1500,
      });
    } catch (error) {
      console.log("Error: ", error);
      setEmployees([]);
      toast.current.show({
        severity: "error",
        summary: "Lỗi",
        life: 1500,
      });
    }
  };

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

  return (
    <div>
      <div className="flex items-center justify-between">
        <TitleSection>Quản lí bác sĩ</TitleSection>
        <Button
          label="Thêm mới"
          icon="pi pi-plus"
          onClick={() => setVisible(true)}
        />
      </div>

      <div className="mt-8">
        <DataTable
          ref={dt}
          value={filteredEmployee}
          header={header}
          scrollable
          stripedRows
          showGridlines
        >
          <Column field="name" header="Tên" sortable />
          <Column field="email" header="Email" sortable />
          <Column field="phoneNumber" header="SĐT" sortable />
          <Column field="gender" header="Giới tính" sortable />
          <Column field="dateOfBirth" header="Ngày sinh" sortable />
          <Column
            field="graduatedFrom"
            header="Tốt nghiệp"
            sortable
            style={{ maxWidth: "150px" }}
          />
          <Column field="specialization" header="Chuyên khoa" sortable />
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

      <Dialog
        header="Form thêm mới nhân viên"
        visible={visible}
        style={{ width: "35vw" }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
        <form
          onSubmit={handleSubmit(handleAddNewEmployee)}
          className="m-0 space-y-5"
        >
          <FieldInput
            label="Tên"
            type="text"
            name="name"
            htmlFor="name"
            register={register}
            errorMessage={errors?.name?.message}
          />

          <FieldInput
            label="Số điện thoại"
            type="phoneNumber"
            name="phoneNumber"
            htmlFor="phoneNumber"
            register={register}
            errorMessage={errors?.phoneNumber?.message}
          />
          <FieldInput
            label="Địa chỉ"
            type="address"
            name="address"
            htmlFor="address"
            register={register}
            errorMessage={errors?.address?.message}
          />
          <FieldInput
            label="Email"
            type="email"
            name="email"
            htmlFor="email"
            register={register}
            errorMessage={errors?.email?.message}
          />
          <FieldInput
            label="Mật khẩu"
            type="password"
            name="password"
            htmlFor="password"
            register={register}
            errorMessage={errors?.password?.message}
          />

          <div className="flex flex-col gap-2">
            <label>Ngày sinh</label>
            <Calendar
              id="buttondisplay"
              value={date}
              onChange={(e) => setDate(e.value)}
              showIcon
            />
          </div>

          <div className="flex flex-col gap-2">
            <label>Giới tính</label>
            <Dropdown
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.value)}
              options={genders}
              placeholder="Chọn giới tính"
              className="w-full "
            />
          </div>

          <div className="flex flex-col gap-2">
            <label>Tốt nghiệp</label>
            <Dropdown
              value={selectedGraduate}
              onChange={(e) => setSelectedGraduate(e.value)}
              options={medicalSchoolsInVietnam}
              placeholder="Chọn trường đã tốt nghiệp"
              className="w-full "
            />
          </div>

          <div className="flex flex-col gap-2">
            <label>Chuyên khoa</label>
            <Dropdown
              value={selectedSpecialization}
              onChange={(e) => setSelectedSpecialization(e.value)}
              options={commonSpecialtiesInPrivateClinics}
              placeholder="Chọn chuyên khoa"
              className="w-full "
            />
          </div>

          <div className="flex flex-col gap-2">
            <label>Vai trò</label>
            <Dropdown
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.value)}
              options={roles}
              placeholder="Chọn vai trò"
              className="w-full "
            />
          </div>

          <Button
            type="submit"
            label="Xác nhận"
            className="w-full"
            disabled={isSubmitting}
          />
        </form>
      </Dialog>

      <Toast ref={toast} />
    </div>
  );
};

export default ManageEmployee;
