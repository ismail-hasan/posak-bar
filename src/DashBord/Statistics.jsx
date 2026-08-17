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
                                          throw new Error(`${key} API failed`);
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

            let manufacturePending = 0;
            let manufactureProcessing = 0;
            let manufactureComplete = 0;
            let manufactureCancelled = 0;

            manufactureOrders.forEach((item) => {
                  const status = String(
                        item?.status || "pending"
                  ).toLowerCase();

                  if (
                        status === "cancel" ||
                        status === "cancelled" ||
                        status === "canceled"
                  ) {
                        manufactureCancelled++;
                  } else if (
                        status === "complete" ||
                        status === "completed" ||
                        status === "delivered"
                  ) {
                        manufactureComplete++;
                  } else if (
                        status === "processing" ||
                        status === "confirmed" ||
                        status === "shipped"
                  ) {
                        manufactureProcessing++;
                  } else {
                        manufacturePending++;
                  }
            });

            return {
                  productCount: products.length,
                  categoryCount: categories.length,
                  cartCount: cartItems.length,
                  orderCount: orders.length,
                  campaignCount: campaigns.length,
                  superDealCount: superDeals.length,
                  manufactureCount: manufactureOrders.length,
                  bannerCount: banners.length,

                  customerCount: customerEmails.size,

                  pendingOrders,
                  processingOrders,
                  completedOrders,
                  cancelledOrders,

                  manufacturePending,
                  manufactureProcessing,
                  manufactureComplete,
                  manufactureCancelled,
            };
      }, [data]);

      // =========================================================
      // ORDER CHART
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
      // MANUFACTURE CHART
      // SAME DESIGN AS ORDER CHART
      // =========================================================

      const manufactureChart = useMemo(() => {
            const total = statistics.manufactureCount;

            const items = [
                  {
                        label: "Pending",
                        value: statistics.manufacturePending,
                        color: "#f59e0b",
                        light: "#fffbeb",
                  },
                  {
                        label: "Processing",
                        value: statistics.manufactureProcessing,
                        color: "#3b82f6",
                        light: "#eff6ff",
                  },
                  {
                        label: "Completed",
                        value: statistics.manufactureComplete,
                        color: "#22c55e",
                        light: "#f0fdf4",
                  },
                  {
                        label: "Cancelled",
                        value: statistics.manufactureCancelled,
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
            },
            {
                  title: "মোট Category",
                  value: statistics.categoryCount,
                  description: "Website categories",
                  icon: "🗂️",
                  bg: "bg-blue-50",
                  iconBg: "bg-blue-100",
            },
            {
                  title: "মোট Order",
                  value: statistics.orderCount,
                  description: "Customer final orders",
                  icon: "🛍️",
                  bg: "bg-green-50",
                  iconBg: "bg-green-100",
            },
            {
                  title: "Customers",
                  value: statistics.customerCount,
                  description: "Unique customers",
                  icon: "👥",
                  bg: "bg-indigo-50",
                  iconBg: "bg-indigo-100",
            },
            {
                  title: "Cart Items",
                  value: statistics.cartCount,
                  description: "Checkout collection",
                  icon: "🛒",
                  bg: "bg-orange-50",
                  iconBg: "bg-orange-100",
            },
            {
                  title: "Manufacture",
                  value: statistics.manufactureCount,
                  description: "Manufacturing orders",
                  icon: "🏭",
                  bg: "bg-cyan-50",
                  iconBg: "bg-cyan-100",
            },
            {
                  title: "Campaign",
                  value: statistics.campaignCount,
                  description: "Advertisement campaigns",
                  icon: "📢",
                  bg: "bg-pink-50",
                  iconBg: "bg-pink-100",
            },
            {
                  title: "Super Deal",
                  value: statistics.superDealCount,
                  description: "Active deal items",
                  icon: "🔥",
                  bg: "bg-red-50",
                  iconBg: "bg-red-100",
            },
            {
                  title: "Banner",
                  value: statistics.bannerCount,
                  description: "Website banners",
                  icon: "🖼️",
                  bg: "bg-violet-50",
                  iconBg: "bg-violet-100",
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
                            OVERVIEW SECTION
                            TOP
                        ================================================= */}

                        <div className="grid gap-5 lg:grid-cols-2">

                              {/* =================================================
                                  ORDER OVERVIEW
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

                                    {/* DONUT + LEGEND */}

                                    <div className="mt-7 flex flex-col items-center gap-7 sm:flex-row sm:justify-center">

                                          {/* DONUT */}

                                          <div
                                                className="relative flex h-52 w-52 shrink-0 items-center justify-center rounded-full shadow-lg"
                                                style={{
                                                      background:
                                                            orderChart.gradient,
                                                }}
                                          >

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

                                          {/* LEGEND */}

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

                                    {/* SUMMARY */}

                                    <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">

                                          {orderChart.items.map(
                                                (item) => (
                                                      <div
                                                            key={`${item.label}-summary`}
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
                                  MANUFACTURING OVERVIEW
                              ================================================= */}

                              <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">

                                    <div className="flex items-start justify-between">

                                          <div>

                                                <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
                                                      Manufacturing Overview
                                                </h2>

                                                <p className="mt-1 text-xs text-gray-400 sm:text-sm">
                                                      Manufacturing order status breakdown
                                                </p>

                                          </div>

                                          <div className="rounded-xl bg-purple-50 px-3 py-2 text-right">

                                                <p className="text-[10px] font-semibold text-purple-500">
                                                      TOTAL
                                                </p>

                                                <p className="text-lg font-extrabold text-purple-700">
                                                      {
                                                            statistics.manufactureCount
                                                      }
                                                </p>

                                          </div>

                                    </div>

                                    {/* DONUT + LEGEND */}

                                    <div className="mt-7 flex flex-col items-center gap-7 sm:flex-row sm:justify-center">

                                          {/* DONUT */}

                                          <div
                                                className="relative flex h-52 w-52 shrink-0 items-center justify-center rounded-full shadow-lg"
                                                style={{
                                                      background:
                                                            manufactureChart.gradient,
                                                }}
                                          >

                                                <div className="flex h-32 w-32 flex-col items-center justify-center rounded-full bg-white shadow-inner">

                                                      <span className="text-3xl font-extrabold tracking-tight text-gray-900">
                                                            {
                                                                  manufactureChart.total
                                                            }
                                                      </span>

                                                      <span className="mt-0.5 text-xs font-medium text-gray-400">
                                                            Total Orders
                                                      </span>

                                                </div>

                                          </div>

                                          {/* LEGEND */}

                                          <div className="w-full max-w-sm space-y-2.5">

                                                {manufactureChart.items.map(
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

                                    {/* SUMMARY */}

                                    <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">

                                          {manufactureChart.items.map(
                                                (item) => (
                                                      <div
                                                            key={`${item.label}-manufacture-summary`}
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

                        </div>


                        {/* =================================================
                            WEBSITE STATISTICS SECTION
                            BELOW OVERVIEW
                        ================================================= */}

                        <div className="mt-7">

                              {/* HEADER */}

                              <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

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


                              {/* STAT CARDS */}

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

                        </div>

                  </div>

            </div>
      );
};

export default Statistics;