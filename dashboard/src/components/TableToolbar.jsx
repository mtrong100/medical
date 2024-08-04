import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React from "react";

const TableToolbar = ({
  query,
  setQuery,
  onExportCSV,
  onExportPdf,
  onExportExcel,
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="p-inputgroup max-w-md">
        <InputText
          placeholder="Tìm kiếm..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button icon="pi pi-search" />
      </div>

      <div className="flex items-center flex-shrink-0  gap-5">
        <Button
          type="button"
          icon="pi pi-file"
          label="Xuất file CSV"
          size="small"
          onClick={onExportCSV}
          severity="info"
          data-pr-tooltip="CSV"
        />
        <Button
          type="button"
          icon="pi pi-file-excel"
          severity="success"
          size="small"
          label="Xuất file Excel"
          onClick={onExportExcel}
          data-pr-tooltip="XLS"
        />
        <Button
          type="button"
          icon="pi pi-file-pdf"
          severity="warning"
          size="small"
          label="Xuất file PDF"
          onClick={onExportPdf}
          data-pr-tooltip="PDF"
        />
      </div>
    </div>
  );
};

export default TableToolbar;
