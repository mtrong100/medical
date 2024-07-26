import * as yup from "yup";

export const resetPasswordSchema = yup.object().shape({
  email: yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
  password: yup
    .string()
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .required("Mật khẩu là bắt buộc"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Mật khẩu phải khớp")
    .required("Xác nhận mật khẩu là bắt buộc"),
  otp: yup
    .string()
    .required("OTP là bắt buộc")
    .max(6, "Mã OTP chỉ có 6 chữ số"),
});
