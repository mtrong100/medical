import { body, validationResult } from "express-validator";
import { PAYMENT_STATUS } from "../utils/constanst.js";

export const validateCreateMedicalServiceInvoice = [
  body("patient")
    .exists({ checkFalsy: true })
    .withMessage("Patient ID is required")
    .isMongoId()
    .withMessage("Invalid Patient ID"),
  body("detail")
    .isArray({ min: 1 })
    .withMessage("Detail must be an array with at least one service"),
  body("detail.*.service")
    .exists({ checkFalsy: true })
    .withMessage("Service ID is required")
    .isMongoId()
    .withMessage("Invalid Service ID"),
  body("total")
    .exists({ checkFalsy: true })
    .withMessage("Total amount is required")
    .isFloat({ gt: 0 })
    .withMessage("Total amount must be greater than 0"),
  body("status")
    .isIn([PAYMENT_STATUS.PAID, PAYMENT_STATUS.UNPAID])
    .withMessage(
      `Status must be either '${PAYMENT_STATUS.PAID}' or '${PAYMENT_STATUS.UNPAID}'`
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

export const validateUpdateMedicalServiceInvoice = [
  body("patient").optional().isMongoId().withMessage("Invalid Patient ID"),
  body("detail")
    .optional()
    .isArray({ min: 1 })
    .withMessage("Detail must be an array with at least one service"),
  body("detail.*.service")
    .optional()
    .isMongoId()
    .withMessage("Invalid Service ID"),
  body("total")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("Total amount must be greater than 0"),
  body("status")
    .optional()
    .isIn([PAYMENT_STATUS.PAID, PAYMENT_STATUS.UNPAID])
    .withMessage(
      `Status must be either '${PAYMENT_STATUS.PAID}' or '${PAYMENT_STATUS.UNPAID}'`
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
