import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button } from "primereact/button";
import BookingDialog from "./BookingDialog";

const bannerImages = [
  "https://www.yudaah.com/demo/free-clinic-website-template/assets/images/slider/slider_3.jpg",
  "https://www.yudaah.com/demo/free-clinic-website-template/assets/images/slider/slider_1.jpg",
];

const Banner = () => {
  const [visible, setVisible] = useState(false);

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
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Sapiente, voluptates nemo consectetur blanditiis veniam
                      error totam? Ipsum quia corrupti iusto quae rerum quasi
                      provident voluptatem minus eveniet amet, animi rem.
                    </p>
                    <Button
                      label="Đặt lịch khám bệnh"
                      raised
                      icon="pi pi-calendar"
                      onClick={() => setVisible(true)}
                    />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <BookingDialog visible={visible} setVisible={setVisible} />
    </>
  );
};

export default Banner;
