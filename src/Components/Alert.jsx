import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { Bottom } from "./Animation";

const Alert = () => {
      return (
            <Bottom


                  className="w-full px-3 py-10" >
                  <div className="relative mx-auto w-full max-w-[1100px]">

                        {/* ================= HEADING ================= */}
                        <div className="absolute left-1/2 top-0 z-30 -translate-x-1/2 -translate-y-1/2">
                              <div className="relative flex h-[48px] min-w-[155px] items-center justify-center rounded-full border-[3px] border-white bg-red-700 px-8 shadow-[0_3px_8px_rgba(0,0,0,0.2)] sm:h-[54px] sm:min-w-[190px] sm:px-10">

                                    {/* Left Decoration */}


                                    {/* Heading */}
                                    <h2 className="whitespace-nowrap text-[19px] font-extrabold tracking-wide text-white sm:text-[23px] ">
                                          সতর্কতা
                                    </h2>
                              </div>
                        </div>

                        {/* ================= MAIN BORDER ================= */}
                        <div className="overflow-hidden rounded-[28px] border-[5px] border-red-600 bg-white shadow-[0_5px_18px_rgba(0,0,0,0.15)]">

                              <div className="grid grid-cols-12 items-center">

                                    {/* ================= IMAGE ================= */}
                                    <div className="col-span-5 flex min-w-0 items-center justify-center overflow-hidden">
                                          <img
                                                src="https://media.licdn.com/dms/image/v2/D4D22AQH8rcldoQwrBA/feedshare-shrink_800/B4DZr3zt8mIEAg-/0/1765094121568?e=2147483647&v=beta&t=B9R9vnOEeT7Gvzo5-G7m8F36XtxGTqwPcLjlD_RrX9o"
                                                alt="Security Alert"
                                                className="block h-auto w-full max-w-full object-contain"
                                          />
                                    </div>

                                    {/* ================= DIVIDER ================= */}
                                    <div className="col-span-1 flex items-center justify-center">
                                          <div className="h-[70px] w-[2px] rounded-full bg-[#7025C7]/40 sm:h-[110px] sm:w-[3px]" />
                                    </div>

                                    {/* ================= TEXT ================= */}
                                    <div className="col-span-6 flex min-w-0 items-center justify-center px-2 py-5 text-left sm:px-6 sm:py-8 md:px-7 md:py-10">
                                          <p className="w-full text-[14px] font-semibold leading-[1.7] text-gray-800 sm:text-[17px] md:text-[19px] md:leading-[2] text-center">
                                                স্ক্রিনে দেওয়া হটলাইন নাম্বার{" "}
                                                <span className="font-extrabold text-red-600">
                                                      (01305506395)
                                                </span>{" "}
                                                ব্যতীত কোন প্রকার যোগাযোগ বা লেনদেন করবেন না।
                                          </p>
                                    </div>

                              </div>
                        </div>

                        {/* ================= HOTLINE BUTTON ================= */}
                        <div className="absolute -bottom-9 left-1/2 z-30 -translate-x-1/2 translate-y-1/2">
                              <a
                                    href="https://wa.me/8801305506395"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 whitespace-nowrap rounded-full border-[3px] border-white bg-purple-600 px-6 py-2 text-[17px] font-extrabold text-white shadow-[0_4px_10px_rgba(0,0,0,0.25)] transition-all duration-300 hover:scale-105 hover:bg-purple-700 hover:shadow-[0_6px_15px_rgba(112,37,199,0.45)] active:scale-95 sm:px-9 sm:py-2.5 sm:text-[20px]"
                              >
                                    <FaPhoneAlt className="text-[15px] sm:text-[18px]" />
                                    <span>হটলাইন</span>
                              </a>
                        </div>

                  </div>
            </ Bottom>
      );
};

export default Alert;