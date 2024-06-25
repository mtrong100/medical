import * as yup from "yup";

export const passwordSchema = yup.object().shape({
  password: yup
    .string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự.")
    .max(20, "Mật khẩu chỉ được tối đa 20 ký tự.")
    .required("Mật khẩu là bắt buộc."),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Mật khẩu phải khớp")
    .required("Xác nhận mật khẩu là bắt buộc"),
});
