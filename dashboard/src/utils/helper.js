import {
  ACCOUNT_STATUS,
  APPOINTMENT_STATUS,
  EMPLOYEE_ROLE,
  EMPLOYEE_SALARY,
  EMPLOYEE_STATUS,
} from "./constants";

export const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export const parseDate = (formattedDate) => {
  const parts = formattedDate.split("/");
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const year = parseInt(parts[2], 10);

  return new Date(year, month, day);
};

export const getAccountSeverity = (status) => {
  switch (status) {
    case ACCOUNT_STATUS.ISACTIVE:
      return "success";

    case ACCOUNT_STATUS.ISLOCKED:
      return "danger";

    default:
      return "secondary";
  }
};

export const getEmployeeServerity = (status) => {
  switch (status) {
    case EMPLOYEE_STATUS.ISWORKING:
      return "success";

    case EMPLOYEE_STATUS.ISFIRED:
      return "danger";

    default:
      return "secondary";
  }
};

export const getAppointmentServerity = (status) => {
  switch (status) {
    case APPOINTMENT_STATUS.PENDING:
      return "warning";

    case APPOINTMENT_STATUS.COMPLETED:
      return "success";

    case APPOINTMENT_STATUS.CANCELLED:
      return "danger";

    default:
      return "secondary";
  }
};

export const formatCurrencyVND = (amount) => {
  if (typeof amount !== "number") return "Input must be a number";
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "  VNĐ";
};

export const displayStatus = (val) => {
  switch (val) {
    case "Chờ xác nhận":
      return "amber";
    case "Đang lấy hàng":
      return "indigo";
    case "Đang vận chuyển":
      return "blue";
    case "Đã giao hàng":
      return "green";
    case "Đã hủy":
      return "red";

    default:
      return "";
  }
};

export const formatSalary = (salary) => {
  switch (salary) {
    case EMPLOYEE_SALARY.DOCTOR:
      return "13 triệu đồng";
    case EMPLOYEE_SALARY.CASHIER:
      return "8 triệu đồng";
    case EMPLOYEE_SALARY.RECEPTIONIST:
      return "8 triệu đồng";
    case EMPLOYEE_SALARY.NURSE:
      return "9 triệu đồng";
    case EMPLOYEE_SALARY.ACCOUNTANT:
      return "10 triệu đồng";
    case EMPLOYEE_SALARY.CLEANING_STAFF:
      return "6 triệu đồng";
    case EMPLOYEE_SALARY.GUARD:
      return "5 triệu đồng";
    default:
      return "Lương không xác định";
  }
};

export const getEmployeeSalary = (role) => {
  switch (role) {
    case EMPLOYEE_ROLE.DOCTOR:
      return EMPLOYEE_SALARY.DOCTOR;
    case EMPLOYEE_ROLE.CASHIER:
      return EMPLOYEE_SALARY.CASHIER;
    case EMPLOYEE_ROLE.RECEPTIONIST:
      return EMPLOYEE_SALARY.RECEPTIONIST;
    case EMPLOYEE_ROLE.NURSE:
      return EMPLOYEE_SALARY.NURSE;
    case EMPLOYEE_ROLE.ACCOUNTANT:
      return EMPLOYEE_SALARY.ACCOUNTANT;
    case EMPLOYEE_ROLE.CLEANING_STAFF:
      return EMPLOYEE_SALARY.CLEANING_STAFF;
    case EMPLOYEE_ROLE.GUARD:
      return EMPLOYEE_SALARY.GUARD;
    default:
      return 100000000;
  }
};

export const repeatColors = (colors, count) => {
  let repeatedColors = [];
  for (let i = 0; i < count; i++) {
    repeatedColors.push(colors[i % colors.length]);
  }
  return repeatedColors;
};

export const calculateAverage = (numbers) => {
  if (numbers.length === 0) return;

  const totalSum = numbers.reduce((acc, num) => acc + num, 0);

  const average = totalSum / numbers.length;

  return average.toFixed(2);
};
