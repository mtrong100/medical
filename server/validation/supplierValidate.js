import { body, validationResult } from "express-validator";

export const validateSupplierData = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("Tên không được để trống")
    .isString()
    .withMessage("Tên phải là một chuỗi"),
  body("email")
    .exists({ checkFalsy: true })
    .withMessage("Email không được để trống")
    .isEmail()
    .withMessage("Email không hợp lệ"),
  body("phone")
    .exists({ checkFalsy: true })
    .withMessage("Số điện thoại không được để trống")
    .isString()
    .withMessage("Số điện thoại phải là một chuỗi")
    .isLength({ min: 10, max: 15 })
    .withMessage("Số điện thoại phải có độ dài từ 10 đến 15 ký tự"),
  body("address")
    .exists({ checkFalsy: true })
    .withMessage("Địa chỉ không được để trống")
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

export const validateUpdateSupplierData = [
  body("name")
    .optional()
    .isString()
    .withMessage("Tên phải là một chuỗi")
    .notEmpty()
    .withMessage("Tên không được để trống"),
  body("email").optional().isEmail().withMessage("Email không hợp lệ"),
  body("phone")
    .optional()
    .isString()
    .withMessage("Số điện thoại phải là một chuỗi")
    .notEmpty()
    .withMessage("Số điện thoại không được để trống"),
  body("address")
    .optional()
    .isString()
    .withMessage("Địa chỉ phải là một chuỗi")
    .notEmpty()
    .withMessage("Địa chỉ không được để trống"),
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
