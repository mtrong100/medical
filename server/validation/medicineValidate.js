import { body, validationResult } from "express-validator";

export const validateCreateMedicine = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("Tên thuốc là bắt buộc")
    .isLength({ min: 3, max: 100 })
    .withMessage("Tên thuốc phải có độ dài từ 3 đến 100 ký tự"),
  body("description")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Mô tả không được vượt quá 500 ký tự"),
  body("price")
    .exists({ checkFalsy: true })
    .withMessage("Giá thuốc là bắt buộc")
    .isFloat({ min: 0 })
    .withMessage("Giá thuốc không được âm"),
  body("stock")
    .exists({ checkFalsy: true })
    .withMessage("Số lượng trong kho là bắt buộc")
    .isInt({ min: 0 })
    .withMessage("Số lượng trong kho không được âm"),
  body("unit").exists({ checkFalsy: true }).withMessage("Đơn vị là bắt buộc"),
  body("category")
    .exists({ checkFalsy: true })
    .withMessage("Danh mục thuốc là bắt buộc")
    .isMongoId()
    .withMessage("Danh mục thuốc không hợp lệ"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array().map((err) => err.msg) });
    }
    next();
  },
];

export const validateUpdateMedicine = [
  body("name")
    .optional()
    .isLength({ min: 3, max: 100 })
    .withMessage("Tên thuốc phải có độ dài từ 3 đến 100 ký tự"),
  body("description")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Mô tả không được vượt quá 500 ký tự"),
  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Giá thuốc không được âm"),
  body("stock")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Số lượng trong kho không được âm"),
  body("unit").optional(),
  body("category")
    .optional()
    .isMongoId()
    .withMessage("Danh mục thuốc không hợp lệ"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array().map((err) => err.msg) });
    }
    next();
  },
];
