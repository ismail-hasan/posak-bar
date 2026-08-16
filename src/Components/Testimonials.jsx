import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import { Right } from "./Animation";

// ----------------------------------------------------------------------
// Data
// ----------------------------------------------------------------------
const DEFAULT_TESTIMONIALS = [
      {
            id: 1,
            name: "সাইফুল ইসলাম",
            location: "ঢাকা",
            avatar: "https://i.pravatar.cc/150?img=47",
            ring: "#F7C6D9",
            title: "দারুণ মান ও সেবা",
            text: "পণ্যটির মান সত্যিই অনেক ভালো। অর্ডার করার পর খুব দ্রুত হাতে পেয়েছি। প্যাকেজিংও ছিল সুন্দর এবং নিরাপদ। সার্ভিসে আমি পুরোপুরি সন্তুষ্ট।",
      },

      {
            id: 2,
            name: "তানজিম হাসান",
            location: "চট্টগ্রাম",
            avatar: "https://i.pravatar.cc/150?img=32",
            ring: "#8FD8E8",
            title: "সেবায় মুগ্ধ হয়েছি",
            text: "অনলাইনে অর্ডার করার অভিজ্ঞতা খুবই ভালো ছিল। পণ্যটি ছবির মতোই পেয়েছি এবং কোয়ালিটিও বেশ ভালো। সময়মতো ডেলিভারি দেওয়ার জন্য ধন্যবাদ।",
      },

      {
            id: 3,
            name: "রাকিব হোসেন",
            location: "পাবনা",
            avatar: "https://i.pravatar.cc/150?img=13",
            ring: "#BFE3C9",
            title: "চমৎকার পণ্যের মান",
            text: "প্রথমবার এখান থেকে অর্ডার করেছিলাম। পণ্যের মান দেখে সত্যিই ভালো লেগেছে। দামের তুলনায় কোয়ালিটি অনেক ভালো এবং ব্যবহারেও কোনো সমস্যা হচ্ছে না।",
      },

      {
            id: 4,
            name: "মো. আরিফুল ইসলাম",
            location: "রাজশাহী",
            avatar: "https://i.pravatar.cc/150?img=45",
            ring: "#9FE0D8",
            title: "বিশ্বস্ত একটি প্রতিষ্ঠান",
            text: "পণ্য অর্ডার থেকে শুরু করে ডেলিভারি পর্যন্ত পুরো প্রক্রিয়াটিই খুব সুন্দর ছিল। কাস্টমার সার্ভিসও যথেষ্ট আন্তরিক। ভবিষ্যতেও এখান থেকে কেনাকাটা করতে চাই।",
      },

      {
            id: 5,
            name: "মেহেদী হাসান",
            location: "সিলেট",
            avatar: "https://i.pravatar.cc/150?img=12",
            ring: "#F7D6A8",
            title: "দাম অনুযায়ী অসাধারণ",
            text: "পণ্যের কোয়ালিটি এবং দাম—দুটিই আমার কাছে খুব ভালো লেগেছে। যা অর্ডার করেছি ঠিক সেটাই পেয়েছি। সব মিলিয়ে কেনাকাটার অভিজ্ঞতা দারুণ ছিল।",
      },

      {
            id: 6,
            name: "নাঈম আহমেদ",
            location: "খুলনা",
            avatar: "https://i.pravatar.cc/150?img=15",
            ring: "#D6C4F7",
            title: "আবারও অর্ডার করব",
            text: "পণ্যের মান, দ্রুত ডেলিভারি এবং সুন্দর ব্যবহার—সবকিছুই ভালো লেগেছে। প্রথম অর্ডারেই ভালো অভিজ্ঞতা পেয়েছি। অবশ্যই ভবিষ্যতে আবারও অর্ডার করব।",
      },
];

// ----------------------------------------------------------------------
// Stars
// ----------------------------------------------------------------------
function Stars() {
      return (
            <div
                  className="mb-2 flex gap-0.5 sm:mb-3"
                  aria-label="5 out of 5 stars"
            >
                  {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                              key={i}
                              className="h-3 w-3 sm:h-4 sm:w-4"
                              viewBox="0 0 24 24"
                              fill="#FFB13B"
                        >
                              <path d="M12 .9l3.1 6.6 7.2.9-5.3 5 1.4 7.2L12 17.6 5.6 20.6 7 13.4 1.7 8.4l7.2-.9L12 .9z" />
                        </svg>
                  ))}
            </div>
      );
}

