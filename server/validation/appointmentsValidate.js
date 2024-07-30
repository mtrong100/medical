import { body, validationResult } from "express-validator";
import { APPOINTMENT_STATUS, GENDER } from "../utils/constanst.js";

export const validateCreateAppointment = [
  body("patient")
    .exists({ checkFalsy: true })
    .withMessage("Patient ID is required")
    .isMongoId()
    .withMessage("Invalid Patient ID"),
  body("doctor")
    .exists({ checkFalsy: true })
    .withMessage("Doctor ID is required")
    .isMongoId()
    .withMessage("Invalid Doctor ID"),
  body("date")
    .exists({ checkFalsy: true })
    .withMessage("Date is required")
    .isString()
    .withMessage("Date must be a string"),
  body("time")
    .exists({ checkFalsy: true })
    .withMessage("Time is required")
    .isString()
    .withMessage("Time must be a string"),
  body("status")
    .optional()
    .isIn(Object.values(APPOINTMENT_STATUS))
    .withMessage(
      `Status must be one of: ${Object.values(APPOINTMENT_STATUS).join(", ")}`
    ),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array().map((err) => err.msg),
      });
    }
    next();
  },
];

export const validateUpdateAppointment = [
  body("patient").optional().isMongoId().withMessage("Invalid Patient ID"),
  body("doctor").optional().isMongoId().withMessage("Invalid Doctor ID"),
  body("date").optional().isString().withMessage("Date must be a string"),
  body("time").optional().isString().withMessage("Time must be a string"),
  body("status")
    .optional()
    .isIn(Object.values(APPOINTMENT_STATUS))
    .withMessage(
      `Status must be one of: ${Object.values(APPOINTMENT_STATUS).join(", ")}`
    ),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array().map((err) => err.msg),
      });
    }
    next();
  },
];

export const validateBookingAppointment = [
  body("doctor")
    .exists({ checkFalsy: true })
    .withMessage("Doctor ID is required")
    .isMongoId()
    .withMessage("Invalid Doctor ID"),
  body("date")
    .exists({ checkFalsy: true })
    .withMessage("Date is required")
    .isString()
    .withMessage("Date must be a string"),
  body("time")
    .exists({ checkFalsy: true })
    .withMessage("Time is required")
    .isString()
    .withMessage("Time must be a string"),
  body("email")
    .exists({ checkFalsy: true })
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),
  body("gender")
    .exists({ checkFalsy: true })
    .withMessage("Giới tính không được để trống")
    .isIn([GENDER.MALE, GENDER.FEMALE])
    .withMessage(`Giới tính phải là '${GENDER.MALE}' hoặc '${GENDER.FEMALE}'`),
  body("phoneNumber")
    .exists({ checkFalsy: true })
    .withMessage("Số điện thoại không được để trống")
    .isString()
    .withMessage("Số điện thoại phải là một chuỗi")
    .isLength({ min: 10, max: 10 })
    .withMessage("Số điện thoại phải là một chuỗi 10 chữ số"),
  body("address")
    .exists({ checkFalsy: true })
    .withMessage("Địa chỉ không được để trống")
    .isLength({ min: 5, max: 100 })
    .withMessage("Địa chỉ phải có độ dài từ 5 đến 100 ký tự")
    .isString()
    .withMessage("Địa chỉ phải là một chuỗi"),
  body("dateOfBirth")
    .exists({ checkFalsy: true })
    .withMessage("Ngày sinh không được để trống")
    .matches(/^\d{2}\/\d{2}\/\d{4}$/)
    .withMessage("Ngày sinh phải theo định dạng dd/mm/yyyy"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array().map((err) => err.msg),
      });
    }
    next();
  },
];
