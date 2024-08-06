import Employee from "../models/employeeModel.js";
import MedicalRecord from "../models/medicalRecordModel.js";
import { EMPLOYEE_ROLE, MONTH_NAMES } from "../utils/constanst.js";

export const getMedicalRecordsService = async (page, limit) => {
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

    const formattedResults = medicalRecords.map((medicalRecord) => ({
      _id: medicalRecord._id,
      patient: medicalRecord.patient.name,
      doctor: medicalRecord.doctor.name,
      diagnosis: medicalRecord.diagnosis,
      treatment: medicalRecord.treatment,
      notes: medicalRecord.notes,
      createdAt: medicalRecord.createdAt,
    }));

    return {
      results: formattedResults,
      totalResults: total,
      totalPages,
    };
  } catch (error) {
    console.log("Lỗi tại service getMedicalRecordsService", error);
    throw new Error("Lỗi server");
  }
};

export const getMedicalRecordDetailService = async (id) => {
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

    if (!medicalRecord) {
      throw new Error("Không tìm thấy hồ sơ bệnh án");
    }

    return {
      _id: medicalRecord._id,
      patient: medicalRecord.patient._id,
      doctor: medicalRecord.doctor._id,
      diagnosis: medicalRecord.diagnosis,
      treatment: medicalRecord.treatment,
      notes: medicalRecord.notes,
      createdAt: medicalRecord.createdAt,
    };
  } catch (error) {
    console.log("Lỗi tại service getMedicalRecordDetailService", error);
    throw new Error(error.message);
  }
};

export const getMedicalRecordStatsService = async () => {
  try {
    const doctors = await Employee.find({ role: EMPLOYEE_ROLE.DOCTOR });
    const doctorNames = doctors.map((doctor) => doctor.name);

    const recordCount = [];

    for (const doc of doctors) {
      const recordCountByDoctor = await MedicalRecord.countDocuments({
        doctor: doc._id,
      });

      recordCount.push(recordCountByDoctor);
    }

    const recordsByMonth = await MedicalRecord.aggregate([
      {
        $group: {
          _id: { month: { $month: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.month": 1 },
      },
    ]);

    const recordCountbyMonth = new Array(12).fill(0);
    recordsByMonth.forEach((r) => {
      recordCountbyMonth[r._id.month - 1] = r.count;
    });

    const results = {
      months: MONTH_NAMES,
      recordCountbyMonth,
      doctors: doctorNames,
      recordCountByDoctor: recordCount,
    };

    return results;
  } catch (error) {
    console.log("Lỗi tại service getMedicalRecordStatsService", error);
    throw new Error("Lỗi server");
  }
};

export const createMedicalRecordService = async (data) => {
  try {
    const medicalRecord = new MedicalRecord(data);
    await medicalRecord.save();
    return medicalRecord;
  } catch (error) {
    console.log("Lỗi tại service createMedicalRecordService", error);
    throw new Error("Lỗi server");
  }
};

export const updateMedicalRecordService = async (id, data) => {
  try {
    const medicalRecord = await MedicalRecord.findByIdAndUpdate(id, data);

    if (!medicalRecord) {
      throw new Error("Không tìm thấy hồ sơ bệnh án");
    }

    return medicalRecord;
  } catch (error) {
    console.log("Lỗi tại service updateMedicalRecordService", error);
    throw new Error("Lỗi server");
  }
};

export const deleteMedicalRecordService = async (id) => {
  try {
    const medicalRecord = await MedicalRecord.findByIdAndDelete(id);
    if (!medicalRecord) {
      throw new Error("Không tìm thấy hồ sơ bệnh án");
    }
  } catch (error) {
    console.log("Lỗi tại service deleteMedicalRecordService", error);
    throw new Error("Lỗi server");
  }
};
