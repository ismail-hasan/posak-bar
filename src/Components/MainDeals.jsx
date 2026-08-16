import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { Bottom } from "./Animation";

const SuperDeal = () => {
      const [deals, setDeals] = useState([]);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
            fetch("https://posak-bari-backend.vercel.app/superdeal")
                  .then((res) => {
                        if (!res.ok) {
                              throw new Error("Failed to fetch super deals");
                        }

                        return res.json();
                  })
                  .then((data) => {
                        // Latest 2 deals
                        const latestDeals = [...data]
                              .sort((a, b) =>
                                    String(b._id).localeCompare(
                                          String(a._id)
                                    )
                              )
                              .slice(0, 2);

                        setDeals(latestDeals);
                  })
                  .catch((error) => {
                        console.error(
                              "Super Deal fetch error:",
                              error
                        );
                        setDeals([]);
                  })
                  .finally(() => {
                        setLoading(false);
                  });
      }, []);

      // ================= LOADING =================
      if (loading) {
            return (
                  <div className="py-10 text-center">
                        Loading...
                  </div>
            );
      }



      return (
            <Bottom className="w-full px-4 py-6">
                  <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 md:grid-cols-2">
                        {deals.map((deal) => (
                              <div
                                    key={deal._id}
                                    className="flex min-h-[180px] items-center justify-between gap-5 overflow-hidden rounded-2xl bg-white p-6 shadow-sm"
                              >
                                    {/* ================= TEXT ================= */}
                                    <div className="flex-1">
                                          <p className="mb-2 text-sm font-medium text-blue-600">
                                                {deal.subtitle}
                                          </p>

                                          <h3 className="mb-4 text-xl font-bold text-gray-900 sm:text-2xl">
                                                {deal.title}
                                          </h3>

                                          <Link
                                                to={deal.productLink}
                                                className="inline-flex items-center gap-1 text-sm font-bold text-gray-900 transition hover:text-blue-600"
                                          >
                                                Shop Now
                                                <span>→</span>
                                          </Link>
                                    </div>

                                    {/* ================= IMAGE ================= */}
                                    <div className="w-[40%] shrink-0">
                                          <img
                                                src={deal.image}
                                                alt={deal.title}
                                                className="h-28 w-full rounded-xl object-cover sm:h-32"
                                          />
                                    </div>
                              </div>
                        ))}
                  </div>
            </Bottom>
      );
};

export default SuperDeal;