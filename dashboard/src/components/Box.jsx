import React from "react";

const Box = ({ icon, heading, number, color }) => {
  const displayBoxColor = (val) => {
    if (!val) return;

    switch (val) {
      case "red":
        return "bg-red-500";
      case "blue":
        return "bg-blue-500";
      case "green":
        return "bg-green-500";
      case "amber":
        return "bg-amber-500";
      case "purple":
        return "bg-purple-500";
      case "pink":
        return "bg-pink-500";
      case "cyan":
        return "bg-cyan-500";
      case "teal":
        return "bg-teal-500";
      default:
        return "bg-white";
    }
  };

  return (
    <div className="border bg-gray-100  border-blue-gray-100 rounded-sm flex items-center gap-5">
      <div
        className={`${displayBoxColor(
          color
        )} aspect-square w-[100px] hover:opacity-80 transition-all h-[100px] flex-shrink-0 flex items-center justify-center`}
      >
        {icon}
      </div>
      <div className="space-y-2">
        <h1 className="font-semibold text-xl">{heading}</h1>
        <p className="font-bold text-xl">{number}</p>
      </div>
    </div>
  );
};

export default Box;
