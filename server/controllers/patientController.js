import Patient from "../models/patientModel.js";
import bcrypt from "bcrypt";
import { generateTokenAndSetCookie } from "../utils/helper.js";
import { PATIENT_STATUS } from "../utils/constanst.js";
import MedicalRecord from "../models/medicalRecordModel.js";
import Appointment from "../models/appointmentModel.js";

export const patientLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const account = await Patient.findOne({ email });

    if (account.status === PATIENT_STATUS.ISLOCKED) {
      return res.status(400).json({ error: "Tài khoản đã bị khóa" });
    }

    if (!account) {
      return res.status(400).json({ error: "Không tìm thấy tài khoản" });
    }

    const validPassword = bcrypt.compareSync(password, account.password);

    if (!validPassword) {
      return res.status(400).json({ error: "Sai mật khẩu" });
    }

    const payload = { userId: account._id };

    generateTokenAndSetCookie(payload, res);

    return res.status(200).json(account);
  } catch (error) {
    console.log("Error in patientLogin controller", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const createNewPatient = async (req, res) => {
  try {
    const newPatient = new Patient(req.body);
    await newPatient.save();
    return res.status(201).json(newPatient);
  } catch (error) {
    console.log("Error in createNewPatient controller", error);
    return res.status(500).json({ error: "Internal server error" });
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
        return res.status(404).json({ error: "Không tìm thấy tài khoản" });
      }

      if (password !== confirmPassword) {
        return res.status(400).json({ error: "Mật khẩu không trùng khớp" });
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

    res.status(200).json(updatedPatient);
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

export const getPatientDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const patient = await Patient.findById(id);
    res.status(200).json(patient);
  } catch (error) {
    console.log("Error in getPatientDetail controller", error);
    return res.status(500).json({ error: "Internal server error" });
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

    return res.status(200).json(medicalRecords);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
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

    return res.status(200).json(appointments);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
