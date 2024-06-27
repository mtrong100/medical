import * as yup from "yup";

export const medicalRecordSchema = yup.object().shape({
  patient: yup
    .string()
    .matches(
      /^[0-9a-fA-F]{24}$/,
      "Mã bệnh nhân phải là một ObjectId hợp lệ (24 ký tự hexadecimal)"
    )
    .required("Mã bệnh nhân là bắt buộc"),
  diagnosis: yup
    .string()
    .min(5, "Chẩn đoán phải có ít nhất 5 ký tự")
    .max(100, "Chẩn đoán không được vượt quá 100 ký tự")
    .required("Chẩn đoán là bắt buộc"),
  treatment: yup
    .string()
    .min(5, "Điều trị phải có ít nhất 5 ký tự")
    .max(200, "Điều trị không được vượt quá 200 ký tự")
    .required("Điều trị là bắt buộc"),
  notes: yup.string().max(500, "Ghi chú không được vượt quá 500 ký tự"),
});
