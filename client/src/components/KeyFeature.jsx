import React from "react";
import { KEYFEATURE_DATA } from "../utils/constants";

const KeyFeature = () => {
  return (
    <div className="page-container">
      <div className="text-center space-y-3">
        <h1 className="font-semibold text-4xl">
          Các tính năng chính của chúng tôi
        </h1>
        <p>Hãy xem một số tính năng chính của chúng tôi</p>
      </div>

      <div className="mt-10 grid grid-cols-3 gap-5">
        {KEYFEATURE_DATA.map((item) => (
          <div
            key={item.title}
            className="shadow-lg border border-blue-100 flex gap-5 flex-col justify-center items-center rounded-md  hover:bg-blue-500 hover:text-white transition-all aspect-square px-5"
          >
            <div className="flex items-center justify-center rounded-full bg-black text-white w-[90px] h-[90px]">
              {item.icon}
            </div>
            <h1 className="text-xl font-semibold">{item.title}</h1>
            <p className="text-center">{item.caption}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeyFeature;
