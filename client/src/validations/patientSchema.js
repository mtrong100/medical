import * as yup from "yup";

export const loginPatientSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email phải là địa chỉ email hợp lệ")
    .min(5, "Email phải có ít nhất 5 ký tự")
    .max(100, "Email không được vượt quá 100 ký tự")
    .required("Email là bắt buộc"),
  password: yup
    .string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự.")
    .max(20, "Mật khẩu chỉ được tối đa 20 ký tự.")
    .required("Mật khẩu là bắt buộc."),
});

export const patientSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, "Tên phải có ít nhất 2 ký tự")
    .max(50, "Tên không được vượt quá 50 ký tự")
    .required("Tên là bắt buộc"),
  phoneNumber: yup
    .string()
    .min(10, "Số điện thoại phải có ít nhất 10 ký tự")
    .max(15, "Số điện thoại không được vượt quá 15 ký tự")
    .required("Số điện thoại là bắt buộc"),
  email: yup
    .string()
    .email("Email phải là địa chỉ email hợp lệ")
    .min(5, "Email phải có ít nhất 5 ký tự")
    .max(100, "Email không được vượt quá 100 ký tự")
    .required("Email là bắt buộc"),
  address: yup
    .string()
    .min(5, "Địa chỉ phải có ít nhất 5 ký tự")
    .max(200, "Địa chỉ không được vượt quá 200 ký tự")
    .required("Địa chỉ là bắt buộc"),
  password: yup
    .string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự.")
    .max(20, "Mật khẩu chỉ được tối đa 20 ký tự.")
    .required("Mật khẩu là bắt buộc."),
});

export const updatePatientSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, "Tên phải có ít nhất 2 ký tự")
    .max(50, "Tên không được vượt quá 50 ký tự")
    .required("Tên là bắt buộc"),
  phoneNumber: yup
    .string()
    .min(10, "Số điện thoại phải có ít nhất 10 ký tự")
    .max(15, "Số điện thoại không được vượt quá 15 ký tự")
    .required("Số điện thoại là bắt buộc"),
  email: yup
    .string()
    .email("Email phải là địa chỉ email hợp lệ")
    .min(5, "Email phải có ít nhất 5 ký tự")
    .max(100, "Email không được vượt quá 100 ký tự")
    .required("Email là bắt buộc"),
  address: yup
    .string()
    .min(5, "Địa chỉ phải có ít nhất 5 ký tự")
    .max(200, "Địa chỉ không được vượt quá 200 ký tự")
    .required("Địa chỉ là bắt buộc"),
});
