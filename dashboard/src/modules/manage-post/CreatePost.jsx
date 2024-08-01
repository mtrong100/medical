import React from "react";
import useCreatePost from "./useCreatePost";
import { useNavigate } from "react-router-dom";
import TitleSection from "../../components/TitleSection";
import { InputText } from "primereact/inputtext";
import { Editor } from "primereact/editor";
import { Dropdown } from "primereact/dropdown";
import { POST_CATGORIES } from "../../utils/constants";
import { useSelector } from "react-redux";
import { Button } from "primereact/button";

const CreatePost = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { isLoading, form, setForm, onCreate } = useCreatePost();

  return (
    <div>
      <TitleSection>Đăng bài viết mới</TitleSection>

      <div className="mt-5">
        <div className="grid grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="content">Nội dung</label>
            <Editor
              value={form.content}
              onTextChange={(e) =>
                setForm((prev) => ({ ...prev, content: e.htmlValue }))
              }
            />
          </div>

          <section className="space-y-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="title">Tiêu đề</label>
              <InputText
                id="title"
                placeholder="Nhập tiêu đề"
                value={form.title}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, title: e.target.value }))
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <label id="category">Danh mục</label>
              <Dropdown
                options={POST_CATGORIES}
                placeholder="Chọn danh mục"
                className="w-full "
                scrollHeight="300px"
                value={form.category}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, category: e.value }))
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="title">Link hình ảnh</label>
              <InputText
                id="title"
                placeholder="Nhập link hình ảnh"
                value={form.image}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, image: e.target.value }))
                }
              />

              {form.image && (
                <img
                  src={form.image}
                  alt=""
                  className="w-full h-[300px] object-contain"
                />
              )}
            </div>

            <div className="flex items-center justify-end gap-3">
              <Button
                type="button"
                onClick={() => navigate("/post")}
                label="Quay về"
                severity="secondary"
                icon="pi pi-arrow-left"
              />

              <Button
                type="button"
                label="Đăng bài viết"
                disabled={isLoading}
                onClick={() => onCreate(currentUser._id)}
                icon="pi pi-check-circle"
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
