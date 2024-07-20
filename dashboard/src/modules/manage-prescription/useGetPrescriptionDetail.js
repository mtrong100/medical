import jsPDF from "jspdf";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPrescriptionDetailApi } from "../../api/prescriptionApi";
import { font } from "../../assets/font";

export default function useGetPrescriptionDetail() {
  const { id } = useParams();
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDetail();
  }, []);

  const fetchDetail = async () => {
    setLoading(true);
    try {
      const res = await getPrescriptionDetailApi(id);
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
    doc.text("Hóa đơn thuốc", 14, 22);

    // Thông tin bệnh nhân và bác sĩ
    doc.setFontSize(12);
    doc.text(`Bệnh nhân: ${detail.patient}`, 14, 40);
    doc.text(`Bác sĩ: ${detail.doctor}`, 14, 48);
    doc.text(`Ghi chú: ${detail.notes}`, 14, 56);
    doc.text(
      `Ngày tạo: ${new Date(detail.createdAt).toLocaleDateString()}`,
      14,
      64
    );

    // Tạo bảng chi tiết thuốc
    const tableColumn = [
      "Tên thuốc",
      "Đơn giá",
      "Số lượng",
      "Đơn vị",
      "Thành tiền",
    ];

    const tableRows = [];

    detail.detail.forEach((item) => {
      const medicineData = [
        item.name,
        item.price.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        }),
        item.quantity,
        item.unit,
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
    doc.save(`hoa-don-thuoc.pdf`);
  };

  return { detail, loading, onExportPDF };
}
