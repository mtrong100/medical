import React from "react";
import Image from "../assets/images/image1.jpg";

const Introduce = () => {
  return (
    <section className="page-container">
      <div className="grid grid-cols-2 gap-[75px] items-start ">
        <div className="space-y-5">
          <h1 className="text-4xl font-semibold leading-normal">
            Tại sao chọn chăm sóc sức khỏe tại Medical Care
          </h1>

          <ul className="space-y-4 list-disc list-inside">
            <li className="text-gray-700">
              <span className="font-bold">Dịch vụ toàn diện:</span> Medical Care
              cung cấp một loạt các dịch vụ y tế từ khám tổng quát đến chuyên
              khoa, đáp ứng mọi nhu cầu chăm sóc sức khỏe của bạn.
            </li>
            <li className="text-gray-700">
              <span className="font-bold">Đội ngũ chuyên gia:</span> Chúng tôi
              tự hào có đội ngũ bác sĩ và nhân viên y tế giàu kinh nghiệm, tận
              tâm và luôn sẵn sàng hỗ trợ bệnh nhân.
            </li>
            <li className="text-gray-700">
              <span className="font-bold">Công nghệ hiện đại:</span> Medical
              Care trang bị các thiết bị y tế tiên tiến và áp dụng công nghệ mới
              nhất trong chẩn đoán và điều trị.
            </li>
            <li className="text-gray-700">
              <span className="font-bold">Tiện lợi và nhanh chóng:</span> Đặt
              lịch khám bệnh dễ dàng qua website, giảm thiểu thời gian chờ đợi
              và tối ưu hóa quy trình khám chữa bệnh.
            </li>
            <li className="text-gray-700">
              <span className="font-bold">Chăm sóc cá nhân hóa:</span> Chúng tôi
              hiểu rằng mỗi bệnh nhân là một cá nhân duy nhất và luôn đảm bảo kế
              hoạch điều trị phù hợp nhất với nhu cầu của bạn.
            </li>
          </ul>
        </div>
        <div>
          <img src={Image} className="aspect-square rounded-sm object-cover" />
        </div>
      </div>
    </section>
  );
};

export default Introduce;
