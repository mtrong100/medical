import { body, validationResult } from "express-validator";

export const validateCreateMedicalService = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("Tên dịch vụ không được để trống")
    .isString()
    .withMessage("Tên dịch vụ phải là một chuỗi")
    .isLength({ min: 2, max: 100 })
    .withMessage("Tên dịch vụ phải có độ dài từ 2 đến 100 ký tự"),
  body("description")
    .optional()
    .isString()
    .withMessage("Mô tả phải là một chuỗi"),
  body("price")
    .exists({ checkFalsy: true })
    .withMessage("Giá không được để trống")
    .isFloat({ gt: 0 })
    .withMessage("Giá phải là một số dương"),
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

export const validateUpdateMedicalService = [
  body("name")
    .optional()
    .isString()
    .withMessage("Tên dịch vụ phải là một chuỗi")
    .isLength({ min: 2, max: 100 })
    .withMessage("Tên dịch vụ phải có độ dài từ 2 đến 100 ký tự"),
  body("description")
    .optional()
    .isString()
    .withMessage("Mô tả phải là một chuỗi"),
  body("price")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("Giá phải là một số dương"),
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
