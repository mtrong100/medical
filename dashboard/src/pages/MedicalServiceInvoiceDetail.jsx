import React, { useEffect, useState } from "react";
import TitleSection from "../components/TitleSection";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Fieldset } from "primereact/fieldset";
import { formatCurrencyVND, formatDate } from "../utils/helper";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { font } from "../assets/font";
import { ProgressSpinner } from "primereact/progressspinner";
import { getMedicalServiceInvoiceDetailApi } from "../api/medicalServiceInvoiceApi";

const MedicalServiceInvoiceDetail = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMedicalServiceInvoiceDetail();
  }, []);

  const fetchMedicalServiceInvoiceDetail = async () => {
    setLoading(true);
    try {
      const res = await getMedicalServiceInvoiceDetailApi(id);
      setService(res);
    } catch (error) {
      console.log("Error: ", error);
      setService(null);
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
    doc.text("Phiếu sử dụng dịch vụ", 14, 22);

    // Thông tin bệnh nhân và bác sĩ
    doc.setFontSize(12);
    doc.text(`Bệnh nhân: ${service.patient}`, 14, 40);
    doc.text(
      `Ngày tạo: ${new Date(service.createdAt).toLocaleDateString()}`,
      14,
      64
    );

    // Tạo bảng chi tiết thuốc
    const tableColumn = ["Mã dịch vụ", "Tên dịch vụ", "Đơn giá"];
    const tableRows = [];

    service.detail.forEach((item) => {
      const data = [
        item._id,
        item.name,
        item.price.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        }),
        item.price.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        }),
      ];
      tableRows.push(data);
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
      `Tổng cộng: ${service.total.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      })}`,
      14,
      finalY + 10
    );

    // Xuất file PDF
    doc.save(`phieu-su-dung-dich-vu.pdf`);
  };

  const priceBodyTemplate = (rowData) => {
    return <div>{formatCurrencyVND(rowData.price)}</div>;
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
        <TitleSection>Thông tin phiếu dịch vụ </TitleSection>
        <Button
          type="submit"
          label="Xuất phiếu dịch vụ (PDF)"
          icon="pi pi-file-pdf"
          severity="warning"
          onClick={handleExportPDF}
        />
      </div>

      <div className="mt-10">
        <div className="grid grid-cols-2 gap-5">
          <Fieldset legend="Mã phiếu dịch vụ">
            <p className="m-0">{service?._id}</p>
          </Fieldset>
          <Fieldset legend="Bệnh nhân">
            <p className="m-0">{service?.patient}</p>
          </Fieldset>
          <Fieldset legend="Tổng tiền">
            <p className="m-0">{formatCurrencyVND(service?.total)}</p>
          </Fieldset>
          <Fieldset legend="Trạng thái">
            <p className="m-0">{service?.status}</p>
          </Fieldset>
          <Fieldset legend="Ngày tạo">
            <p className="m-0">{formatDate(service?.createdAt)}</p>
          </Fieldset>
        </div>

        <div className="mt-5 space-y-5">
          <h1 className="text-2xl font-semibold">Danh sách sử dụng dịch vụ</h1>
          <DataTable
            scrollable
            stripedRows
            showGridlines
            emptyMessage="Không tìm thấy dữ liệu"
            value={service?.detail}
          >
            <Column field="_id" header="Mã dịch vụ" sortable />
            <Column field="name" header="Tên" sortable />
            <Column header="Giá tiền" sortable body={priceBodyTemplate} />
          </DataTable>
        </div>

        <div className="flex items-center mt-10 justify-end ">
          <Button
            type="submit"
            label="Quay về"
            className="w-[150px]"
            severity="secondary"
            onClick={() => navigate("/medical-service-invoice")}
          />
        </div>
      </div>
    </div>
  );
};

export default MedicalServiceInvoiceDetail;
