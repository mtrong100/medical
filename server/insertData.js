import Medicine from "./models/medicineModel.js";
import Patient from "./models/patientModel.js";

const patientsData = [
  {
    name: "Nguyễn Văn Nam",
    dateOfBirth: "23/03/1995",
    gender: "Nam",
    phoneNumber: "0901234567",
    email: "nguyenvannam@gmail.com",
    address: "123 Đường A, Quận 1, TP.HCM",
  },
  {
    name: "Trần Thị Lan",
    dateOfBirth: "15/05/1985",
    gender: "Nữ",
    phoneNumber: "0912345678",
    email: "tranthilan@gmail.com",
    address: "456 Đường B, Quận 2, TP.HCM",
  },
  {
    name: "Lê Hồng Phúc",
    dateOfBirth: "10/10/1990",
    gender: "Nam",
    phoneNumber: "0923456789",
    email: "lehongphuc@gmail.com",
    address: "789 Đường C, Quận 3, TP.HCM",
  },
  {
    name: "Phạm Văn Minh",
    dateOfBirth: "25/12/1987",
    gender: "Nam",
    phoneNumber: "0934567890",
    email: "phamvanminh@gmail.com",
    address: "101 Đường D, Quận 4, TP.HCM",
  },
  {
    name: "Hoàng Thị Mai",
    dateOfBirth: "14/02/1992",
    gender: "Nữ",
    phoneNumber: "0945678901",
    email: "hoangthimai@gmail.com",
    address: "202 Đường E, Quận 5, TP.HCM",
  },
  {
    name: "Vũ Đình Hùng",
    dateOfBirth: "30/07/1980",
    gender: "Nam",
    phoneNumber: "0956789012",
    email: "vudinhhung@gmail.com",
    address: "303 Đường F, Quận 6, TP.HCM",
  },
  {
    name: "Đặng Thị Hạnh",
    dateOfBirth: "05/09/1975",
    gender: "Nữ",
    phoneNumber: "0967890123",
    email: "dangthihanh@gmail.com",
    address: "404 Đường G, Quận 7, TP.HCM",
  },
  {
    name: "Ngô Văn Tuấn",
    dateOfBirth: "17/11/1983",
    gender: "Nam",
    phoneNumber: "0978901234",
    email: "ngovantuan@gmail.com",
    address: "505 Đường H, Quận 8, TP.HCM",
  },
  {
    name: "Bùi Thị Ngọc",
    dateOfBirth: "21/04/1996",
    gender: "Nữ",
    phoneNumber: "0989012345",
    email: "buithingoc@gmail.com",
    address: "606 Đường I, Quận 9, TP.HCM",
  },
  {
    name: "Đỗ Thanh Bình",
    dateOfBirth: "12/06/1989",
    gender: "Nam",
    phoneNumber: "0990123456",
    email: "dothanhbinh@gmail.com",
    address: "707 Đường J, Quận 10, TP.HCM",
  },
];

export const insertData = async () => {
  try {
    await Patient.insertMany(patientsData);
    console.log("Đã chèn dữ liệu thành công");
  } catch (error) {
    console.error("Lỗi khi chèn dữ liệu:", error);
  }
};
