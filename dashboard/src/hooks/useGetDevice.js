import { useState } from "react";
import toast from "react-hot-toast";
import { getDevicesCollectionApi } from "../api/deviceApi";

export default function useGetDevice() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);

    try {
      const res = await getDevicesCollectionApi();

      if (res) {
        setData(res);
      }
    } catch (error) {
      console.log("Lỗi fetch data device: ", error);
      toast.error("Lỗi fetch data device");
    } finally {
      setLoading(false);
    }
  };

  return {
    devices: data,
    loading,
    fetchDevice: fetchData,
  };
}
