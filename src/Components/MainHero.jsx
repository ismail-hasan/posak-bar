import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Link } from "lucide-react";
import { useNavigate } from "react-router";
import img from "../assets/pictureMan.png"

const slides = [
      {
            id: 1,
            eyebrow: "মানসম্মত জার্সির সংগ্রহ",
            title: "আপনার পছন্দের জার্সি",
            cta: "SHOP NOW",
            gradient: "from-[#1a0b2b] via-[#26123d] to-[#2f1746]",
            accent: "#a855f7",
      },
      {
            id: 2,
            eyebrow: "বাছাই করা মানসম্মত পণ্যের সমাহার",
            title: "মানসম্মত প্রস্তুতকারক পণ্য",
            cta: "SHOP NOW",
            gradient: "from-[#0b1b2b] via-[#0e2a3d] to-[#123146]",
            accent: "#38bdf8",
            image: "https://images.openai.com/static-rsc-4/VkewwUshIEi3vFno3FBAaW93O0b4L7MTY9kCUFoHUneJEywa2fXyr4Z8FgTQDtt0ZaZM44ppzzL4a8-rSTb_X2WRfMjx1jJjVMOUdS0v-tQQLKL8rbph2LDLCyWOvyiXlS5c5RxusB3WyFPDmsNPoG10PotVp07X2U4-9phJUOdY-1_2KtbgsZ3YPE2I9A6W?purpose=fullsize",
      },
      {
            id: 3,
            eyebrow: "আপনার প্রয়োজনের সেরা গ্যাজেটগুলো",
            title: "আধুনিক ইলেকট্রনিক্স পণ্য",
            cta: "SHOP NOW",
            gradient: "from-[#0b2b1a] via-[#0e3d26] to-[#12462f]",
            accent: "#34d399",
            image: "https://images.openai.com/static-rsc-4/8VV4bIeQYrppdFukYrtWGefQPSQCoCkhX6S7VFvsjg2-a8N0nHItGJQfxlbD1Hi7io2spQKslHgTL24o2mq8mH2LawqEfF6Dl_jQT8TS82zIcGkrIRDl2KIcQDlDERZMGNjO4mPkzeXOpOa6ztstqMfBOLCH9wBNNj9HXkdb3Hc?purpose=inline",
      },
];

const HeroCarousel = () => {
      const [current, setCurrent] = useState(0);
      const [animKey, setAnimKey] = useState(0);
      const navigate = useNavigate();

      const goTo = useCallback((index) => {
            setCurrent(index);
            setAnimKey((k) => k + 1);
      }, []);

      const next = useCallback(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
            setAnimKey((k) => k + 1);
      }, []);

      const prev = () => {
            setCurrent((p) => (p - 1 + slides.length) % slides.length);
            setAnimKey((k) => k + 1);
      };

      useEffect(() => {
            const timer = setInterval(next, 5000);
            return () => clearInterval(timer);
      }, [next]);

      const slide = slides[current];

      return (
            <div className="max-w-7xl mx-auto px-4 py-4">
                  <div
                        className={`relative w-full overflow-hidden rounded-2xl bg-gradient-to-br ${slide.gradient} transition-colors duration-700 shadow-xl`}
                  >
                        {/* decorative glow */}
                        <div
                              className="pointer-events-none absolute right-1/4 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl opacity-30"
                              style={{ backgroundColor: slide.accent }}
                        />

                        <div className="relative flex flex-col md:flex-row items-center justify-between px-8 sm:px-12 lg:px-20 py-12 sm:py-16 lg:py-20 min-h-[360px] sm:min-h-[420px] lg:min-h-[480px]">

                              {/* Left text */}
                              <div key={animKey} className="max-w-md text-center md:text-left animate-slide-in z-10">
                                    <p
                                          className="text-xs sm:text-sm font-bold tracking-wider mb-3 uppercase"
                                          style={{ color: slide.accent }}
                                    >
                                          {slide.eyebrow}
                                    </p>
                                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">
                                          {slide.title}
                                    </h2>
                                    <p className="text-gray-300 text-sm sm:text-base mb-6">
                                          {slide.priceLabel}{" "}
                                          <span className="text-white font-bold text-lg sm:text-xl">
                                                {slide.price}
                                          </span>
                                    </p>
                                    <button
                                          onClick={() => navigate("/product")}
                                          className="px-8 py-3.5 bg-white text-gray-900 text-sm font-bold rounded-xl hover:bg-gray-100 transition-all shadow-md transform hover:-translate-y-0.5 cursor-pointer"
                                    >
                                          {slide.cta}
                                    </button>

                              </div>

                              {/* Right visual (Centered, larger image size) */}
                              <div key={`img-${animKey}`} className="mt-8 md:mt-0 shrink-0 animate-fade-in-up z-10 flex justify-center items-center">
                                    <div
                                          className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl backdrop-blur-sm group"
                                          style={{
                                                boxShadow: `0 25px 50px -12px ${slide.accent}66`,
                                          }}
                                    >
                                          <img
                                                src={slide.image || img}
                                                alt={slide.title}
                                                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                                          />
                                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                                    </div>
                              </div>


                        </div>

                        {/* Arrows */}
                        <button
                              onClick={prev}
                              aria-label="Previous slide"
                              className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition-colors backdrop-blur-sm z-20"
                        >
                              <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                              onClick={next}
                              aria-label="Next slide"
                              className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition-colors backdrop-blur-sm z-20"
                        >
                              <ChevronRight className="w-5 h-5" />
                        </button>

                        {/* Dots */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
                              {slides.map((s, i) => (
                                    <button
                                          key={s.id}
                                          onClick={() => goTo(i)}
                                          aria-label={`Go to slide ${i + 1}`}
                                          className={`h-2 rounded-full transition-all duration-300 ${i === current ? "w-6 bg-white" : "w-2 bg-white/40 hover:bg-white/70"
                                                }`}
                                    />
                              ))}
                        </div>
                  </div>

                  {/* Keyframes */}
                  <style>{`
                        @keyframes slideInText {
                              0% { opacity: 0; transform: translateX(-30px); }
                              100% { opacity: 1; transform: translateX(0); }
                        }
                        @keyframes fadeInUp {
                              0% { opacity: 0; transform: translateY(20px) scale(0.95); }
                              100% { opacity: 1; transform: translateY(0) scale(1); }
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