import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { Right } from "./Animation";

const TrendingSection = () => {
      const [campaign, setCampaign] = useState(null);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
            const fetchCampaign = async () => {
                  try {
                        const res = await fetch("https://posak-bari-backend.vercel.app/addcam");
                        const data = await res.json();

                        if (Array.isArray(data) && data.length > 0) {
                              setCampaign(data[data.length - 1]);
                        }
                  } catch (error) {
                        console.error("Error fetching campaign:", error);
                  } finally {
                        setLoading(false);
                  }
            };

            fetchCampaign();
      }, []);

      if (loading || !campaign) {
            return null;
      }

      const { banner, featuredProduct } = campaign;

      return (
            <Right className="py-5 sm:py-8 lg:py-16">
                  <div className="container mx-auto px-2 sm:px-4">
                        <div className="group grid grid-cols-2 overflow-hidden rounded-lg sm:rounded-2xl lg:rounded-3xl bg-[#f6f6f6] shadow-sm hover:shadow-xl transition-all duration-500">

                              {/* LEFT IMAGE */}
                              <div className="relative overflow-hidden aspect-square w-full lg:aspect-auto lg:min-h-[500px]">
                                    <img
                                          src={banner?.modelImage}
                                          alt={banner?.title || "Trending Product"}
                                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                              </div>

                              {/* RIGHT CONTENT */}
                              <div className="flex items-center justify-center min-w-0">
                                    <div className="w-full px-2 py-4 sm:px-4 sm:py-6 md:px-6 md:py-8 lg:px-12 xl:px-16 text-center">

                                          {/* LABEL */}
                                          <span className="inline-block text-blue-600 uppercase tracking-wide sm:tracking-widest text-[7px] sm:text-[10px] md:text-xs lg:text-sm font-semibold">
                                                {banner?.tagline}
                                          </span>

                                          {/* TITLE */}
                                          <h2 className="mt-1 sm:mt-2 md:mt-3 lg:mt-4 text-[12px] sm:text-lg md:text-2xl lg:text-4xl font-bold text-gray-900 leading-tight">
                                                {banner?.title}
                                          </h2>

                                          {/* DESCRIPTION */}
                                          <p className="mt-1.5 sm:mt-3 md:mt-4 lg:mt-5 text-[7px] sm:text-[10px] md:text-xs lg:text-base text-gray-500 leading-3 sm:leading-5 md:leading-6 lg:leading-8 line-clamp-4">
                                                {banner?.description}
                                          </p>

                                          {/* PRODUCT CARD */}
                                          <div className="mt-3 sm:mt-5 md:mt-6 lg:mt-10 bg-white rounded-md sm:rounded-lg md:rounded-xl lg:rounded-2xl shadow-md p-1.5 sm:p-2.5 md:p-3 lg:p-5 flex items-center justify-between gap-1 sm:gap-2 md:gap-3 lg:gap-5 group-hover:-translate-y-1 transition-all duration-500">

                                                {/* PRODUCT INFO */}
                                                <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 min-w-0">

                                                      {/* PRODUCT IMAGE */}
                                                      <div className="w-8 h-8 sm:w-11 sm:h-11 md:w-14 md:h-14 lg:w-20 lg:h-20 rounded sm:rounded-md md:rounded-lg lg:rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                                                            <img
                                                                  src={featuredProduct?.image}
                                                                  alt={featuredProduct?.title || "Product"}
                                                                  className="w-full h-full object-cover"
                                                            />
                                                      </div>

                                                      {/* PRODUCT DETAILS */}
                                                      <Link to={featuredProduct.link} className="text-left min-w-0 overflow-hidden">

                                                            {/* RATING */}
                                                            <div className="flex items-center text-yellow-500 text-[6px] sm:text-[8px] md:text-[10px] lg:text-sm mb-0.5">
                                                                  ★★★★★
                                                                  <span className="ml-0.5 text-purple-600">
                                                                        ({featuredProduct?.rating || 0})
                                                                  </span>
                                                            </div>

                                                            {/* PRODUCT NAME */}
                                                            <h4 className="font-semibold text-gray-900 text-[7px] sm:text-[9px] md:text-xs lg:text-base leading-3 sm:leading-4 md:leading-5 lg:leading-6 hover:text-blue-600 transition-colors line-clamp-2">
                                                                  {featuredProduct?.title}
                                                            </h4>

                                                            {/* BRAND */}
                                                            <p className="text-gray-500 text-[6px] sm:text-[8px] md:text-[10px] lg:text-sm mt-0.5">
                                                                  {featuredProduct?.brand}
                                                            </p>
                                                      </Link>
                                                </div>

                                                {/* PRICE */}
                                                <div className="text-[8px] sm:text-[10px] md:text-sm lg:text-2xl font-bold text-gray-900 whitespace-nowrap flex-shrink-0">
                                                      ৳{featuredProduct?.price}
                                                </div>

                                          </div>
                                    </div>
                              </div>

                        </div>
                  </div>
            </Right>
      );
};

export default TrendingSection;