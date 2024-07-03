import React from "react";

const FileInput = ({ onUpload, isUploading }) => {
  return (
    <div className="flex items-center justify-center py-4">
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        className={`${
          isUploading ? "cursor-not-allowed" : "cursor-pointer"
        } sr-only`}
        onChange={onUpload}
        disabled={isUploading}
      />

      <label
        htmlFor="fileInput"
        className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {isUploading ? "Đang tải lên..." : "Chọn tệp"}
      </label>
    </div>
  );
};

export default FileInput;
