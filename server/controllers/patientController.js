import Patient from "../models/patientModel.js";
import MedicalRecord from "../models/medicalRecordModel.js";
import bcrypt from "bcrypt";
import Appointment from "../models/appointmentModel.js";

export const createPatient = async (req, res) => {
  try {
    const newPatient = new Patient(req.body);
    await newPatient.save();
    return res.status(201).json(newPatient);
  } catch (error) {
    console.log("Lỗi tại controller createPatient", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const updatePatient = async (req, res) => {
  const { id } = req.params;
  const { password, confirmPassword, ...data } = req.body;

  try {
    // Check case if update password
    if (password && confirmPassword) {
      const account = await Patient.findById(id);

      if (!account) {
        return res.status(404).json({ message: "Không tìm thấy tài khoản" });
      }

      if (password !== confirmPassword) {
        return res.status(400).json({ message: "Mật khẩu không trùng khớp" });
      }

      const hashedPassword = bcrypt.hashSync(password, 10);
      account.password = hashedPassword;

      await account.save();

      return res.status(200).json({ message: "Cập nhật mật khẩu thành công" });
    }

    const updatedPatient = await Patient.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    );

    return res.status(200).json(updatedPatient);
  } catch (error) {
    console.log("Lỗi tại controller updatePatient", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const deletePatient = async (req, res) => {
  const { id } = req.params;

  try {
    await Patient.findByIdAndDelete(id);
    return res.status(200).json({ message: "Xóa thành công" });
  } catch (error) {
    console.log("Lỗi tại controller deletePatient", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const getPatients = async (req, res) => {
  const { page = 1, limit = 10, gender, status } = req.query;

  try {
    const filter = {};

    if (gender) {
      filter.gender = gender;
    }

    if (status) {
      filter.status = status;
    }

    const skip = (page - 1) * limit;
    const total = await Patient.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    const patients = await Patient.find(filter)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    return res.status(200).json({
      results: patients,
      totalResults: total,
      totalPages,
      currentPage: parseInt(page),
      limit: parseInt(limit),
    });
  } catch (error) {
    console.log("Lỗi tại controller getPatients", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const getPatientDetail = async (req, res) => {
  const { id } = req.params;

  try {
    const patient = await Patient.findById(id);
    return res.status(200).json(patient);
  } catch (error) {
    console.log("Lỗi tại controller getPatientDetail", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const getMedicalRecordsFromPatient = async (req, res) => {
  const { id } = req.params;

  try {
    const patient = await Patient.findById(id);

    if (!patient) {
      return res.status(404).json({ message: "Không tìm thấy bệnh nhân" });
    }

    const medicalRecords = await MedicalRecord.find({
      patient: id,
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

    return res.status(200).json(results);
  } catch (error) {
    console.log("Lỗi tại controller getMedicalRecordsFromPatient", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const getAppointmentsFromPatient = async (req, res) => {
  const { id } = req.params;

  try {
    const patient = await Patient.findById(id);
    if (!patient) {
      return res.status(404).json({ message: "Không tìm thấy bệnh nhân" });
    }

    const appointments = await Appointment.find({
      patient: id,
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

    return res.status(200).json(results);
  } catch (error) {
    console.log("Lỗi tại controller getAppointmentsFromPatient", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const getCollection = async (req, res) => {
  try {
    const patients = await Patient.find();
    return res.status(200).json(patients);
  } catch (error) {
    console.log("Lỗi tại controller getCollection", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};
