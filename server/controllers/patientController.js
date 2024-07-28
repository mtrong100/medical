import mongoose from "mongoose";
import {
  createPatientService,
  deletePatientService,
  getAppointmentsFromPatientService,
  getMedicalRecordsFromPatientService,
  getPatientCollectionService,
  getPatientDetailService,
  getPatientsService,
  updatePatientService,
} from "../services/patientService.js";

export const getPatientCollection = async (req, res) => {
  try {
    const patients = await getPatientCollectionService();
    return res.status(200).json(patients);
  } catch (error) {
    console.log("Lỗi tại controller getCollection", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const getPatients = async (req, res) => {
  const { page = 1, limit = 10, gender, status } = req.query;

  try {
    const result = await getPatientsService({ page, limit, gender, status });
    return res.status(200).json(result);
  } catch (error) {
    console.log("Lỗi tại controller getPatients", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const getPatientDetail = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "ID không đúng định dạng" });
  }

  try {
    const patientDetail = await getPatientDetailService(id);
    return res.status(200).json(patientDetail);
  } catch (error) {
    console.log("Lỗi tại controller getPatientDetail", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const getMedicalRecordsFromPatient = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "ID không đúng định dạng" });
  }

  try {
    const results = await getMedicalRecordsFromPatientService(id);
    return res.status(200).json(results);
  } catch (error) {
    console.log("Lỗi tại controller getMedicalRecordsFromPatient", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const getAppointmentsFromPatient = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "ID không đúng định dạng" });
  }

  try {
    const results = await getAppointmentsFromPatientService(id);
    return res.status(200).json(results);
  } catch (error) {
    console.log("Lỗi tại controller getAppointmentsFromPatient", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const createPatient = async (req, res) => {
  try {
    const newPatient = await createPatientService(req.body);
    return res.status(201).json(newPatient);
  } catch (error) {
    console.log("Lỗi tại controller createPatient", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const updatePatient = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "ID không đúng định dạng" });
  }

  try {
    const updatedPatient = await updatePatientService(id, req.body);
    return res.status(200).json(updatedPatient);
  } catch (error) {
    console.log("Lỗi tại controller updatePatient", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const deletePatient = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "ID không đúng định dạng" });
  }

  try {
    await deletePatientService(id);
    return res.status(200).json({ message: "Xóa thành công" });
  } catch (error) {
    console.log("Lỗi tại controller deletePatient", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};
