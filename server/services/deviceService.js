import Device from "../models/deviceModel.js";

export const getDeviceCollectionService = async () => {
  try {
    const devices = await Device.find();

    if (!devices || devices.length === 0) {
      throw new Error("Không tìm thấy collection thiết bị");
    }

    return devices;
  } catch (error) {
    console.log("Lỗi tại service getDeviceCollectionService", error);
    throw new Error(error.message);
  }
};

export const getDevicesService = async (page, limit) => {
  try {
    const skip = (page - 1) * limit;
    const total = await Device.countDocuments();
    const totalPages = Math.ceil(total / limit);

    const data = await Device.find()
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    return {
      results: data,
      totalResults: total,
      totalPages,
      currentPage: parseInt(page),
      limit: parseInt(limit),
    };
  } catch (error) {
    console.log("Lỗi tại service getDevicesService", error);
    throw new Error("Lỗi server");
  }
};

export const getDeviceDetailService = async (id) => {
  try {
    const device = await Device.findById(id);
    if (!device) {
      throw new Error("Không tìm thấy thiết bị");
    }
    return device;
  } catch (error) {
    console.log("Lỗi tại service getDeviceDetailService", error);
    throw new Error(error.message);
  }
};

export const createDeviceService = async (data) => {
  try {
    const newDevice = new Device(data);
    await newDevice.save();
    return newDevice;
  } catch (error) {
    console.log("Lỗi tại service createDeviceService", error);
    throw new Error(error.message);
  }
};

export const updateDeviceService = async (id, data) => {
  try {
    const updatedDevice = await Device.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!updatedDevice) {
      throw new Error("Không tìm thấy thiết bị");
    }

    return updatedDevice;
  } catch (error) {
    console.log("Lỗi tại service updateDeviceService", error);
    throw new Error(error.message);
  }
};

export const deleteDeviceService = async (id) => {
  try {
    const deletedDevice = await Device.findByIdAndDelete(id);
    if (!deletedDevice) {
      throw new Error("Không tìm thấy thiết bị");
    }
  } catch (error) {
    console.log("Lỗi tại service deleteDeviceService", error);
    throw new Error(error.message);
  }
};
