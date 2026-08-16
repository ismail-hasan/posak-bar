import React from "react";
import { Bottom } from "./Animation";

const Explore = () => {
      return (
            <Bottom className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                  <div className="max-w-5xl mx-auto text-center">

                        {/* Heading */}
                        <div className="mb-6 sm:mb-8">
                              <span className="inline-block text-xs sm:text-sm font-semibold tracking-widest text-amber-600 mb-3">
                                    পোশাক বাড়ি
                              </span>

                              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-purple-950 leading-tight">
                                    আমাদের বৈশিষ্ট্য ও বিশেষত্ব
                              </h2>

                              <div className="flex items-center justify-center gap-2 mt-4">
                                    <span className="w-10 sm:w-16 h-[2px] bg-purple-200" />
                                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                                    <span className="w-10 sm:w-16 h-[2px] bg-purple-200" />
                              </div>
                        </div>

                        {/* Content */}
                        <div className="max-w-4xl mx-auto">
                              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-7 sm:leading-8 md:leading-9">

                                    আমাদের লভ্যাংশের কিছু অংশ{" "}
                                    <span className="font-semibold text-purple-800">
                                          গরিব-অসহায় এতিম-মিসকিন,  মসজিদ-মাদ্রাসা ও দ্বীনি কাজে
                                    </span>{" "}
                                    দান করা হয়।

                                    <br className="hidden sm:block" />

                                    {" "} যার{" "}
                                    <span className="">
                                          ৫০% শেয়ার গ্রাহক
                                    </span>{" "}
                                    এবং{" "}
                                    <span className="">
                                          ৫০% শেয়ার "পোশাক বাড়ি"
                                    </span>
                                    ।

                                    <br className="hidden sm:block" />

                                    {" "}  তাই নিঃসন্দেহে সহজ ও নিরাপদে{" "}
                                    <span className="font-semibold text-purple-900">
                                          পোশাক বাড়িতে
                                    </span>{" "}
                                    শপিং করুন,{" "}
                                    <span className="">
                                          সওয়াবের ভাগীদার হোন।
                                    </span>

                              </p>
                        </div>

                  </div>
            </Bottom>
      );
};

export default Explore;