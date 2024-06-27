import MedicalService from "../models/medicalServiceModel.js";

export const createNewService = async (res, req) => {
  try {
    const newService = new MedicalService(req.body);
    await newService.save();
    return res.status(200).json(newService);
  } catch (error) {
    console.log("Error in createNewService controller", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const updateService = async (req, res) => {
  const { id } = req.params;
  try {
    const service = await MedicalService.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(service);
  } catch (error) {
    console.log("Error in updateService controller", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteService = async (req, res) => {
  const { id } = req.params;
  try {
    await MedicalService.findByIdAndDelete(id);
    res.status(200).json({ message: "Xóa hoàn tất" });
  } catch (error) {
    console.log("Error in deleteService controller", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllServices = async (req, res) => {
  try {
    const services = await MedicalService.find();
    res.status(200).json(services);
  } catch (error) {
    console.log("Error in getAllServices controller", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
