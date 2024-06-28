import React, { useRef, useState } from "react";
import useGetDoctors from "../hooks/useGetDoctors";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import TitleSection from "../components/TitleSection";
import useGetMedicineCollection from "../hooks/useGetMedicineCollection";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { formatCurrencyVND } from "../utils/helper";
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";
import { createNewPrescriptionApi } from "../api/prescriptionApi";
import { useNavigate } from "react-router-dom";

const CreateNewPrescription = () => {
  const toast = useRef(null);
  const navigate = useNavigate();
  const { doctors } = useGetDoctors();
  const { medicines } = useGetMedicineCollection();
  const [loading, setLoading] = useState(false);
  const [medicineArray, setMedicineArray] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [form, setForm] = useState({
    patient: "",
    doctor: "",
    notes: "",
  });

  const handleCreateNewPrescription = async () => {
    const objectIdRegex = /^[0-9a-fA-F]{24}$/;

    if (!form.patient.trim()) {
      toast.current.show({
        severity: "error",
        summary: "Vui lòng nhập mã bệnh nhân",
        life: 1500,
      });
      return;
    }

    if (form.patient && !objectIdRegex.test(form.patient)) {
      toast.current.show({
        severity: "error",
        summary:
          "Mã bệnh nhân phải là một ObjectId hợp lệ (24 ký tự hexadecimal)",
        life: 1500,
      });
      return;
    }

    if (!form.doctor) {
      toast.current.show({
        severity: "error",
        summary: "Vui lòng chọn bác sĩ kê toa",
        life: 1500,
      });
      return;
    }

    setLoading(true);

    try {
      const formatArray = medicineArray.map((item) => ({
        medicine: item._id,
        quantity: item.quantity,
      }));

      const total = medicineArray.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      const body = {
        patient: form.patient,
        doctor: form.doctor,
        notes: form.notes,
        detail: formatArray,
        total: total.toFixed(2),
      };

      const res = await createNewPrescriptionApi(body);

      if (res) {
        toast.current.show({
          severity: "success",
          summary: "Kê toa thuốc hoàn tất",
          life: 1500,
        });
      }
    } catch (error) {
      console.log("Error creating new prescription:", error);
      toast.current.show({
        severity: "error",
        summary: "Lỗi",
        life: 1500,
      });
    } finally {
      setLoading(false);
      setForm({
        patient: "",
        doctor: "",
        notes: "",
      });
      setMedicineArray([]);
    }
  };

  const handleAddMedicineToTable = () => {
    if (!selectedMedicine) {
      toast.current.show({
        severity: "error",
        summary: "Vui lòng chọn thuốc",
        life: 1500,
      });
      return;
    }

    const body = {
      _id: selectedMedicine?._id,
      name: selectedMedicine?.name,
      unit: selectedMedicine?.unit,
      price: selectedMedicine?.price,
      categoryId: selectedMedicine?.category?._id,
      category: selectedMedicine?.category?.name,
      quantity,
    };

    // Kiểm tra nếu thuốc đã tồn tại trong mảng
    const existingMedicineIndex = medicineArray.findIndex(
      (item) => item._id === body._id
    );

    if (existingMedicineIndex !== -1) {
      // Nếu thuốc đã tồn tại, tăng số lượng
      const updatedMedicineArray = [...medicineArray];
      updatedMedicineArray[existingMedicineIndex].quantity += body.quantity;
      setMedicineArray(updatedMedicineArray);
    } else {
      // Nếu thuốc không tồn tại, thêm mới vào mảng
      setMedicineArray([...medicineArray, body]);
    }

    setSelectedMedicine(null);
    setQuantity(1);
  };

  const handleDeleteMedicine = (id) => {
    setMedicineArray(medicineArray.filter((item) => item._id !== id));
  };

  const handleIncreaseQuantity = (id) => {
    const updatedMedicineArray = [...medicineArray];
    const index = updatedMedicineArray.findIndex((item) => item._id === id);
    if (index !== -1) {
      updatedMedicineArray[index].quantity += 1;
      setMedicineArray(updatedMedicineArray);
    }
  };

  const handleDecreaseQuantity = (id) => {
    const updatedMedicineArray = [...medicineArray];
    const index = updatedMedicineArray.findIndex((item) => item._id === id);
    if (index !== -1 && updatedMedicineArray[index].quantity > 1) {
      updatedMedicineArray[index].quantity -= 1;
      setMedicineArray(updatedMedicineArray);
    }
  };

  const total = medicineArray.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const priceBodyTemplate = (rowData) => {
    return <div>{formatCurrencyVND(rowData.price * rowData.quantity)}</div>;
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex items-center gap-2 justify-center">
        <Button
          icon="pi pi-trash"
          rounded
          severity="danger"
          onClick={() => handleDeleteMedicine(rowData._id)}
        />
      </div>
    );
  };

  const quantityBodyTemplate = (rowData) => {
    return (
      <div className="flex items-center gap-5 justify-center">
        <Button
          onClick={() => handleDecreaseQuantity(rowData._id)}
          icon="pi pi-minus"
          rounded
          outlined
        />
        <div className="font-semibold text-lg">{rowData.quantity}</div>
        <Button
          onClick={() => handleIncreaseQuantity(rowData._id)}
          icon="pi pi-plus"
          rounded
          outlined
        />
      </div>
    );
  };

  return (
    <div>
      <TitleSection>Kê toa đơn thuốc mới</TitleSection>

      <Toast ref={toast} />

      <div className="space-y-6 mt-8 ">
        <div className="grid grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="patient">Mã bệnh nhân</label>
            <InputText
              id="patient"
              value={form.patient}
              onChange={(e) => setForm({ ...form, patient: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label>Bác sĩ kê toa thuốc</label>
            <Dropdown
              value={form.doctor}
              onChange={(e) => setForm({ ...form, doctor: e.value })}
              options={doctors}
              filter
              filterPlaceholder="Tìm kiếm"
              optionValue="_id"
              optionLabel="name"
              placeholder="Chọn bác sĩ khám bệnh"
              className="w-full "
              scrollHeight="300px"
            />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="patient">Chọn thuốc</label>
            <Dropdown
              value={selectedMedicine}
              onChange={(e) => setSelectedMedicine(e.value)}
              options={medicines}
              filter
              filterPlaceholder="Tìm kiếm"
              placeholder="Chọn thuốc"
              className="w-full "
              optionLabel="name"
              scrollHeight="300px"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="patient">Đơn vị</label>
            <InputText id="patient" value={selectedMedicine?.unit} readOnly />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="quantity">Số lượng</label>
            <InputNumber
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="patient">Thao tác</label>
            <Button
              onClick={handleAddMedicineToTable}
              type="button"
              label="Thêm thuốc"
            />
          </div>
        </div>

        {/* Medicine table  */}
        <div className="mt-5 space-y-3">
          <h1 className="text-2xl font-semibold">
            Danh sách thuốc theo kê toa
          </h1>
          <DataTable
            scrollable
            stripedRows
            showGridlines
            emptyMessage="Không tìm thấy dữ liệu"
            value={medicineArray}
          >
            <Column field="_id" header="Mã thuốc" sortable />
            <Column field="name" header="Tên" sortable />
            <Column field="unit" header="Đơn vị" sortable />
            <Column field="category" header="Danh mục" sortable />
            <Column
              field="price"
              header="Giá tiền"
              sortable
              body={priceBodyTemplate}
            />
            <Column
              field="quantity"
              header="Số lượng"
              body={quantityBodyTemplate}
            />
            <Column
              body={actionBodyTemplate}
              exportable={false}
              header="Thao tác"
            />
          </DataTable>
        </div>

        <div className="flex items-center justify-end">
          <p className="text-xl font-semibold">
            Tổng tiền: {formatCurrencyVND(total)}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <label>Ghi chú</label>
          <InputTextarea
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            rows={5}
            cols={30}
          />
        </div>

        <div className="flex items-center justify-end gap-3">
          <Button
            type="submit"
            label="Quay về"
            className="w-[200px]"
            severity="secondary"
            onClick={() => navigate("/prescription")}
          />
          <Button
            onClick={handleCreateNewPrescription}
            type="submit"
            label="Xác nhận"
            disabled={loading}
            className="w-[200px]"
          />
        </div>
      </div>
    </div>
  );
};

export default CreateNewPrescription;
