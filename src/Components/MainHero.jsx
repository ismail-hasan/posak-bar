import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router";

import img from "../assets/pictureMan.png";

const API_URL = "https://posak-bari-backend.vercel.app/banner";

const HeroCarousel = () => {
      const [slides, setSlides] = useState([]);
      const [current, setCurrent] = useState(0);
      const [animKey, setAnimKey] = useState(0);
      const [loading, setLoading] = useState(true);

      const navigate = useNavigate();

      // ==========================================
      // FETCH LATEST 3 BANNERS
      // ==========================================
      useEffect(() => {
            const fetchBanners = async () => {
                  try {
                        const response = await fetch(API_URL);

                        if (!response.ok) {
                              throw new Error("Banner fetch failed");
                        }

                        const data = await response.json();

                        // Latest 3 data
                        const latestBanners = Array.isArray(data)
                              ? data.slice(-3).reverse()
                              : [];

                        setSlides(latestBanners);
                  } catch (error) {
                        console.error("Banner fetch error:", error);
                        setSlides([]);
                  } finally {
                        setLoading(false);
                  }
            };

            fetchBanners();
      }, []);

      // ==========================================
      // GO TO SLIDE
      // ==========================================
      const goTo = useCallback((index) => {
            setCurrent(index);
            setAnimKey((k) => k + 1);
      }, []);

      // ==========================================
      // NEXT
      // ==========================================
      const next = useCallback(() => {
            setCurrent((prev) =>
                  slides.length > 0
                        ? (prev + 1) % slides.length
                        : 0
            );

            setAnimKey((k) => k + 1);
      }, [slides.length]);

      // ==========================================
      // PREVIOUS
      // ==========================================
      const prev = useCallback(() => {
            setCurrent((prev) =>
                  slides.length > 0
                        ? (prev - 1 + slides.length) % slides.length
                        : 0
            );

            setAnimKey((k) => k + 1);
      }, [slides.length]);

      // ==========================================
      // AUTO PLAY
      // ==========================================
      useEffect(() => {
            if (slides.length <= 1) return;

            const timer = setInterval(() => {
                  next();
            }, 5000);

            return () => clearInterval(timer);
      }, [next, slides.length]);

      // ==========================================
      // LOADING
      // ==========================================
      if (loading) {
            return (
                  <div className="max-w-7xl mx-auto px-4 py-4">
                        <div className="w-full min-h-[360px] sm:min-h-[420px] lg:min-h-[480px] rounded-2xl bg-gray-100 animate-pulse" />
                  </div>
            );
      }

      // ==========================================
      // NO BANNER
      // ==========================================
      if (slides.length === 0) {
            return null;
      }

      const slide = slides[current];

      return (
            <div className="max-w-7xl mx-auto px-4 py-4">

                  <div
                        className="
                              relative
                              w-full
                              overflow-hidden
                              rounded-2xl
                              bg-gradient-to-br
                              from-[#1a0b2b]
                              via-[#26123d]
                              to-[#2f1746]
                              transition-colors
                              duration-700
                              shadow-xl
                        "
                  >

                        {/* Decorative glow */}
                        <div
                              className="
                                    pointer-events-none
                                    absolute
                                    right-1/4
                                    top-1/2
                                    -translate-y-1/2
                                    w-96
                                    h-96
                                    rounded-full
                                    blur-3xl
                                    opacity-30
                              "
                              style={{
                                    backgroundColor: "#a855f7",
                              }}
                        />

                        <div
                              className="
                                    relative
                                    flex
                                    flex-col
                                    md:flex-row
                                    items-center
                                    justify-between
                                    px-8
                                    sm:px-12
                                    lg:px-20
                                    py-12
                                    sm:py-16
                                    lg:py-20
                                    min-h-[360px]
                                    sm:min-h-[420px]
                                    lg:min-h-[480px]
                              "
                        >

                              {/* ================= LEFT TEXT ================= */}
                              <div
                                    key={animKey}
                                    className="
                                          max-w-md
                                          text-center
                                          md:text-left
                                          animate-slide-in
                                          z-10
                                    "
                              >

                                    <p
                                          className="
                                                text-xs
                                                sm:text-sm
                                                font-bold
                                                tracking-wider
                                                mb-3
                                                uppercase
                                          "
                                          style={{
                                                color: "#a855f7",
                                          }}
                                    >
                                          {slide.subtitle}
                                    </p>

                                    <h2
                                          className="
                                                text-3xl
                                                sm:text-4xl
                                                
                                                font-extrabold
                                                text-white
                                                leading-tight
                                                mb-4
                                          "
                                    >
                                          {slide.title}
                                    </h2>

                                    <p className="text-gray-300 text-sm sm:text-base mb-6">
                                          আপনার পছন্দের মানসম্মত পণ্য
                                    </p>

                                    <button
                                          onClick={() => navigate("/product")}
                                          className="
                                                px-8
                                                py-3.5
                                                bg-white
                                                text-gray-900
                                                text-sm
                                                font-bold
                                                rounded-xl
                                                hover:bg-gray-100
                                                transition-all
                                                shadow-md
                                                transform
                                                hover:-translate-y-0.5
                                                cursor-pointer
                                          "
                                    >
                                          SHOP NOW
                                    </button>

                              </div>


                              {/* ================= RIGHT IMAGE ================= */}
                              <div
                                    key={`img-${animKey}`}
                                    className="
                                          mt-8
                                          md:mt-0
                                          shrink-0
                                          animate-fade-in-up
                                          z-10
                                          flex
                                          justify-center
                                          items-center
                                    "
                              >

                                    <div
                                          className="
                                                relative
                                                w-64
                                                h-64
                                                sm:w-80
                                                sm:h-80
                                                lg:w-96
                                                lg:h-96
                                                rounded-2xl
                                                overflow-hidden
                                                border-2
                                                border-white/20
                                                shadow-2xl
                                                backdrop-blur-sm
                                                group
                                          "
                                          style={{
                                                boxShadow:
                                                      "0 25px 50px -12px #a855f766",
                                          }}
                                    >

                                          <img
                                                src={slide.image || img}
                                                alt={slide.title}
                                                className="
                                                      w-full
                                                      h-full
                                                      object-cover
                                                      transform
                                                      transition-transform
                                                      duration-700
                                                      group-hover:scale-105
                                                "
                                          />

                                          <div
                                                className="
                                                      absolute
                                                      inset-0
                                                      bg-gradient-to-t
                                                      from-black/30
                                                      via-transparent
                                                      to-transparent
                                                      pointer-events-none
                                                "
                                          />

                                    </div>

                              </div>

                        </div>


                        {/* ================= ARROWS ================= */}

                        {slides.length > 1 && (
                              <>
                                    <button
                                          onClick={prev}
                                          aria-label="Previous slide"
                                          className="
                                                absolute
                                                left-3
                                                sm:left-5
                                                top-1/2
                                                -translate-y-1/2
                                                w-10
                                                h-10
                                                rounded-full
                                                bg-black/30
                                                hover:bg-black/50
                                                text-white
                                                flex
                                                items-center
                                                justify-center
                                                transition-colors
                                                backdrop-blur-sm
                                                z-20
                                                cursor-pointer
                                          "
                                    >
                                          <ChevronLeft className="w-5 h-5" />
                                    </button>

                                    <button
                                          onClick={next}
                                          aria-label="Next slide"
                                          className="
                                                absolute
                                                right-3
                                                sm:right-5
                                                top-1/2
                                                -translate-y-1/2
                                                w-10
                                                h-10
                                                rounded-full
                                                bg-black/30
                                                hover:bg-black/50
                                                text-white
                                                flex
                                                items-center
                                                justify-center
                                                transition-colors
                                                backdrop-blur-sm
                                                z-20
                                                cursor-pointer
                                          "
                                    >
                                          <ChevronRight className="w-5 h-5" />
                                    </button>
                              </>
                        )}


                        {/* ================= DOTS ================= */}

                        {slides.length > 1 && (
                              <div
                                    className="
                                          absolute
                                          bottom-4
                                          left-1/2
                                          -translate-x-1/2
                                          flex
                                          items-center
                                          gap-2
                                          z-20
                                    "
                              >

                                    {slides.map((s, i) => (
                                          <button
                                                key={s._id}
                                                onClick={() => goTo(i)}
                                                aria-label={`Go to slide ${i + 1}`}
                                                className={`
                                                      h-2
                                                      rounded-full
                                                      transition-all
                                                      duration-300
                                                      cursor-pointer
                                                      ${i === current
                                                            ? "w-6 bg-white"
                                                            : "w-2 bg-white/40 hover:bg-white/70"
                                                      }
                                                `}
                                          />
                                    ))}

                              </div>
                        )}

                  </div>


                  {/* ================= ANIMATIONS ================= */}

                  <style>{`
                        @keyframes slideInText {
                              0% {
                                    opacity: 0;
                                    transform: translateX(-30px);
                              }

                              100% {
                                    opacity: 1;
                                    transform: translateX(0);
                              }
                        }

                        @keyframes fadeInUp {
                              0% {
                                    opacity: 0;
                                    transform: translateY(20px) scale(0.95);
                              }

                              100% {
                                    opacity: 1;
                                    transform: translateY(0) scale(1);
                              }
                        }

                        .animate-slide-in {
                              animation: slideInText 0.6s ease-out both;
                        }

                        .animate-fade-in-up {
                              animation: fadeInUp 0.7s ease-out 0.1s both;
                        }
                  `}</style>

            </div>
      );
};

export default HeroCarousel;