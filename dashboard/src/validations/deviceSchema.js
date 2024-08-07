import * as yup from "yup";

export const deviceSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, "Tên phải có ít nhất 2 ký tự")
    .max(50, "Tên không được vượt quá 50 ký tự")
    .required("Tên là bắt buộc"),
  price: yup
    .number()
    .required("Giá là bắt buộc")
    .positive("Giá phải là một số dương")
    .min(0.01, "Giá phải ít nhất là 0.01"),
  stock: yup
    .number()
    .required("Tồn kho là bắt buộc")
    .integer("Tồn kho phải là một số nguyên")
    .min(0, "Tồn kho không được là số âm")
    .max(1000, "Tồn kho không được vượt quá 1000"),
});
