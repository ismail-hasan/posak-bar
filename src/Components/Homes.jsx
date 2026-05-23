import React, { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Phone,
  MessageCircle,
} from "lucide-react";

/* ================= IMAGES ================= */

import logo from "../assets/logo.png";

import jersey1 from "../assets/ji.jpg";
import jersey2 from "../assets/main.png";
import jersey3 from "../assets/ji.jpg";

const Homes = () => {
  /* ================= CAROUSEL ================= */

  const jerseys = [jersey1, jersey2, jersey3];

  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % jerseys.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + jerseys.length) % jerseys.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full overflow-hidden bg-[#f4f4f4]">

      {/* ================= TOP HEADER ================= */}

      <div className="bg-[#001eff] py-4 px-3">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-3">

          {/* LOGO */}
          <img
            src={logo}
            alt="logo"
            className="w-[110px] md:w-[170px] object-contain"
          />

          {/* EMAIL */}
          <p className="text-white text-[10px] md:text-sm font-semibold text-right break-all">
            Gmail: posakbari4u@gmail.com
          </p>
        </div>
      </div>

      {/* ================= MARQUEE ================= */}

      <div className="bg-white border-y-[4px] border-red-600 py-2">
        <marquee
          behavior="scroll"
          direction="left"
          className="text-red-600 font-bold text-sm md:text-2xl"
        >
          আসসালামু আলাইকুম... সম্মানিত গ্রাহক / বন্ধু সকলকে “পোশাক বাড়ি”
          তে স্বাগতম।
        </marquee>
      </div>

      {/* ================= GREEN SECTION ================= */}

      <section className="bg-[#007600] text-center px-4 pt-10 pb-16">

        <h1 className="text-yellow-300 text-2xl md:text-5xl font-extrabold leading-tight">
          আমাদের বৈশিষ্ট্য ও বিশেষত্ব
        </h1>

        <p className="text-white mt-5 text-sm md:text-xl leading-relaxed font-semibold max-w-[850px] mx-auto">
          আমাদের গার্মেন্টস কিছু সহজ গরিব-অসহায় এতিম-নিঃস্বদের কল্যাণে
          সাহায্য ও দ্বীনি কাজের হয়। যার ৩০% লাভের অংশ আমরা এই খাতে
          ব্যয় করে থাকি। ইনশাআল্লাহ আপনিও এর নেকির অংশীদার হতে পারবেন।
        </p>
      </section>

      {/* ================= DOUBLE CURVE ================= */}

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

      {/* ================= CUSTOM BOX ================= */}

      <section className="bg-[#f5f5f5] px-4 py-12">

        <div className="max-w-[850px] mx-auto">

          <div className="border-[6px] border-blue-700 bg-white rounded-xl p-5 md:p-10 text-center shadow-2xl">

            <h1 className="text-[#00a000] text-xl md:text-4xl font-extrabold leading-snug">
              আপনি কি নিজের পছন্দমত ডিজাইন দিয়ে সরাসরি কারখানা মেশিনে
              কাস্টোমাইজ জার্সি তৈরি করতে চান?
            </h1>

          </div>

        </div>

      </section>

      {/* ================= POSAK BARI BOX ================= */}

      <section className="bg-[#007600] px-4 py-8">

        <div className="max-w-[900px] mx-auto border-[5px] border-white p-4">

          <div className="bg-white rounded-lg py-5 px-4 text-center">

            <img
              src={logo}
              alt="logo"
              className="w-[220px] md:w-[320px] mx-auto"
            />

            <p className="text-red-600 font-bold mt-3 text-sm md:text-xl">
              সততা ও মানবতার মাধ্যমে কাজই আমাদের মূল উদ্দেশ্য
            </p>

          </div>

        </div>

      </section>

      {/* ================= COLLECTION ================= */}

      <section className="bg-white px-4 py-12">

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

          {/* LEFT */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-3 md:left-5 -translate-y-1/2 bg-red-600 hover:bg-red-700 text-white w-11 h-11 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-xl"
          >
            <ChevronLeft size={28} />
          </button>

          {/* RIGHT */}
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
                className={`w-4 h-4 rounded-full ${
                  current === index
                    ? "bg-red-600"
                    : "bg-gray-400"
                }`}
              />
            ))}

          </div>

        </div>

      </section>

      {/* ================= PRODUCT BANNER ================= */}

      <section className="bg-white px-4 pb-10">

        <div className="max-w-[900px] mx-auto bg-[#0d2f85] rounded-xl p-4 shadow-2xl">

          <div className="flex flex-col md:flex-row items-center gap-5">

            {/* IMAGE */}
            <img
              src={jersey1}
              alt=""
              className="w-full md:w-[320px] rounded-lg"
            />

            {/* CONTENT */}
            <div className="flex-1 space-y-4 w-full">

              <div className="bg-white text-red-600 font-bold py-3 px-5 rounded-full text-center text-sm md:text-lg">
                জার্সি প্রিন্টিং
              </div>

              <div className="bg-white text-blue-700 font-bold py-3 px-5 rounded-full text-center text-sm md:text-lg">
                টি-শার্ট ও পলো-শার্ট
              </div>

              <div className="bg-white text-green-700 font-bold py-3 px-5 rounded-full text-center text-sm md:text-lg">
                স্কুল ড্রেস প্রিন্ট
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ================= CONTACT TEXT ================= */}

      <div className="bg-[#007600] py-5 px-4 text-center">

        <p className="text-white font-bold text-sm md:text-xl leading-relaxed max-w-[900px] mx-auto">
          সকল ধরনের কাস্টোমাইজ জার্সি তৈরি করতে নিচে দেয়া নাম্বারে
          যোগাযোগ করুন অথবা ইনবক্স করুন।
        </p>

      </div>

      {/* ================= BUTTONS ================= */}

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
            ইনবক্স

          </button>

        </div>

      </section>

      {/* ================= REVIEW SECTION ================= */}

      <section className="bg-gradient-to-r from-[#d7fff6] to-[#f8ffe6] px-4 py-12">

        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* BOX 1 */}
          <div className="bg-white border-[4px] border-blue-700 rounded-3xl p-6 shadow-2xl">

            <h1 className="text-blue-700 text-center text-2xl md:text-4xl font-extrabold">
              অভিজ্ঞতা
            </h1>

            <p className="text-gray-700 text-sm md:text-lg leading-relaxed font-semibold text-center mt-4">
              আমাদের দীর্ঘদিনের অভিজ্ঞ টিম আপনাকে সেরা মানের জার্সি
              ও প্রিন্টিং সেবা প্রদান করবে ইনশাআল্লাহ।
            </p>

            <button className="bg-blue-700 text-white font-bold py-3 px-7 rounded-full mx-auto block mt-6">
              আরও জানুন
            </button>

          </div>

          {/* BOX 2 */}
          <div className="bg-white border-[4px] border-green-700 rounded-3xl p-6 shadow-2xl">

            <h1 className="text-green-700 text-center text-2xl md:text-4xl font-extrabold">
              পরামর্শ
            </h1>

            <p className="text-gray-700 text-sm md:text-lg leading-relaxed font-semibold text-center mt-4">
              আপনার পছন্দের ডিজাইন, কালার ও কাপড় বাছাইয়ে আমরা সঠিক
              পরামর্শ দিয়ে সাহায্য করবো।
            </p>

            <button className="bg-green-700 text-white font-bold py-3 px-7 rounded-full mx-auto block mt-6">
              যোগাযোগ করুন
            </button>

          </div>

        </div>

      </section>

      {/* ================= FOOTER ================= */}

      <footer className="bg-[#001b82] py-6">

        <div className="flex items-center justify-center gap-3 flex-wrap">

          <div className="w-10 h-10 rounded-full bg-pink-500"></div>
          <div className="w-10 h-10 rounded-full bg-blue-500"></div>
          <div className="w-10 h-10 rounded-full bg-purple-500"></div>
          <div className="w-10 h-10 rounded-full bg-red-500"></div>
          <div className="w-10 h-10 rounded-full bg-cyan-500"></div>
          <div className="w-10 h-10 rounded-full bg-green-500"></div>

        </div>

      </footer>

    </div>
  );
};

export default Homes;