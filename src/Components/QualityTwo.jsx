import React from 'react';
import { FaAward, FaShippingFast } from 'react-icons/fa';
import { GiMoneyStack } from 'react-icons/gi';
import { Bottom, Left } from './Animation';

const QualityTwo = () => {
      const items = [
            {
                  id: 1,
                  icon: <GiMoneyStack className="text-white text-2xl" />,
                  title: "সাশ্রয়ী দাম",
            },
            {
                  id: 2,
                  icon: <FaAward className="text-white text-2xl" />,
                  title: "সর্বোচ্চ কোয়ালিটি",
            },
            {
                  id: 3,
                  icon: <FaShippingFast className="text-white text-2xl" />,
                  title: "ফাস্ট ডেলিভারি",
            },
      ];

      return (
            <Bottom className="pb-8 px-4 bg-white mt-5 ">
                  <div className="max-w-4xl mx-auto flex justify-around items-center gap-4">
                        {items.map((item) => (
                              <div key={item.id} className="flex flex-col items-center text-center">
                                    {/* Purple Icon Container */}
                                    <div className="w-14 h-14 bg-purple-600 rounded-full flex items-center justify-center shadow-md mb-3">
                                          {item.icon}
                                    </div>
                                    {/* Title */}
                                    <h3 className="text-gray-800 font-semibold text-sm sm:text-base">
                                          {item.title}
                                    </h3>
                              </div>
                        ))}
                  </div>
            </Bottom>
      );
};

export default QualityTwo;