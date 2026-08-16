import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import jersey1 from "../assets/carusel5.png";
import jersey5 from "../assets/carusel1.png";
import jersey2 from "../assets/carusel2.png";
import jersey3 from "../assets/carusel3.png";
import jersey4 from "../assets/carusel4.png";
import { Left, Right } from "./Animation";

const jerseys = [
      jersey1,
      jersey2,
      jersey3,
      jersey4,
      jersey5,
];

const CaruselBanner = () => {
      const [current, setCurrent] = useState(0);

      // ================= NEXT =================
      const nextSlide = () => {
            setCurrent((prev) => (prev + 1) % jerseys.length);
      };

      // ================= PREVIOUS =================
      const prevSlide = () => {
            setCurrent(
                  (prev) =>
                        (prev - 1 + jerseys.length) %
                        jerseys.length
            );
      };

      // ================= AUTO PLAY =================
      useEffect(() => {
            const interval = setInterval(() => {
                  setCurrent((prev) => (prev + 1) % jerseys.length);
            }, 1000);

            return () => clearInterval(interval);
      }, []);

      return (
            <Right className="w-full px-3 sm:px-5 py-8 md:py-12">

                  {/* ================= TITLE ================= */}
                  <div className="w-full flex items-center justify-center mb-10 px-4">

                        <div className="flex-grow h-0.5 bg-purple-400 max-w-[100px] sm:max-w-[150px]" />

                        <div className="w-2 h-2 rounded-full bg-purple-700 mx-2" />

                        <Left className="text-center text-purple-700 text-3xl sm:text-4xl md:text-5xl font-extrabold shrink-0">
                              কালেকশন
                        </Left>

                        <div className="w-2 h-2 rounded-full bg-purple-700 mx-2" />

                        <div className="flex-grow h-0.5 bg-purple-400 max-w-[100px] sm:max-w-[150px]" />

                  </div>


                  {/* ================= CAROUSEL ================= */}
                  <div className="relative max-w-[750px] mx-auto">

                        {/* IMAGE */}
                        <div className="relative overflow-hidden shadow-2xl bg-gray-100">

                              <img
                                    src={jerseys[current]}
                                    alt={`Jersey Collection ${current + 1}`}
                                    className="
                                          block
                                          w-full
                                          aspect-square
                                          object-cover
                                          transition-all
                                          duration-1000
                                          ease-in-out
                                          hover:scale-[1.01]
                                    "
                              />

                        </div>


                        {/* ================= LEFT BUTTON ================= */}
                        <button
                              onClick={prevSlide}
                              aria-label="Previous slide"
                              className="
                                    absolute
                                    top-1/2
                                    left-2
                                    sm:left-4
                                    md:left-5
                                    -translate-y-1/2
                                    bg-purple-600
                                    hover:bg-purple-700
                                    active:scale-90
                                    text-white
                                    w-10 h-10
                                    sm:w-12 sm:h-12
                                    md:w-14 md:h-14
                                    rounded-full
                                    flex
                                    items-center
                                    justify-center
                                    shadow-xl
                                    transition-all
                                    duration-300
                                    cursor-pointer
                                    z-10
                              "
                        >
                              <ChevronLeft
                                    size={22}
                                    className="sm:w-6 sm:h-6 md:w-7 md:h-7"
                              />
                        </button>


                        {/* ================= RIGHT BUTTON ================= */}
                        <button
                              onClick={nextSlide}
                              aria-label="Next slide"
                              className="
                                    absolute
                                    top-1/2
                                    right-2
                                    sm:right-4
                                    md:right-5
                                    -translate-y-1/2
                                    bg-purple-600
                                    hover:bg-purple-700
                                    active:scale-90
                                    text-white
                                    w-10 h-10
                                    sm:w-12 sm:h-12
                                    md:w-14 md:h-14
                                    rounded-full
                                    flex
                                    items-center
                                    justify-center
                                    shadow-xl
                                    transition-all
                                    duration-300
                                    cursor-pointer
                                    z-10
                              "
                        >
                              <ChevronRight
                                    size={22}
                                    className="sm:w-6 sm:h-6 md:w-7 md:h-7"
                              />
                        </button>


                        {/* ================= DOTS ================= */}
                        <div className="flex items-center justify-center gap-2.5 sm:gap-3 mt-5 md:mt-6">

                              {jerseys.map((_, index) => (
                                    <button
                                          key={index}
                                          onClick={() =>
                                                setCurrent(index)
                                          }
                                          aria-label={`Go to slide ${index + 1}`}
                                          className={`
                                                rounded-full
                                                transition-all
                                                duration-500
                                                ease-in-out
                                                cursor-pointer

                                                ${current === index
                                                      ? "w-8 h-3 bg-purple-600"
                                                      : "w-3 h-3 bg-gray-300 hover:bg-gray-400"
                                                }
                                          `}
                                    />
                              ))}

                        </div>

                  </div>

            </Right>
      );
};

export default CaruselBanner;