import React, { useEffect, useRef, useState } from "react";
import TitleSection from "../components/TitleSection";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { doctorSchema } from "../validations/doctorSchema";
import FieldInput from "../components/FieldInput";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import {
  commonSpecialtiesInPrivateClinics,
  medicalSchoolsInVietnam,
} from "../utils/constants";
import { formatDate } from "../utils/helper";
import { Toast } from "primereact/toast";
import {
  createNewDoctorApi,
  deleteDoctorApi,
  getAllDoctorsApi,
} from "../api/doctorApi";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { font } from "../assets/font";
import { Tag } from "primereact/tag";
import { InputText } from "primereact/inputtext";
import useDebounce from "../hooks/useDebounce";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const cols = [
  { field: "name", header: "Tên" },
  { field: "email", header: "Email" },
  { field: "phoneNumber", header: "SĐT" },
  { field: "gender", header: "Giới tính" },
  { field: "dateOfBirth", header: "Ngày sinh" },
  { field: "graduatedFrom", header: "Tốt nghiệp" },
  { field: "specialization", header: "Chuyên khoa" },
];

const ManageDoctor = () => {
  const genders = ["Nam", "Nữ"];
  const [visible, setVisible] = useState(false);
  const [date, setDate] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedGraduate, setSelectedGraduate] = useState(null);
  const [selectedSpecialization, setSelectedSpecialization] = useState(null);
  const toast = useRef(null);
  const [doctors, setDoctors] = useState([]);
  const dt = useRef(null);
  const [query, setQuery] = useState("");
  const queryValue = useDebounce(query, 500);
  const navigate = useNavigate();

  const filteredDoctors = doctors.filter((doctor) => {
    return doctor.name.toLowerCase().includes(queryValue.toLowerCase());
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onchange",
    resolver: yupResolver(doctorSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      email: "",
      address: "",
    },
  });

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await getAllDoctorsApi();
      setDoctors(res);
    } catch (error) {
      console.log("Error: ", error);
      setDoctors([]);
    }
  };

  const handleAddNewDoctor = async (values) => {
    if (
      !date ||
      !selectedGender ||
      !selectedGraduate ||
      !selectedSpecialization
    ) {
      toast.current.show({
        severity: "error",
        summary: "Vui lòng điền đầy đủ vào form",
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
        dateOfBirth: formatDate(date),
      };

      await createNewDoctorApi(body);
      const res = await getAllDoctorsApi();
      if (res) setDoctors(res);

      toast.current.show({
        severity: "success",
        summary: "Thêm mới hoàn tất",
        life: 1500,
      });
    } catch (error) {
      console.log("Error: ", error);
      setDoctors([]);
      toast.current.show({
        severity: "error",
        summary: "Lỗi",
        life: 1500,
      });
    }
  };

  const handleDeleteDoctor = async (doctor) => {
    const result = await Swal.fire({
      title: "Bạn có chắc chắn?",
      text: `Bạn có muốn xoá bác sĩ ${doctor.name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Có, xoá nó!",
      cancelButtonText: "Không, giữ lại",
    });

    if (result.isConfirmed) {
      try {
        const response = await deleteDoctorApi(doctor._id);
        if (response) {
          Swal.fire("Đã xoá!", "Bác sĩ đã được xoá.", "success");
          setDoctors(doctors.filter((d) => d._id !== doctor._id));
        }
      } catch (error) {
        Swal.fire("Lỗi!", "Đã xảy ra sự cố khi xoá bác sĩ.", "error");
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
          body: doctors,
          styles: {
            font: "Roboto",
          },
        });
        doc.save("doctors.pdf");
      });
    });
  };

  const exportExcel = () => {
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(doctors);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      saveAsExcelFile(excelBuffer, "doctors");
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
          onClick={() => navigate(`/doctor/${rowData._id}`)}
        />
        <Button
          icon="pi pi-pencil"
          rounded
          onClick={() => navigate(`/doctor/update/${rowData._id}`)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          severity="danger"
          onClick={() => handleDeleteDoctor(rowData)}
        />
      </div>
    );
  };

  const getSeverity = (status) => {
    console.log(status);

    switch (status) {
      case "Đã nghỉ việc":
        return "warning";

      case "Đang làm việc":
        return "success";

      case "Khóa tài khoản":
        return "danger";

      default:
        return "";
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
          value={filteredDoctors}
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
        header="Form thêm mới bác sĩ"
        visible={visible}
        style={{ width: "35vw" }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
        <form
          onSubmit={handleSubmit(handleAddNewDoctor)}
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
            <label>Tốt nghiệp từ trường</label>
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

export default ManageDoctor;
