import * as yup from "yup";

export const medicalServiceSchema = yup.object().shape({
  name: yup
    .string()
    .required("Tên dịch vụ là bắt buộc")
    .min(2, "Tên dịch vụ phải có ít nhất 2 ký tự")
    .max(100, "Tên dịch vụ không được vượt quá 100 ký tự"),
  description: yup.string().max(500, "Mô tả không được vượt quá 500 ký tự"),
  price: yup
    .number()
    .required("Giá dịch vụ là bắt buộc")
    .positive("Giá dịch vụ phải là một số dương")
    .min(0, "Giá dịch vụ không được nhỏ hơn 0"),
});
