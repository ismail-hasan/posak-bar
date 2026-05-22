import { useState } from "react";
import heroImage from "../assets/mian2.png"
import img from "../assets/hero-img.jpg"
import mainimg from "../assets/nav.png"


/* ── Colors ── */
const C = {
      green: "red",
      red: "#f42a41",
      dark: "#002a1e",
      lightGreen: "#f0faf6",
};

/* ── Stamp Button ── */
function StampButton({ children, color, onClick }) {
      return (
            <button
                  onClick={onClick}
                  className="relative inline-flex items-center justify-center bg-transparent border-none p-0 cursor-pointer transition-transform duration-150 hover:scale-105 active:scale-95"
            >
                  <span className="relative inline-flex rounded-full p-[3px]" style={{ border: `2px solid ${color}` }}>
                        <span
                              className="flex items-center gap-2 rounded-full px-5 py-2 text-sm font-bold"
                              style={{ border: `2px solid ${color}`, color }}
                        >
                              <span className="block w-2.5 h-0.5 rounded" style={{ background: color }} />
                              {children}
                              <span className="block w-2.5 h-0.5 rounded" style={{ background: color }} />
                        </span>
                  </span>
            </button>
      );
}

/* ── Header ── */
function Header() {
      return (
            <>
                  <header
                        className="sticky bg-black  py-5 top-0 z-50 flex items-center justify-between px-4 shadow-md"
                  >
                        <div>
                              <img className="w-[130px]" src={mainimg} alt="" />
                        </div>

                        <div className="md:text-xl sm:text-[14px] text-white">
                              ✉️ example@gmail.com
                        </div>
                  </header>
            </>
      );
}

/* ── Hero ── */
function Hero() {
      return (
            <>
                  <section className="relative text-center px-5 py-20 border-b overflow-hidden">
                        dfsdfsdf
                        {/* Background Image */}
                        <div className="absolute inset-0">
                              <img
                                    src={img}
                                    alt="Background"
                                    className="w-full h-full object-cover"
                              />

                              {/* Black Overlay */}
                              <div className="absolute inset-0 bg-black/90"></div>

                              {/* Optional Blur */}
                              <div className="absolute inset-0 backdrop-blur-[2px]"></div>
                        </div>

                        {/* Content */}
                        <div className="relative z-10 max-w-4xl mx-auto">

                              <p className="sm:text-[12px] md:text-2xl leading-loose text-white mb-5 font-medium">
                                    সম্মানিত গ্রাহক/বন্ধু সকল...... আসসালামু আলাইকুম।<br />

                                    <span
                                          className="font-bold"
                                          style={{ color: C.red }}
                                    >
                                          "পোষাক বাড়ি"
                                    </span>{" "}
                                    তে আপনাদেরকে জানাই স্বেচ্ছা-অভিনন্দন। <br></br>
                                    একমাত্র প্রতারণামুক্ত সহজ ও নিরাপদ অনলাইন শপিং।

                              </p>

                              <div className="flex justify-center mt-10">
                                    <img
                                          src={heroImage}
                                          className="w-8/12 md:w-5/12 object-cover rounded-2xl shadow-2xl"
                                          alt=""
                                    />
                              </div>

                        </div>

                  </section>
            </>


            // <div className="relative w-full h-screen overflow-hidden">
            //       <img
            //             src={img}
            //             alt="Hero"
            //             className="absolute inset-0 w-full h-full object-cover"
            //       />
            //       <div className="absolute inset-0 bg-gradient-to-b from-white via-white via-[75%] to-blue-600 mix-blend-multiply"></div>
            //       <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
            //             <h1 className="text-4xl md:text-6xl font-black text-gray-900">আপনার হেডিং</h1>
            //       </div>
            // </div>
      );
}

/* ── Marquee ── */
function Marquee() {
      const text = "আমাদের লভ্যাংশের  কিছু অংশ  গরিব-অসহায়, এতীম-মিসকিন, মসজিদ-মাদ্রাসা ও দ্বীনি কাজে দান করা হয়। যার ৫০% শেয়ার গ্রাহক এবং ৫০% শেয়ার পোশাক বাড়ি তাই নিঃসন্দেহে সহজ ও নিরাপদে পোশাক বাড়িতে শপিং করুন, সওয়াবের ভাগিদার হউন }";

      return (
            <div className="overflow-hidden py-2" style={{ background: C.green }}>
                  <style>{`
                        @keyframes marqueeScroll {
                              from { transform: translateX(0); }
                              to { transform: translateX(-50%); }
                        }
                        .marquee-track { animation: marqueeScroll 25s linear infinite; }
                        .marquee-track:hover { animation-play-state: paused; }
                  `}</style>

                  <div className="marquee-track flex whitespace-nowrap">
                        {[0, 1].map((i) => (
                              <span key={i} className="text-[#d4fff4] text-sm pr-10 flex-shrink-0">
                                    ★ {text} ★
                              </span>
                        ))}
                  </div>
            </div>
      );
}

