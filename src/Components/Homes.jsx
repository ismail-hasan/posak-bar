import React, { useEffect, useState } from "react";


import {
      ChevronLeft,
      ChevronRight,
      Phone,
      MessageCircle,
} from "lucide-react";

import {
      FaFacebookF,
      FaInstagram,
      FaYoutube,
      FaFacebookMessenger,
      FaWhatsapp,
} from "react-icons/fa";

/* =========================
   IMAGES
========================= */

import logo from "../assets/logo.png";

import jersey1 from "../assets/ji.jpg";
import jersey2 from "../assets/main.png";
import jersey3 from "../assets/ji.jpg";

/* =========================
   COMPONENT
========================= */

const Homes = () => {
      /* =========================
         CAROUSEL DATA
      ========================= */

      const jerseys = [jersey1, jersey2, jersey3];

      const [current, setCurrent] = useState(0);

      /* =========================
         NEXT SLIDE
      ========================= */

      const nextSlide = () => {
            setCurrent((prev) => (prev + 1) % jerseys.length);
      };

      /* =========================
         PREVIOUS SLIDE
      ========================= */

      const prevSlide = () => {
            setCurrent((prev) => (prev - 1 + jerseys.length) % jerseys.length);
      };

      /* =========================
         AUTO SLIDE
      ========================= */

      useEffect(() => {
            const interval = setInterval(() => {
                  nextSlide();
            }, 3000);

            return () => clearInterval(interval);
      }, []);

      /* =========================
         JSX
      ========================= */

      return (
            <div className="w-full overflow-hidden bg-[#f4f4f4]">

                  {/* ======================================================
          TOP HEADER
      ====================================================== */}

                  <div className="bg-[#001eff] py-6 px-3">

                        <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-3">

                              {/* LOGO */}
                              <img
                                    src={logo}
                                    alt="logo"
                                    className="w-[110px] md:w-[200px] object-contain"
                              />

                              {/* EMAIL */}
                              <p className="text-white text-[10px] md:text-[14px] font-semibold text-right break-all">
                                    Gmail: posakbari4u@gmail.com
                              </p>

                        </div>

                  </div>

                  {/* ======================================================
          MARQUEE SECTION
      ====================================================== */}

                  <div className="bg-red-600 border-y-[8px] border-white py-2">

                        <marquee
                              behavior="scroll"
                              direction="left"
                              className="text-white font-bold text-sm md:text-2xl"
                        >
                              আসসালামু আলাইকুম... সম্মানিত গ্রাহক / বন্ধু সকলকে “পোশাক বাড়ি”
                              তে স্বাগতম।
                        </marquee>

                  </div>

                  {/* ======================================================
          GREEN CONTENT SECTION
      ====================================================== */}

                  <section className="bg-[#007600] text-center px-4 pt-10 pb-0">

                        {/* TITLE */}
                        <h1 className="inline-block text-yellow-300 mt-5 text-2xl md:text-5xl font-extrabold leading-tight border-b-4 border-dashed border-yellow-300 pb-5">
                              আমাদের বৈশিষ্ট্য ও বিশেষত্ব
                        </h1>

                        {/* DESCRIPTION */}
                        <p className="text-white mt-5 text-sm md:text-xl leading-relaxed font-semibold max-w-[850px] mx-auto">

                              আমাদের লভ্যাংশের কিছু অংশ গরিব-অসহায় <br></br>
                              এতিম-মিসকিন, মসজিদ-মাদ্রাসা ও দ্বীনি কাজে দান করা হয়। <br></br>
                              যার ৫০% শেয়ার গ্রাহক এবং ৫০% শেয়ার "পোশাক বাড়ি" <br></br>
                              তাই নিঃসন্দেহে সহজ ও নিরাপদে পোশাক বাড়িতে <br></br>
                              শপিং করুন, সওয়াবের ভাগীদার হোন। <br></br>

                        </p>

                  </section>

                  {/* ======================================================
          DOUBLE CURVE SVG
      ====================================================== */}

                  <div className="relative bg-[#007600] overflow-hidden">

                        <svg
                              className="w-full h-[120px] md:h-[220px] block"
                              viewBox="0 0 1440 320"
                              preserveAspectRatio="none"
                        >

                              {/* BACK CURVE */}
                              <path
                                    fill="#bdbdbd"
                                    d="
            M0,160
            C120,70 240,70 360,160
            C480,250 600,250 720,160
            C840,70 960,70 1080,160
            C1200,250 1320,250 1440,160
            L1440,320
            L0,320
            Z
            "
                              />

                              {/* FRONT CURVE */}
                              <path
                                    fill="#f5f5f5"
                                    d="
            M0,190
            C120,100 240,100 360,190
            C480,280 600,280 720,190
            C840,100 960,100 1080,190
            C1200,280 1320,280 1440,190
            L1440,320
            L0,320
            Z
            "
                              />

                        </svg>

                  </div>

                  {/* ======================================================
          CUSTOM DESIGN BOX
      ====================================================== */}

                  <section className="bg-[#f5f5f5] px-4 py-12">

                        <div className="max-w-[850px] mx-auto">

                              <div className="border-[12px] border-blue-700 bg-white rounded-xl p-5 md:p-10 text-center shadow-2xl">

                                    <h1 className="text-[#00a000] text-xl md:text-4xl font-extrabold leading-snug">

                                          আপনি কি নিজের পছন্দমত  <br></br>
                                          ডিজাইন দিয়ে সরাসরি কারখানা   <br></br>
                                          মেশিনে
                                          কাস্টোমাইজ <span className=" text-red-600 md:text-[42px]">জার্সি <br></br>
                                          </span> তৈরি করতে চান ?

                                    </h1>

                              </div>

                        </div>

                  </section>

                  {/* ======================================================
          POSAK BARI BOX
      ====================================================== */}

                  <section className="bg-[#007600] px-4 py-8 pb-[100px]">
                        <h3 className="text-center text-yellow-300 text-3xl font-semibold pb-6 mt-10 ">তাহলে আপানার পাশে আছে</h3>

                        <div className="max-w-[900px] mx-auto border-[5px] border-white p-4 mb-10  
                        
                        ">

                              <div className="bg-white rounded-lg py-8 px-4 text-center mb-[10px]">

                                    {/* LOGO */}
                                    <img
                                          src={logo}
                                          alt="logo"
                                          className="w-[220px] md:w-[520px] mx-auto"
                                    />

                                    {/* TEXT */}


                              </div>

                              <div className="w-full flex justify-center -mb-13 relative z-10">
                                    <p className="text-white bg-red-600 inline-block font-bold text-sm md:text-xl px-4 py-2 text-center">
                                          সততা ও মানবতার মাধ্যমে কাজই আমাদের মূল উদ্দেশ্য
                                    </p>
                              </div>
                        </div>


                  </section>

                  {/* ======================================================
          COLLECTION SECTION
      ====================================================== */}

                  <section className="bg-white px-4 py-12">

                        {/* TITLE */}
                        <h1 className="text-center text-[#1536d3] text-3xl md:text-5xl font-extrabold mb-10">

                              কালেকশন

                        </h1>

                        {/* ================= CAROUSEL ================= */}

                        <div className="relative max-w-[750px] mx-auto">

                              {/* IMAGE */}
                              <div className="overflow-hidden rounded-2xl shadow-2xl">

                                    <img
                                          src={jerseys[current]}
                                          alt="jersey"
                                          className="w-full h-[250px] md:h-[520px] object-cover duration-500"
                                    />

                              </div>

                              {/* LEFT BUTTON */}
                              <button
                                    onClick={prevSlide}
                                    className="absolute top-1/2 left-3 md:left-5 -translate-y-1/2 bg-red-600 hover:bg-red-700 text-white w-11 h-11 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-xl"
                              >

                                    <ChevronLeft size={28} />

                              </button>

                              {/* RIGHT BUTTON */}
                              <button
                                    onClick={nextSlide}
                                    className="absolute top-1/2 right-3 md:right-5 -translate-y-1/2 bg-red-600 hover:bg-red-700 text-white w-11 h-11 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-xl"
                              >

                                    <ChevronRight size={28} />

                              </button>

                              {/* DOTS */}
                              <div className="flex items-center justify-center gap-3 mt-6">

                                    {jerseys.map((_, index) => (

                                          <button
                                                key={index}
                                                onClick={() => setCurrent(index)}
                                                className={`w-4 h-4 rounded-full ${current === index
                                                      ? "bg-red-600"
                                                      : "bg-gray-400"
                                                      }`}
                                          />

                                    ))}

                              </div>

                        </div>

                  </section>

                  {/* ======================================================
          PRODUCT BANNER
      ====================================================== */}

                  <section className="bg-white px-4 pb-10">
                        <div className="w-full flex justify-center">
                              <h4 className="text-center text-2xl text-white mb-7 px-6 py-3 inline-block bg-[#0d2f85]">
                                    শপিং পলিসি সম্পর্কে জানুন
                              </h4>
                        </div>

                        <div className="max-w-[900px] mx-auto bg-[#0d2f85] rounded-xl p-4 shadow-2xl">

                              <div className="flex flex-col md:flex-row items-center gap-5">

                                    {/* IMAGE */}
                                    <img
                                          src={jersey1}
                                          alt=""
                                          className="w-fit md:w-[320px] rounded-lg p-3 bg-white"
                                    />

                                    {/* CONTENT */}
                                    <div className="flex-1 space-y-4 w-full">

                                          <div className="bg-white text-red-600 font-bold py-3 px-5 rounded-full text-center text-sm md:text-lg">

                                                অর্ডার পলিসি

                                          </div>

                                          <div className="bg-white text-black font-bold py-3 px-5 rounded-full text-center text-sm md:text-lg">

                                                পেমেন্ট এবং ডেলিভারি পলিসি

                                          </div>

                                          <div className="bg-white  text-[#0d2f85] font-bold py-3 px-5 rounded-full text-center text-sm md:text-lg">

                                                রিটার্ন পলিসি

                                          </div>

                                    </div>

                              </div>

                        </div>

                  </section>

                  {/* ======================================================
          CONTACT TEXT
      ====================================================== */}

                  <div className="bg-[#007600] py-5 px-4 text-center">

                        <p className="text-white font-bold text-sm md:text-xl leading-relaxed max-w-[900px] mx-auto">

                              সাবলিমেশন কাস্টমাইজ জার্সি তৈরি করে নিতে <br></br>
                              <span className="text-red-600 text-2xl">পোশাক বাড়ির</span> কাস্টমার সাপোর্ট টিমের সাথে  <br></br>
                              সরাসরি হটলাইনে যোগাযোগ করুন  <br></br>

                        </p>

                  </div>

                  {/* ======================================================
          BUTTON SECTION
      ====================================================== */}

                  <section className="bg-[#d8fffd] py-10 px-4">

                        <div className="max-w-[700px] mx-auto flex flex-col md:flex-row gap-5 justify-center">

                              {/* ORDER BUTTON */}
                              <button className="bg-[#1e8500] hover:scale-105 duration-300 text-white text-xl font-bold py-4 px-10 rounded-full shadow-2xl flex items-center justify-center gap-3">

                                    <Phone size={24} />
                                    অর্ডার করুন

                              </button>

                              {/* INBOX BUTTON */}
                              <button className="bg-[#1023ff] hover:scale-105 duration-300 text-white text-xl font-bold py-4 px-10 rounded-full shadow-2xl flex items-center justify-center gap-3">

                                    <MessageCircle size={24} />
                                    হটলাইন

                              </button>

                        </div>

                  </section>

                  {/* ======================================================
          REVIEW SECTION
      ====================================================== */}

                  <section className="bg-gradient-to-r from-[#d7fff6] to-[#f8ffe6] px-4 py-12">

                        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

                              {/* EXPERIENCE BOX */}
                              <div className="bg-white border-[4px] border-blue-700 rounded-3xl p-6 shadow-2xl">

                                    <h1 className="text-blue-700 text-center text-2xl md:text-4xl font-extrabold">

                                          অভিযোগ

                                    </h1>

                                    <p className="text-gray-700 text-sm md:text-lg leading-relaxed font-semibold text-center mt-4">

                                          সম্মানিত গ্রাহক,
                                          আমাদের প্রতিষ্ঠান/সার্ভিস সম্পর্কে
                                          কোন অভিযোগ থাকলে তা আমাদের
                                          কাছে লিখে পাঠিয়ে দিন। আপনার
                                          অভিযোগ প্রমাণিত হলে আমরা
                                          যথানীতি ব্যবস্থা/সংশোধন করিব।
                                          আপনার অভিযোগ/মন্তব্য
                                          আমাদের কাছে অত্যন্ত গুরুত্বপূর্ণ।

                                    </p>

                                    <button className="bg-blue-700 text-white font-bold py-3 px-7 rounded-full mx-auto block mt-6">

                                          ক্লিক করুন

                                    </button>

                              </div>

                              {/* ADVICE BOX */}
                              <div className="bg-white border-[4px] border-green-700 rounded-3xl p-6 shadow-2xl">

                                    <h1 className="text-green-700 text-center text-2xl md:text-4xl font-extrabold">

                                          পরামর্শ

                                    </h1>

                                    <p className="text-gray-700 text-sm md:text-lg leading-relaxed font-semibold text-center mt-4">

                                          সম্মানিত গ্রাহক,
                                          আমাদের প্রতিষ্ঠান/সার্ভিস সম্পর্কে
                                          কোন পরামর্শ থাকলে তা আমাদের
                                          কাছে লিখে পাঠিয়ে দিন। আপনার
                                          পরামর্শ গ্রহণযোগ্য হলে আমরা
                                          যথানীতি তা মেনে চলবো।
                                          আপনার পরামর্শ/মন্তব্য
                                          আমাদের কাছে অত্যন্ত গুরুত্বপূর্ণ।

                                    </p>

                                    <button className="bg-green-700 text-white font-bold py-3 px-7 rounded-full mx-auto block mt-6">

                                          ক্লিক করুন

                                    </button>

                              </div>

                        </div>

                  </section>

                  {/* ======================================================
          FOOTER
      ====================================================== */}


                  <footer className="bg-[#001b82] py-8">

                        <div className="flex items-center justify-center gap-2 flex-wrap">

                              {/* FACEBOOK */}
                              <a
                                    href="#"
                                    className="w-12 h-12 rounded-full bg-blue-600 hover:scale-110 duration-300 flex items-center justify-center shadow-xl"
                              >
                                    <FaFacebookF className="text-white text-xl" />
                              </a>

                              {/* MESSENGER */}
                              <a
                                    href="#"
                                    className="w-12 h-12 rounded-full bg-cyan-500 hover:scale-110 duration-300 flex items-center justify-center shadow-xl"
                              >
                                    <FaFacebookMessenger className="text-white text-xl" />
                              </a>
                              {/* WHATSAPP */}
                              <a
                                    href="#"
                                    className="w-12 h-12 rounded-full bg-green-500 hover:scale-110 duration-300 flex items-center justify-center shadow-xl"
                              >
                                    <FaWhatsapp className="text-white text-xl" />
                              </a>

                              {/* INSTAGRAM */}
                              <a
                                    href="#"
                                    className="w-12 h-12 rounded-full bg-pink-500 hover:scale-110 duration-300 flex items-center justify-center shadow-xl"
                              >
                                    <FaInstagram className="text-white text-xl" />
                              </a>



                              {/* YOUTUBE */}
                              <a
                                    href="#"
                                    className="w-12 h-12 rounded-full bg-red-600 hover:scale-110 duration-300 flex items-center justify-center shadow-xl"
                              >
                                    <FaYoutube className="text-white text-xl" />
                              </a>

                        </div>

                  </footer>

            </div>
      );
};

export default Homes;