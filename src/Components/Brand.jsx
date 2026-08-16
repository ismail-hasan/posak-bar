import { Link } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import { Right } from "./Animation";

const brands = [
      {
            id: 1,
            name: "Digimate",
            image: "https://ecommax.risingbamboo.com/wp-content/uploads/2024/05/brand-8.png",
      },
      {
            id: 2,
            name: "Automize",
            image: "https://ecommax.risingbamboo.com/wp-content/uploads/2024/05/brand-4.png",
      },
      {
            id: 3,
            name: "Envato",
            image: "https://ecommax.risingbamboo.com/wp-content/uploads/2024/05/brand-5.png",
      },
      {
            id: 4,
            name: "eCommax",
            image: "https://ecommax.risingbamboo.com/wp-content/uploads/2024/05/brand-6.png",
      },
      {
            id: 5,
            name: "Vapor Shop",
            image: "https://ecommax.risingbamboo.com/wp-content/uploads/2024/05/brand-7.png",
      },
      {
            id: 6,
            name: "DemoX",
            image: "https://ecommax.risingbamboo.com/wp-content/uploads/2024/05/brand-2.png",
      },
];

const Brand = () => {
      return (
            <Right className="py-10 sm:py-16">
                  <div className="w-full max-w-7xl mx-auto px-3 sm:px-4">
                        <Swiper
                              modules={[Autoplay]}
                              loop={true}
                              grabCursor={true}
                              speed={700}
                              slidesPerView={3}
                              spaceBetween={10}
                              autoplay={{
                                    delay: 3000,
                                    disableOnInteraction: false,
                                    pauseOnMouseEnter: true,
                              }}
                              breakpoints={{
                                    0: {
                                          slidesPerView: 3,
                                          spaceBetween: 8,
                                    },
                                    640: {
                                          slidesPerView: 3,
                                          spaceBetween: 12,
                                    },
                                    768: {
                                          slidesPerView: 4,
                                          spaceBetween: 16,
                                    },
                                    1024: {
                                          slidesPerView: 5,
                                          spaceBetween: 20,
                                    },
                                    1280: {
                                          slidesPerView: 6,
                                          spaceBetween: 24,
                                    },
                              }}
                        >
                              {brands.map((brand) => (
                                    <SwiperSlide key={brand.id}>
                                          <div>
                                                <div className="group h-[90px] sm:h-[110px] md:h-[130px] bg-white rounded-xl sm:rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center overflow-hidden">
                                                      <img
                                                            src={brand.image}
                                                            alt={brand.name}
                                                            draggable={false}
                                                            className="w-[75%] h-[75%] object-contain transition-transform duration-300 group-hover:scale-110"
                                                      />
                                                </div>
                                          </div>
                                    </SwiperSlide>
                              ))}
                        </Swiper>
                  </div>
            </Right>
      );
};

export default Brand;