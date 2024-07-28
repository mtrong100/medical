import { body, validationResult } from "express-validator";
import { ACCOUNT_STATUS, GENDER } from "../utils/constanst.js";

export const validateRegisterUserData = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("Tên không được để trống")
    .isLength({ min: 2, max: 50 })
    .withMessage("Tên phải có độ dài từ 2 đến 50 ký tự"),
  body("dateOfBirth")
    .exists({ checkFalsy: true })
    .withMessage("Ngày sinh không được để trống")
    .matches(/^\d{2}\/\d{2}\/\d{4}$/)
    .withMessage("Ngày sinh phải theo định dạng dd/mm/yyyy"),
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
  body("email")
    .exists({ checkFalsy: true })
    .withMessage("Email không được để trống")
    .isEmail()
    .withMessage("Email không hợp lệ"),
  body("address")
    .exists({ checkFalsy: true })
    .withMessage("Địa chỉ không được để trống")
    .isLength({ min: 5, max: 100 })
    .withMessage("Địa chỉ phải có độ dài từ 5 đến 100 ký tự")
    .isString()
    .withMessage("Địa chỉ phải là một chuỗi"),
  body("password")
    .exists({ checkFalsy: true })
    .withMessage("Mật khẩu không được để trống")
    .isLength({ min: 6 })
    .withMessage("Mật khẩu phải có ít nhất 6 ký tự"),
  body("confirmPassword")
    .exists({ checkFalsy: true })
    .withMessage("Xác nhận mật khẩu không được để trống")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Mật khẩu và xác nhận mật khẩu không khớp");
      }
      return true;
    }),
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

export const validateLoginUserData = [
  body("email")
    .exists({ checkFalsy: true })
    .withMessage("Email không được để trống")
    .isEmail()
    .withMessage("Email không hợp lệ"),
  body("password")
    .exists({ checkFalsy: true })
    .withMessage("Mật khẩu không được để trống")
    .isLength({ min: 6 })
    .withMessage("Mật khẩu phải có ít nhất 6 ký tự"),
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

export const validateGoogleLoginUserData = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("Tên không được để trống")
    .isLength({ min: 2, max: 50 })
    .withMessage("Tên phải có độ dài từ 2 đến 50 ký tự"),
  body("avatar")
    .exists({ checkFalsy: true })
    .isString()
    .withMessage("Avatar phải là một chuỗi"),
  body("email")
    .exists({ checkFalsy: true })
    .withMessage("Email không được để trống")
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
