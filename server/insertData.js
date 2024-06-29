import MedicalService from "./models/medicalServiceModel.js";

const rawData = [
  {
    name: "Khám tổng quát",
    description:
      "Khám tổng quát bao gồm kiểm tra sức khỏe toàn diện, đo huyết áp, xét nghiệm máu và nước tiểu.",
    price: 500000,
  },
  {
    name: "Khám chuyên khoa tim mạch",
    description:
      "Khám và tư vấn các vấn đề liên quan đến tim mạch như đau ngực, cao huyết áp, rối loạn nhịp tim.",
    price: 700000,
  },
  {
    name: "Khám chuyên khoa nội tiết",
    description:
      "Khám và tư vấn các bệnh liên quan đến rối loạn nội tiết như tiểu đường, rối loạn tuyến giáp.",
    price: 650000,
  },
  {
    name: "Siêu âm",
    description:
      "Siêu âm bụng, siêu âm tim, siêu âm thai, siêu âm các cơ quan nội tạng khác.",
    price: 300000,
  },
  {
    name: "Xét nghiệm máu",
    description:
      "Xét nghiệm công thức máu, đường huyết, mỡ máu, chức năng gan, thận.",
    price: 200000,
  },
  {
    name: "Chụp X-quang",
    description:
      "Chụp X-quang phổi, xương, khớp để kiểm tra các tổn thương hoặc bệnh lý.",
    price: 250000,
  },
  {
    name: "Khám nhi khoa",
    description:
      "Khám và tư vấn sức khỏe cho trẻ em, tiêm chủng và phát hiện sớm các bệnh lý trẻ em.",
    price: 400000,
  },
  {
    name: "Khám phụ khoa",
    description:
      "Khám và tư vấn các bệnh lý phụ khoa, kiểm tra sức khỏe sinh sản.",
    price: 600000,
  },
  {
    name: "Khám răng hàm mặt",
    description:
      "Khám và điều trị các vấn đề về răng miệng, tư vấn vệ sinh răng miệng.",
    price: 450000,
  },
];

export const insertData = async () => {
  try {
    await MedicalService.insertMany(rawData);
    console.log("Đã chèn dữ liệu thành công");
  } catch (error) {
    console.error("Lỗi khi chèn dữ liệu:", error);
  }
};