/* ── Buttons ── */
function ActionButtons() {
      return (
            <>
                  {/* <div className="flex gap-5 justify-center py-5 bg-white border-b">
                  <StampButton color={C.red} onClick={() => alert("Support")}>
                        🎧 Support
                  </StampButton>
                  <StampButton color={C.green} onClick={() => alert("Order")}>
                        🛒 Order Now
                  </StampButton>
            </div> */}
            </>
      );
}

/* ── CTA Cards ── */
function CTASection() {
      return (
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-gray-50 border-b">
                  {/* <CTACard
                        label="কোম্পানীর"
                        title="প্রোফাইল"
                        sub="দেখতে"
                        color={C.red}
                  />
                  <CTACard
                        label="অনলাইনে"
                        title="কেনাকাটা"
                        sub="করতে"
                        color={C.green}
                  /> */}
            </section>
      );
}

function CTACard({ label, title, sub, color }) {
      return (
            <div className="bg-white rounded-xl p-4 text-center shadow-sm border">
                  <div className="text-xs text-left pl-2 border-l-4" style={{ borderColor: color }}>
                        {label}
                  </div>

                  <div className="text-2xl font-black my-2" style={{ color }}>
                        {title}
                  </div>

                  <div className="text-xs text-right pr-2 border-r-4 mb-2" style={{ borderColor: color }}>
                        {sub}
                  </div>

                  <button
                        className="w-full py-2 text-white font-bold rounded"
                        style={{ background: color }}
                  >
                        এখানে ক্লিক করুন
                  </button>
            </div>

      );
}

