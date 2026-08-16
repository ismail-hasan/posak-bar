import React, { useEffect, useMemo, useState } from "react";

const BASE_URL = "https://posak-bari-backend.vercel.app";

const Statistics = () => {
      const [data, setData] = useState({
            products: [],
            categories: [],
            cartItems: [],
            orders: [],
            campaigns: [],
            superDeals: [],
            manufactureOrders: [],
            banners: [],
      });

      const [loading, setLoading] = useState(true);
      const [error, setError] = useState("");
      const [refreshing, setRefreshing] = useState(false);

      // =========================================================
      // FETCH ALL DATA
      // =========================================================
      const fetchAllData = async (isRefresh = false) => {
            try {
                  if (isRefresh) {
                        setRefreshing(true);
                  } else {
                        setLoading(true);
                  }

                  setError("");

                  const endpoints = [
                        ["products", `${BASE_URL}/product`],
                        ["categories", `${BASE_URL}/category`],
                        ["cartItems", `${BASE_URL}/ceheckout`],
                        ["orders", `${BASE_URL}/order`],
                        ["campaigns", `${BASE_URL}/addcam`],
                        ["superDeals", `${BASE_URL}/superdeal`],
                        ["manufactureOrders", `${BASE_URL}/manufacture`],
                        ["banners", `${BASE_URL}/banner`],
                  ];

                  const responses = await Promise.all(
                        endpoints.map(async ([key, url]) => {
                              try {
                                    const response = await fetch(url);

                                    if (!response.ok) {
                                          throw new Error(
                                                `${key} API failed`
                                          );
                                    }

                                    const result = await response.json();

                                    return [
                                          key,
                                          Array.isArray(result)
                                                ? result
                                                : [],
                                    ];
                              } catch (err) {
                                    console.error(
                                          `${key} fetch error:`,
                                          err
                                    );

                                    return [key, []];
                              }
                        })
                  );

                  const newData = Object.fromEntries(responses);

                  setData({
                        products: newData.products || [],
                        categories: newData.categories || [],
                        cartItems: newData.cartItems || [],
                        orders: newData.orders || [],
                        campaigns: newData.campaigns || [],
                        superDeals: newData.superDeals || [],
                        manufactureOrders:
                              newData.manufactureOrders || [],
                        banners: newData.banners || [],
                  });
            } catch (err) {
                  console.error("Statistics error:", err);

                  setError(
                        "Dashboard data load করতে সমস্যা হয়েছে।"
                  );
            } finally {
                  setLoading(false);
                  setRefreshing(false);
            }
      };

      useEffect(() => {
            fetchAllData();
      }, []);

      // =========================================================
      // STATISTICS
      // =========================================================
      const statistics = useMemo(() => {
            const {
                  products,
                  categories,
                  cartItems,
                  orders,
                  campaigns,
                  superDeals,
                  manufactureOrders,
                  banners,
            } = data;

            // =====================================================
            // UNIQUE CUSTOMERS
            // =====================================================
            const customerEmails = new Set();

            cartItems.forEach((item) => {
                  const email =
                        item?.userEmail ||
                        item?.email;

                  if (email) {
                        customerEmails.add(
                              String(email).toLowerCase()
                        );
                  }
            });

            orders.forEach((order) => {
                  const customerEmail =
                        order?.customer?.email ||
                        order?.userEmail ||
                        order?.email;

                  if (customerEmail) {
                        customerEmails.add(
                              String(customerEmail).toLowerCase()
                        );
                  }
            });

            // =====================================================
            // ORDER STATUS
            // =====================================================
            let pendingOrders = 0;
            let processingOrders = 0;
            let completedOrders = 0;
            let cancelledOrders = 0;

            orders.forEach((order) => {
                  const status = String(
                        order?.status || "pending"
                  ).toLowerCase();

                  if (
                        status === "cancel" ||
                        status === "cancelled" ||
                        status === "canceled"
                  ) {
                        cancelledOrders++;
                  } else if (
                        status === "complete" ||
                        status === "completed" ||
                        status === "delivered"
                  ) {
                        completedOrders++;
                  } else if (
                        status === "processing" ||
                        status === "confirmed" ||
                        status === "shipped"
                  ) {
                        processingOrders++;
                  } else {
                        pendingOrders++;
                  }
            });

            // =====================================================
            // MANUFACTURE STATUS
            // =====================================================
            const manufacturePending =
                  manufactureOrders.filter(
                        (item) =>
                              String(
                                    item?.status || ""
                              ).toLowerCase() === "pending"
                  ).length;

            const manufactureComplete =
                  manufactureOrders.filter((item) => {
                        const status = String(
                              item?.status || ""
                        ).toLowerCase();

                        return (
                              status === "complete" ||
                              status === "completed"
                        );
                  }).length;

            const manufactureOther =
                  Math.max(
                        manufactureOrders.length -
                        manufacturePending -
                        manufactureComplete,
                        0
                  );

            return {
                  productCount: products.length,

                  categoryCount: categories.length,

                  cartCount: cartItems.length,

                  orderCount: orders.length,

                  campaignCount: campaigns.length,

                  superDealCount: superDeals.length,

                  manufactureCount:
                        manufactureOrders.length,

                  bannerCount: banners.length,

                  customerCount:
                        customerEmails.size,

                  pendingOrders,

                  processingOrders,

                  completedOrders,

                  cancelledOrders,

                  manufacturePending,

                  manufactureComplete,

                  manufactureOther,
            };
      }, [data]);

      // =========================================================
      // ORDER PIE DATA
      // =========================================================
      const orderChart = useMemo(() => {
            const total = statistics.orderCount;

            const items = [
                  {
                        label: "Pending",
                        value: statistics.pendingOrders,
                        color: "#f59e0b",
                        light: "#fffbeb",
                  },
                  {
                        label: "Processing",
                        value: statistics.processingOrders,
                        color: "#3b82f6",
                        light: "#eff6ff",
                  },
                  {
                        label: "Completed",
                        value: statistics.completedOrders,
                        color: "#22c55e",
                        light: "#f0fdf4",
                  },
                  {
                        label: "Cancelled",
                        value: statistics.cancelledOrders,
                        color: "#ef4444",
                        light: "#fef2f2",
                  },
            ];

            let currentDegree = 0;

            const chartItems = items.map((item) => {
                  const percentage = total
                        ? (item.value / total) * 100
                        : 0;

                  const degree = percentage * 3.6;

                  const start = currentDegree;
                  const end = currentDegree + degree;

                  currentDegree = end;

                  return {
                        ...item,
                        percentage,
                        start,
                        end,
                  };
            });

            const gradient = total
                  ? `conic-gradient(${chartItems
                        .map(
                              (item) =>
                                    `${item.color} ${item.start}deg ${item.end}deg`
                        )
                        .join(", ")})`
                  : "#e5e7eb";

            return {
                  total,
                  items: chartItems,
                  gradient,
            };
      }, [statistics]);

      // =========================================================
      // STAT CARDS
      // =========================================================
      const cards = [
            {
                  title: "মোট Product",
                  value: statistics.productCount,
                  description: "Website-এর সকল product",
                  icon: "📦",
                  bg: "bg-purple-50",
                  iconBg: "bg-purple-100",
                  text: "text-purple-700",
            },
            {
                  title: "মোট Category",
                  value: statistics.categoryCount,
                  description: "Website categories",
                  icon: "🗂️",
                  bg: "bg-blue-50",
                  iconBg: "bg-blue-100",
                  text: "text-blue-700",
            },
            {
                  title: "মোট Order",
                  value: statistics.orderCount,
                  description: "Customer final orders",
                  icon: "🛍️",
                  bg: "bg-green-50",
                  iconBg: "bg-green-100",
                  text: "text-green-700",
            },
            {
                  title: "Customers",
                  value: statistics.customerCount,
                  description: "Unique customers",
                  icon: "👥",
                  bg: "bg-indigo-50",
                  iconBg: "bg-indigo-100",
                  text: "text-indigo-700",
            },
            {
                  title: "Cart Items",
                  value: statistics.cartCount,
                  description: "Checkout collection",
                  icon: "🛒",
                  bg: "bg-orange-50",
                  iconBg: "bg-orange-100",
                  text: "text-orange-700",
            },
            {
                  title: "Manufacture",
                  value: statistics.manufactureCount,
                  description: "Manufacturing orders",
                  icon: "🏭",
                  bg: "bg-cyan-50",
                  iconBg: "bg-cyan-100",
                  text: "text-cyan-700",
            },
            {
                  title: "Campaign",
                  value: statistics.campaignCount,
                  description: "Advertisement campaigns",
                  icon: "📢",
                  bg: "bg-pink-50",
                  iconBg: "bg-pink-100",
                  text: "text-pink-700",
            },
            {
                  title: "Super Deal",
                  value: statistics.superDealCount,
                  description: "Active deal items",
                  icon: "🔥",
                  bg: "bg-red-50",
                  iconBg: "bg-red-100",
                  text: "text-red-700",
            },
            {
                  title: "Banner",
                  value: statistics.bannerCount,
                  description: "Website banners",
                  icon: "🖼️",
                  bg: "bg-violet-50",
                  iconBg: "bg-violet-100",
                  text: "text-violet-700",
            },
      ];

      // =========================================================
      // LOADING
      // =========================================================
      if (loading) {
            return (
                  <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-7xl">

                              <div className="mb-8">
                                    <div className="h-9 w-60 animate-pulse rounded-lg bg-gray-200" />
                                    <div className="mt-3 h-4 w-80 animate-pulse rounded bg-gray-200" />
                              </div>

                              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                                    {Array.from({
                                          length: 9,
                                    }).map((_, index) => (
                                          <div
                                                key={index}
                                                className="h-36 animate-pulse rounded-2xl bg-white shadow-sm"
                                          />
                                    ))}
                              </div>

                              <div className="mt-6 grid gap-6 lg:grid-cols-2">
                                    <div className="h-[430px] animate-pulse rounded-2xl bg-white" />
                                    <div className="h-[430px] animate-pulse rounded-2xl bg-white" />
                              </div>
                        </div>
                  </div>
            );
      }

      // =========================================================
      // ERROR
      // =========================================================
      if (error) {
            return (
                  <div className="flex min-h-[500px] items-center justify-center px-4">
                        <div className="w-full max-w-md rounded-2xl border border-red-100 bg-white p-8 text-center shadow-lg">
                              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-3xl">
                                    ⚠️
                              </div>

                              <h2 className="mt-4 text-xl font-bold text-gray-900">
                                    Something went wrong
                              </h2>

                              <p className="mt-2 text-sm text-gray-500">
                                    {error}
                              </p>

                              <button
                                    onClick={() =>
                                          fetchAllData(true)
                                    }
                                    className="mt-6 rounded-xl bg-purple-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-purple-700"
                              >
                                    আবার চেষ্টা করুন
                              </button>
                        </div>
                  </div>
            );
      }

      return (
            <div className="min-h-screen bg-[#f7f7fb] px-3 py-5 sm:px-5 sm:py-7 lg:px-8">

                  <div className="mx-auto max-w-7xl">

                        {/* =================================================
                            HEADER
                        ================================================= */}

                        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

                              <div>
                                    <div className="flex items-center gap-2">
                                          <span className="h-2.5 w-2.5 rounded-full bg-green-500 shadow-sm shadow-green-300" />

                                          <span className="text-xs font-bold uppercase tracking-wider text-green-600">
                                                Dashboard Live
                                          </span>
                                    </div>

                                    <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                                          Website Statistics
                                    </h1>

                                    <p className="mt-1 text-sm text-gray-500">
                                          পোশাক বাড়ি ওয়েবসাইটের সম্পূর্ণ
                                          overview এক জায়গায়
                                    </p>
                              </div>

                              <button
                                    onClick={() =>
                                          fetchAllData(true)
                                    }
                                    disabled={refreshing}
                                    className="inline-flex w-fit items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-purple-200 hover:bg-purple-50 disabled:cursor-not-allowed disabled:opacity-60"
                              >
                                    <span
                                          className={
                                                refreshing
                                                      ? "animate-spin"
                                                      : ""
                                          }
                                    >
                                          ↻
                                    </span>

                                    {refreshing
                                          ? "Refreshing..."
                                          : "Refresh Data"}
                              </button>

                        </div>


                        {/* =================================================
                            STAT CARDS
                        ================================================= */}

                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">

                              {cards.map((card) => (
                                    <div
                                          key={card.title}
                                          className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-5"
                                    >

                                          {/* Decorative */}
                                          <div
                                                className={`absolute -right-8 -top-8 h-24 w-24 rounded-full ${card.bg} opacity-70 transition-transform duration-500 group-hover:scale-150`}
                                          />

                                          <div className="relative">

                                                <div className="flex items-start justify-between gap-2">

                                                      <div className="min-w-0">
                                                            <p className="truncate text-xs font-semibold text-gray-500 sm:text-sm">
                                                                  {
                                                                        card.title
                                                                  }
                                                            </p>

                                                            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                                                                  {card.value.toLocaleString()}
                                                            </h2>
                                                      </div>

                                                      <div
                                                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${card.iconBg} text-xl transition duration-300 group-hover:scale-110`}
                                                      >
                                                            {
                                                                  card.icon
                                                            }
                                                      </div>

                                                </div>

                                                <p className="mt-3 truncate text-[10px] text-gray-400 sm:text-xs">
                                                      {
                                                            card.description
                                                      }
                                                </p>

                                          </div>

                                    </div>
                              ))}

                        </div>


                        {/* =================================================
                            MAIN ANALYTICS
                        ================================================= */}

                        <div className="mt-5 grid gap-5 lg:grid-cols-2">

                              {/* =================================================
                                  ORDER CHART
                              ================================================= */}

                              <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">

                                    <div className="flex items-start justify-between">

                                          <div>
                                                <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
                                                      Order Overview
                                                </h2>

                                                <p className="mt-1 text-xs text-gray-400 sm:text-sm">
                                                      সব order-এর status breakdown
                                                </p>
                                          </div>

                                          <div className="rounded-xl bg-purple-50 px-3 py-2 text-right">
                                                <p className="text-[10px] font-semibold text-purple-500">
                                                      TOTAL
                                                </p>

                                                <p className="text-lg font-extrabold text-purple-700">
                                                      {
                                                            statistics.orderCount
                                                      }
                                                </p>
                                          </div>

                                    </div>


                                    <div className="mt-7 flex flex-col items-center gap-7 sm:flex-row sm:justify-center">

                                          {/* =================================================
                                              DONUT
                                          ================================================= */}

                                          <div
                                                className="relative flex h-52 w-52 shrink-0 items-center justify-center rounded-full shadow-lg"
                                                style={{
                                                      background:
                                                            orderChart.gradient,
                                                }}
                                          >

                                                {/* Donut Inner */}
                                                <div className="flex h-32 w-32 flex-col items-center justify-center rounded-full bg-white shadow-inner">

                                                      <span className="text-3xl font-extrabold tracking-tight text-gray-900">
                                                            {
                                                                  orderChart.total
                                                            }
                                                      </span>

                                                      <span className="mt-0.5 text-xs font-medium text-gray-400">
                                                            Total Orders
                                                      </span>

                                                </div>

                                          </div>


                                          {/* =================================================
                                              LEGEND
                                          ================================================= */}

                                          <div className="w-full max-w-sm space-y-2.5">

                                                {orderChart.items.map(
                                                      (item) => (
                                                            <div
                                                                  key={
                                                                        item.label
                                                                  }
                                                                  className="group flex items-center justify-between rounded-xl border border-gray-100 px-3 py-3 transition hover:border-gray-200 hover:shadow-sm"
                                                                  style={{
                                                                        backgroundColor:
                                                                              item.light,
                                                                  }}
                                                            >

                                                                  <div className="flex items-center gap-3">

                                                                        <span
                                                                              className="h-3 w-3 shrink-0 rounded-full shadow-sm"
                                                                              style={{
                                                                                    backgroundColor:
                                                                                          item.color,
                                                                              }}
                                                                        />

                                                                        <span className="text-sm font-semibold text-gray-700">
                                                                              {
                                                                                    item.label
                                                                              }
                                                                        </span>

                                                                  </div>

                                                                  <div className="flex items-center gap-3">

                                                                        <span className="text-xs font-medium text-gray-400">
                                                                              {item.percentage.toFixed(
                                                                                    1
                                                                              )}
                                                                              %
                                                                        </span>

                                                                        <span className="min-w-[28px] text-right text-sm font-extrabold text-gray-900">
                                                                              {
                                                                                    item.value
                                                                              }
                                                                        </span>

                                                                  </div>

                                                            </div>
                                                      )
                                                )}

                                          </div>

                                    </div>


                                    {/* Percentage Summary */}

                                    <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">

                                          {orderChart.items.map(
                                                (item) => (
                                                      <div
                                                            key={
                                                                  `${item.label}-summary`
                                                            }
                                                            className="rounded-xl bg-gray-50 p-3"
                                                      >
                                                            <div className="flex items-center gap-1.5">
                                                                  <span
                                                                        className="h-2 w-2 rounded-full"
                                                                        style={{
                                                                              backgroundColor:
                                                                                    item.color,
                                                                        }}
                                                                  />

                                                                  <span className="text-[11px] font-medium text-gray-500">
                                                                        {
                                                                              item.label
                                                                        }
                                                                  </span>
                                                            </div>

                                                            <p className="mt-1 text-lg font-extrabold text-gray-900">
                                                                  {item.percentage.toFixed(
                                                                        1
                                                                  )}
                                                                  %
                                                            </p>
                                                      </div>
                                                )
                                          )}

                                    </div>

                              </div>


                              {/* =================================================
                                  MANUFACTURE
                              ================================================= */}

                              <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">

                                    <div className="flex items-start justify-between">

                                          <div>
                                                <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
                                                      Manufacturing Overview
                                                </h2>

                                                <p className="mt-1 text-xs text-gray-400 sm:text-sm">
                                                      Manufacturing order summary
                                                </p>
                                          </div>

                                          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-xl">
                                                🏭
                                          </div>

                                    </div>


                                    <div className="mt-7 space-y-6">

                                          {/* TOTAL */}

                                          <div>
                                                <div className="mb-2 flex items-center justify-between">
                                                      <span className="text-sm font-semibold text-gray-600">
                                                            Total Orders
                                                      </span>

                                                      <span className="font-extrabold text-gray-900">
                                                            {
                                                                  statistics.manufactureCount
                                                            }
                                                      </span>
                                                </div>

                                                <div className="h-2.5 overflow-hidden rounded-full bg-gray-100">
                                                      <div className="h-full w-full rounded-full bg-gradient-to-r from-purple-500 to-violet-600" />
                                                </div>
                                          </div>


                                          {/* PENDING */}

                                          <div>
                                                <div className="mb-2 flex items-center justify-between">
                                                      <span className="text-sm font-semibold text-gray-600">
                                                            Pending
                                                      </span>

                                                      <span className="font-extrabold text-amber-600">
                                                            {
                                                                  statistics.manufacturePending
                                                            }
                                                      </span>
                                                </div>

                                                <div className="h-2.5 overflow-hidden rounded-full bg-gray-100">
                                                      <div
                                                            className="h-full rounded-full bg-amber-500 transition-all duration-700"
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


                                          {/* COMPLETE */}

                                          <div>
                                                <div className="mb-2 flex items-center justify-between">
                                                      <span className="text-sm font-semibold text-gray-600">
                                                            Completed
                                                      </span>

                                                      <span className="font-extrabold text-green-600">
                                                            {
                                                                  statistics.manufactureComplete
                                                            }
                                                      </span>
                                                </div>

                                                <div className="h-2.5 overflow-hidden rounded-full bg-gray-100">
                                                      <div
                                                            className="h-full rounded-full bg-green-500 transition-all duration-700"
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


                                    {/* QUICK BOXES */}

                                    <div className="mt-8 grid grid-cols-3 gap-3">

                                          <div className="rounded-xl border border-amber-100 bg-amber-50 p-3 sm:p-4">
                                                <p className="text-[10px] font-semibold text-amber-600 sm:text-xs">
                                                      Pending
                                                </p>

                                                <p className="mt-1 text-xl font-extrabold text-amber-700 sm:text-2xl">
                                                      {
                                                            statistics.manufacturePending
                                                      }
                                                </p>
                                          </div>

                                          <div className="rounded-xl border border-green-100 bg-green-50 p-3 sm:p-4">
                                                <p className="text-[10px] font-semibold text-green-600 sm:text-xs">
                                                      Completed
                                                </p>

                                                <p className="mt-1 text-xl font-extrabold text-green-700 sm:text-2xl">
                                                      {
                                                            statistics.manufactureComplete
                                                      }
                                                </p>
                                          </div>

                                          <div className="rounded-xl border border-gray-100 bg-gray-50 p-3 sm:p-4">
                                                <p className="text-[10px] font-semibold text-gray-500 sm:text-xs">
                                                      Other
                                                </p>

                                                <p className="mt-1 text-xl font-extrabold text-gray-700 sm:text-2xl">
                                                      {
                                                            statistics.manufactureOther
                                                      }
                                                </p>
                                          </div>

                                    </div>

                              </div>

                        </div>


                        {/* =================================================
                            QUICK SUMMARY
                        ================================================= */}

                        <div className="mt-5 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">

                              <div className="mb-5">
                                    <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
                                          Quick Summary
                                    </h2>

                                    <p className="mt-1 text-xs text-gray-400 sm:text-sm">
                                          Website-এর গুরুত্বপূর্ণ তথ্য এক নজরে
                                    </p>
                              </div>


                              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">

                                    {/* Products */}
                                    <div className="rounded-xl border border-purple-100 bg-purple-50 p-4">
                                          <p className="text-xs font-semibold text-purple-600">
                                                Products
                                          </p>

                                          <p className="mt-1 text-2xl font-extrabold text-purple-800">
                                                {
                                                      statistics.productCount
                                                }
                                          </p>
                                    </div>


                                    {/* Categories */}
                                    <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
                                          <p className="text-xs font-semibold text-blue-600">
                                                Categories
                                          </p>

                                          <p className="mt-1 text-2xl font-extrabold text-blue-800">
                                                {
                                                      statistics.categoryCount
                                                }
                                          </p>
                                    </div>


                                    {/* Orders */}
                                    <div className="rounded-xl border border-green-100 bg-green-50 p-4">
                                          <p className="text-xs font-semibold text-green-600">
                                                Orders
                                          </p>

                                          <p className="mt-1 text-2xl font-extrabold text-green-800">
                                                {
                                                      statistics.orderCount
                                                }
                                          </p>
                                    </div>


                                    {/* Banner */}
                                    <div className="rounded-xl border border-violet-100 bg-violet-50 p-4">
                                          <p className="text-xs font-semibold text-violet-600">
                                                Banners
                                          </p>

                                          <p className="mt-1 text-2xl font-extrabold text-violet-800">
                                                {
                                                      statistics.bannerCount
                                                }
                                          </p>
                                    </div>


                                    {/* Customers */}
                                    <div className="rounded-xl border border-indigo-100 bg-indigo-50 p-4">
                                          <p className="text-xs font-semibold text-indigo-600">
                                                Customers
                                          </p>

                                          <p className="mt-1 text-2xl font-extrabold text-indigo-800">
                                                {
                                                      statistics.customerCount
                                                }
                                          </p>
                                    </div>


                                    {/* Campaign */}
                                    <div className="rounded-xl border border-orange-100 bg-orange-50 p-4">
                                          <p className="text-xs font-semibold text-orange-600">
                                                Campaign
                                          </p>

                                          <p className="mt-1 text-2xl font-extrabold text-orange-800">
                                                {
                                                      statistics.campaignCount
                                                }
                                          </p>
                                    </div>


                                    {/* Super Deal */}
                                    <div className="rounded-xl border border-red-100 bg-red-50 p-4">
                                          <p className="text-xs font-semibold text-red-600">
                                                Super Deal
                                          </p>

                                          <p className="mt-1 text-2xl font-extrabold text-red-800">
                                                {
                                                      statistics.superDealCount
                                                }
                                          </p>
                                    </div>


                                    {/* Cart */}
                                    <div className="rounded-xl border border-cyan-100 bg-cyan-50 p-4">
                                          <p className="text-xs font-semibold text-cyan-600">
                                                Cart Items
                                          </p>

                                          <p className="mt-1 text-2xl font-extrabold text-cyan-800">
                                                {
                                                      statistics.cartCount
                                                }
                                          </p>
                                    </div>


                                    {/* Manufacture */}
                                    <div className="rounded-xl border border-pink-100 bg-pink-50 p-4">
                                          <p className="text-xs font-semibold text-pink-600">
                                                Manufacture
                                          </p>

                                          <p className="mt-1 text-2xl font-extrabold text-pink-800">
                                                {
                                                      statistics.manufactureCount
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