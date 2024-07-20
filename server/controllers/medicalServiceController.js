import MedicalService from "../models/medicalServiceModel.js";

export const createMedicalService = async (req, res) => {
  try {
    const newService = new MedicalService(req.body);
    await newService.save();
    return res.status(200).json(newService);
  } catch (error) {
    console.log("Lỗi tại controller createMedicalService", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const updateMedicalService = async (req, res) => {
  const { id } = req.params;
  try {
    const service = await MedicalService.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(service);
  } catch (error) {
    console.log("Lỗi tại controller updateMedicalService", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const deleteMedicalService = async (req, res) => {
  const { id } = req.params;
  try {
    await MedicalService.findByIdAndDelete(id);
    return res.status(200).json({ message: "Xóa hoàn tất" });
  } catch (error) {
    console.log("Lỗi tại controller updateMedicalService", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const getMedicalServices = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const skip = (page - 1) * limit;
    const total = await MedicalService.countDocuments();
    const totalPages = Math.ceil(total / limit);

    const services = await MedicalService.find()
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    return res.status(200).json({
      results: services,
      totalResults: total,
      totalPages,
      currentPage: parseInt(page),
      limit: parseInt(limit),
    });
  } catch (error) {
    console.log("Lỗi tại controller getMedicalServices", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};
