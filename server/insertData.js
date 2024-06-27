import Medicine from "./models/medicineModel.js";

const medicinesData = [
  {
    name: "Montelukast",
    description:
      "Thuốc điều trị hen suyễn Montelukast, giảm triệu chứng khò khè, khó thở.",
    price: 180000,
    stock: 40,
    unit: "Hộp",
    category: "667bea414d1a8446ea8dfbb1", // Thuốc điều trị hen suyễn và BPTNM
  },
  {
    name: "Desogestrel",
    description:
      "Thuốc ngừa thai Desogestrel, giảm nguy cơ mang thai không mong muốn.",
    price: 250000,
    stock: 30,
    unit: "Vỉ",
    category: "667bea364d1a8446ea8dfbaf", // Thuốc ngừa thai
  },
  {
    name: "Quetiapine",
    description:
      "Thuốc điều trị rối loạn tâm thần Quetiapine, ổn định tâm trạng và giảm triệu chứng lo âu.",
    price: 300000,
    stock: 25,
    unit: "Vỉ",
    category: "667bea2f4d1a8446ea8dfbad", // Thuốc điều trị rối loạn tâm thần
  },
  {
    name: "Calcium + Vitamin D3",
    description:
      "Thuốc bổ sung Canxi và Vitamin D3, giúp duy trì xương chắc khỏe.",
    price: 120000,
    stock: 50,
    unit: "Hộp",
    category: "667bea254d1a8446ea8dfbab", // Thuốc bổ sung vitamin và khoáng chất
  },
  {
    name: "Ranitidine",
    description:
      "Thuốc điều trị dạ dày Ranitidine, giảm triệu chứng đầy hơi và tiêu chảy.",
    price: 90000,
    stock: 60,
    unit: "Kem",
    category: "667bea1e4d1a8446ea8dfba9", // Thuốc điều trị dạ dày và tiêu hóa
  },
  {
    name: "Digoxin",
    description:
      "Thuốc chống loạn nhịp tim Digoxin, điều chỉnh nhịp tim và cải thiện tuần hoàn máu.",
    price: 200000,
    stock: 35,
    unit: "Kem",
    category: "667bea184d1a8446ea8dfba7", // Thuốc chống loạn nhịp tim
  },
  {
    name: "Losartan",
    description:
      "Thuốc điều trị huyết áp Losartan, làm giảm huyết áp hiệu quả và bảo vệ thận.",
    price: 150000,
    stock: 40,
    unit: "Vỉ",
    category: "667bea104d1a8446ea8dfba5", // Thuốc huyết áp
  },
  {
    name: "Gliclazide",
    description:
      "Thuốc điều trị tiểu đường Gliclazide, kiểm soát đường huyết và bảo vệ gan.",
    price: 100000,
    stock: 55,
    unit: "Vỉ",
    category: "667bea0a4d1a8446ea8dfba3", // Thuốc tiểu đường
  },
  {
    name: "Phenylephrine",
    description:
      "Thuốc giảm ho và cảm cúm Phenylephrine, giảm ngứa mũi và nghẹt mũi hiệu quả.",
    price: 80000,
    stock: 70,
    unit: "Vỉ",
    category: "667bea024d1a8446ea8dfba1", // Thuốc giảm ho và cảm cúm
  },
  {
    name: "Cetirizine",
    description:
      "Thuốc chống dị ứng Cetirizine, làm giảm các triệu chứng dị ứng như ngứa, chảy nước mắt.",
    price: 120000,
    stock: 45,
    unit: "Vỉ",
    category: "667be9fa4d1a8446ea8dfb9f", // Thuốc chống dị ứng
  },
];

export const insertData = async () => {
  try {
    medicinesData.forEach((medicine) => {
      const total = medicine.price * medicine.stock;
      medicine.total = total.toFixed(2); // Định dạng kết quả với hai chữ số thập phân
    });

    await Medicine.insertMany(medicinesData);
    console.log("Đã chèn dữ liệu thành công");
  } catch (error) {
    console.error("Lỗi khi chèn dữ liệu:", error);
  }
};
