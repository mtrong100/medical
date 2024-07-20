import toast from "react-hot-toast";
import { useState } from "react";
import { updateEmployeeApi } from "../../api/employeeApi";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

export default function useUpdateAvatar(onReload) {
  const [isUploading, setIsUploading] = useState(false);

  const onUpload = async (event, id) => {
    setIsUploading(true);

    const file = event.target.files[0];

    if (!file) {
      setIsUploading(false);
      return;
    }

    const storage = getStorage();

    try {
      const storageRef = ref(storage, "pictures/" + file.name + Date.now());
      const uploadTask = uploadBytesResumable(storageRef, file);

      const snapshot = await uploadTask;
      const downloadURL = await getDownloadURL(snapshot.ref);

      if (downloadURL) {
        await updateEmployeeApi(id, { avatar: downloadURL });
        toast.success("Cập nhật hình ảnh hoàn tất");
      }
    } catch (error) {
      console.log("Lỗi tải lên hình ảnh: ", error);
      toast.error("Lỗi tải lên hình ảnh");
    } finally {
      setIsUploading(false);
      onReload();
    }
  };

  return {
    isUploading,
    onUpload,
  };
}
