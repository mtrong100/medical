import { body, validationResult } from "express-validator";
import { PAYMENT_STATUS } from "../utils/constanst.js";

export const validateCreateInvoice = [
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
  body("price")
    .exists({ checkFalsy: true })
    .withMessage("Price is required")
    .isFloat({ gt: 0 })
    .withMessage("Price must be greater than 0"),
  body("healthInsurance")
    .optional()
    .isBoolean()
    .withMessage("Health insurance must be a boolean value"),
  body("paymentStatus")
    .optional()
    .isIn([PAYMENT_STATUS.PAID, PAYMENT_STATUS.UNPAID])
    .withMessage(
      `Payment status must be either '${PAYMENT_STATUS.PAID}' or '${PAYMENT_STATUS.UNPAID}'`
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

export const validateUpdateInvoice = [
  body("patient").optional().isMongoId().withMessage("Invalid Patient ID"),
  body("doctor").optional().isMongoId().withMessage("Invalid Doctor ID"),
  body("price")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("Price must be greater than 0"),
  body("healthInsurance")
    .optional()
    .isBoolean()
    .withMessage("Health insurance must be a boolean value"),
  body("paymentStatus")
    .optional()
    .isIn([PAYMENT_STATUS.PAID, PAYMENT_STATUS.UNPAID])
    .withMessage(
      `Payment status must be either '${PAYMENT_STATUS.PAID}' or '${PAYMENT_STATUS.UNPAID}'`
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
