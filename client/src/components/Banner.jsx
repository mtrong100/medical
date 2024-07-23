import React from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button } from "primereact/button";
import { SERVICE_DATA } from "../utils/constants";
import slider1Image from "../assets/images/slider_1.webp";
import slider3Image from "../assets/images/slider_3.webp";

const bannerImages = [slider1Image, slider3Image];

const Banner = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="swiper-container">
        <Swiper slidesPerView={1} className="mySwiper">
          {bannerImages.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="relative rounded-sm">
                <img
                  src={item}
                  alt={index}
                  className="w-full h-full object-contain"
                />

                <div className="absolute top-1/2 -translate-y-1/2 left-40 p-5 rounded-lg w-full max-w-2xl">
                  <div className="space-y-5">
                    <h1 className="text-5xl font-bold">Medical Care</h1>
                    <p className="text-lg">
                      Chào mừng bạn đến với Medical Care - nền tảng đặt lịch
                      khám bệnh trực tuyến hàng đầu! Chúng tôi hiểu rằng sức
                      khỏe là tài sản quý giá nhất của mỗi người, và việc chăm
                      sóc sức khỏe nên được thực hiện một cách dễ dàng và thuận
                      tiện nhất.
                    </p>
                    <Button
                      label="Đặt lịch khám bệnh"
                      raised
                      icon="pi pi-calendar"
                      onClick={() => navigate("/book-appointment")}
                    />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="grid grid-cols-4">
        {SERVICE_DATA.map((item, index) => (
          <div
            key={item.title}
            className={`${
              index % 2 === 0 ? "bg-blue-800" : "bg-cyan-600"
            } flex gap-5 flex-col justify-center items-center aspect-square px-5 text-white`}
          >
            <div className="flex items-center justify-center rounded-full shadow-md bg-white text-blue-900 w-[100px] h-[100px]">
              {item.icon}
            </div>
            <h1 className="text-3xl font-semibold">{item.title}</h1>
            <p className="text-center">{item.caption}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Banner;
