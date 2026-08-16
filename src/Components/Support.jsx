import React from "react";
import { FaAward, FaShippingFast } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import { Right } from "./Animation";

const Support = () => {
  const items = [
    {
      id: 1,
      icon: <GiMoneyStack className="text-white text-xl sm:text-2xl" />,
      title: "সাশ্রয়ী দাম",
    },
    {
      id: 2,
      icon: <FaAward className="text-white text-xl sm:text-2xl" />,
      title: "সর্বোচ্চ কোয়ালিটি",
    },
    {
      id: 3,
      icon: <FaShippingFast className="text-white text-xl sm:text-2xl" />,
      title: "ফাস্ট ডেলিভারি",
    },
  ];

  return (
    <Right
      className="w-full py-8 sm:py-10 px-2 sm:px-4"
      style={{
        background:
          "linear-gradient(100deg, #cdf3e2 0%, #dff2ea 22%, #eaf1f0 40%, #eef2fa 62%, #dfe9f7 82%, #d6e8f5 100%)",
      }}
    >
      <div className="max-w-4xl mx-auto flex justify-around items-center gap-2 sm:gap-4">
        {items.map((item) => (
          <div key={item.id} className="flex flex-col items-center text-center w-1/3">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-purple-600 rounded-full flex items-center justify-center shadow-md mb-2 sm:mb-3">
              {item.icon}
            </div>

            <h3 className="text-gray-800 font-semibold text-[11px] sm:text-sm md:text-base leading-tight">
              {item.title}
            </h3>
          </div>
        ))}
      </div>
    </Right>
  );
};

export default Support;