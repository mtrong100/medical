import { Tag } from "primereact/tag";
import { formatCurrencyVND } from "./helper";
import { PAYMENT_STATUS } from "./constants";
import { Button } from "primereact/button";

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
          rounded
          icon="pi pi-info-circle"
          severity="danger"
        />
      ) : (
        <Tag
          value={rowData.status}
          rounded
          icon="pi pi-check"
          severity="success"
        />
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
        <Tag value="Thiết bị" rounded icon="pi pi-desktop" severity="info" />
      ) : (
        <Tag value="Thuốc" rounded icon="pi pi-sparkles" severity="warning" />
      )}
    </>
  );
};

export const sumTotalBodyTemplate = (rowData) => {
  return <div>{formatCurrencyVND(rowData.price * rowData.quantity)}</div>;
};
