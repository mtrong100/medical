import jsPDF from "jspdf";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMedicalServiceInvoiceDetailApi } from "../../api/medicalServiceInvoiceApi";
import { font } from "../../assets/font";

export default function useMedicalInvoiceDetail() {
  const { id } = useParams();
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDetail();
  }, []);

  const fetchDetail = async () => {
    setLoading(true);
    try {
      const res = await getMedicalServiceInvoiceDetailApi(id);
      setDetail(res);
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  const onExportPDF = () => {
    const doc = new jsPDF();

    // Add the custom font
    doc.addFileToVFS("Roboto-Regular.ttf", font);
    doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");
    doc.setFont("Roboto");

    // Tiêu đề hóa đơn
    doc.setFontSize(18);
    doc.text("Phiếu sử dụng dịch vụ", 14, 20);

    doc.setFontSize(12);
    doc.text(`Mã phiếu: ${detail._id}`, 14, 30);
    doc.text(`Bệnh nhân: ${detail.patient}`, 14, 40);
    doc.text(`Trạng thái: ${detail.status}`, 14, 50);
    doc.text(
      `Ngày tạo: ${new Date(detail.createdAt).toLocaleDateString()}`,
      14,
      60
    );

    // Tạo bảng chi tiết thuốc
    const tableColumn = ["Tên dịch vụ", "Đơn giá"];
    const tableRows = [];

    detail.detail.forEach((item) => {
      const data = [
        item.name,
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
    const finalY = doc.previousAutoTable.finalY;
    doc.setFontSize(12);
    doc.text(
      `Tổng cộng: ${detail.total.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      })}`,
      14,
      finalY + 10
    );

    // Xuất file PDF
    doc.save(`phieu-su-dung-dich-vu.pdf`);
  };

  return {
    detail,
    loading,
    onExportPDF,
  };
}
