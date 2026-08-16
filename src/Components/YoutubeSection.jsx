import { motion } from "framer-motion";
import { FaPhotoVideo, FaChevronRight } from "react-icons/fa";
import { Right } from "./Animation";

const YoutubeSection = () => {
      return (
            <Right >
                  <section className="w-full pt-15 px-3 py-5 sm:px-5">
                        {/* Green Main Card */}
                        <div className="mx-auto max-w-2xl rounded-[24px] border-[5px] border-white bg-white shadow-[0_4px_15px_rgba(0,0,0,0.15)]">
                              <div className="flex items-center rounded-[19px] bg-green-600 px-3 py-3 sm:px-5 sm:py-4">

                                    {/* Left Icon */}
                                    <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full border-2 border-white bg-white text-[18px] text-green-600 shadow-[0_3px_8px_rgba(0,0,0,0.15)] sm:h-[50px] sm:w-[50px] sm:text-[22px]">
                                          <FaPhotoVideo />
                                    </div>

                                    {/* Center Text */}
                                    <div className="flex flex-1 flex-col items-center justify-center px-3 text-center">
                                          <span className="text-[11px] font-medium tracking-wide text-white/90 sm:text-[14px]">
                                                আমাদের কাজ ও রিভিউ দেখতে
                                          </span>

                                          <h2 className="mt-1 text-[20px] font-extrabold leading-tight tracking-wide text-white sm:text-[27px]">
                                                ভিডিও দেখুন
                                          </h2>
                                    </div>

                                    {/* Right Arrow */}
                                    <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full border-2 border-white bg-white text-[15px] font-bold text-gray-800 shadow-[0_3px_8px_rgba(0,0,0,0.15)] transition-all duration-200 hover:scale-105 sm:h-[50px] sm:w-[50px] sm:text-[18px]">
                                          <FaChevronRight />
                                    </div>
                              </div>
                        </div>
                  </section>

                  {/* YouTube Video */}
                  <section className="bg-gray-50 px-5 pb-10">
                        <div className="mx-auto max-w-2xl overflow-hidden rounded-2xl shadow-xl">
                              <div className="relative w-full pt-[75%]">
                                    <iframe
                                          className="absolute left-0 top-0 h-full w-full"
                                          src="https://www.youtube.com/embed/BxFPRJM2858"
                                          title="YouTube video"
                                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                          allowFullScreen
                                    ></iframe>
                              </div>
                        </div>
                  </section>
            </Right>
      );
};

export default YoutubeSection;