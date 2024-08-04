import { Tag } from "primereact/tag";
import { formatCurrencyVND } from "./helper";
import { PAYMENT_STATUS } from "./constants";

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
