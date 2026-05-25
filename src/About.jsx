import React from 'react';
import logo from "./assets/logo.png";
import OrderForm from './Components/OrderForm';
import Navbar from './Components/Navbar';

const About = () => {
      return (
            <div>
                  <Navbar></Navbar>

                  {/* // BANNER */}
                  <section className="bg-[#007600] text-center px-4 pt-10 pb-0">


                        <h1 className="inline-block text-white mt-5 text-[28px] md:text-3xl font-extrabold leading-tight pb-5">
                              পোশাক বাড়ি'র <br />  অর্ডার ফরমে স্বাগতম
                        </h1>

                        {/* DESCRIPTION */}
                        <p className="text-yellow-300 mt-5 text-[14px] md:text-xl leading-relaxed font-semibold max-w-[850px] mx-auto border-white border-6 rounded-3xl py-8">

                              এই ফরমের মাধ্যমে আপনি কাস্টমাইজ <br />
                              সাবলিমেশন জার্সি/রেডিমেট পণ্য অর্ডার <br />করতে পারবেন। অর্ডার কনফার্ম করতে <br />অবশ্যই ৩০% এডভান্স পেমেন্ট করতে হবে।

                        </p>


                  </section>

                  {/* ======================================================
          DOUBLE CURVE SVG
      ====================================================== */}

                  <section>
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
                                          fill="white"
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
                  </section>

                  {/* // check mark  */}

                  <div className="w-full flex justify-center px-4">
                        <div className="w-full max-w-2xl bg-white/70 backdrop-blur-md border border-blue-100 rounded-2xl shadow-md flex flex-col items-center text-center gap-4 sm:gap-5 md:gap-6 text-[14px] md:text-xl text-blue-700 font-semibold p-6">

                              <p className="leading-relaxed">✅ ডিজাইন কনফার্মের পর কাজ শুরু হবে</p>
                              <p className="leading-relaxed">✅ প্রিন্ট শুরু হওয়ার পর অর্ডার বাতিল করা যাবে না</p>

                              <p className="leading-relaxed">✅ এডভান্স ছাড়া অর্ডার গ্রহণ করা হবে না</p>

                        </div>
                  </div>

                  <OrderForm></OrderForm>
            </div>
      );
};

export default About;