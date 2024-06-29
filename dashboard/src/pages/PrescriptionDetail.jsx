import React, { useEffect, useState } from "react";
import TitleSection from "../components/TitleSection";
import { useNavigate, useParams } from "react-router-dom";
import { getPrescriptionDetailApi } from "../api/prescriptionApi";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Fieldset } from "primereact/fieldset";
import { formatCurrencyVND, formatDate } from "../utils/helper";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { font } from "../assets/font";
import { ProgressSpinner } from "primereact/progressspinner";

const PrescriptionDetail = () => {
  const { id } = useParams();
  const [prescription, setPrescription] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPrescriptionDetail();
  }, []);

  const fetchPrescriptionDetail = async () => {
    setLoading(true);
    try {
      const res = await getPrescriptionDetailApi(id);
      setPrescription(res);
    } catch (error) {
      console.log("Error: ", error);
      setPrescription(null);
    } finally {
      setLoading(false);
    }
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();

    // Add the custom font
    doc.addFileToVFS("Roboto-Regular.ttf", font);
    doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");
    doc.setFont("Roboto");

    // Tiêu đề hóa đơn
    doc.setFontSize(18);
    doc.text("Hóa Đơn Đơn Thuốc", 14, 22);

    // Thông tin bệnh nhân và bác sĩ
    doc.setFontSize(12);
    doc.text(`Bệnh nhân: ${prescription.patient.name}`, 14, 40);
    doc.text(`Bác sĩ: ${prescription.doctor.name}`, 14, 48);
    doc.text(`Ghi chú: ${prescription.notes}`, 14, 56);
    doc.text(
      `Ngày tạo: ${new Date(prescription.createdAt).toLocaleDateString()}`,
      14,
      64
    );

    // Tạo bảng chi tiết thuốc
    const tableColumn = [
      "Tên thuốc",
      "Đơn giá",
      "Số lượng",
      "Đơn vị",
      "Danh mục",
      "Thành tiền",
    ];
    const tableRows = [];

    prescription.detail.forEach((item) => {
      const medicineData = [
        item.name,
        item.price.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        }),
        item.quantity,
        item.unit,
        item.category,
        (item.price * item.quantity).toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        }),
      ];
      tableRows.push(medicineData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 72,
      theme: "striped",
      styles: {
        font: "Roboto",
      },
      headStyles: { fillColor: [22, 160, 133] },
    });

    // Tổng cộng
    const finalY = doc.previousAutoTable.finalY; // Vị trí Y cuối cùng của bảng
    doc.setFontSize(12);
    doc.text(
      `Tổng cộng: ${prescription.total.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      })}`,
      14,
      finalY + 10
    );

    // Xuất file PDF
    doc.save(`hoa-don-${prescription.patient.name}.pdf`);
  };

  const priceBodyTemplate = (rowData) => {
    return <div>{formatCurrencyVND(rowData.price * rowData.quantity)}</div>;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ProgressSpinner />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <TitleSection>Thông tin đơn thuốc </TitleSection>
        <Button
          type="submit"
          label="Xuất hóa đơn thuốc (PDF)"
          icon="pi pi-file-pdf"
          severity="warning"
          onClick={handleExportPDF}
        />
      </div>

      <div className="mt-10">
        <div className="grid grid-cols-2 gap-5">
          <Fieldset legend="Mã đơn thuốc">
            <p className="m-0">{prescription?._id}</p>
          </Fieldset>
          <Fieldset legend="Bệnh nhân">
            <p className="m-0">{prescription?.patient?.name}</p>
          </Fieldset>
          <Fieldset legend="Bác sĩ kê toa">
            <p className="m-0">{prescription?.doctor?.name}</p>
          </Fieldset>
          <Fieldset legend="Ngày kê toa">
            <p className="m-0">{formatDate(prescription?.createdAt)}</p>
          </Fieldset>
          <Fieldset legend="Ghi chú">
            <p className="m-0">{prescription?.notes}</p>
          </Fieldset>
          <Fieldset legend="Tổng tiền thuốc">
            <p className="m-0">{formatCurrencyVND(prescription?.total)}</p>
          </Fieldset>
        </div>

        <div className="mt-5 space-y-5">
          <h1 className="text-2xl font-semibold">
            Danh sách thuốc theo kê toa
          </h1>
          <DataTable
            scrollable
            stripedRows
            showGridlines
            emptyMessage="Không tìm thấy dữ liệu"
            value={prescription?.detail}
          >
            <Column field="_id" header="Mã thuốc" sortable />
            <Column field="name" header="Tên" sortable />
            <Column field="unit" header="Đơn vị" sortable />
            <Column field="category" header="Danh mục" sortable />
            <Column header="Giá tiền" sortable body={priceBodyTemplate} />
            <Column field="quantity" header="Số lượng" />
          </DataTable>
        </div>

        <div className="flex items-center mt-10 justify-end ">
          <Button
            type="submit"
            label="Quay về"
            className="w-[150px]"
            severity="secondary"
            onClick={() => navigate("/prescription")}
          />
        </div>
      </div>
    </div>
  );
};

export default PrescriptionDetail;
