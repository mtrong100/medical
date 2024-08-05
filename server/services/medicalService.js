import MedicalService from "../models/medicalServiceModel.js";

export const getMedicalServicesService = async (page, limit) => {
  try {
    const skip = (page - 1) * limit;
    const total = await MedicalService.countDocuments();
    const totalPages = Math.ceil(total / limit);

    const services = await MedicalService.find()
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    return {
      results: services,
      totalResults: total,
      totalPages,
      currentPage: parseInt(page),
      limit: parseInt(limit),
    };
  } catch (error) {
    console.log("Lỗi tại service getMedicalServicesService", error);
    throw new Error(error.message);
  }
};

export const getMedicalServiceStatsService = async () => {
  try {
    const services = await MedicalService.find();

    const sericeNames = services.map((service) => service.name);
    const servicePrices = services.map((service) => service.price);

    return { sericeNames, servicePrices };
  } catch (error) {
    console.log("Lỗi tại service getMedicalServiceStatsService", error);
    throw new Error(error.message);
  }
};

export const createMedicalServiceSerivce = async (body) => {
  try {
    const newService = new MedicalService(body);
    await newService.save();
    return newService;
  } catch (error) {
    console.log("Lỗi tại service createMedicalService", error);
    throw new Error(error.message);
  }
};

export const updateMedicalServiceService = async (id, body) => {
  try {
    const service = await MedicalService.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!service) {
      throw new Error("Không tìm thấy dịch vụ");
    }

    return service;
  } catch (error) {
    console.log("Lỗi tại service updateMedicalService", error);
    throw new Error(error.message);
  }
};

export const deleteMedicalServiceService = async (id) => {
  try {
    const service = await MedicalService.findByIdAndDelete(id);
    if (!service) {
      throw new Error("Không tìm thấy dịch vụ");
    }
  } catch (error) {
    console.log("Lỗi tại service deleteMedicalService", error);
    throw new Error(error.message);
  }
};
