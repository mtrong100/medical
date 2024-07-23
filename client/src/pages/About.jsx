import TitleSection from "../components/TitleSection";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { SERVICE_DATA } from "../utils/constants";
import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";
import { FaPhone, FaMailBulk } from "react-icons/fa";
import { Button } from "primereact/button";
import blogImage from "../assets/images/blog_01.webp";

const About = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <section className="my-10">
      <div className="page-container">
        <div className="grid grid-cols-2 gap-[75px] items-start">
          <div className="space-y-8">
            <h1 className="text-6xl font-semibold tracking-wider">
              Giới thiệu
            </h1>
            <p>
              Website đặt lịch khám bệnh của chúng tôi cung cấp một nền tảng
              tiện lợi và hiệu quả cho việc quản lý và đặt lịch hẹn khám bệnh.
              Người dùng có thể dễ dàng đăng nhập, xem lịch khám, quản lý hồ sơ
              bệnh án và nhận thông báo về các cuộc hẹn. Giao diện thân thiện và
              trực quan giúp bệnh nhân tìm kiếm và chọn lựa dịch vụ y tế phù
              hợp, theo dõi hóa đơn và đặt mua thuốc trực tuyến. Đội ngũ nhân
              viên y tế chuyên nghiệp luôn sẵn sàng hỗ trợ, đảm bảo mang đến
              trải nghiệm chăm sóc sức khỏe tốt nhất cho bạn.
            </p>
            <p className=" text-blue-500 font-bold">
              Dễ dàng đặt lịch khám bệnh, chăm sóc sức khỏe trong tầm tay bạn!
            </p>

            <Button
              label="Đặt lịch khám bệnh ngay"
              raised
              icon="pi pi-calendar"
              onClick={() => navigate("/book-appointment")}
            />
          </div>
          <div className="aspect-square">
            <img src={blogImage} className="img-cover rounded-sm" />
          </div>
        </div>

        <div className="mt-10 grid grid-cols-4 gap-5">
          {SERVICE_DATA.map((item) => (
            <div
              key={item.title}
              className="border border-gray-300 flex gap-5 flex-col justify-center items-center rounded-md  hover:bg-blue-500 hover:text-white transition-all aspect-square p-5"
            >
              <div className="flex items-center justify-center rounded-full bg-black text-white w-[55px] h-[55px]">
                {item.icon}
              </div>
              <h1 className="text-xl font-semibold">{item.title}</h1>
              <p className="text-center">{item.caption}</p>
            </div>
          ))}
        </div>

        <div className="mt-32">
          <TitleSection>Liên lạc với chúng tôi</TitleSection>
          <div className="mt-[50px] grid grid-cols-[270px_minmax(0,_1fr)] gap-[60px]">
            <section>
              <div>
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center rounded-full w-[40px] h-[40px]  bg-blue-500 text-white">
                    <FaPhone size={20} />
                  </span>
                  <p className="font-medium">Call To Us</p>
                </div>
                <p className="mt-[32px]">
                  We are available 24/7, 7 days a week.
                </p>
                <p className="mt-[16px]">Phone: +8801611112222</p>
              </div>
              <hr className="my-2 border-blue-gray-50" />
              <div>
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center rounded-full w-[40px] h-[40px]  bg-blue-500 text-white">
                    <FaMailBulk size={20} />
                  </span>
                  <p className="font-medium">Write To US</p>
                </div>
                <p className="mt-5">
                  Điền vào biểu mẫu của chúng tôi và chúng tôi sẽ liên lạc với
                  bạn trong vòng 24 giờ.
                </p>
                <p className="mt-[16px]">Emails: customer@exclusive.com</p>
              </div>
            </section>

            <section className="w-full">
              <div className="space-y-5">
                <div className="flex flex-col gap-2">
                  <label>Tên</label>
                  <InputText placeholder="Nhập tên..." />
                </div>

                <div className="flex flex-col gap-2">
                  <label>Email</label>
                  <InputText placeholder="Nhập email..." />
                </div>

                <div className="flex flex-col gap-2">
                  <label>SDT</label>
                  <InputText placeholder="Nhập SDT..." />
                </div>

                <div className="flex flex-col gap-2">
                  <label>SDT</label>
                  <InputTextarea
                    rows={5}
                    cols={30}
                    placeholder="Nhập tin nhắn"
                  />
                </div>
              </div>

              <Button label="Gửi ngay" raised className="ml-auto flex mt-5" />
            </section>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