// ----------------------------------------------------------------------
// Testimonial
// ----------------------------------------------------------------------
export default function Testimonial({
      testimonials = DEFAULT_TESTIMONIALS,
}) {
      return (
            <Right className="relative w-full overflow-hidden bg-linear-to-br from-[#d7f4e6] via-[#eef2fa] to-[#cfeee0] px-2.5 py-12 sm:px-4 sm:py-16 lg:px-6 lg:py-[88px]">

                  <div className="mx-auto max-w-[1280px]">

                        {/* ================= HEADER ================= */}
                        <div className="mb-7 text-center sm:mb-10 lg:mb-12">

                              <h2 className="mb-2 text-[21px] font-extrabold uppercase tracking-wide text-[#0e2233] sm:text-2xl lg:text-[28px]">
                                    গ্রাহকদের মতামত
                              </h2>

                              <p className="px-2 text-[11px] text-[#6b7a86] sm:text-[13px] lg:text-sm">
                                    আপনাদের মূল্যবান মতামত আমাদের প্রতিটি কাজকে আরও সুন্দর ও সফল করে তোলে।
                              </p>

                        </div>


                        {/* ================= SWIPER ================= */}
                        <Swiper
                              modules={[Pagination, Autoplay]}
                              spaceBetween={10}
                              slidesPerView={2}
                              centeredSlides={false}
                              grabCursor={true}
                              autoplay={{
                                    delay: 4500,
                                    disableOnInteraction: true,
                              }}
                              pagination={{
                                    clickable: true,
                              }}
                              breakpoints={{
                                    480: {
                                          slidesPerView: 2,
                                          spaceBetween: 12,
                                    },

                                    640: {
                                          slidesPerView: 2,
                                          spaceBetween: 16,
                                    },

                                    768: {
                                          slidesPerView: 2.5,
                                          spaceBetween: 20,
                                    },

                                    1024: {
                                          slidesPerView: 3,
                                          spaceBetween: 24,
                                    },

                                    1280: {
                                          slidesPerView: 4,
                                          spaceBetween: 24,
                                    },
                              }}
                              className="!pb-10"
                        >

                              {testimonials.map((t) => (
                                    <SwiperSlide
                                          key={t.id}
                                          className="flex h-auto"
                                    >

                                          {/* ================= CARD ================= */}
                                          <article className="flex h-full min-h-[255px] w-full flex-col items-center rounded-[14px] bg-white px-2 py-5 text-center shadow-[0_10px_30px_rgba(15,40,60,0.08)] sm:min-h-[280px] sm:rounded-2xl sm:px-4 sm:py-6 lg:min-h-[320px] lg:px-6 lg:py-7">

                                                {/* ================= AVATAR ================= */}
                                                <div
                                                      className="relative mb-2.5 flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-full sm:mb-4 sm:h-[58px] sm:w-[58px] lg:h-[68px] lg:w-[68px]"
                                                      style={{
                                                            background: t.ring,
                                                      }}
                                                >

                                                      <img
                                                            className="h-[42px] w-[42px] rounded-full border-2 border-white object-cover sm:h-12 sm:w-12 lg:h-14 lg:w-14"
                                                            src={t.avatar}
                                                            alt={t.name}
                                                            loading="lazy"
                                                      />

                                                      <span className="absolute -bottom-1 -right-1 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-white text-[10px] leading-none text-[#ffb13b] shadow-md sm:h-5 sm:w-5 sm:text-[11px]">
                                                            &#10077;
                                                      </span>

                                                </div>


                                                {/* ================= STARS ================= */}
                                                <Stars />


                                                {/* ================= TITLE ================= */}
                                                <h3 className="mb-1.5 text-xs font-bold leading-tight text-[#0e2233] sm:mb-2 sm:text-sm lg:text-[17px]">

                                                      {t.title}

                                                </h3>


                                                {/* ================= TEXT ================= */}
                                                <p className="mb-3 line-clamp-5 text-[10px] leading-[1.5] text-[#7c8790] sm:text-xs sm:leading-[1.6] lg:mb-[18px] lg:text-[13.5px]">

                                                      {t.text}

                                                </p>


                                                {/* ================= AUTHOR ================= */}
                                                <p className="mt-auto text-[9.5px] text-[#a3adb4] sm:text-[11px] lg:text-[13px]">

                                                      <span className="font-bold text-[#263544]">
                                                            {t.name}
                                                      </span>

                                                      <span>
                                                            {" • "}
                                                      </span>

                                                      <span>
                                                            From {t.location}
                                                      </span>

                                                </p>

                                          </article>

                                    </SwiperSlide>
                              ))}

                        </Swiper>

                  </div>


                  {/* ================= PAGINATION ================= */}
                  <style>{`
                        .swiper-pagination {
                              bottom: 0 !important;
                        }

                        .swiper-pagination-bullet {
                              width: 7px;
                              height: 7px;
                              margin: 0 4px !important;
                              background: #c7d0d6;
                              opacity: 1;
                        }

                        .swiper-pagination-bullet-active {
                              background: #0e2233;
                              transform: scale(1.15);
                        }

                        @media (min-width: 640px) {
                              .swiper-pagination-bullet {
                                    width: 8px;
                                    height: 8px;
                              }
                        }
                  `}</style>

            </Right>
      );
}