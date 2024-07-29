import { body, validationResult } from "express-validator";

export const validateCreateMedicalRecord = [
  body("patient")
    .exists({ checkFalsy: true })
    .withMessage("Bệnh nhân không được để trống")
    .isMongoId()
    .withMessage("ID bệnh nhân không hợp lệ"),
  body("doctor")
    .exists({ checkFalsy: true })
    .withMessage("Bác sĩ không được để trống")
    .isMongoId()
    .withMessage("ID bác sĩ không hợp lệ"),
  body("diagnosis")
    .exists({ checkFalsy: true })
    .withMessage("Chẩn đoán không được để trống"),
  body("treatment")
    .exists({ checkFalsy: true })
    .withMessage("Điều trị không được để trống"),
  body("notes").optional().isString().withMessage("Ghi chú phải là một chuỗi"),
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

export const validateUpdateMedicalRecord = [
  body("patient")
    .optional()
    .isMongoId()
    .withMessage("ID bệnh nhân không hợp lệ"),
  body("doctor").optional().isMongoId().withMessage("ID bác sĩ không hợp lệ"),
  body("diagnosis")
    .optional()
    .isString()
    .withMessage("Chẩn đoán phải là một chuỗi"),
  body("treatment")
    .optional()
    .isString()
    .withMessage("Điều trị phải là một chuỗi"),
  body("notes").optional().isString().withMessage("Ghi chú phải là một chuỗi"),
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
