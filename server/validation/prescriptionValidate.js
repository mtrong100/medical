import { body, validationResult } from "express-validator";
import { PAYMENT_STATUS } from "../utils/constanst.js";
import mongoose from "mongoose";

export const validateCreatePrescription = [
  body("patient").isMongoId().withMessage("ID bệnh nhân không hợp lệ"),
  body("doctor").isMongoId().withMessage("ID bác sĩ không hợp lệ"),
  body("detail")
    .isArray({ min: 1 })
    .withMessage("Danh sách chi tiết không được để trống")
    .custom((value) => {
      return value.every(
        (item) =>
          item.medicine &&
          mongoose.Types.ObjectId.isValid(item.medicine) &&
          item.quantity > 0
      );
    })
    .withMessage("Chi tiết thuốc không hợp lệ"),
  body("notes").optional().isString().withMessage("Ghi chú phải là chuỗi"),
  body("total")
    .isNumeric()
    .withMessage("Tổng tiền phải là số")
    .custom((value) => value >= 0)
    .withMessage("Tổng tiền phải lớn hơn hoặc bằng 0"),
  body("status")
    .isIn([PAYMENT_STATUS.PAID, PAYMENT_STATUS.UNPAID])
    .withMessage(
      `Tình trạng phải là '${PAYMENT_STATUS.PAID}' hoặc '${PAYMENT_STATUS.UNPAID}'`
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