/* ── Info Section ── */
function InfoSection() {
      return (
            <>
                  <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-cyan-200 via-emerald-100 to-yellow-100 p-6 font-sans py-16">



                        {/* ১. উপরের হেডিং টাইটেল সেকশন */}
                        <div className="text-center mb-5 max-w-2xl px-4">
                              <h2 className="text-3xl md:text-5xl font-black text-gray-800 mb-4 tracking-wide drop-shadow-sm">
                                    আমাদের সাথে <span className="text-blue-700">যোগাযোগ</span>  করতে
                              </h2>
                              <div className="h-1.5 w-32 bg-gradient-to-r from-blue-600 to-green-500 mx-auto rounded-full mb-4"></div>
                              <p className="text-gray-650 text-base md:text-lg font-medium">
                                    আমাদের সেবার মান আরও উন্নত করতে আপনার যেকোনো অভিযোগ বা সুচিন্তিত পরামর্শ নিচে আমাদের লিখে জানাতে পারেন।
                              </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl w-full px-4 mt-4">

                              {/* বাটন কার্ড ১: কাস্টমার সাপোর্ট */}
                              <button className="flex items-center justify-between p-5 bg-white hover:bg-blue-50 border-2 border-blue-600/3xl rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg group text-left">
                                    <div className="flex items-center space-x-4">
                                          <div className="p-3 bg-blue-100 text-blue-700 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                                                {/* কাস্টমার কেয়ার আইকন (SVG) */}
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                      <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                                                </svg>
                                          </div>
                                          <div>
                                                <h4 className="text-xl font-bold text-gray-800">লাইভ সাপোর্ট</h4>
                                                <p className="text-sm text-gray-500">সরাসরি এজেন্টের সাথে কথা বলুন</p>
                                          </div>
                                    </div>
                                    <div className="text-blue-600 font-bold text-xl group-hover:translate-x-1 transition-transform">➔</div>
                              </button>

                              {/* বাটন কার্ড ২: আমাদের হটলাইন */}
                              <button className="flex items-center justify-between p-5 bg-white hover:bg-green-50 border-2 border-green-600/3xl rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg group text-left">
                                    <div className="flex items-center space-x-4">
                                          <div className="p-3 bg-green-100 text-green-700 rounded-xl group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
                                                {/* ফোন আইকন (SVG) */}
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                </svg>
                                          </div>
                                          <div>
                                                <h4 className="text-xl font-bold text-gray-800">জরুরী হটলাইন</h4>
                                                <p className="text-sm text-gray-500">যেকোনো সময় কল করুন আমাদের</p>
                                          </div>
                                    </div>
                                    <div className="text-green-600 font-bold text-xl group-hover:translate-x-1 transition-transform">➔</div>
                              </button>

                        </div>

                        {/* ২. মূল দুটি অভিযোগ ও পরামর্শ কার্ড */}
                        <div className="mt-15 grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl w-full px-4 mb-20">

                              {/* অভিযোগ কার্ড */}
                              <div className="relative border-4 border-blue-800 rounded-3xl bg-white/90 p-8 flex flex-col items-center text-center shadow-xl backdrop-blur-sm pt-12 pb-14">
                                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-blue-700 text-white font-bold text-2xl px-10 py-2 rounded-full border-2 border-white shadow-md min-w-[160px]">
                                          অভিযোগ
                                    </div>

                                    <div className="text-gray-800 text-lg md:text-xl font-semibold leading-relaxed space-y-3 flex-grow mt-2">
                                          <p className="text-xl md:text-2xl font-bold text-gray-900">সম্মানিত গ্রাহক,</p>
                                          <p>আমাদের প্রতিষ্ঠান/সার্ভিস সম্পর্কে কোন অভিযোগ থাকলে তা আমাদের কাছে লিখে পাঠিয়ে দিন। আপনার অভিযোগ প্রমাণিত হলে আমরা যথারীতি ব্যবস্থা/সংশোধন করিব।</p>
                                          <p>আপনার অভিযোগ/মন্তব্য আমাদের কাছে অত্যন্ত গুরুত্বপূর্ণ।</p>
                                    </div>

                                    <button className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xl px-8 py-2 rounded-lg shadow-lg border border-blue-900 transition-all duration-200 active:scale-95 whitespace-nowrap">
                                          ক্লিক করুন
                                    </button>
                              </div>

                              {/* পরামর্শ কার্ড */}
                              <div className="relative border-4 border-green-700 rounded-3xl bg-white/90 p-8 flex flex-col items-center text-center shadow-xl backdrop-blur-sm pt-12 pb-14">
                                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-green-600 text-white font-bold text-2xl px-10 py-2 rounded-full border-2 border-white shadow-md min-w-[160px]">
                                          পরামর্শ
                                    </div>

                                    <div className="text-gray-800 text-lg md:text-xl font-semibold leading-relaxed space-y-3 flex-grow mt-2">
                                          <p className="text-xl md:text-2xl font-bold text-gray-900">সম্মানিত গ্রাহক,</p>
                                          <p>আমাদের প্রতিষ্ঠান/সার্ভিস সম্পর্কে কোন পরামর্শ থাকলে তা আমাদের কাছে লিখে পাঠিয়ে দিন। আপনার পরামর্শ গ্রহণযোগ্য হলে আমরা যথারীতি তা মেনে চলবো।</p>
                                          <p>আপনার পরামর্শ/মন্তব্য আমাদের কাছে অত্যন্ত গুরুত্বপূর্ণ।</p>
                                    </div>

                                    <button className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-green-600 hover:bg-green-700 text-white font-bold text-xl px-8 py-2 rounded-lg shadow-lg border border-green-800 transition-all duration-200 active:scale-95 whitespace-nowrap">
                                          ক্লিক করুন
                                    </button>
                              </div>

                        </div>



                  </div>

            </>
      );
}

function InfoCard({ title, color, body }) {
      return (
            <div className="bg-white rounded-xl p-3 shadow-sm border-t-4" style={{ borderColor: color }}>
                  <div className="text-white text-sm font-bold px-3 py-1 rounded-full inline-block mb-2" style={{ background: color }}>
                        {title}
                  </div>

                  <p className="text-xs text-gray-600 text-center min-h-[80px]">{body}</p>

                  <button className="mt-3 block mx-auto px-4 py-1.5 text-white rounded" style={{ background: color }}>
                        ক্লিক করুন
                  </button>
            </div>
      );
}

/* ── Footer ── */
function Footer() {
      return (
            <footer className="text-center bg-blue-700 text-white py-4 text-xs text-white">
                  © 2024 পোষাক বাড়ি | www.pusakbari.com
            </footer>
      );
}

/* ── MAIN APP (FIXED RESPONSIVE WRAPPER) ── */
export default function PusakBari() {
      return (
            <>
                  <style>{`
                        @import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;600;700&display=swap');
                        * { font-family: 'Hind Siliguri', sans-serif; }
                  `}</style>

                  {/* FULL WIDTH BACKGROUND */}
                  <div className="w-full min-h-screen bg-gray-100">

                        {/* RESPONSIVE CONTAINER */}
                        <div className="w-full sm:max-w-[520px] md:max-w-[900px] lg:max-w-[1100px] xl:max-w-[1200px] mx-auto bg-white shadow-lg">

                              <Header />
                              <Hero />
                              <Marquee />
                              <ActionButtons />
                              <CTASection />
                              <InfoSection />
                              <Footer />

                        </div>
                  </div>
            </>
      );
}