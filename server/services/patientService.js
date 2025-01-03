import Appointment from "../models/appointmentModel.js";
import MedicalRecord from "../models/medicalRecordModel.js";
import Patient from "../models/patientModel.js";
import { MONTH_NAMES } from "../utils/constanst.js";

export const getPatientCollectionService = async () => {
  try {
    const patients = await Patient.find();

    if (!patients || patients.length === 0) {
      throw new Error("Không tìm thấy collection bệnh nhân");
    }

    return patients;
  } catch (error) {
    console.log("Lỗi tại service getPatientCollectionService", error);
    throw new Error(error.message);
  }
};

export const getPatientsService = async ({ page, limit, gender }) => {
  try {
    const filter = {};

    if (gender) {
      filter.gender = gender;
    }

    const skip = (page - 1) * limit;
    const total = await Patient.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    const patients = await Patient.find(filter)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    return {
      results: patients,
      totalResults: total,
      totalPages,
      currentPage: parseInt(page),
      limit: parseInt(limit),
    };
  } catch (error) {
    console.log("Lỗi tại service getPatientsService", error);
    throw new Error(error.message);
  }
};

export const getPatientStatsService = async () => {
  try {
    const stats = await Patient.aggregate([
      {
        $group: {
          _id: "$gender",
          count: { $sum: 1 },
        },
      },
    ]);

    const patientsByMonth = await Patient.aggregate([
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

    const patientsCountByMonth = new Array(12).fill(0);
    patientsByMonth.forEach((p) => {
      patientsCountByMonth[p._id.month - 1] = p.count;
    });

    const genders = stats.map((stat) => stat._id);
    const counts = stats.map((stat) => stat.count);

    return { genders, counts, months: MONTH_NAMES, patientsCountByMonth };
  } catch (error) {
    console.log("Lỗi tại service getPatientStats", error);
    throw new Error(error.message);
  }
};
export const createPatientService = async (data) => {
  try {
    const newPatient = new Patient(data);
    await newPatient.save();
    return newPatient;
  } catch (error) {
    console.log("Lỗi tại service createPatientService", error);
    throw new Error(error.message);
  }
};

export const updatePatientService = async (id, data) => {
  try {
    const updatedPatient = await Patient.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!updatedPatient) {
      throw new Error("Không tìm thấy bệnh nhân");
    }

    return updatedPatient;
  } catch (error) {
    console.log("Lỗi tại service updatePatientService", error);
    throw new Error(error.message);
  }
};

export const deletePatientService = async (id) => {
  try {
    const deletedPatient = await Patient.findByIdAndDelete(id);

    if (!deletedPatient) {
      throw new Error("Không tìm thấy bệnh nhân");
    }

    return deletedPatient;
  } catch (error) {
    console.log("Lỗi tại service deletePatientService", error);
    throw new Error(error.message);
  }
};

export const getPatientDetailService = async (id) => {
  try {
    const patient = await Patient.findById(id);

    if (!patient) {
      throw new Error("Không tìm thấy bệnh nhân");
    }

    return patient;
  } catch (error) {
    console.log("Lỗi tại service getPatientDetailService", error);
    throw new Error(error.message);
  }
};

export const getMedicalRecordsFromPatientService = async (patientId) => {
  try {
    const patient = await Patient.findById(patientId);

    if (!patient) {
      throw new Error("Không tìm thấy bệnh nhân");
    }

    const medicalRecords = await MedicalRecord.find({
      patient: patientId,
    }).populate([
      {
        path: "patient",
        select: "_id name",
      },
      {
        path: "doctor",
        select: "_id name",
      },
    ]);

    const results = medicalRecords.map((item) => {
      return {
        _id: item._id,
        patient: item.patient.name,
        doctor: item.doctor.name,
        diagnosis: item.diagnosis,
        createdAt: item.createdAt,
      };
    });

    return results;
  } catch (error) {
    console.log("Lỗi tại service getMedicalRecordsFromPatientService", error);
    throw new Error("Lỗi server");
  }
};

export const getAppointmentsFromPatientService = async (patientId) => {
  try {
    const patient = await Patient.findById(patientId);
    if (!patient) {
      throw new Error("Không tìm thấy bệnh nhân");
    }

    const appointments = await Appointment.find({
      patient: patientId,
    }).populate([
      {
        path: "patient",
        select: "_id name",
      },
      {
        path: "doctor",
        select: "_id name",
      },
    ]);

    const results = appointments.map((item) => {
      return {
        _id: item._id,
        patient: item.patient.name,
        doctor: item.doctor.name,
        date: item.date,
        time: item.time,
        status: item.status,
        createdAt: item.createdAt,
      };
    });

    return results;
  } catch (error) {
    console.log("Lỗi tại service getAppointmentsFromPatientService", error);
    throw new Error("Lỗi server");
  }
};
