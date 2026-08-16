import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Link } from "react-router";

import "swiper/css";
import { Left } from "./Animation";

const API_URL = "http://localhost:5000/category";

const MainSmallCategory = () => {
      const [categories, setCategories] = useState([]);
      const [loading, setLoading] = useState(true);

      // ==========================================
      // FETCH CATEGORY
      // ==========================================
      useEffect(() => {
            const fetchCategories = async () => {
                  try {
                        setLoading(true);

                        const response = await fetch(API_URL);

                        if (!response.ok) {
                              throw new Error(
                                    "Category data fetch করা যায়নি।"
                              );
                        }

                        const data = await response.json();

                        // শুধু যেসব object-এ slug আছে
                        const filteredCategories = Array.isArray(data)
                              ? data.filter(
                                      (item) =>
                                            item?.slug &&
                                            item?.title &&
                                            item?.image
                                )
                              : [];

                        setCategories(filteredCategories);
                  } catch (error) {
                        console.error(
                              "Category Fetch Error:",
                              error
                        );

                        setCategories([]);
                  } finally {
                        setLoading(false);
                  }
            };

            fetchCategories();
      }, []);

      return (
            <Left className="w-full bg-gradient-to-r from-blue-50 via-indigo-50/60 to-purple-50 px-3 py-8 sm:px-5 sm:py-10 lg:px-8 lg:py-12">

                  <div className="mx-auto w-full max-w-7xl">

                        {/* ==========================================
                            LOADING
                        ========================================== */}

                        {loading ? (
                              <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-5">

                                    {[1, 2, 3, 4, 5].map((item) => (
                                          <div
                                                key={item}
                                                className="h-[190px] animate-pulse rounded-2xl bg-white p-2.5 shadow-sm sm:h-[210px] sm:p-3 lg:h-[225px]"
                                          >
                                                <div className="h-[135px] w-full rounded-xl bg-gray-200 sm:h-[150px] lg:h-[165px]" />

                                                <div className="mx-auto mt-3 h-4 w-3/4 rounded bg-gray-200" />
                                          </div>
                                    ))}

                              </div>
                        ) : categories.length > 0 ? (

                              /* ==========================================
                                  CATEGORY SLIDER
                              ========================================== */

                              <Swiper
                                    modules={[Autoplay]}
                                    loop={categories.length > 5}
                                    grabCursor={true}
                                    speed={700}
                                    slidesPerView={2}
                                    spaceBetween={12}
                                    autoplay={{
                                          delay: 2800,
                                          disableOnInteraction: false,
                                          pauseOnMouseEnter: true,
                                    }}
                                    breakpoints={{
                                          0: {
                                                slidesPerView: 3,
                                                spaceBetween: 10,
                                          },

                                          480: {
                                                slidesPerView: 3,
                                                spaceBetween: 12,
                                          },

                                          640: {
                                                slidesPerView: 3,
                                                spaceBetween: 14,
                                          },

                                          768: {
                                                slidesPerView: 4,
                                                spaceBetween: 16,
                                          },

                                          1024: {
                                                slidesPerView: 5,
                                                spaceBetween: 18,
                                          },

                                          1280: {
                                                slidesPerView: 5,
                                                spaceBetween: 22,
                                          },
                                    }}
                              >
                                    {categories.map((cat) => (
                                          <SwiperSlide key={cat._id}>

                                                {/* ==========================================
                                                    CLICKABLE CATEGORY
                                                ========================================== */}

                                                <Link
                                                      to={`/product?category=${encodeURIComponent(
                                                            cat.slug
                                                      )}`}
                                                      className="block"
                                                >

                                                      <div
                                                            className="
                                                                  group
                                                                  h-[190px]
                                                                  w-full
                                                                  overflow-hidden
                                                                  rounded-2xl
                                                                  border
                                                                  border-white/80
                                                                  bg-white
                                                                  p-2.5
                                                                  shadow-[0_5px_20px_rgba(0,0,0,0.07)]
                                                                  transition-all
                                                                  duration-300
                                                                  hover:-translate-y-1
                                                                  hover:shadow-[0_10px_30px_rgba(0,0,0,0.12)]
                                                                  sm:h-[210px]
                                                                  sm:p-3
                                                                  lg:h-[225px]
                                                            "
                                                      >

                                                            {/* ==========================================
                                                                IMAGE
                                                            ========================================== */}

                                                            <div
                                                                  className="
                                                                        relative
                                                                        h-[135px]
                                                                        w-full
                                                                        overflow-hidden
                                                                        rounded-xl
                                                                        bg-gray-100
                                                                        sm:h-[150px]
                                                                        lg:h-[165px]
                                                                  "
                                                            >

                                                                  <img
                                                                        src={
                                                                              cat.image
                                                                        }
                                                                        alt={
                                                                              cat.title
                                                                        }
                                                                        loading="lazy"
                                                                        className="
                                                                              h-full
                                                                              w-full
                                                                              object-cover
                                                                              transition-transform
                                                                              duration-500
                                                                              group-hover:scale-110
                                                                        "
                                                                  />

                                                                  {/* Overlay */}

                                                                  <div
                                                                        className="
                                                                              absolute
                                                                              inset-0
                                                                              bg-gradient-to-t
                                                                              from-black/25
                                                                              via-transparent
                                                                              to-transparent
                                                                              opacity-60
                                                                        "
                                                                  />

                                                            </div>

                                                            {/* ==========================================
                                                                CATEGORY TITLE
                                                            ========================================== */}

                                                            <div className="flex h-[40px] items-center justify-center px-1">

                                                                  <h3
                                                                        className="
                                                                              line-clamp-1
                                                                              text-center
                                                                              text-xs
                                                                              font-bold
                                                                              text-gray-800
                                                                              transition-colors
                                                                              duration-300
                                                                              group-hover:text-indigo-600
                                                                              sm:text-sm
                                                                              lg:text-base
                                                                        "
                                                                  >
                                                                        {
                                                                              cat.title
                                                                        }
                                                                  </h3>

                                                            </div>

                                                      </div>

                                                </Link>

                                          </SwiperSlide>
                                    ))}
                              </Swiper>

                        ) : (

                              /* ==========================================
                                  EMPTY STATE
                              ========================================== */

                              <div className="py-8 text-center">

                                    <p className="text-sm font-medium text-gray-500">
                                          কোনো ক্যাটাগরি পাওয়া যায়নি।
                                    </p>

                              </div>

                        )}

                  </div>

            </Left>
      );
};

export default MainSmallCategory;