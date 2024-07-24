import Device from "../models/deviceModel.js";

export const getDevices = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const skip = (page - 1) * limit;
    const total = await Device.countDocuments();
    const totalPages = Math.ceil(total / limit);

    const data = await Device.find()
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    return res.status(200).json({
      results: data,
      totalResults: total,
      totalPages,
      currentPage: parseInt(page),
      limit: parseInt(limit),
    });
  } catch (error) {
    console.log("Lỗi tại controller getDevices", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const getDeviceDetail = async (req, res) => {
  const { id } = req.params;

  try {
    const device = await Device.findById(id);
    return res.status(200).json(device);
  } catch (error) {
    console.log("Lỗi tại controller getDeviceDetail", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const createDevice = async (req, res) => {
  try {
    const newDevice = new Device(req.body);
    await newDevice.save();
    return res.status(200).json(newDevice);
  } catch (error) {
    console.log("Lỗi tại controller createDevice", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const updateDevice = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedDevice = await Device.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    return res.status(200).json(updatedDevice);
  } catch (error) {
    console.log("Lỗi tại controller updateDevice", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const deleteDevice = async (req, res) => {
  const { id } = req.params;

  try {
    await Device.findByIdAndDelete(id);
    return res.status(200).json({ message: "Xóa này" });
  } catch (error) {
    console.log("Lỗi tại controller deleteDevice", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const getDeviceCollection = async (req, res) => {
  try {
    const devices = await Device.find();
    return res.status(200).json(devices);
  } catch (error) {
    console.log("Lỗi tại controller getDeviceCollection", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};
