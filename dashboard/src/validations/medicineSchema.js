import * as yup from "yup";

export const medicineSchema = yup.object().shape({
  name: yup
    .string()
    .required("Tên là bắt buộc")
    .min(3, "Tên phải có ít nhất 3 ký tự")
    .max(50, "Tên không được vượt quá 50 ký tự"),
  description: yup.string().max(200, "Mô tả không được vượt quá 200 ký tự"),
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
