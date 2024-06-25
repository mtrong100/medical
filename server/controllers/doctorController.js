import Doctor from "../models/doctorModel.js";
import { generateTokenAndSetCookie } from "../utils/helper.js";
import bcrypt from "bcrypt";
import { sendTerminationEmail } from "../utils/mail.js";
import { EMPLOYEE_STATUS, GENDER, PROFILE_IMAGES } from "../utils/constanst.js";

export const doctorLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const doctor = await Doctor.findOne({ email });

    if (doctor.status === EMPLOYEE_STATUS.ISLOCKED) {
      return res.status(400).json({ error: "Tài khoản đã bị khóa" });
    }

    if (doctor.isDeleted) {
      return res.status(400).json({ error: "Tài khoản đã bị xóa" });
    }

    if (!doctor) {
      return res.status(400).json({ error: "Không tìm thấy tài khoản" });
    }

    const validPassword = bcrypt.compareSync(password, doctor.password);

    if (!validPassword) {
      return res.status(400).json({ error: "Sai mật khẩu" });
    }

    generateTokenAndSetCookie(user._id, res);

    return res.status(200).json(doctor);
  } catch (error) {
    console.log("Error in doctorLogin controller", error.message);
    return res.status(500).json({ error: "Lỗi server" });
  }
};

export const createNewDoctor = async (req, res) => {
  const { gender, password, ...doctorData } = req.body;

  try {
    let avatar;
    if (gender === GENDER.MALE) {
      avatar = PROFILE_IMAGES.MALEDOCTOR;
    } else if (gender === GENDER.FEMALE) {
      avatar = PROFILE_IMAGES.FEMALEDOCTOR;
    } else {
      avatar = PROFILE_IMAGES.DEFAULT;
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newDoctor = new Doctor({
      ...doctorData,
      gender,
      avatar,
      password: hash,
    });

    await newDoctor.save();

    return res.status(201).json(newDoctor);
  } catch (error) {
    console.log("Error in createNewDoctor controller", error.message);
    return res.status(500).json({ error: "Lỗi server" });
  }
};

export const updateDoctor = async (req, res) => {
  try {
    const { password, confirmPassword, ...updateData } = req.body;

    if (password && confirmPassword) {
      const doctor = await Doctor.findById(req.params.id);

      if (!doctor) {
        return res.status(404).json({ error: "Tài khoản không tìm thấy" });
      }

      if (password !== confirmPassword) {
        return res.status(400).json({ error: "Mật khẩu không trùng khớp" });
      }

      const hashedPassword = bcrypt.hashSync(password, 10);
      doctor.password = hashedPassword;

      return res.status(200).json({ message: "Cập nhật mật khẩu thành công" });
    }

    const updatedDoctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    );

    return res.status(200).json(updatedDoctor);
  } catch (error) {
    console.log("Error in updateDoctor controller", error.message);
    return res.status(500).json({ error: "Server error" });
  }
};

export const deleteDoctor = async (req, res) => {
  try {
    await Doctor.findByIdAndUpdate(
      req.params.id,
      { $set: { isDeleted: true } },
      { new: true }
    );

    return res.status(200).json({ message: "Xóa bác sĩ hoàn tất" });
  } catch (error) {
    console.log("Error in deleteDoctor controller", error.message);
    return res.status(500).json({ error: "Server error" });
  }
};

export const firedDoctor = async (req, res) => {
  const { name, email, reason } = req.body;

  try {
    await Doctor.findByIdAndUpdate(
      req.params.id,
      { $set: { status: EMPLOYEE_STATUS.ISFIRED } },
      { new: true }
    );

    sendTerminationEmail(name, email, reason);

    return res.status(200).json({ message: "Thao tác hoàn tất" });
  } catch (error) {
    console.log("Error in firedDoctor controller", error.message);
    return res.status(500).json({ error: "Server error" });
  }
};

export const lockAccount = async (req, res) => {
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      { $set: { status: EMPLOYEE_STATUS.ISLOCKED } },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "Thao tác hoàn tất", status: updatedDoctor.status });
  } catch (error) {
    console.log("Error in lockAccount controller", error.message);
    return res.status(500).json({ error: "Server error" });
  }
};

export const getDoctorDetail = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(400).json({ error: "Không tìm thấy bác sĩ" });
    }

    return res.status(200).json(doctor);
  } catch (error) {
    console.log("Error in getDoctorDetail controller", error.message);
    return res.status(500).json({ error: "Server error" });
  }
};

export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({ isDeleted: false });
    return res.status(200).json(doctors);
  } catch (error) {
    console.log("Error in getAllDoctors controller", error.message);
    return res.status(500).json({ error: "Server error" });
  }
};
