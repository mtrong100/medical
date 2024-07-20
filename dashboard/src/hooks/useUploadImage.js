import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";
import toast from "react-hot-toast";

export default function useUploadImage() {
  const [image, setImage] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const onUpload = async (event) => {
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

      if (downloadURL) setImage(downloadURL);
    } catch (error) {
      console.log("Lỗi tải lên hình ảnh: ", error);
      toast.error("Lỗi tải lên hình ảnh");
    } finally {
      setIsUploading(false);
    }
  };

  return {
    image,
    onUpload,
    isUploading,
  };
}
