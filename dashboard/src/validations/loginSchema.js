import * as yup from "yup";

export const loginSchema = yup.object().shape({
  password: yup
    .string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự.")
    .max(20, "Mật khẩu chỉ được tối đa 20 ký tự.")
    .required("Mật khẩu là bắt buộc."),
  email: yup
    .string()
    .email("Định dạng email không hợp lệ.")
    .required("Email là bắt buộc.")
    .lowercase("Email phải ở dạng chữ thường."),
});
