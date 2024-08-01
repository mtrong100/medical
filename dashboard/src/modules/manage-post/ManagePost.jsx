import useManagePost from "./useManagePost";
import TitleSection from "../../components/TitleSection";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LIMIT_AMOUNT } from "../../utils/constants";
import { InputText } from "primereact/inputtext";
import { formatDate } from "../../utils/helper";
import { DataTable } from "primereact/datatable";
import { Column } from "jspdf-autotable";
import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import useGetPostStats from "./useGetPostStats";
import ChartSection from "../../components/ChartSection";
import MonthlyPostChart from "./MonthlyPostChart";
import PostByCategoryChart from "./PostByCategoryChart";

const ManagePost = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [detail, setDetail] = useState(null);
  const { postStats } = useGetPostStats();

  const {
    data,
    query,
    setQuery,
    onDelete,
    paginator,
    onPrevPage,
    onNextPage,
    dt,
    exportCSV,
    exportPdf,
    exportExcel,
  } = useManagePost();

  const header = (
    <div className="flex items-center justify-between">
      <div className="p-inputgroup max-w-md">
        <InputText
          placeholder="Tìm kiếm"
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
          rounded
          onClick={() => exportCSV(false)}
          data-pr-tooltip="CSV"
        />
        <Button
          type="button"
          icon="pi pi-file-excel"
          severity="success"
          label="Xuất file Excel"
          rounded
          onClick={exportExcel}
          data-pr-tooltip="XLS"
        />
        <Button
          type="button"
          icon="pi pi-file-pdf"
          severity="warning"
          label="Xuất file PDF"
          rounded
          onClick={exportPdf}
          data-pr-tooltip="PDF"
        />
      </div>
    </div>
  );

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex items-center gap-2 ">
        <Button
          icon="pi pi-comments"
          rounded
          severity="secondary"
          onClick={() => {
            setVisible(true);
            setDetail(rowData);
          }}
        />
        <Button
          icon="pi pi-pencil"
          rounded
          severity="info"
          onClick={() => navigate(`/post/update/${rowData._id}`)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          severity="danger"
          onClick={() => onDelete(rowData._id)}
        />
      </div>
    );
  };

  const createdAtBodyTemplate = (rowData) => {
    return <div>{formatDate(rowData.createdAt)}</div>;
  };

  const imageBodyTemplate = (rowData) => {
    return (
      <img
        src={rowData.image}
        alt={rowData.image}
        className="w-full h-[70px] object-contain rounded-sm"
      />
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <TitleSection>Quản lí bài viết</TitleSection>
        <Button
          label="Thêm mới bài viết"
          icon="pi pi-plus"
          onClick={() => navigate("/post/create")}
        />
      </div>

      <div className="mt-5">
        <DataTable
          ref={dt}
          value={data}
          header={header}
          scrollable
          stripedRows
          showGridlines
          emptyMessage="Không tìm thấy dữ liệu"
        >
          <Column field="_id" header="Mã bài viết" sortable />
          <Column
            header="Hình ảnh"
            exportable={false}
            body={imageBodyTemplate}
          />
          <Column
            field="title"
            header="Tiêu đề"
            sortable
            style={{ maxWidth: "300px" }}
          />
          <Column field="category" header="Danh mục" sortable />
          <Column field="views" header="Lượt xem" sortable />
          <Column field="totalComments" header="Bình luận" sortable />
          <Column header="Ngày tạo" sortable body={createdAtBodyTemplate} />

          <Column
            body={actionBodyTemplate}
            exportable={false}
            header="Thao tác"
          />
        </DataTable>
      </div>

      {paginator.totalResults > LIMIT_AMOUNT && (
        <div className="flex items-center  justify-end mt-8 gap-2">
          <Button
            severity="secondary"
            onClick={onPrevPage}
            icon="pi pi-angle-left"
          />
          <div className="flex items-center gap-2 text-xl font-semibold">
            <p>{paginator.currentPage}</p> / <p>{paginator.totalPages}</p>
          </div>
          <Button
            severity="secondary"
            onClick={onNextPage}
            icon="pi pi-angle-right"
          />
        </div>
      )}

      <div className="mt-5 grid grid-cols-2 gap-5">
        <ChartSection title="Thống kê bài viết">
          <MonthlyPostChart data={postStats?.postsUploadedByMonth} />
        </ChartSection>
        <ChartSection title="Thống kê danh mục">
          <PostByCategoryChart data={postStats?.postsByCategory} />
        </ChartSection>
      </div>

      <Sidebar
        visible={visible}
        onHide={() => setVisible(false)}
        position="right"
        className="w-2/4"
      >
        <h2 className="text-3xl font-semibold">
          Lượt bình luận ({detail?.views})
        </h2>
        <div className="mt-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </div>
      </Sidebar>
    </div>
  );
};

export default ManagePost;
