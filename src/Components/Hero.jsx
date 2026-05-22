import React from "react";
import heroImage from "../assets/mian2.png"


const Hero = () => {
      return (
            <section className="w-full py-16 px-6 bg-blue-500">
                  <div className="max-w-5xl mx-auto text-center">


                        {/* Paragraph (~150 words) */}
                        <p className="mt-6 text-black text-xl  leading-relaxed font-medium">
                              সম্মানিত গ্রাহক/বন্ধু সকল..... আসসালামু আলাইকুম। <br></br>
                              <span className="text-red-500 text-2xl"> “পোশাক বাড়ি”</span> তে আপনাদেরকে জানাই শুভেচ্ছা-অভিনন্দন। <br></br>
                              একমাত্র প্রতারণামুক্ত সহজ ও নিরাপদ অনলাইন শপিং।
                        </p>

                  </div>
                  {/* Image */}

                  <div className="flex justify-center mt-10">
                        <img
                              src={heroImage}
                              className=" w-8/12 object-cover rounded-2xl"
                        />
                  </div>

            </section>
      );
};

export default Hero;