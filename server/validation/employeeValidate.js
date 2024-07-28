import { body, validationResult } from "express-validator";
import { EMPLOYEE_STATUS, GENDER } from "../utils/constanst.js";

export const validateCreateEmployeeData = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("Tên không được để trống")
    .isLength({ min: 2, max: 50 })
    .withMessage("Tên phải có độ dài từ 2 đến 50 ký tự"),
  body("avatar").optional().isString().withMessage("Avatar phải là một chuỗi"),
  body("graduatedFrom")
    .optional()
    .custom((value) => typeof value === "string" || value === null)
    .withMessage("Nơi tốt nghiệp phải là một chuỗi hoặc null"),
  body("specialization")
    .optional()
    .custom((value) => typeof value === "string" || value === null)
    .withMessage("Chuyên môn phải là một chuỗi hoặc null"),
  body("phoneNumber")
    .exists({ checkFalsy: true })
    .withMessage("Số điện thoại không được để trống")
    .isString()
    .withMessage("Số điện thoại phải là một chuỗi")
    .isLength({ min: 10, max: 10 })
    .withMessage("Số điện thoại phải là một chuỗi 10 chữ số"),
  body("email")
    .exists({ checkFalsy: true })
    .withMessage("Email không được để trống")
    .isEmail()
    .withMessage("Email không hợp lệ"),
  body("dateOfBirth")
    .exists({ checkFalsy: true })
    .withMessage("Ngày sinh không được để trống")
    .matches(/^\d{2}\/\d{2}\/\d{4}$/)
    .withMessage("Ngày sinh phải theo định dạng dd/mm/yyyy"),
  body("gender")
    .exists({ checkFalsy: true })
    .withMessage("Giới tính không được để trống")
    .isString()
    .withMessage("Giới tính phải là một chuỗi")
    .isIn([GENDER.MALE, GENDER.FEMALE])
    .withMessage(`Giới tính phải là '${GENDER.MALE}' hoặc '${GENDER.FEMALE}'`),
  body("address")
    .exists({ checkFalsy: true })
    .withMessage("Địa chỉ không được để trống")
    .isString()
    .withMessage("Địa chỉ phải là một chuỗi")
    .isLength({ min: 5, max: 100 })
    .withMessage("Địa chỉ phải có độ dài từ 5 đến 100 ký tự"),
  body("salary")
    .exists({ checkFalsy: true })
    .withMessage("Lương không được để trống")
    .isNumeric()
    .withMessage("Lương phải là một số"),
  body("description")
    .optional()
    .custom((value) => typeof value === "string" || value === null)
    .withMessage("Mô tả phải là một chuỗi"),
  body("role")
    .exists({ checkFalsy: true })
    .withMessage("Vai trò không được để trống")
    .isString()
    .withMessage("Vai trò phải là một chuỗi"),
  body("status")
    .optional()
    .isIn([EMPLOYEE_STATUS.ISWORKING, EMPLOYEE_STATUS.ISFIRED])
    .withMessage(
      `Trạng thái phải là '${EMPLOYEE_STATUS.ISWORKING}' hoặc '${EMPLOYEE_STATUS.ISFIRED}'`
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

export const validateUpdateEmployeeData = [
  body("name")
    .optional({ checkFalsy: true })
    .isLength({ min: 2, max: 50 })
    .withMessage("Tên phải có độ dài từ 2 đến 50 ký tự"),
  body("avatar").optional().isString().withMessage("Avatar phải là một chuỗi"),
  body("graduatedFrom")
    .optional()
    .custom((value) => typeof value === "string" || value === null)
    .withMessage("Nơi tốt nghiệp phải là một chuỗi"),
  body("specialization")
    .optional()
    .custom((value) => typeof value === "string" || value === null)
    .withMessage("Chuyên môn phải là một chuỗi"),
  body("phoneNumber")
    .optional({ checkFalsy: true })
    .isString()
    .withMessage("Số điện thoại phải là một chuỗi")
    .isLength({ min: 10, max: 10 })
    .withMessage("Số điện thoại phải là một chuỗi 10 chữ số"),
  body("email")
    .optional({ checkFalsy: true })
    .isEmail()
    .withMessage("Email không hợp lệ"),
  body("dateOfBirth")
    .optional({ checkFalsy: true })
    .matches(/^\d{2}\/\d{2}\/\d{4}$/)
    .withMessage("Ngày sinh phải theo định dạng dd/mm/yyyy"),
  body("gender")
    .optional({ checkFalsy: true })
    .isString()
    .withMessage("Giới tính phải là một chuỗi")
    .isIn([GENDER.MALE, GENDER.FEMALE])
    .withMessage(`Giới tính phải là '${GENDER.MALE}' hoặc '${GENDER.FEMALE}'`),
  body("address")
    .optional({ checkFalsy: true })
    .isString()
    .withMessage("Địa chỉ phải là một chuỗi")
    .isLength({ min: 5, max: 100 })
    .withMessage("Địa chỉ phải có độ dài từ 5 đến 100 ký tự"),
  body("salary")
    .optional({ checkFalsy: true })
    .isNumeric()
    .withMessage("Lương phải là một số"),
  body("description")
    .optional()
    .custom((value) => typeof value === "string" || value === null)
    .withMessage("Mô tả phải là một chuỗi"),
  body("role")
    .optional({ checkFalsy: true })
    .isString()
    .withMessage("Vai trò phải là một chuỗi"),
  body("status")
    .optional()
    .isIn([EMPLOYEE_STATUS.ISWORKING, EMPLOYEE_STATUS.ISFIRED])
    .withMessage(
      `Trạng thái phải là '${EMPLOYEE_STATUS.ISWORKING}' hoặc '${EMPLOYEE_STATUS.ISFIRED}'`
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
