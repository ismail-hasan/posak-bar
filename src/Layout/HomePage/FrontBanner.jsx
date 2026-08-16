import React from "react";
import bgImage from "../../assets/bg.png";
import manImage from "../../assets/pictureMan.png";
import TextImage from "../../assets/text.png";
import { Left } from "../../Components/Animation";

const FrontBanner = () => {
      return (
            <div className="relative w-full overflow-hidden min-h-[280px] sm:min-h-0 md:min-h-0">
                  {/* Background */}
                  <div className="absolute inset-0">
                        <img
                              src={bgImage}
                              alt=""
                              className="h-full w-full object-cover"
                        />
                  </div>

                  {/* Main Content */}
                  <div className="relative z-10 flex w-full items-center justify-between mt-8">

                        {/* Left Image */}
                        <Left className="flex w-[66%] items-center justify-start">
                              <img
                                    src={TextImage}
                                    alt="Online Training"
                                    className="h-auto w-full max-w-[700px] object-contain object-left"
                              />
                        </Left>

                        {/* Right Image */}
                        <div className="flex w-[40%] items-end justify-end">
                              <img
                                    src={manImage}
                                    alt="Entrepreneur"
                                    className="h-auto max-h-[78vh] w-auto max-w-full object-contain object-right"
                              />
                        </div>
                  </div>

                  {/* Hotline Button */}
                  <div className="relative z-20 mt-2 flex justify-center pb-2 sm:-mt-3 sm:pb-3 md:-mt-4 md:pb-4">
                        <a
                              href="https://wa.me/8801305506395"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded-full border-2 border-white bg-gradient-to-b from-[#d900ff] via-[#9c00ed] to-[#6200c9] px-5 py-0.5 text-[22px] font-bold leading-tight text-white shadow-[0_3px_8px_rgba(0,0,0,0.45)] transition-all duration-300 hover:scale-105 hover:shadow-[0_5px_15px_rgba(160,0,255,0.65)] active:scale-95 sm:px-8 sm:py-1 sm:text-2xl md:border-3 md:px-12 md:py-1.5 md:text-2xl lg:border-4 lg:px-20 lg:py-2.5 lg:text-4xl"
                        >
                              হটলাইন
                        </a>
                  </div>
            </div>
      );
};

export default FrontBanner;