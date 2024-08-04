import useManagePost from "./useManagePost";
import useGetPostStats from "./useGetPostStats";
import useGetCommentsInPost from "./useGetCommentsInPost";
import TitleSection from "../../components/TitleSection";
import React, { useState } from "react";
import Comment from "./Comment";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "primereact/sidebar";
import { DataTable } from "primereact/datatable";
import { Column } from "jspdf-autotable";
import { Button } from "primereact/button";
import TableToolbar from "../../components/TableToolbar";
import {
  createdAtBodyTemplate,
  imageBodyTemplate,
} from "../../utils/columnTemplate";
import PostStatsChart from "./PostStatsChart";
import PostCategoriesChart from "./PostCategoriesChart";

const ManagePost = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const { postStats, loadingStats } = useGetPostStats();
  const {
    dt,
    data,
    query,
    setQuery,
    onDelete,
    exportCSV,
    exportPdf,
    exportExcel,
  } = useManagePost();

  const { comments, isLoading, fetchComments, onDeleteComment } =
    useGetCommentsInPost();

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex items-center gap-2 ">
        <Button
          icon="pi pi-comments"
          outlined
          severity="help"
          onClick={() => {
            setVisible(true);
            fetchComments(rowData._id);
          }}
        />
        <Button
          icon="pi pi-pencil"
          outlined
          severity="info"
          onClick={() => navigate(`/post/update/${rowData._id}`)}
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
        <TitleSection>Quản lí bài viết</TitleSection>
        <Button
          label="Thêm mới bài viết"
          icon="pi pi-plus"
          onClick={() => navigate("/post/create")}
        />
      </div>

      <div className="mt-5 grid grid-cols-[minmax(0,_1fr)_400px] gap-5">
        <PostStatsChart
          loading={loadingStats}
          labels={postStats?.months}
          dataSet1={postStats?.totalPostsByMonth}
          dataSet2={postStats?.totalViewsByMonth}
          dataSet3={postStats?.totalCommentsByMonth}
        />
        <PostCategoriesChart
          loading={loadingStats}
          labels={postStats?.categories}
          dataSet={postStats?.totalPostsByCategory}
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

      <Sidebar
        visible={visible}
        onHide={() => setVisible(false)}
        position="right"
        className="w-2/4"
      >
        <h2 className="text-3xl font-semibold">
          Tổng bình luận ({comments?.length})
        </h2>
        <div className="mt-5 space-y-3">
          {isLoading && (
            <p className="text-center opacity-70">Đang tải bình luận...</p>
          )}

          {!isLoading && comments?.length === 0 && (
            <p className="text-center opacity-70 font-medium">
              Không có bình luận
            </p>
          )}

          {!isLoading &&
            comments?.map((cmt) => (
              <Comment
                key={cmt?._id}
                cmt={cmt}
                onDelete={() => onDeleteComment(cmt?._id, cmt?.postId)}
              />
            ))}
        </div>
      </Sidebar>
    </div>
  );
};

export default ManagePost;
