import React, { useEffect, useMemo, useState } from "react";

const BASE_URL = "http://localhost:5000";

const Statistics = () => {
      const [data, setData] = useState({
            products: [],
            categories: [],
            cartItems: [],
            orders: [],
            campaigns: [],
            superDeals: [],
            manufactureOrders: [],
      });

      const [loading, setLoading] = useState(true);
      const [error, setError] = useState("");

      // ==========================================
      // FETCH ALL DATA
      // ==========================================
      useEffect(() => {
            const fetchAllData = async () => {
                  try {
                        setLoading(true);
                        setError("");

                        const [
                              productsRes,
                              categoriesRes,
                              cartRes,
                              ordersRes,
                              campaignsRes,
                              superDealsRes,
                              manufactureRes,
                        ] = await Promise.all([
                              fetch(`${BASE_URL}/product`),
                              fetch(`${BASE_URL}/category`),
                              fetch(`${BASE_URL}/ceheckout`),
                              fetch(`${BASE_URL}/order`),
                              fetch(`${BASE_URL}/addcam`),
                              fetch(`${BASE_URL}/superdeal`),
                              fetch(`${BASE_URL}/manufacture`),
                        ]);

                        const [
                              products,
                              categories,
                              cartItems,
                              orders,
                              campaigns,
                              superDeals,
                              manufactureOrders,
                        ] = await Promise.all([
                              productsRes.json(),
                              categoriesRes.json(),
                              cartRes.json(),
                              ordersRes.json(),
                              campaignsRes.json(),
                              superDealsRes.json(),
                              manufactureRes.json(),
                        ]);

                        setData({
                              products: Array.isArray(products)
                                    ? products
                                    : [],

                              categories: Array.isArray(categories)
                                    ? categories
                                    : [],

                              cartItems: Array.isArray(cartItems)
                                    ? cartItems
                                    : [],

                              orders: Array.isArray(orders)
                                    ? orders
                                    : [],

                              campaigns: Array.isArray(campaigns)
                                    ? campaigns
                                    : [],

                              superDeals: Array.isArray(superDeals)
                                    ? superDeals
                                    : [],

                              manufactureOrders: Array.isArray(
                                    manufactureOrders
                              )
                                    ? manufactureOrders
                                    : [],
                        });
                  } catch (err) {
                        console.error(
                              "Statistics fetch error:",
                              err
                        );

                        setError(
                              "Dashboard data load করতে সমস্যা হয়েছে।"
                        );
                  } finally {
                        setLoading(false);
                  }
            };

            fetchAllData();
      }, []);

      // ==========================================
      // BASIC COUNTS
      // ==========================================
      const statistics = useMemo(() => {
            const {
                  products,
                  categories,
                  cartItems,
                  orders,
                  campaigns,
                  superDeals,
                  manufactureOrders,
            } = data;

            // ==========================================
            // UNIQUE CUSTOMERS
            // ==========================================
            const customerEmails = new Set();

            cartItems.forEach((item) => {
                  if (item?.userEmail) {
                        customerEmails.add(item.userEmail);
                  }
            });

            orders.forEach((order) => {
                  if (order?.customer?.email) {
                        customerEmails.add(order.customer.email);
                  }

                  if (order?.userEmail) {
                        customerEmails.add(order.userEmail);
                  }
            });

            // ==========================================
            // FINAL ORDER STATUS
            // ==========================================
            const pendingOrders = orders.filter(
                  (order) =>
                        !order?.status ||
                        String(order.status).toLowerCase() ===
                              "pending"
            ).length;

            const processingOrders = orders.filter((order) => {
                  const status = String(
                        order?.status || ""
                  ).toLowerCase();

                  return (
                        status === "processing" ||
                        status === "confirmed" ||
                        status === "shipped"
                  );
            }).length;

            const completedOrders = orders.filter((order) => {
                  const status = String(
                        order?.status || ""
                  ).toLowerCase();

                  return (
                        status === "complete" ||
                        status === "completed" ||
                        status === "delivered"
                  );
            }).length;

            const cancelledOrders = orders.filter((order) => {
                  const status = String(
                        order?.status || ""
                  ).toLowerCase();

                  return (
                        status === "cancel" ||
                        status === "cancelled" ||
                        status === "canceled"
                  );
            }).length;

            // ==========================================
            // MANUFACTURE STATUS
            // ==========================================
            const manufacturePending =
                  manufactureOrders.filter(
                        (item) =>
                              String(item?.status || "").toLowerCase() ===
                              "pending"
                  ).length;

            const manufactureComplete =
                  manufactureOrders.filter(
                        (item) =>
                              String(item?.status || "").toLowerCase() ===
                              "complete"
                  ).length;

            return {
                  productCount: products.length,
                  categoryCount: categories.filter(
                        (item) => item?.slug
                  ).length,

                  cartCount: cartItems.length,

                  orderCount: orders.length,

                  campaignCount: campaigns.length,

                  superDealCount: superDeals.length,

                  manufactureCount: manufactureOrders.length,

                  customerCount: customerEmails.size,

                  pendingOrders,

                  processingOrders,

                  completedOrders,

                  cancelledOrders,

                  manufacturePending,

                  manufactureComplete,
            };
      }, [data]);

      // ==========================================
      // PIE CHART
      // ==========================================
      const orderPie = useMemo(() => {
            const {
                  pendingOrders,
                  processingOrders,
                  completedOrders,
                  cancelledOrders,
            } = statistics;

            const total =
                  pendingOrders +
                  processingOrders +
                  completedOrders +
                  cancelledOrders;

            if (!total) {
                  return {
                        background:
                              "conic-gradient(#e5e7eb 0deg 360deg)",
                        total: 0,
                  };
            }

            const pendingDeg =
                  (pendingOrders / total) * 360;

            const processingDeg =
                  (processingOrders / total) * 360;

            const completedDeg =
                  (completedOrders / total) * 360;

            const pendingEnd = pendingDeg;

            const processingEnd =
                  pendingEnd + processingDeg;

            const completedEnd =
                  processingEnd + completedDeg;

            return {
                  total,

                  background: `conic-gradient(
                        #f59e0b 0deg ${pendingEnd}deg,
                        #3b82f6 ${pendingEnd}deg ${processingEnd}deg,
                        #22c55e ${processingEnd}deg ${completedEnd}deg,
                        #ef4444 ${completedEnd}deg 360deg
                  )`,
            };
      }, [statistics]);

      // ==========================================
      // LOADING
      // ==========================================
      if (loading) {
            return (
                  <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
                        <div className="mx-auto max-w-7xl">

                              <div className="mb-8">
                                    <div className="h-8 w-52 animate-pulse rounded-lg bg-gray-200" />

                                    <div className="mt-2 h-4 w-80 animate-pulse rounded bg-gray-200" />
                              </div>

                              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                                    {Array.from({
                                          length: 8,
                                    }).map((_, index) => (
                                          <div
                                                key={index}
                                                className="h-32 animate-pulse rounded-2xl bg-white shadow-sm"
                                          />
                                    ))}
                              </div>

                              <div className="mt-6 grid gap-6 lg:grid-cols-2">
                                    <div className="h-80 animate-pulse rounded-2xl bg-white" />
                                    <div className="h-80 animate-pulse rounded-2xl bg-white" />
                              </div>
                        </div>
                  </div>
            );
      }

      // ==========================================
      // ERROR
      // ==========================================
      if (error) {
            return (
                  <div className="flex min-h-[400px] items-center justify-center px-4">
                        <div className="rounded-2xl border border-red-100 bg-red-50 px-6 py-8 text-center">
                              <p className="font-semibold text-red-600">
                                    {error}
                              </p>

                              <button
                                    onClick={() =>
                                          window.location.reload()
                                    }
                                    className="mt-4 rounded-lg bg-red-600 px-5 py-2 text-sm font-semibold text-white hover:bg-red-700"
                              >
                                    আবার চেষ্টা করুন
                              </button>
                        </div>
                  </div>
            );
      }

      // ==========================================
      // STAT CARDS
      // ==========================================
      const cards = [
            {
                  title: "মোট Product",
                  value: statistics.productCount,
                  icon: "📦",
                  description: "Website-এর সকল product",
            },

            {
                  title: "মোট Category",
                  value: statistics.categoryCount,
                  icon: "🗂️",
                  description: "Active categories",
            },

            {
                  title: "মোট Order",
                  value: statistics.orderCount,
                  icon: "🛍️",
                  description: "Final orders",
            },

            {
                  title: "Customers",
                  value: statistics.customerCount,
                  icon: "👥",
                  description: "Unique customers",
            },

            {
                  title: "Cart Items",
                  value: statistics.cartCount,
                  icon: "🛒",
                  description: "Checkout collection",
            },

            {
                  title: "Manufacture",
                  value: statistics.manufactureCount,
                  icon: "🏭",
                  description: "Manufacturing orders",
            },

            {
                  title: "Campaign",
                  value: statistics.campaignCount,
                  icon: "📢",
                  description: "Active campaign data",
            },

            {
                  title: "Super Deal",
                  value: statistics.superDealCount,
                  icon: "🔥",
                  description: "Super deal items",
            },
      ];

      return (
            <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">

                  <div className="mx-auto max-w-7xl">

                        {/* ==========================================
                            HEADER
                        ========================================== */}

                        <div className="mb-7">
                              <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                                    Website Statistics
                              </h1>

                              <p className="mt-1 text-sm text-gray-500">
                                    Posak Bari website-এর সম্পূর্ণ
                                    overview
                              </p>
                        </div>

                        {/* ==========================================
                            STAT CARDS
                        ========================================== */}

                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">

                              {cards.map((card) => (
                                    <div
                                          key={card.title}
                                          className="group rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-5"
                                    >
                                          <div className="flex items-start justify-between">

                                                <div>
                                                      <p className="text-xs font-semibold text-gray-500 sm:text-sm">
                                                            {card.title}
                                                      </p>

                                                      <h2 className="mt-2 text-2xl font-extrabold text-gray-900 sm:text-3xl">
                                                            {card.value}
                                                      </h2>
                                                </div>

                                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-xl transition group-hover:scale-110 sm:h-12 sm:w-12">
                                                      {card.icon}
                                                </div>

                                          </div>

                                          <p className="mt-3 text-[11px] text-gray-400 sm:text-xs">
                                                {card.description}
                                          </p>
                                    </div>
                              ))}

                        </div>

                        {/* ==========================================
                            CHART SECTION
                        ========================================== */}

                        <div className="mt-6 grid gap-6 lg:grid-cols-2">

                              {/* ======================================
                                  ORDER PIE CHART
                              ====================================== */}

                              <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">

                                    <div className="mb-6">
                                          <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
                                                Order Overview
                                          </h2>

                                          <p className="mt-1 text-xs text-gray-400 sm:text-sm">
                                                Final order status
                                          </p>
                                    </div>

                                    <div className="flex flex-col items-center justify-center gap-7 sm:flex-row">

                                          {/* PIE */}

                                          <div
                                                className="relative flex h-44 w-44 shrink-0 items-center justify-center rounded-full"
                                                style={{
                                                      background:
                                                            orderPie.background,
                                                }}
                                          >
                                                <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full bg-white shadow-inner">
                                                      <span className="text-2xl font-extrabold text-gray-900">
                                                            {
                                                                  orderPie.total
                                                            }
                                                      </span>

                                                      <span className="text-xs text-gray-400">
                                                            Orders
                                                      </span>
                                                </div>
                                          </div>

                                          {/* LEGEND */}

                                          <div className="w-full max-w-xs space-y-3">

                                                <div className="flex items-center justify-between rounded-xl bg-amber-50 px-4 py-3">
                                                      <div className="flex items-center gap-2">
                                                            <span className="h-3 w-3 rounded-full bg-amber-500" />

                                                            <span className="text-sm font-medium text-gray-700">
                                                                  Pending
                                                            </span>
                                                      </div>

                                                      <span className="font-bold text-gray-900">
                                                            {
                                                                  statistics.pendingOrders
                                                            }
                                                      </span>
                                                </div>

                                                <div className="flex items-center justify-between rounded-xl bg-blue-50 px-4 py-3">
                                                      <div className="flex items-center gap-2">
                                                            <span className="h-3 w-3 rounded-full bg-blue-500" />

                                                            <span className="text-sm font-medium text-gray-700">
                                                                  Processing
                                                            </span>
                                                      </div>

                                                      <span className="font-bold text-gray-900">
                                                            {
                                                                  statistics.processingOrders
                                                            }
                                                      </span>
                                                </div>

                                                <div className="flex items-center justify-between rounded-xl bg-green-50 px-4 py-3">
                                                      <div className="flex items-center gap-2">
                                                            <span className="h-3 w-3 rounded-full bg-green-500" />

                                                            <span className="text-sm font-medium text-gray-700">
                                                                  Completed
                                                            </span>
                                                      </div>

                                                      <span className="font-bold text-gray-900">
                                                            {
                                                                  statistics.completedOrders
                                                            }
                                                      </span>
                                                </div>

                                                <div className="flex items-center justify-between rounded-xl bg-red-50 px-4 py-3">
                                                      <div className="flex items-center gap-2">
                                                            <span className="h-3 w-3 rounded-full bg-red-500" />

                                                            <span className="text-sm font-medium text-gray-700">
                                                                  Cancelled
                                                            </span>
                                                      </div>

                                                      <span className="font-bold text-gray-900">
                                                            {
                                                                  statistics.cancelledOrders
                                                            }
                                                      </span>
                                                </div>

                                          </div>

                                    </div>
                              </div>

                              {/* ======================================
                                  MANUFACTURE OVERVIEW
                              ====================================== */}

                              <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">

                                    <div className="mb-6">
                                          <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
                                                Manufacturing Overview
                                          </h2>

                                          <p className="mt-1 text-xs text-gray-400 sm:text-sm">
                                                Manufacturing order summary
                                          </p>
                                    </div>

                                    <div className="space-y-5">

                                          {/* Total */}

                                          <div>
                                                <div className="mb-2 flex items-center justify-between">
                                                      <span className="text-sm font-medium text-gray-600">
                                                            Total Orders
                                                      </span>

                                                      <span className="font-bold text-gray-900">
                                                            {
                                                                  statistics.manufactureCount
                                                            }
                                                      </span>
                                                </div>

                                                <div className="h-3 overflow-hidden rounded-full bg-gray-100">
                                                      <div className="h-full w-full rounded-full bg-purple-500" />
                                                </div>
                                          </div>

                                          {/* Pending */}

                                          <div>
                                                <div className="mb-2 flex items-center justify-between">
                                                      <span className="text-sm font-medium text-gray-600">
                                                            Pending
                                                      </span>

                                                      <span className="font-bold text-amber-600">
                                                            {
                                                                  statistics.manufacturePending
                                                            }
                                                      </span>
                                                </div>

                                                <div className="h-3 overflow-hidden rounded-full bg-gray-100">
                                                      <div
                                                            className="h-full rounded-full bg-amber-500"
                                                            style={{
                                                                  width:
                                                                        statistics.manufactureCount
                                                                              ? `${(statistics.manufacturePending /
                                                                                    statistics.manufactureCount) *
                                                                              100
                                                                              }%`
                                                                              : "0%",
                                                            }}
                                                      />
                                                </div>
                                          </div>

                                          {/* Complete */}

                                          <div>
                                                <div className="mb-2 flex items-center justify-between">
                                                      <span className="text-sm font-medium text-gray-600">
                                                            Completed
                                                      </span>

                                                      <span className="font-bold text-green-600">
                                                            {
                                                                  statistics.manufactureComplete
                                                            }
                                                      </span>
                                                </div>

                                                <div className="h-3 overflow-hidden rounded-full bg-gray-100">
                                                      <div
                                                            className="h-full rounded-full bg-green-500"
                                                            style={{
                                                                  width:
                                                                        statistics.manufactureCount
                                                                              ? `${(statistics.manufactureComplete /
                                                                                    statistics.manufactureCount) *
                                                                              100
                                                                              }%`
                                                                              : "0%",
                                                            }}
                                                      />
                                                </div>
                                          </div>

                                    </div>

                                    {/* Quick boxes */}

                                    <div className="mt-8 grid grid-cols-2 gap-3">

                                          <div className="rounded-xl bg-amber-50 p-4">
                                                <p className="text-xs text-amber-600">
                                                      Pending
                                                </p>

                                                <p className="mt-1 text-2xl font-extrabold text-amber-700">
                                                      {
                                                            statistics.manufacturePending
                                                      }
                                                </p>
                                          </div>

                                          <div className="rounded-xl bg-green-50 p-4">
                                                <p className="text-xs text-green-600">
                                                      Completed
                                                </p>

                                                <p className="mt-1 text-2xl font-extrabold text-green-700">
                                                      {
                                                            statistics.manufactureComplete
                                                      }
                                                </p>
                                          </div>

                                    </div>

                              </div>

                        </div>

                        {/* ==========================================
                            QUICK SUMMARY
                        ========================================== */}

                        <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">

                              <div className="mb-5">
                                    <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
                                          Quick Summary
                                    </h2>

                                    <p className="mt-1 text-xs text-gray-400 sm:text-sm">
                                          Website-এর গুরুত্বপূর্ণ তথ্য এক
                                          নজরে
                                    </p>
                              </div>

                              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">

                                    <div className="rounded-xl bg-purple-50 p-4">
                                          <p className="text-xs text-purple-600">
                                                Products
                                          </p>

                                          <p className="mt-1 text-xl font-extrabold text-purple-800">
                                                {
                                                      statistics.productCount
                                                }
                                          </p>
                                    </div>

                                    <div className="rounded-xl bg-blue-50 p-4">
                                          <p className="text-xs text-blue-600">
                                                Categories
                                          </p>

                                          <p className="mt-1 text-xl font-extrabold text-blue-800">
                                                {
                                                      statistics.categoryCount
                                                }
                                          </p>
                                    </div>

                                    <div className="rounded-xl bg-green-50 p-4">
                                          <p className="text-xs text-green-600">
                                                Orders
                                          </p>

                                          <p className="mt-1 text-xl font-extrabold text-green-800">
                                                {
                                                      statistics.orderCount
                                                }
                                          </p>
                                    </div>

                                    <div className="rounded-xl bg-orange-50 p-4">
                                          <p className="text-xs text-orange-600">
                                                Campaign
                                          </p>

                                          <p className="mt-1 text-xl font-extrabold text-orange-800">
                                                {
                                                      statistics.campaignCount
                                                }
                                          </p>
                                    </div>

                                    <div className="rounded-xl bg-red-50 p-4">
                                          <p className="text-xs text-red-600">
                                                Super Deal
                                          </p>

                                          <p className="mt-1 text-xl font-extrabold text-red-800">
                                                {
                                                      statistics.superDealCount
                                                }
                                          </p>
                                    </div>

                                    <div className="rounded-xl bg-indigo-50 p-4">
                                          <p className="text-xs text-indigo-600">
                                                Customers
                                          </p>

                                          <p className="mt-1 text-xl font-extrabold text-indigo-800">
                                                {
                                                      statistics.customerCount
                                                }
                                          </p>
                                    </div>

                              </div>

                        </div>

                  </div>
            </div>
      );
};

export default Statistics;
