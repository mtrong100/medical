import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODEMAILER_ACCOUNT,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

export const sendOtpResetPassword = async (email, otp) => {
  const mailOptions = {
    from: '"Medical 👨‍⚕️" <medicalvip99@gmail.com>',
    to: email,
    subject: "Mã OTP đặt lại mật khẩu",
    text: `Mã OTP đặt lại mật khẩu của bạn là: `,
    html: `<h1>${otp}</h1>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Gửi email thất bại:", error);
    } else {
      console.log("Email đã được gửi:", info.response);
    }
  });
};

export const sendTerminationEmail = async (name, email, reason) => {
  if (!reason || !email || !name) return;

  const mailOptions = {
    from: '"Medical 👨‍⚕️" <medicalvip99@gmail.com>',
    to: email,
    subject: "Thông Báo Sa Thải",
    text: `Kính gửi ${name},

Chúng tôi rất tiếc phải thông báo rằng hợp đồng lao động của bạn với công ty đã bị chấm dứt. Lý do cho quyết định này như sau:

${reason}

Vui lòng liên hệ với phòng Nhân sự để biết thêm chi tiết.

Trân trọng,
MedicalVip999`,
    html: `<p>Kính gửi ${name},</p>
           <p>Chúng tôi rất tiếc phải thông báo rằng hợp đồng lao động của bạn với công ty đã bị chấm dứt. Lý do cho quyết định này như sau:</p>
           <p><strong>${reason}</strong></p>
           <p>Vui lòng liên hệ với phòng Nhân sự để biết thêm chi tiết.</p>
           <p>Trân trọng,<br>MedicalVip999</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Gửi email thất bại:", error);
    } else {
      console.log("Email đã được gửi:", info.response);
    }
  });
};
