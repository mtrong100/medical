import Appointment from "../models/appointmentModel.js";
import Employee from "../models/employeeModel.js";
import Patient from "../models/patientModel.js";
import User from "../models/userModel.js";
import { APPOINTMENT_STATUS } from "../utils/constanst.js";
import {
  sendAppointmentCancellation,
  sendAppointmentConfirmation,
  sendAppointmentUpdate,
} from "../utils/mail.js";

export const bookingNewAppointment = async (req, res) => {
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
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Không tìm thấy thông tin người dùng" });
    }

    const doctor = await Employee.findById(doctorId);
    if (!doctor) {
      return res
        .status(400)
        .json({ message: "Không tìm thấy thông tin bác sĩ" });
    }

    let patient = await Patient.findById(user._id);
    if (!patient) {
      const newPatient = new Patient({
        _id: user._id,
        name: user.name,
        avatar: user.avatar,
        email: user.email,
        phoneNumber,
        address,
        gender,
        dateOfBirth,
      });

      patient = await newPatient.save();
    }
    const existingAppointment = await Appointment.findOne({
      doctor: doctorId,
      date,
      time,
    });
    if (existingAppointment) {
      return res.status(400).json({ message: "Trùng lịch khám" });
    }

    const newAppointment = new Appointment({
      patient: user._id,
      doctor: doctor._id,
      date,
      time,
    });

    await newAppointment.save();

    const appointmentDetails = {
      patientEmail: patient.email,
      patientName: patient.name,
      doctorName: doctor.name,
      date,
      time,
    };

    sendAppointmentConfirmation(appointmentDetails);

    return res.status(201).json(newAppointment);
  } catch (error) {
    console.log("Error in createNewAppointment controller", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const createNewAppointment = async (req, res) => {
  const { doctor: doctorId, date, time, patient: patientId } = req.body;

  try {
    // Kiểm tra xem có cuộc hẹn nào cùng bác sĩ, ngày và giờ không
    const existingAppointment = await Appointment.findOne({
      doctor: doctorId,
      date,
      time,
    });

    if (existingAppointment) {
      return res.status(400).json({ message: "Trùng lịch khám" });
    }

    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res
        .status(400)
        .json({ message: "Không tìm thấy thông tin bệnh nhân" });
    }

    const doctor = await Employee.findById(doctorId);
    if (!doctor) {
      return res
        .status(400)
        .json({ message: "Không tìm thấy thông tin bác sĩ" });
    }

    const newAppointment = new Appointment(req.body);
    await newAppointment.save();

    const appointmentDetails = {
      patientEmail: patient.email,
      patientName: patient.name,
      doctorName: doctor.name,
      date,
      time,
    };

    sendAppointmentConfirmation(appointmentDetails);

    return res.status(201).json(newAppointment);
  } catch (error) {
    console.log("Error in createNewAppointment controller", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateAppointment = async (req, res) => {
  const { id } = req.params;
  const { doctor: doctorId, patient: patientId, date, time, status } = req.body;

  try {
    const existingAppointment = await Appointment.findById(id);

    if (!existingAppointment) {
      return res.status(404).json({ message: "Cuộc hẹn không tồn tại" });
    }

    if (doctorId && date && time) {
      const conflictingAppointment = await Appointment.findOne({
        doctor: doctorId,
        date,
        time,
        _id: { $ne: id },
      });

      if (conflictingAppointment) {
        return res.status(400).json({ message: "Trùng lịch khám" });
      }
    }

    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res
        .status(400)
        .json({ message: "Không tìm thấy thông tin bệnh nhân" });
    }

    const doctor = await Employee.findById(doctorId);
    if (!doctor) {
      return res
        .status(400)
        .json({ message: "Không tìm thấy thông tin bác sĩ" });
    }

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updatedAppointment) {
      return res.status(404).json({ message: "Cuộc hẹn không tồn tại" });
    }

    const appointmentDetails = {
      patientEmail: patient.email,
      patientName: patient.name,
      doctorName: doctor.name,
      date: updatedAppointment.date,
      time: updatedAppointment.time,
    };

    if (status === APPOINTMENT_STATUS.CANCELLED) {
      sendAppointmentCancellation(appointmentDetails);
    } else if (
      date !== existingAppointment.date ||
      time !== existingAppointment.time ||
      doctorId !== existingAppointment.doctor
    ) {
      sendAppointmentUpdate(appointmentDetails);
    }

    return res.status(200).json(updatedAppointment);
  } catch (error) {
    console.log("Lỗi trong updateAppointment controller", error);
    return res.status(500).json({ message: "Lỗi máy chủ nội bộ" });
  }
};

export const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedAppointment = await Appointment.findByIdAndDelete(id);

    if (!deletedAppointment) {
      return res.status(404).json({ error: "Không tìm thấy lịch khám" });
    }

    return res
      .status(200)
      .json({ message: "Appointment deleted successfully" });
  } catch (error) {
    console.log("Error in deleteAppointment controller", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getAppointmentDetail = async (req, res) => {
  const { id } = req.params;

  try {
    const appointment = await Appointment.findById(id)
      .populate("patient", "_id name email")
      .populate("doctor", "_id name email");

    if (!appointment) {
      return res.status(404).json({ message: "Cuộc hẹn không tồn tại" });
    }

    return res.status(200).json(appointment);
  } catch (error) {
    console.log("Lỗi trong getAppointmentDetail controller", error);
    return res.status(500).json({ message: "Lỗi máy chủ nội bộ" });
  }
};

export const getAllAppointment = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const skip = (page - 1) * limit;

    const appointments = await Appointment.find()
      .skip(skip)
      .limit(parseInt(limit))
      .populate([
        {
          path: "patient",
          select: "_id name email",
        },
        {
          path: "doctor",
          select: "_id name email",
        },
      ])
      .sort({ createdAt: -1 });

    const total = await Appointment.countDocuments();
    const totalPages = Math.ceil(total / limit);

    return res.status(200).json({
      results: appointments,
      totalResults: total,
      totalPages,
      currentPage: parseInt(page),
      limit: parseInt(limit),
    });
  } catch (error) {
    console.log("Lỗi trong getAllAppointment controller", error);
    return res.status(500).json({ message: "Lỗi máy chủ nội bộ" });
  }
};
