import { useState } from "react";
import toast from "react-hot-toast";
import { createInventoryApi } from "../../api/inventoryApi";

export default function useCreateInventoryDevice() {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const [form, setForm] = useState({
    supplier: null,
    total: 0,
    itemType: "Device",
  });

  const onCreate = async () => {
    setLoading(true);

    const total = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    const formatItems = items.map((item) => ({
      device: item._id,
      quantity: item.quantity,
    }));

    try {
      const body = {
        supplier: form.supplier,
        total: total.toFixed(2),
        itemType: form.itemType,
        items: formatItems,
      };

      const res = await createInventoryApi(body);

      if (res) toast.success("Thao tác hoàn tất");
    } catch (error) {
      console.log("Lỗi thao tác:", error);
      toast.error("Lỗi thao tác");
    } finally {
      setLoading(false);
      setItems([]);
      setQuantity(1);
      setSelectedItem(null);
      setForm({
        supplier: null,
        total: 0,
        itemType: "Device",
      });
    }
  };

  const onAddNew = () => {
    if (!selectedItem) {
      toast.error("Vui lòng thiết bị cần nhập thêm");
      return;
    }

    const newItem = {
      _id: selectedItem?._id,
      name: selectedItem?.name,
      price: selectedItem?.price,
      category: selectedItem?.category,
      quantity,
    };

    const isExisted = items.find((d) => d._id === newItem._id);

    if (isExisted) {
      toast.error("Thiết bị đã tồn tại trong bảng rồi!");
      return;
    } else {
      setItems([...items, newItem]);
      setSelectedItem(null);
    }
  };

  const onDelete = (id) => {
    setItems(items.filter((d) => d._id !== id));
  };

  const onIncreaseQuantity = (id) => {
    const index = items.findIndex((d) => d._id === id);
    if (index !== -1) {
      items[index].quantity += 1;
      setItems([...items]);
    }
  };

  const onDecreaseQuantity = (id) => {
    const index = items.findIndex((d) => d._id === id);
    if (index !== -1 && items[index].quantity > 1) {
      items[index].quantity -= 1;
      setItems([...items]);
    }
  };

  return {
    items,
    quantity,
    form,
    setForm,
    setQuantity,
    setItems,
    setSelectedItem,
    selectedItem,
    onAddNew,
    onDelete,
    onIncreaseQuantity,
    onDecreaseQuantity,
    onCreate,
    loading,
  };
}
