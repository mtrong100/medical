import useManageMedicalService from "./useManageMedicalService";
import UpdateMedicalService from "./UpdateMedicalService";
import TitleSection from "../../components/TitleSection";
import React, { useState } from "react";
import CreateMedicalService from "./CreateMedicalService";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import TableToolbar from "../../components/TableToolbar";
import {
  createdAtBodyTemplate,
  priceBodyTemplate,
} from "../../utils/columnTemplate";
import useGetMedicalServiceStats from "./useGetMedicalServiceStats";
import MedicalServicePriceChart from "./MedicalServicePriceChart";

const ManageMedicalService = () => {
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [detail, setDetail] = useState(null);
  const { loadingStats, stats } = useGetMedicalServiceStats();
  console.log("🚀 ~ ManageMedicalService ~ stats:", stats);
  const {
    data,
    query,
    setQuery,
    fetchData,
    onDelete,
    exportCSV,
    exportPdf,
    exportExcel,
    dt,
  } = useManageMedicalService();

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex items-center gap-2">
        <Button
          icon="pi pi-pencil"
          outlined
          onClick={() => {
            setVisible2(true);
            setDetail(rowData);
          }}
        />
        <Button
          icon="pi pi-trash"
          outlined
          severity="danger"
          onClick={() => onDelete(rowData._id)}
        />
      </div>
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <TitleSection>Quản lí dịch vụ khám</TitleSection>
        <Button
          label="Thêm dịch vụ khám mới"
          icon="pi pi-plus"
          onClick={() => setVisible(true)}
        />
      </div>

      <div className="mt-5">
        <MedicalServicePriceChart
          loading={loadingStats}
          labels={stats?.sericeNames}
          dataSet={stats?.servicePrices}
        />
      </div>

      <div className="mt-5">
        <DataTable
          ref={dt}
          value={data}
          paginator
          rows={5}
          paginatorLeft
          rowsPerPageOptions={[5, 10, 25, 50]}
          scrollable
          stripedRows
          showGridlines
          emptyMessage="Không tìm thấy dữ liệu"
          className="bg-white border-gray-200 shadow-sm border rounded-md"
          header={
            <TableToolbar
              query={query}
              setQuery={setQuery}
              onExportCSV={exportCSV}
              onExportPdf={exportPdf}
              onExportExcel={exportExcel}
            />
          }
        >
          <Column field="_id" header="Mã dịch vụ" sortable />
          <Column field="name" header="Tên" sortable />
          <Column
            field="description"
            header="Mô tả"
            sortable
            style={{ width: "400px" }}
          />
          <Column
            field="price"
            header="Giá tiền"
            sortable
            body={priceBodyTemplate}
          />
          <Column
            field="createdAt"
            header="Ngày tạo"
            sortable
            body={createdAtBodyTemplate}
          />
          <Column
            body={actionBodyTemplate}
            exportable={false}
            header="Thao tác"
          />
        </DataTable>
      </div>

      <CreateMedicalService
        visible={visible}
        setVisible={setVisible}
        onReload={fetchData}
      />

      <UpdateMedicalService
        visible2={visible2}
        setVisible2={setVisible2}
        detail={detail}
        onReload={fetchData}
      />
    </div>
  );
};

export default ManageMedicalService;
