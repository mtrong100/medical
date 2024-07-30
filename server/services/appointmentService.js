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

export const getAppoinmentCollectionService = async () => {
  try {
    const appointments = await Appointment.find();

    if (!appointments || appointments.length === 0) {
      throw new Error("Không tìm thẫy lịch khám");
    }

    return appointments;
  } catch (error) {
    console.log("Lỗi tại service getAppoinmentCollectionService", error);
    throw new Error(error.message);
  }
};

export const getAppointmentsService = async (page, limit) => {
  try {
    const skip = (page - 1) * limit;
    const total = await Appointment.countDocuments();
    const totalPages = Math.ceil(total / limit);

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

    const formattedResults = appointments.map((appointment) => {
      return {
        _id: appointment._id,
        patient: appointment.patient.name,
        doctor: appointment.doctor.name,
        date: appointment.date,
        time: appointment.time,
        status: appointment.status,
        createdAt: appointment.createdAt,
      };
    });

    return {
      results: formattedResults,
      totalResults: total,
      totalPages,
      currentPage: parseInt(page),
      limit: parseInt(limit),
    };
  } catch (error) {
    console.log("Lỗi tại service getAppointmentsService", error);
    throw new Error(error.message);
  }
};

export const getAppointmentDetailService = async (id) => {
  try {
    const appointment = await Appointment.findById(id)
      .populate("patient", "_id name email")
      .populate("doctor", "_id name email");

    if (!appointment) {
      throw new Error("Cuộc hẹn không tồn tại");
    }

    return {
      patient: appointment.patient.name,
      patientId: appointment.patient._id,
      doctor: appointment.doctor.name,
      doctorId: appointment.doctor._id,
      date: appointment.date,
      time: appointment.time,
      status: appointment.status,
      createdAt: appointment.createdAt,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const bookingAppointmentService = async ({
  doctorId,
  date,
  time,
  email,
  gender,
  phoneNumber,
  address,
  dateOfBirth,
}) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Không tìm thấy thông tin người dùng");
    }

    const doctor = await Employee.findById(doctorId);
    if (!doctor) {
      throw new Error("Không tìm thấy thông tin bác sĩ");
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
      throw new Error("Trùng lịch khám");
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

    return newAppointment;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createAppointmentService = async ({
  doctorId,
  date,
  time,
  patientId,
}) => {
  try {
    const existingAppointment = await Appointment.findOne({
      doctor: doctorId,
      date,
      time,
    });

    if (existingAppointment) {
      throw new Error("Trùng lịch khám");
    }

    const patient = await Patient.findById(patientId);
    if (!patient) {
      throw new Error("Không tìm thấy thông tin bệnh nhân");
    }

    const doctor = await Employee.findById(doctorId);
    if (!doctor) {
      throw new Error("Không tìm thấy thông tin bác sĩ");
    }

    const newAppointment = new Appointment({
      doctor: doctorId,
      date,
      time,
      patient: patientId,
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

    return newAppointment;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateAppointmentService = async ({
  id,
  doctorId,
  patientId,
  date,
  time,
  status,
}) => {
  const existingAppointment = await Appointment.findById(id);

  if (!existingAppointment) {
    throw new Error("Cuộc hẹn không tồn tại");
  }

  if (doctorId && date && time) {
    const conflictingAppointment = await Appointment.findOne({
      doctor: doctorId,
      date,
      time,
      _id: { $ne: id },
    });

    if (conflictingAppointment) {
      throw new Error("Trùng lịch khám");
    }
  }

  const patient = await Patient.findById(patientId);
  if (!patient) {
    throw new Error("Không tìm thấy thông tin bệnh nhân");
  }

  const doctor = await Employee.findById(doctorId);
  if (!doctor) {
    throw new Error("Không tìm thấy thông tin bác sĩ");
  }

  const updatedAppointment = await Appointment.findByIdAndUpdate(
    id,
    { doctor: doctorId, patient: patientId, date, time, status },
    { new: true }
  );

  if (!updatedAppointment) {
    throw new Error("Cuộc hẹn không tồn tại");
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

  return updatedAppointment;
};

export const deleteAppointmentService = async (id) => {
  try {
    const deletedAppointment = await Appointment.findByIdAndDelete(id);
    if (!deletedAppointment) {
      throw new Error("Cuộc hẹn không tồn tại");
    }
  } catch (error) {
    console.log("Lỗi tại service deleteAppointmentService", error);
    throw new Error(error.message);
  }
};
