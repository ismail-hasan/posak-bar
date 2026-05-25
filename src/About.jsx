import React from 'react';
import logo from "./assets/logo.png";
import OrderForm from './Components/OrderForm';

const About = () => {
      return (
            <div>
                  <h4>about</h4>
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

                  {/* // BANNER */}
                  <section className="bg-[#007600] text-center px-4 pt-10 pb-0">

                        {/* TITLE */}
                        <h1 className="inline-block text-yellow-300 mt-5 text-[20px] md:text-5xl font-extrabold leading-tight pb-5">
                              স্বাগতম
                        </h1> <br />
                        <h1 className="inline-block text-yellow-300 mt-5 text-[20px] md:text-5xl font-extrabold leading-tight pb-5">
                              পোশাক বাড়ি'র <br /> অনলাইন অর্ডার ফরম
                        </h1>

                        {/* DESCRIPTION */}
                        <p className="text-white mt-5 text-[12px] md:text-xl leading-relaxed font-semibold max-w-[850px] mx-auto border border-6 rounded-3xl py-8">

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

                  <div className='w-full flex flex-col items-center text-center gap-3 text-xl text-blue-700 font-semibold pb-6'>
                        <p>✅ ডিজাইন কনফার্মের পর কাজ শুরু হবে</p>

                        <p>✅ প্রিন্ট শুরু হওয়ার পর অর্ডার বাতিল করা যাবে না</p>

                        <p>✅ ডেলিভারির আগে বাকি টাকা পরিশোধ করতে হবে</p>

                        <p>✅ এডভান্স ছাড়া অর্ডার গ্রহণ করা হবে না</p>
                  </div>

                  <OrderForm></OrderForm>
            </div>
      );
};

export default About;