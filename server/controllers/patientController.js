import Patient from "../models/patientModel.js";

export const createNewPatient = async (res, req) => {
  try {
    const newPatient = new Patient(req.body);
    await newPatient.save();
    res.status(200).json(newPatient);
  } catch (error) {
    console.log("Error in createNewPatient controller", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const updatePatient = async (req, res) => {
  const { id } = req.params;
  try {
    const patient = await Patient.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(patient);
  } catch (error) {
    console.log("Error in updatePatient controller", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deletePatient = async (req, res) => {
  const { id } = req.params;
  try {
    const patient = await Patient.findByIdAndDelete(id);
    res.status(200).json(patient);
  } catch (error) {
    console.log("Error in deletePatient controller", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllPatients = async (req, res) => {
  try {
    const { page = 1, limit = 10, gender } = req.query;

    const filter = {};

    if (gender) {
      filter.gender = gender;
    }

    const skip = (page - 1) * limit;

    const patients = await Patient.find(filter)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Patient.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    return res.status(200).json({
      results: patients,
      totalResults: total,
      totalPages,
      currentPage: parseInt(page),
      limit: parseInt(limit),
    });
  } catch (error) {
    console.log("Error in getAllPatients controller", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
