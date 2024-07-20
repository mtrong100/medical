import MedicalRecord from "../models/medicalRecordModel.js";

export const createMedicalRecord = async (req, res) => {
  try {
    const newMedicalRecord = new MedicalRecord(req.body);
    await newMedicalRecord.save();
    return res.status(201).json(newMedicalRecord);
  } catch (error) {
    console.log("Lỗi tại controller createMedicalRecord", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const updateMedicalRecord = async (req, res) => {
  const { id } = req.params;

  try {
    const medicalRecord = await MedicalRecord.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json(medicalRecord);
  } catch (error) {
    console.log("Lỗi tại controller updateMedicalRecord", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const deleteMedicalRecord = async (req, res) => {
  const { id } = req.params;

  try {
    await MedicalRecord.findByIdAndDelete(id);
    return res.status(200).json({ message: "Xóa hoàn tất" });
  } catch (error) {
    console.log("Lỗi tại controller deleteMedicalRecord", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const getMedicalRecords = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const skip = (page - 1) * limit;
    const total = await MedicalRecord.countDocuments();
    const totalPages = Math.ceil(total / limit);

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

    const formattedResults = medicalRecords.map((medicalRecord) => {
      return {
        _id: medicalRecord._id,
        patient: medicalRecord.patient.name,
        doctor: medicalRecord.doctor.name,
        diagnosis: medicalRecord.diagnosis,
        treatment: medicalRecord.treatment,
        notes: medicalRecord.notes,
        createdAt: medicalRecord.createdAt,
      };
    });

    return res.status(200).json({
      results: formattedResults,
      totalResults: total,
      totalPages,
      currentPage: parseInt(page),
      limit: parseInt(limit),
    });
  } catch (error) {
    console.log("Lỗi tại controller getMedicalRecords", error);
    return res.status(500).json({ message: "Lỗi server" });
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

    const formattedResults = {
      _id: medicalRecord._id,
      patient: medicalRecord.patient._id,
      doctor: medicalRecord.doctor._id,
      diagnosis: medicalRecord.diagnosis,
      treatment: medicalRecord.treatment,
      notes: medicalRecord.notes,
      createdAt: medicalRecord.createdAt,
    };

    return res.status(200).json(formattedResults);
  } catch (error) {
    console.log("Lỗi tại controller getMedicalRecordDetail", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};
