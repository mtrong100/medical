import { body, validationResult } from "express-validator";

export const validatePatientData = [
  body("name")
    .exists()
    .withMessage("Tên là bắt buộc")
    .isString()
    .withMessage("Tên phải là một chuỗi")
    .isLength({ min: 1 })
    .withMessage("Tên không được để trống"),
  body("avatar")
    .exists()
    .withMessage("Avatar là bắt buộc")
    .isString()
    .withMessage("Avatar phải là một chuỗi"),
  body("dateOfBirth")
    .exists()
    .withMessage("Ngày sinh là bắt buộc")
    .matches(/^\d{2}\/\d{2}\/\d{4}$/)
    .withMessage("Ngày sinh phải theo định dạng dd/mm/yyyy"),
  body("gender")
    .exists()
    .withMessage("Giới tính là bắt buộc")
    .isString()
    .withMessage("Giới tính phải là một chuỗi"),
  body("phoneNumber")
    .exists()
    .withMessage("Số điện thoại là bắt buộc")
    .isString()
    .withMessage("Số điện thoại phải là một chuỗi")
    .isLength({ min: 10, max: 10 })
    .withMessage("Số điện thoại phải có 10 chữ số"),
  body("email")
    .exists()
    .withMessage("Email là bắt buộc")
    .isEmail()
    .withMessage("Email không hợp lệ"),
  body("address")
    .optional()
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
