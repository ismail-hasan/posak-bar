import { FaStar } from "react-icons/fa";
import { Link } from "react-router";

const ProductCard = ({ product }) => {
      const {
            _id,
            name,
            category,
            price,
            discountPrice,
            rating = 5,
            reviews = 0,
            thumbnail,
      } = product;

      return (
            <Link
                  to={`/product/${_id}`}
                  className="group flex h-full w-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-purple-200 hover:shadow-lg"
            >
                  {/* ================= IMAGE ================= */}
                  <div className="relative aspect-square w-full overflow-hidden bg-gray-50">
                        <img
                              src={thumbnail}
                              alt={name}
                              loading="lazy"
                              className="h-full w-full object-cover p-2 transition-transform duration-500 group-hover:scale-105 sm:p-3"
                        />
                  </div>

                  {/* ================= CONTENT ================= */}
                  <div className="flex flex-1 flex-col p-2.5 sm:p-3 md:p-4">
                        {/* Category */}
                        {category && (
                              <span className="mb-1 block truncate text-[9px] font-semibold uppercase tracking-wide text-purple-600 sm:text-[10px]">
                                    {category}
                              </span>
                        )}

                        {/* Product Name */}
                        <h2 className="line-clamp-2 min-h-[38px] text-[16px] font-semibold leading-[1.35] text-gray-800 transition-colors  sm:min-h-[42px] md:text-[19px] md:text-base">
                              {name}
                        </h2>

                        {/* Rating */}
                        <div className="mt-1.5 flex items-center gap-1 sm:mt-2 sm:gap-1.5">
                              <div className="flex items-center gap-[2px] ">
                                    {[...Array(5)].map((_, index) => (
                                          <FaStar
                                                key={index}
                                                size={11}
                                                className={
                                                      index < Math.round(rating)
                                                            ? "text-yellow-400 "
                                                            : "text-gray-200"
                                                }
                                          />
                                    ))}
                              </div>

                              <span className="text-[13px] font-normal  md:text-[16px]">
                                    ({reviews})
                              </span>
                        </div>

                        {/* ================= PRICE ================= */}
                        <div className="mt-auto flex items-center border-t border-gray-100 pt-2 sm:pt-2.5">
                              {discountPrice ? (
                                    <div className="flex items-center gap-1.5 sm:gap-2">
                                          <span className="text-sm font-bold text-purple-900 md:text-[26px]">
                                                ৳{discountPrice}
                                          </span>

                                          <span className="text-[10px] font-normal text-red-400 line-through md:text-[19px]">
                                                ৳{price}
                                          </span>
                                    </div>
                              ) : (
                                    <span className="text-sm font-bold text-gray-900 sm:text-base">
                                          ৳{price}
                                    </span>
                              )}
                        </div>
                  </div>
            </Link>
      );
};

export default ProductCard;