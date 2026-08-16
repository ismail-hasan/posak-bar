import { useState } from "react";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

const items = [
      {
            id: 1,
            tag: "নতুন সিজনের জার্সি",
            title: "জাতীয় দলের অরিজিনাল কোয়ালিটির জার্সি",
            link: "/product/mavic-mini-pro",
      },
      {
            id: 2,
            tag: "PC GAMING",
            title: "DELL ALIENWARE AURORA",
            link: "/product",
      },
];

const randomImage = (seedBase) => {
      const seed = `${seedBase}-${Math.floor(Math.random() * 10000)}`;
      return `https://picsum.photos/seed/${seed}/700/500`;
};

const NewArrival = () => {
      const [images] = useState(() =>
            items.map((item) => randomImage(item.title))
      );

      return (
            <section className="w-full py-6 sm:py-10 px-2 sm:px-6 lg:px-8">
                  <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-2 gap-2 sm:gap-4 lg:gap-6">
                              {items.map((item, i) => (
                                    <div key={item.id} className="group relative flex items-center justify-between bg-gray-100 rounded-xl sm:rounded-2xl px-2 sm:px-5 lg:px-8 py-4 sm:py-7 lg:py-10 min-h-[170px] sm:min-h-[240px] lg:min-h-[280px] overflow-hidden">

                                          {/* Left content */}
                                          <div className="flex flex-col items-start w-[52%] z-10">
                                                <span className="text-[7px] sm:text-[10px] lg:text-xs font-bold tracking-wide sm:tracking-wider text-blue-500 mb-1.5 sm:mb-3">
                                                      {item.tag}
                                                </span>

                                                <h3 className="text-[10px] sm:text-lg lg:text-2xl font-extrabold text-gray-900 uppercase tracking-tight mb-2 sm:mb-5 leading-tight">
                                                      {item.title}
                                                </h3>

                                                <Link to={item.link} className="inline-flex items-center gap-0.5 sm:gap-1.5 text-[7px] sm:text-xs lg:text-sm font-semibold text-gray-900 hover:text-blue-500 transition-colors">
                                                      <span>Shop Now</span>
                                                      <ArrowRight className="w-2.5 h-2.5 sm:w-4 sm:h-4" />
                                                </Link>
                                          </div>

                                          {/* Right image */}
                                          <div className="w-[46%] h-28 sm:h-40 lg:h-56 flex items-center justify-center overflow-hidden">
                                                <img
                                                      src={images[i]}
                                                      alt={item.title}
                                                      loading="lazy"
                                                      className="w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-110"
                                                />
                                          </div>

                                    </div>
                              ))}
                        </div>
                  </div>
            </section>
      );
};

export default NewArrival;