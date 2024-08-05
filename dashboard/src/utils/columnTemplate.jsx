import { Tag } from "primereact/tag";
import { formatCurrencyVND, formatDate } from "./helper";
import { EMPLOYEE_STATUS, PAYMENT_STATUS } from "./constants";

export const totalPriceColumn = (rowData) => {
  return <div>{formatCurrencyVND(rowData.total)}</div>;
};

export const priceBodyTemplate = (rowData) => {
  return <div>{formatCurrencyVND(rowData.price)}</div>;
};

export const statusBodyTemplate = (rowData) => {
  return (
    <>
      {rowData.status === PAYMENT_STATUS.UNPAID ? (
        <Tag
          value={rowData.status}
          icon="pi pi-info-circle"
          severity="danger"
        />
      ) : (
        <Tag value={rowData.status} icon="pi pi-check" severity="success" />
      )}
    </>
  );
};

export const itemQuantityBodyTemplate = (rowData) => {
  return <div>{rowData?.items?.length || 0}</div>;
};

export const itemTypeBodyTemplate = (rowData) => {
  return (
    <>
      {rowData.itemType === "Device" ? (
        <Tag value="Thiết bị" icon="pi pi-desktop" severity="info" />
      ) : (
        <Tag value="Thuốc" icon="pi pi-sparkles" severity="warning" />
      )}
    </>
  );
};

export const sumTotalBodyTemplate = (rowData) => {
  return <div>{formatCurrencyVND(rowData.price * rowData.quantity)}</div>;
};

export const totalPriceStockTemplate = (rowData) => {
  return <div>{formatCurrencyVND(rowData.price * rowData.stock)}</div>;
};

export const imageBodyTemplate = (rowData) => {
  return (
    <img
      src={rowData.image}
      alt={rowData.image}
      className="w-full h-[70px] object-contain rounded-sm"
    />
  );
};

export const createdAtBodyTemplate = (rowData) => {
  return <div>{formatDate(rowData.createdAt)}</div>;
};

export const employeeStatusBodyTemplate = (rowData) => {
  return (
    <>
      {rowData.status === EMPLOYEE_STATUS.ISFIRED ? (
        <Tag
          value={rowData.status}
          icon="pi pi-info-circle"
          severity="danger"
        />
      ) : (
        <Tag value={rowData.status} icon="pi pi-check" severity="success" />
      )}
    </>
  );
};

export const salaryBodyTemplate = (rowData) => {
  return <div>{formatCurrencyVND(rowData.salary)}</div>;
};
