import { APPOINTMENT_STATUS } from "./constants";

export const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export const formatCurrencyVND = (amount) => {
  if (typeof amount !== "number") {
    return "Input must be a number";
  }
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "  VNĐ";
};

export const parseDate = (formattedDate) => {
  if (!formattedDate) return null;

  const parts = formattedDate.split("/");
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const year = parseInt(parts[2], 10);

  return new Date(year, month, day);
};

export const getAppointmentSeverity = (status) => {
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
