import React from "react";
import { Accordion, AccordionTab } from "primereact/accordion";

const Faq = () => {
  return (
    <div className="page-container">
      <h1 className="font-semibold text-center text-4xl mb-8">
        Các câu hỏi thường gặp (FAQ)
      </h1>

      <Accordion activeIndex={0}>
        <AccordionTab header="Làm thế nào để đặt lịch khám bệnh?">
          <p className="m-0">
            Để đặt lịch khám bệnh, bạn có thể truy cập vào trang chủ của chúng
            tôi và chọn 'Đặt lịch khám'. Sau đó, bạn cần điền thông tin cá nhân,
            chọn bác sĩ và thời gian mong muốn. Cuối cùng, nhấn 'Xác nhận' để
            hoàn tất quá trình đặt lịch.
          </p>
        </AccordionTab>
        <AccordionTab header="Tôi có thể hủy hoặc thay đổi lịch hẹn không?">
          <p className="m-0">
            Có, bạn có thể hủy hoặc thay đổi lịch hẹn. Để làm điều này, hãy đăng
            nhập vào tài khoản của bạn, vào mục 'Lịch hẹn của tôi', chọn lịch
            hẹn cần thay đổi hoặc hủy và làm theo hướng dẫn. Vui lòng lưu ý rằng
            việc thay đổi hoặc hủy lịch hẹn cần được thực hiện trước thời gian
            hẹn ít nhất 24 giờ.
          </p>
        </AccordionTab>
        <AccordionTab header="Phí đặt lịch khám bệnh là bao nhiêu?">
          <p className="m-0">
            Phí đặt lịch khám bệnh phụ thuộc vào bác sĩ và loại dịch vụ bạn
            chọn. Bạn có thể xem chi tiết phí dịch vụ khi chọn bác sĩ và loại
            dịch vụ trên trang đặt lịch của chúng tôi. Một số dịch vụ có thể yêu
            cầu thanh toán trước.
          </p>
        </AccordionTab>
        <AccordionTab header="Tôi cần chuẩn bị gì trước khi đến khám?">
          <p className="m-0">
            Trước khi đến khám, bạn nên mang theo giấy tờ tùy thân, bảo hiểm y
            tế (nếu có) và các kết quả xét nghiệm hoặc hồ sơ bệnh án trước đó
            (nếu có). Hãy đảm bảo rằng bạn đã ăn uống và nghỉ ngơi đầy đủ trước
            buổi khám bệnh.
          </p>
        </AccordionTab>
        <AccordionTab header="Tôi có thể thanh toán bằng những phương thức nào?">
          <p className="m-0">
            Chúng tôi chấp nhận nhiều phương thức thanh toán khác nhau bao gồm
            tiền mặt, thẻ tín dụng, thẻ ghi nợ và thanh toán qua ví điện tử. Vui
            lòng kiểm tra với quầy tiếp tân của chúng tôi để biết thêm chi tiết
            về các phương thức thanh toán được chấp nhận.
          </p>
        </AccordionTab>
        <AccordionTab header="Tôi có thể yêu cầu bác sĩ cụ thể không?">
          <p className="m-0">
            Có, bạn có thể chọn bác sĩ cụ thể khi đặt lịch khám. Trong quá trình
            đặt lịch, hãy chọn bác sĩ mà bạn mong muốn từ danh sách các bác sĩ
            của chúng tôi. Nếu bác sĩ bạn muốn không có sẵn, chúng tôi sẽ thông
            báo cho bạn và đề xuất bác sĩ khác phù hợp.
          </p>
        </AccordionTab>
      </Accordion>
    </div>
  );
};

export default Faq;
