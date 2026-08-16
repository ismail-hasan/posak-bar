import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { GiTShirt } from "react-icons/gi";
import { Link } from "react-router";
import { Bottom, Right } from "./Animation";

const StoreCard = () => {
      const cards = [
            {
                  title: (
                        <>
                              সাবলিমেশন
                              <br />
                              <span className="text-4xl">জার্সি</span>
                              <br />

                              <span className="text-xl">
                                    ও রেডিমেড পণ্য অর্ডার করতে
                              </span>
                        </>
                  ),
                  color: "bg-[#7025C7]",
                  iconColor: "text-[#7025C7]",
                  route: "/manufacturer",
            },
            {
                  title: (
                        <>
                              অনলাইন
                              <br />
                              <span className="text-4xl">স্টোর</span>
                              <br />

                              <span className="text-xl">
                                    থেকে একক পণ্য অর্ডার করতে
                              </span>
                        </>
                  ),
                  color: "bg-[#1689EF]",
                  iconColor: "text-[#1689EF]",
                  route: "/store",
            },
      ];

      return (
            <section className="w-full px-3 py-8 sm:px-5 md:py-10">
                  <div className="mx-auto w-full max-w-[720px]">

                        {/* Notice Section */}
                        <Right className="relative mb-[60px]">
                              <div className="rounded-[32px] border-[5px] border-white bg-white shadow-[0_4px_18px_rgba(0,0,0,0.13)]">
                                    <div className="rounded-[27px] bg-[#FF8300] px-4 pb-7 pt-[66px] sm:px-8 sm:pb-9 sm:pt-[73px] md:px-12 md:pb-10 md:pt-[78px]">
                                          <p className="mx-auto max-w-[600px] text-center text-[17px] font-bold leading-[1.8] text-white sm:text-[15px] md:text-[17px] md:leading-[1.85]">
                                                আপনি কি পছন্দমত ফেব্রিক-ডিজাইন দিয়ে "সাবলিমেশন জার্সি মেনুফেচারিং" এবং রেডিমেড পণ্য কাস্টমাইজ করতে চান? নাকি "অনলাইন স্টোর" থেকে একক পণ্য অর্ডার করতে চান? তাহলে নিচের ২টি অপশন থেকে আপনার পছন্দের সার্ভিসটি গ্রহন করুন।
                                          </p>
                                    </div>
                              </div>

                              {/* Notice Heading */}
                              <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2">
                                    <div className="rounded-b-[30px] border-[4px] border-white bg-white shadow-[0_3px_10px_rgba(0,0,0,0.15)]">
                                          <div className="rounded-b-[25px] bg-[#FE3801] px-8 py-2 sm:px-12 sm:py-2.5 md:px-16 md:py-3">
                                                <h2 className="whitespace-nowrap text-[20px] font-extrabold leading-none text-white sm:text-[24px] md:text-[28px]">
                                                      আমাদের সেবা
                                                </h2>
                                          </div>
                                    </div>
                              </div>
                        </Right>

                        {/* Store Cards */}
                        <Bottom className="grid grid-cols-2 gap-[10px] sm:gap-4 md:gap-5">
                              {cards.map((card, index) => (
                                    <div
                                          key={index}
                                          className="flex min-w-0 flex-col items-center"
                                    >
                                          {/* Main Card */}
                                          <div
                                                className={`relative flex min-h-[225px] w-full items-center justify-center overflow-visible rounded-[17px] ${card.color} shadow-[0_5px_12px_rgba(0,0,0,0.15)] sm:min-h-[255px] sm:rounded-[20px] md:min-h-[275px]`}
                                          >
                                                {/* Dotted Background */}
                                                <div
                                                      className="pointer-events-none absolute inset-0 rounded-[17px] opacity-25 sm:rounded-[20px]"
                                                      style={{
                                                            backgroundImage:
                                                                  "radial-gradient(circle, rgba(255,255,255,0.6) 1.5px, transparent 1.5px)",
                                                            backgroundSize: "18px 18px",
                                                      }}
                                                />

                                                {/* Jersey / Cart Icon */}
                                                <div
                                                      className={`absolute left-1/2 top-0 z-20 flex h-[68px] w-[68px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#FFFDF8] ${card.iconColor} text-[31px] shadow-[0_2px_8px_rgba(0,0,0,0.15)] sm:h-[76px] sm:w-[76px] sm:text-[35px] md:h-[82px] md:w-[82px] md:text-[39px]`}
                                                >
                                                      {index === 0 ? (
                                                            <GiTShirt />
                                                      ) : (
                                                            <FaShoppingCart />
                                                      )}
                                                </div>

                                                {/* Card Text */}
                                                <div className="relative z-10 mt-8 text-center text-white sm:mt-10">
                                                      <h3 className="text-[17px] font-semibold leading-tight sm:text-[22px] md:text-[26px]">
                                                            {card.title}
                                                      </h3>
                                                </div>
                                          </div>

                                          {/* Button */}
                                          <Link
                                                to={card.route}
                                                className={`mt-3 flex w-[110px] items-center justify-center rounded-full ${card.color} px-3 py-2 text-[15px] font-bold text-white shadow-[0_3px_8px_rgba(0,0,0,0.18)] transition duration-200 hover:scale-105 active:scale-95 sm:mt-4 sm:w-[135px] sm:px-5 sm:py-2.5 sm:text-[14px] md:w-[155px] md:text-[20px]`}
                                          >
                                                ক্লিক করুন
                                          </Link>
                                    </div>
                              ))}
                        </Bottom>
                  </div>
            </section>
      );
};

export default StoreCard;