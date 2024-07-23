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
  {
    name: "Bài viết",
    link: "/post",
  },
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

export const SERVICE_DATA = [
  {
    icon: <FaHospitalAlt size={30} />,
    title: "Công nghệ mới nhất",
    caption:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut erat nec leo lobortis blandit.",
  },
  {
    icon: <FaUserDoctor size={30} />,
    title: "Bác sĩ giàu kinh nghiệm",
    caption:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut erat nec leo lobortis blandit.",
  },
  {
    icon: <FaBriefcaseMedical size={30} />,
    title: "Sự hài lòng của khách hàng",
    caption:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut erat nec leo lobortis blandit.",
  },
  {
    icon: <GiMedicines size={30} />,
    title: "Đường ống dược phẩm",
    caption:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut erat nec leo lobortis blandit.",
  },
];

export const KEYFEATURE_DATA = [
  {
    icon: <FaHeartPulse size={30} />,
    title: "Tim mạch",
    caption:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut erat nec leo lobortis blandit.",
  },
  {
    icon: <FaRibbon size={30} />,
    title: "Chỉnh hình",
    caption:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut erat nec leo lobortis blandit.",
  },
  {
    icon: <FaMedrt size={30} />,
    title: "Nhà thần kinh học",
    caption:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut erat nec leo lobortis blandit.",
  },
  {
    icon: <GiMedicines size={30} />,
    title: "Đường ống dược phẩm",
    caption:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut erat nec leo lobortis blandit.",
  },
  {
    icon: <FaUserFriends size={30} />,
    title: "Nhóm dược phẩm",
    caption:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut erat nec leo lobortis blandit.",
  },
  {
    icon: <AiFillLike size={30} />,
    title: "Phương pháp điều trị chất lượng cao",
    caption:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut erat nec leo lobortis blandit.",
  },
];
