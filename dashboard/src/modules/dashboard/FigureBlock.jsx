import React from "react";
import Box from "../../components/Box";
import { formatCurrencyVND } from "../../utils/helper";
import { MdOutlineAttachMoney } from "react-icons/md";
import useGetFirgures from "./useGetFigures";
import { GiMedicines } from "react-icons/gi";
import { AiFillMedicineBox } from "react-icons/ai";
import useGetRevenue from "./useGetRevenue";
import {
  FaUsers,
  FaCalendarAlt,
  FaBook,
  FaFileInvoiceDollar,
} from "react-icons/fa";

const FigureBlock = () => {
  const { figures } = useGetFirgures();
  const { revenue } = useGetRevenue();

  return (
    <div className="mt-5 grid grid-cols-4 gap-3">
      <Box
        color="blue"
        heading="Doanh thu"
        number={formatCurrencyVND(revenue || 0)}
        icon={<MdOutlineAttachMoney size={30} color="white" />}
      />
      <Box
        color="red"
        heading="Lịch khám"
        number={figures?.appointmentCount || 0}
        icon={<FaCalendarAlt size={30} color="white" />}
      />
      <Box
        color="green"
        heading="Nhân viên"
        number={figures?.employeeCount || 0}
        icon={<FaUsers size={30} color="white" />}
      />
      <Box
        color="amber"
        heading="Bệnh nhân"
        number={figures?.patientCount || 0}
        icon={<FaUsers size={30} color="white" />}
      />
      <Box
        color="purple"
        heading="Hồ sơ"
        number={figures?.medicalRecordCount || 0}
        icon={<FaBook size={30} color="white" />}
      />
      <Box
        color="cyan"
        heading="Thuốc"
        number={figures?.medicineCount || 0}
        icon={<GiMedicines size={30} color="white" />}
      />
      <Box
        color="pink"
        heading="Kê toa"
        number={figures?.prescriptionCount || 0}
        icon={<AiFillMedicineBox size={30} color="white" />}
      />
      <Box
        color="teal"
        heading="Hóa đơn"
        number={figures?.invoiceCount || 0}
        icon={<FaFileInvoiceDollar size={30} color="white" />}
      />
    </div>
  );
};

export default FigureBlock;
