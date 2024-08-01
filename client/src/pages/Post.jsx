import React from "react";
import TitleSection from "../components/TitleSection";
import useGetPosts from "../hooks/useGetPosts";
import PostCard from "../components/PostCard";
import { LIMIT_AMOUNT, POST_CATGORIES } from "../utils/constants";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";

const Post = () => {
  const {
    data,
    query,
    setQuery,
    paginator,
    onPrevPage,
    onNextPage,
    setSelectedCategory,
    selectedCategory,
  } = useGetPosts();

  return (
    <section className="mt-10 mb-20">
      <div className="page-container">
        <TitleSection>Những bài viết mới nhất</TitleSection>

        <div className="flex items-center justify-between mt-8">
          <div className="p-inputgroup max-w-md">
            <InputText
              placeholder="Tìm kiếm"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button icon="pi pi-search" />
          </div>

          <Dropdown
            options={POST_CATGORIES}
            placeholder="Chọn danh mục"
            scrollHeight="300px"
            className="max-w-xs w-full"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.value)}
          />
        </div>

        <div className="grid grid-cols-3 gap-5 mt-8">
          {data?.map((item) => (
            <PostCard key={item._id} data={item} />
          ))}
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
      </div>
    </section>
  );
};

export default Post;
