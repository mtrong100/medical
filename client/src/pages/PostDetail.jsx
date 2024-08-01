import React, { useEffect } from "react";
import parse from "html-react-parser";
import { useParams } from "react-router-dom";
import useGetPostDetail from "../hooks/useGetPostDetail";
import { Tag } from "primereact/tag";
import { formatDate } from "../utils/helper";
import { InputTextarea } from "primereact/inputtextarea";
import TitleSection from "../components/TitleSection";
import { Button } from "primereact/button";
import useComment from "../hooks/useComment";
import { useSelector } from "react-redux";
import { ProgressSpinner } from "primereact/progressspinner";
import Comment from "../components/Comment";

const PostDetail = () => {
  const { currentUser } = useSelector((state) => state.user);

  const { detail, loading } = useGetPostDetail();

  const {
    textValue,
    isSending,
    isDeleting,
    setTextValue,
    onCreateComment,
    onDeleteComment,
    comments,
    isLoading,
    paginator,
    onPrevPage,
    onNextPage,
  } = useComment();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ProgressSpinner />
      </div>
    );
  }

  return (
    <section className="mt-10 mb-20">
      <div className="page-container">
        <div className="grid grid-cols-2 gap-5">
          <div className="space-y-3">
            <Tag value={detail?.category} severity="success" rounded></Tag>
            <h1 className="text-5xl font-bold leading-relaxed tracking-normal">
              {detail?.title}
            </h1>
            <p className="opacity-80">Người đăng: {detail?.author}</p>
            <p className="opacity-80">
              Ngày đăng: {formatDate(detail?.createdAt)}
            </p>
          </div>

          <div>
            <img
              src={detail?.image}
              alt={detail?.title}
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        </div>

        <div className="mt-10">{parse(detail?.content || "")}</div>

        <div className="mt-10">
          <div>
            <TitleSection>Bình luận về bài viết này</TitleSection>
            <div className="mt-5 space-y-3">
              <InputTextarea
                value={textValue}
                onChange={(e) => setTextValue(e.target.value)}
                rows={5}
                cols={30}
                placeholder="Nhập bình luận..."
                className="w-full"
              />
              <Button
                label="Đăng bình luận"
                icon="pi pi-send"
                className="flex ml-auto"
                onClick={() => onCreateComment(currentUser?._id, detail?._id)}
                disabled={isSending}
              />
            </div>
          </div>

          <div>
            <TitleSection className="mt-10">Danh sách bình luận</TitleSection>
            <div className="mt-5 space-y-3">
              {isLoading ? (
                <p className="text-center opacity-70">Đang tải bình luận...</p>
              ) : (
                comments?.map((cmt) => (
                  <Comment
                    key={cmt?._id}
                    cmt={cmt}
                    onDelete={() => onDeleteComment(cmt?._id)}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostDetail;
