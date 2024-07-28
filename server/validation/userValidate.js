import { body, validationResult } from "express-validator";
import { ACCOUNT_STATUS, GENDER } from "../utils/constanst.js";

export const validateUpdateUserData = [
  body("name")
    .optional()
    .isLength({ min: 2, max: 50 })
    .withMessage("Tên phải có độ dài từ 2 đến 50 ký tự")
    .notEmpty()
    .withMessage("Tên không được để trống"),
  body("avatar").optional().isString().withMessage("Avatar phải là một chuỗi"),
  body("dateOfBirth")
    .optional()
    .matches(/^\d{2}\/\d{2}\/\d{4}$/)
    .withMessage("Ngày sinh phải theo định dạng dd/mm/yyyy"),
  body("gender")
    .optional()
    .isIn([GENDER.MALE, GENDER.FEMALE])
    .withMessage(`Giới tinh phải là '${GENDER.MALE}' hoặc '${GENDER.FEMALE}'`),
  body("phoneNumber")
    .optional()
    .isString()
    .isLength({ min: 10, max: 10 })
    .withMessage("Số điện thoại phải là một chuỗi 10 chữ số"),
  body("email").optional().isEmail().withMessage("Email không hợp lệ"),
  body("address")
    .optional()
    .isLength({ min: 5, max: 100 })
    .withMessage("Địa chỉ phải có độ dài từ 5 đến 100 ký tự")
    .isString()
    .withMessage("Địa chỉ phải là một chuỗi"),
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

export const validateUserAccountStatus = [
  body("status")
    .optional()
    .isIn([ACCOUNT_STATUS.ISACTIVE, ACCOUNT_STATUS.ISLOCKED])
    .withMessage(
      `Trạng thái tài khoản phải là '${ACCOUNT_STATUS.ISACTIVE}' hoặc '${ACCOUNT_STATUS.ISLOCKED}'`
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

export const validateUserEmail = [
  body("email")
    .exists()
    .withMessage("Email là bắt buộc")
    .isEmail()
    .withMessage("Email không hợp lệ"),
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

export const validateUpdatePassword = [
  body("email")
    .exists()
    .withMessage("Email là bắt buộc")
    .isEmail()
    .withMessage("Email không hợp lệ"),
  body("password")
    .exists()
    .withMessage("Mật khẩu là bắt buộc")
    .isLength({ min: 6 })
    .withMessage("Mật khẩu phải có độ dài ít nhất 6 ký tự"),
  body("confirmPassword")
    .exists()
    .withMessage("Xác nhận mật khẩu là bắt buộc")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Mật khẩu xác nhận không khớp"),
  body("otp")
    .exists()
    .withMessage("OTP là bắt buộc")
    .isLength({ min: 6, max: 6 })
    .withMessage("OTP phải có độ dài 6 ký tự"),
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
