import { body, validationResult } from "express-validator";

export const validateMedicineCategoryData = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("Tên không được để trống")
    .isLength({ min: 2, max: 50 })
    .withMessage("Tên phải có độ dài từ 2 đến 50 ký tự"),
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
