import { body, validationResult } from "express-validator";

export const validateDeviceData = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("Tên không được để trống")
    .isLength({ min: 2, max: 50 })
    .withMessage("Tên phải có độ dài từ 2 đến 50 ký tự"),
  body("category")
    .exists({ checkFalsy: true })
    .withMessage("Danh mục không được để trống")
    .isLength({ min: 2, max: 50 })
    .withMessage("Danh mục phải có độ dài từ 2 đến 50 ký tự"),
  body("price")
    .exists({ checkFalsy: true })
    .withMessage("Giá không được để trống")
    .isNumeric()
    .withMessage("Giá phải là một số"),
  body("stock")
    .exists({ checkFalsy: true })
    .withMessage("Số lượng không được để trống")
    .isInt({ min: 0 })
    .withMessage("Số lượng phải là một số nguyên không âm"),
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

export const validateUpdateDeviceData = [
  body("name")
    .optional()
    .isLength({ min: 2, max: 50 })
    .withMessage("Tên phải có độ dài từ 2 đến 50 ký tự"),
  body("category")
    .optional()
    .isLength({ min: 2, max: 50 })
    .withMessage("Danh mục phải có độ dài từ 2 đến 50 ký tự"),
  body("price").optional().isNumeric().withMessage("Giá phải là một số"),
  body("stock")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Số lượng phải là một số nguyên không âm"),
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
