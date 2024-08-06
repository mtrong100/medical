import mongoose from "mongoose";
import {
  bookingAppointmentService,
  createAppointmentService,
  deleteAppointmentService,
  getAppoinmentCollectionService,
  getAppointmentDetailService,
  getAppointmentsService,
  getAppointmentStatsService,
  updateAppointmentService,
} from "../services/appointmentService.js";

export const getAppoinmentCollection = async (req, res) => {
  try {
    const data = await getAppoinmentCollectionService();
    return res.status(200).json(data);
  } catch (error) {
    console.log("Lỗi tại controller getCollection", error);
    return res.status(500).json({ message: error.message });
  }
};

export const getAppointments = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const result = await getAppointmentsService(page, limit);
    return res.status(200).json(result);
  } catch (error) {
    console.log("Lỗi tại controller getAppointments", error);
    return res.status(500).json({ message: error.message });
  }
};

export const getAppointmentDetail = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await getAppointmentDetailService(id);
    return res.status(200).json(result);
  } catch (error) {
    if (error.message === "Cuộc hẹn không tồn tại") {
      return res.status(404).json({ message: error.message });
    }
    console.log("Lỗi tại controller getAppointmentDetail", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const getAppointmentStats = async (req, res) => {
  try {
    const stats = await getAppointmentStatsService();
    return res.status(200).json(stats);
  } catch (error) {
    console.log("Lỗi tại controller getAppointmentStats", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const bookingAppointment = async (req, res) => {
  const {
    doctor: doctorId,
    date,
    time,
    email,
    gender,
    phoneNumber,
    address,
    dateOfBirth,
  } = req.body;

  try {
    const newAppointment = await bookingAppointmentService({
      doctorId,
      date,
      time,
      email,
      gender,
      phoneNumber,
      address,
      dateOfBirth,
    });

    return res.status(201).json(newAppointment);
  } catch (error) {
    console.log("Lỗi tại controller bookingAppointment", error);
    return res.status(500).json({ message: error.message });
  }
};

export const createAppointment = async (req, res) => {
  const { doctor: doctorId, date, time, patient: patientId } = req.body;

  try {
    const newAppointment = await createAppointmentService({
      doctorId,
      date,
      time,
      patientId,
    });

    return res.status(201).json(newAppointment);
  } catch (error) {
    console.log("Lỗi tại controller createAppointment", error);
    return res.status(500).json({ message: error.message });
  }
};

export const updateAppointment = async (req, res) => {
  const { id } = req.params;
  const { doctor: doctorId, patient: patientId, date, time, status } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "ID không đúng định dạng" });
  }

  try {
    const updatedAppointment = await updateAppointmentService({
      id,
      doctorId,
      patientId,
      date,
      time,
      status,
    });

    return res.status(200).json(updatedAppointment);
  } catch (error) {
    console.log("Lỗi tại controller updateAppointment", error);
    return res.status(500).json({ message: error.message });
  }
};

export const deleteAppointment = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "ID không đúng định dạng" });
  }

  try {
    await deleteAppointmentService(id);
    return res.status(200).json({ message: "Xóa cuộc hẹn hoàn tất" });
  } catch (error) {
    console.log("Lỗi tại controller deleteAppointment", error);
    return res.status(500).json({ message: error.message });
  }
};
