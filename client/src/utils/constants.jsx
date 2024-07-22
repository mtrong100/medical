import {
  FaBriefcaseMedical,
  FaHospitalAlt,
  FaMedrt,
  FaRibbon,
  FaUserFriends,
} from "react-icons/fa";
import { FaHeartPulse, FaUserDoctor } from "react-icons/fa6";
import { GiMedicines } from "react-icons/gi";
import { AiFillLike } from "react-icons/ai";

export const NAV_LINKS = [
  {
    name: "Trang chủ",
    link: "/",
  },
  {
    name: "Về chúng tôi",
    link: "/about",
  },
  // {
  //   name: "Dịch vụ",
  //   link: "/service",
  // },
  {
    name: "Bài viết",
    link: "/post",
  },
  // {
  //   name: "Liên hệ",
  //   link: "/contact",
  // },
  {
    name: "Hồ sơ",
    link: "/profile",
  },
];

export const GENDER = {
  MALE: "Nam",
  FEMALE: "Nữ",
};

export const APPOINTMENT_STATUS = {
  PENDING: "Đang chờ",
  CANCELLED: "Đã hủy",
  COMPLETED: "Đã khám",
};

export const genders = [GENDER.MALE, GENDER.FEMALE];

export const ADMIN_ID = "6695d0bb4272e683f0032f31";

export const doctorSchedules = [
  "7:00 - 8:00",
  "8:00 - 9:00",
  "9:00 - 10:00",
  "10:00 - 11:00",
  "13:00 - 14:00",
  "14:00 - 15:00",
  "15:00 - 16:00",
  "16:00 - 17:00",
];

export const stastisticCard = [
  {
    icon: <FaHospitalAlt size={30} />,
    title: "FaHospitalAlt",
    caption:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut erat nec leo lobortis blandit.",
  },
  {
    icon: <FaUserDoctor size={30} />,
    title: "Experianced Doctors",
    caption:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut erat nec leo lobortis blandit.",
  },
  {
    icon: <FaBriefcaseMedical size={30} />,
    title: "Customer Satisfaction",
    caption:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut erat nec leo lobortis blandit.",
  },
  {
    icon: <GiMedicines size={30} />,
    title: "Pharma Pipeline",
    caption:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut erat nec leo lobortis blandit.",
  },
];

export const keyCards = [
  {
    icon: <FaHeartPulse size={30} />,
    title: "Cardiology",
    caption:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut erat nec leo lobortis blandit.",
  },
  {
    icon: <FaRibbon size={30} />,
    title: "Orthopaedic",
    caption:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut erat nec leo lobortis blandit.",
  },
  {
    icon: <FaMedrt size={30} />,
    title: "Neurologist",
    caption:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut erat nec leo lobortis blandit.",
  },
  {
    icon: <GiMedicines size={30} />,
    title: "Pharma Pipeline",
    caption:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut erat nec leo lobortis blandit.",
  },
  {
    icon: <FaUserFriends size={30} />,
    title: "Pharma Team",
    caption:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut erat nec leo lobortis blandit.",
  },
  {
    icon: <AiFillLike size={30} />,
    title: "High Quality treatments",
    caption:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut erat nec leo lobortis blandit.",
  },
];
