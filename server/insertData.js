import Doctor from "./models/doctorModel.js";
import bcrypt from "bcrypt";

const doctorArray = [
  [
    {
      _id: "66781cc2156d0db697f8fd71",
      name: "Nguyễn Thị Mai",
      graduatedFrom: "Đại học Y Hải Phòng",
      specialization: "Nhi khoa",
      phoneNumber: "0912345678",
      email: "nguyenthimai@gmail.com",
      dateOfBirth: "22/08/1985",
      gender: "Nữ",
      address: "123 Đường ABC, Quận 1, TP. Hồ Chí Minh",
      password: "password123",
      isDeleted: false,
      status: "Đang làm việc",
      createdAt: "2024-06-23T13:01:54.334Z",
      updatedAt: "2024-06-23T13:01:54.334Z",
      avatar: "https://avatar.iran.liara.run/public/job/doctor/male",
      __v: 0,
    },
    {
      _id: "6678210422cd65799ff167ce",
      name: "Trần Văn Bình",
      graduatedFrom: "Đại học Y Dược TP. Hồ Chí Minh",
      specialization: "Nội khoa",
      phoneNumber: "0987654321",
      email: "tranvanbinh@gmail.com",
      dateOfBirth: "18/09/1985",
      gender: "Nam",
      address: "456 Đường DEF, Quận 5, TP. Hồ Chí Minh",
      password: "password456",
      isDeleted: false,
      status: "Đang làm việc",
      avatar: "https://avatar.iran.liara.run/public/job/doctor/male",
      createdAt: "2024-06-23T13:20:04.132Z",
      updatedAt: "2024-06-23T13:20:04.132Z",
      __v: 0,
    },
    {
      _id: "6678217622cd65799ff167d7",
      name: "Phạm Minh Hoàng",
      graduatedFrom: "Đại học Y Dược - Đại học Quốc gia Hà Nội",
      specialization: "Ngoại khoa",
      phoneNumber: "0933445566",
      email: "phamminhhoang@gmail.com",
      dateOfBirth: "29/08/1987",
      gender: "Nam",
      address: "101 Đường JKL, Quận 7, TP. Hồ Chí Minh",
      password: "password101",
      isDeleted: false,
      status: "Đang làm việc",
      avatar: "https://avatar.iran.liara.run/public/job/doctor/male",
      createdAt: "2024-06-23T13:21:58.946Z",
      updatedAt: "2024-06-23T13:21:58.946Z",
      __v: 0,
    },
    {
      _id: "667821b122cd65799ff167da",
      name: "Lê Thị Hạnh",
      graduatedFrom: "Đại học Y Dược Huế",
      specialization: "Tai mũi họng",
      phoneNumber: "0911223344",
      email: "lethihanh@gmail.com",
      dateOfBirth: "29/08/1987",
      gender: "Nữ",
      address: "789 Đường GHI, Quận 5, TP. Hồ Chí Minh",
      password: "password789",
      isDeleted: false,
      status: "Đang làm việc",
      avatar: "https://avatar.iran.liara.run/public/job/doctor/female",
      createdAt: "2024-06-23T13:22:57.459Z",
      updatedAt: "2024-06-23T13:22:57.459Z",
      __v: 0,
    },
    {
      _id: "667821e522cd65799ff167dd",
      name: "Hoàng Thị Lan",
      graduatedFrom: "Học viện Quân y",
      specialization: "Da liễu",
      phoneNumber: "0977556677",
      email: "hoangthilan@gmail.com",
      dateOfBirth: "25/05/1994",
      gender: "Nữ",
      address: "202 Đường MNO, Quận 9, TP. Hồ Chí Minh",
      password: "password202",
      isDeleted: false,
      status: "Đang làm việc",
      avatar: "https://avatar.iran.liara.run/public/job/doctor/female",
      createdAt: "2024-06-23T13:23:49.486Z",
      updatedAt: "2024-06-23T13:23:49.486Z",
      __v: 0,
    },
  ],
];

export const insertData = async () => {
  try {
    for (let doctor of doctorArray[0]) {
      const hashedPassword = await bcrypt.hash(doctor.password, 10);
      doctor.password = hashedPassword;
      const newDoctor = new Doctor(doctor);
      await newDoctor.save();
    }
    console.log("Doctors inserted successfully");
  } catch (error) {
    console.log("Error inserting doctors:", error);
  }
};
