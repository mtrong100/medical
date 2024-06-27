import MedicalRecord from "../models/medicalRecordModel.js";

export const createNewMedicalRecord = async (req, res) => {
  try {
    const newMedicalRecord = new MedicalRecord(req.body);
    await newMedicalRecord.save();
    res.status(201).json(newMedicalRecord);
  } catch (error) {
    console.log("Error in createNewMedicalRecord controller", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const updateMedicalRecord = async (req, res) => {
  const { id } = req.params;
  try {
    const medicalRecord = await MedicalRecord.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(medicalRecord);
  } catch (error) {
    console.log("Error in updateMedicalRecord controller", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteMedicalRecord = async (req, res) => {
  const { id } = req.params;
  try {
    await MedicalRecord.findByIdAndDelete(id);
    res.status(200).json({ message: "Xoa thanh cong" });
  } catch (error) {
    console.log("Error in deleteMedicalRecord controller", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllMedicalRecords = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const skip = (page - 1) * limit;

    const medicalRecords = await MedicalRecord.find()
      .skip(skip)
      .limit(limit)
      .populate([
        {
          path: "patient",
          select: "_id name",
        },
        {
          path: "doctor",
          select: "_id name",
        },
      ])
      .sort({ createdAt: -1 });

    const total = await MedicalRecord.countDocuments();
    const totalPages = Math.ceil(total / limit);

    return res.status(200).json({
      results: medicalRecords,
      totalResults: total,
      totalPages,
      currentPage: parseInt(page),
      limit: parseInt(limit),
    });
  } catch (error) {
    console.log("Error in getAllMedicalRecords controller", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getMedicalRecordDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const medicalRecord = await MedicalRecord.findById(id).populate([
      {
        path: "patient",
        select: "_id name",
      },
      {
        path: "doctor",
        select: "_id name",
      },
    ]);
    res.status(200).json(medicalRecord);
  } catch (error) {
    console.log("Error in getMedicalRecordDetail controller", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
