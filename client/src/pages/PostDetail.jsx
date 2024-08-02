import parse from "html-react-parser";
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
import { useEffect } from "react";

const PostDetail = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { detail, loading } = useGetPostDetail();
  const {
    textValue,
    isSending,
    setTextValue,
    onCreateComment,
    onDeleteComment,
    comments,
    isLoading,
    loadMoreComments,
  } = useComment();

  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

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
            <div className="flex items-center gap-5">
              <Tag value={detail?.category} severity="success" rounded></Tag>
              <div className="flex items-center gap-1">
                <i className="pi pi-eye"></i>
                <span>{detail?.views}</span>
              </div>
            </div>
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
              {!isLoading && comments?.length === 0 && (
                <p className="text-center opacity-70 font-medium">
                  Không có bình luận
                </p>
              )}

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

            <Button
              className="flex mx-auto gap-2"
              icon="pi pi-spinner"
              severity="secondary"
              onClick={loadMoreComments}
            >
              Tải thêm bình luận
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostDetail;
