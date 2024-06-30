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

export const sendAppointmentConfirmation = (appointment) => {
  const mailOptions = {
    from: '"Medical 👨‍⚕️" <medicalvip99@gmail.com>',
    to: appointment.patientEmail, // Địa chỉ email người nhận
    subject: "Xác nhận đặt lịch hẹn",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #4CAF50;">Xác nhận đặt lịch hẹn</h2>
        <p>Xin chào <strong>${appointment.patientName}</strong>,</p>
        <p>Cuộc hẹn của bạn đã được đặt thành công.</p>
        <h3>Chi tiết cuộc hẹn:</h3>
        <ul>
          <li><strong>Bác sĩ:</strong> ${appointment.doctorName}</li>
          <li><strong>Ngày:</strong> ${appointment.date}</li>
          <li><strong>Thời gian:</strong> ${appointment.time}</li>
        </ul>
        <p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.</p>
        <p>Trân trọng,</p>
        <p><em>Phòng khám của bạn</em></p>
      </div>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Lỗi khi gửi email:", error);
    } else {
      console.log("Email đã được gửi:", info.response);
    }
  });
};

export const sendAppointmentUpdate = (appointment) => {
  const mailOptions = {
    from: '"Medical 👨‍⚕️" <medicalvip99@gmail.com>',
    to: appointment.patientEmail,
    subject: "Cập nhật lịch hẹn",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #FFA500;">Cập nhật lịch hẹn</h2>
        <p>Xin chào <strong>${appointment.patientName}</strong>,</p>
        <p>Cuộc hẹn của bạn đã được cập nhật.</p>
        <h3>Chi tiết mới:</h3>
        <ul>
          <li><strong>Bác sĩ:</strong> ${appointment.doctorName}</li>
          <li><strong>Ngày:</strong> ${appointment.date}</li>
          <li><strong>Thời gian:</strong> ${appointment.time}</li>
        </ul>
        <p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.</p>
        <p>Trân trọng,</p>
        <p><em>Phòng khám của bạn</em></p>
      </div>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Lỗi khi gửi email:", error);
    } else {
      console.log("Email đã được gửi:", info.response);
    }
  });
};

export const sendAppointmentCancellation = (appointment) => {
  const mailOptions = {
    from: '"Medical 👨‍⚕️" <medicalvip99@gmail.com>',
    to: appointment.patientEmail,
    subject: "Hủy lịch hẹn",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #FF0000;">Hủy lịch hẹn</h2>
        <p>Xin chào <strong>${appointment.patientName}</strong>,</p>
        <p>Cuộc hẹn của bạn đã được hủy bỏ.</p>
        <p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.</p>
        <p>Trân trọng,</p>
        <p><em>Phòng khám của bạn</em></p>
      </div>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Lỗi khi gửi email:", error);
    } else {
      console.log("Email đã được gửi:", info.response);
    }
  });
};
