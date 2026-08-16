import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import MainNav from "./MainNav";
import NewFooter from "./NewFooter";

const MyOrder = () => {
      const { user } = use(AuthContext);

      const [orders, setOrders] = useState([]);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
            if (!user?.email) {
                  setLoading(false);
                  return;
            }

            setLoading(true);

            fetch(
                  `https://posak-bari-backend.vercel.app/order?email=${encodeURIComponent(
                        user.email
                  )}`
            )
                  .then((res) => {
                        if (!res.ok) {
                              throw new Error("Failed to fetch orders");
                        }

                        return res.json();
                  })
                  .then((data) => {
                        setOrders(Array.isArray(data) ? data : []);
                        setLoading(false);
                  })
                  .catch((error) => {
                        console.error("Error fetching orders:", error);
                        setOrders([]);
                        setLoading(false);
                  });
      }, [user]);

      const userName =
            user?.displayName ||
            user?.name ||
            user?.email?.split("@")[0] ||
            "Customer";

      /* ================= LOADING ================= */

      if (loading) {
            return <h3>Loading ...</h3>
      }

      return (
            <>
                  <MainNav />

                  <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
                        <div className="mx-auto w-full max-w-7xl px-3 py-5 sm:px-5 sm:py-8 lg:px-8 lg:py-10">
                              {/* ================= USER PROFILE HEADER ================= */}

                              <section className="relative mb-6 overflow-hidden rounded-2xl border border-purple-100 bg-gradient-to-br from-purple-50 via-white to-white shadow-sm sm:mb-8 sm:rounded-3xl">
                                    {/* Decorative circles */}
                                    <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-purple-100/70 sm:h-40 sm:w-40"></div>

                                    <div className="absolute -bottom-14 right-20 h-28 w-28 rounded-full bg-purple-50"></div>

                                    <div className="relative flex items-center gap-3 p-4 sm:gap-5 sm:p-6 lg:p-7">
                                          {/* Avatar */}
                                          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-purple-800 text-xl font-bold uppercase text-white shadow-lg shadow-purple-200 sm:h-16 sm:w-16 sm:text-2xl">
                                                {userName?.charAt(0)}
                                          </div>

                                          {/* User information */}
                                          <div className="min-w-0 flex-1">
                                                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                                                      <span className="text-xs font-medium text-gray-500 sm:text-sm">
                                                            Welcome back,
                                                      </span>

                                                      <h1 className="max-w-full truncate text-lg font-bold text-gray-900 sm:text-2xl">
                                                            {userName}
                                                      </h1>
                                                </div>

                                                {user?.email && (
                                                      <p className="mt-1 max-w-[260px] truncate text-xs text-gray-500 sm:max-w-md sm:text-sm">
                                                            {user.email}
                                                      </p>
                                                )}

                                                <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-purple-100 px-2.5 py-1 text-[10px] font-bold text-purple-700 sm:px-3 sm:text-xs">
                                                      <span className="h-1.5 w-1.5 rounded-full bg-purple-600"></span>
                                                      My Account
                                                </div>
                                          </div>
                                    </div>
                              </section>

                              {/* ================= PAGE HEADER ================= */}

                              <section className="mb-5 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-end sm:justify-between">
                                    <div>
                                          <div className="flex items-center gap-2">
                                                <div className="h-7 w-1 rounded-full bg-purple-600 sm:h-8"></div>

                                                <h2 className="text-xl font-bold text-gray-900 sm:text-2xl lg:text-3xl">
                                                      My Orders
                                                </h2>
                                          </div>

                                          <p className="mt-1.5 pl-3 text-xs text-gray-500 sm:text-sm">
                                                Track and manage all your orders from here.
                                          </p>
                                    </div>

                                    {/* Order count */}
                                    <div className="w-fit rounded-xl border border-purple-100 bg-purple-50 px-4 py-2.5">
                                          <p className="text-[10px] font-semibold uppercase tracking-wide text-purple-500">
                                                Total Orders
                                          </p>

                                          <p className="mt-0.5 text-lg font-bold text-purple-700">
                                                {orders.length}
                                          </p>
                                    </div>
                              </section>

                              {/* ================= NO ORDERS ================= */}

                              {orders.length === 0 ? (
                                    <section className="rounded-2xl border border-gray-200 bg-white px-5 py-14 text-center shadow-sm sm:rounded-3xl sm:py-20">
                                          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-purple-50 text-2xl sm:h-20 sm:w-20 sm:text-3xl">
                                                🛒
                                          </div>

                                          <h3 className="mt-5 text-lg font-bold text-gray-800 sm:text-xl">
                                                No orders found!
                                          </h3>

                                          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                                                You haven't placed any orders yet. Your orders will appear
                                                here once you make a purchase.
                                          </p>
                                    </section>
                              ) : (
                                    <>
                                          {/* ===================================================== */}
                                          {/* DESKTOP TABLE */}
                                          {/* ===================================================== */}

                                          <section className="hidden overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm md:block lg:rounded-3xl">
                                                <div className="overflow-x-auto">
                                                      <table className="w-full min-w-[950px] border-collapse text-left">
                                                            <thead>
                                                                  <tr className="border-b border-purple-100 bg-purple-50/70">
                                                                        <th className="whitespace-nowrap px-5 py-4 text-xs font-bold uppercase tracking-wide text-purple-700">
                                                                              Product
                                                                        </th>

                                                                        <th className="whitespace-nowrap px-5 py-4 text-xs font-bold uppercase tracking-wide text-purple-700">
                                                                              Details
                                                                        </th>

                                                                        <th className="whitespace-nowrap px-5 py-4 text-xs font-bold uppercase tracking-wide text-purple-700">
                                                                              Price
                                                                        </th>

                                                                        <th className="whitespace-nowrap px-5 py-4 text-xs font-bold uppercase tracking-wide text-purple-700">
                                                                              Quantity
                                                                        </th>

                                                                        <th className="whitespace-nowrap px-5 py-4 text-xs font-bold uppercase tracking-wide text-purple-700">
                                                                              Total
                                                                        </th>

                                                                        <th className="whitespace-nowrap px-5 py-4 text-xs font-bold uppercase tracking-wide text-purple-700">
                                                                              Status
                                                                        </th>

                                                                        <th className="whitespace-nowrap px-5 py-4 text-xs font-bold uppercase tracking-wide text-purple-700">
                                                                              Order Date
                                                                        </th>
                                                                  </tr>
                                                            </thead>

                                                            <tbody className="divide-y divide-gray-100">
                                                                  {orders.map((order) => {
                                                                        const itemsList = Array.isArray(order.items)
                                                                              ? order.items
                                                                              : [order];

                                                                        return itemsList.map((item, itemIndex) => (
                                                                              <tr
                                                                                    key={`${order._id}-${itemIndex}`}
                                                                                    className="transition duration-200 hover:bg-purple-50/30"
                                                                              >
                                                                                    {/* Product */}
                                                                                    <td className="px-5 py-4">
                                                                                          <div className="flex min-w-[230px] items-center gap-3">
                                                                                                <img
                                                                                                      src={item.image}
                                                                                                      alt={item.productName || "Product"}
                                                                                                      className="h-14 w-14 shrink-0 rounded-xl border border-gray-200 object-cover"
                                                                                                />

                                                                                                <div className="min-w-0">
                                                                                                      <p className="line-clamp-2 font-semibold text-gray-800">
                                                                                                            {item.productName || "Product"}
                                                                                                      </p>
                                                                                                </div>
                                                                                          </div>
                                                                                    </td>

                                                                                    {/* Details */}
                                                                                    <td className="px-5 py-4 text-sm text-gray-600">
                                                                                          <p>
                                                                                                <span className="font-semibold text-gray-700">
                                                                                                      Size:
                                                                                                </span>{" "}
                                                                                                {item.size || "N/A"}
                                                                                          </p>

                                                                                          <p className="mt-1">
                                                                                                <span className="font-semibold text-gray-700">
                                                                                                      Color:
                                                                                                </span>{" "}
                                                                                                {item.color || "N/A"}
                                                                                          </p>
                                                                                    </td>

                                                                                    {/* Price */}
                                                                                    <td className="whitespace-nowrap px-5 py-4 font-semibold text-gray-800">
                                                                                          ৳{item.price || 0}
                                                                                    </td>

                                                                                    {/* Quantity */}
                                                                                    <td className="px-5 py-4">
                                                                                          <span className="inline-flex min-w-8 items-center justify-center rounded-lg bg-gray-100 px-2 py-1 text-sm font-semibold text-gray-700">
                                                                                                {item.quantity || 0}
                                                                                          </span>
                                                                                    </td>

                                                                                    {/* Total */}
                                                                                    <td className="whitespace-nowrap px-5 py-4">
                                                                                          <span className="font-bold text-purple-700">
                                                                                                ৳{item.totalPrice || 0}
                                                                                          </span>
                                                                                    </td>

                                                                                    {/* Status */}
                                                                                    <td className="px-5 py-4">
                                                                                          <StatusBadge status={order.status} />
                                                                                    </td>

                                                                                    {/* Date */}
                                                                                    <td className="whitespace-nowrap px-5 py-4 text-xs text-gray-500">
                                                                                          <OrderDate date={order.orderDate} />
                                                                                    </td>
                                                                              </tr>
                                                                        ));
                                                                  })}
                                                            </tbody>
                                                      </table>
                                                </div>
                                          </section>

                                          {/* ===================================================== */}
                                          {/* MOBILE + SMALL TABLET CARDS */}
                                          {/* ===================================================== */}

                                          <section className="space-y-4 md:hidden">
                                                {orders.map((order) => {
                                                      const itemsList = Array.isArray(order.items)
                                                            ? order.items
                                                            : [order];

                                                      return itemsList.map((item, itemIndex) => (
                                                            <article
                                                                  key={`${order._id}-${itemIndex}`}
                                                                  className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
                                                            >
                                                                  {/* Product header */}
                                                                  <div className="flex items-start gap-3 border-b border-gray-100 p-4">
                                                                        <img
                                                                              src={item.image}
                                                                              alt={item.productName || "Product"}
                                                                              className="h-16 w-16 shrink-0 rounded-xl border border-gray-200 object-cover"
                                                                        />

                                                                        <div className="min-w-0 flex-1">
                                                                              <h3 className="line-clamp-2 text-sm font-bold leading-5 text-gray-800 sm:text-base">
                                                                                    {item.productName || "Product"}
                                                                              </h3>

                                                                              <p className="mt-1 text-[10px] text-gray-400 sm:text-xs">
                                                                                    Order #{order._id?.slice(-6) || "N/A"}
                                                                              </p>
                                                                        </div>

                                                                        <StatusBadge status={order.status} />
                                                                  </div>

                                                                  {/* Details */}
                                                                  <div className="grid grid-cols-2 gap-2.5 p-3 sm:gap-3 sm:p-4">
                                                                        <InfoItem
                                                                              label="Size"
                                                                              value={item.size || "N/A"}
                                                                        />

                                                                        <InfoItem
                                                                              label="Color"
                                                                              value={item.color || "N/A"}
                                                                        />

                                                                        <InfoItem
                                                                              label="Price"
                                                                              value={`৳${item.price || 0}`}
                                                                        />

                                                                        <InfoItem
                                                                              label="Quantity"
                                                                              value={item.quantity || 0}
                                                                        />
                                                                  </div>

                                                                  {/* Bottom summary */}
                                                                  <div className="flex items-center justify-between gap-3 border-t border-gray-100 bg-gradient-to-r from-purple-50/60 to-white px-4 py-4">
                                                                        <div>
                                                                              <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                                                                                    Total Price
                                                                              </p>

                                                                              <p className="mt-1 text-lg font-bold text-purple-700 sm:text-xl">
                                                                                    ৳{item.totalPrice || 0}
                                                                              </p>
                                                                        </div>

                                                                        <div className="text-right">
                                                                              <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                                                                                    Order Date
                                                                              </p>

                                                                              <div className="mt-1">
                                                                                    <OrderDate date={order.orderDate} />
                                                                              </div>
                                                                        </div>
                                                                  </div>
                                                            </article>
                                                      ));
                                                })}
                                          </section>
                                    </>
                              )}
                        </div>
                  </main>

                  <NewFooter />
            </>
      );
};

/* ===================================================== */
/* STATUS BADGE */
/* ===================================================== */

const StatusBadge = ({ status }) => {
      const currentStatus = status?.toLowerCase() || "pending";

      let statusClass =
            "border-yellow-200 bg-yellow-50 text-yellow-700";

      if (currentStatus === "complete" || currentStatus === "completed") {
            statusClass = "border-green-200 bg-green-50 text-green-700";
      } else if (currentStatus === "processing") {
            statusClass = "border-blue-200 bg-blue-50 text-blue-700";
      } else if (
            currentStatus === "cancelled" ||
            currentStatus === "canceled"
      ) {
            statusClass = "border-red-200 bg-red-50 text-red-700";
      }

      return (
            <span
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide sm:px-3 sm:text-[10px] ${statusClass}`}
            >
                  <span className="h-1.5 w-1.5 rounded-full bg-current"></span>

                  {status || "Pending"}
            </span>
      );
};

/* ===================================================== */
/* INFO ITEM */
/* ===================================================== */

const InfoItem = ({ label, value }) => {
      return (
            <div className="min-w-0 rounded-xl bg-gray-50 px-3 py-2.5">
                  <p className="text-[9px] font-semibold uppercase tracking-wider text-gray-400 sm:text-[10px]">
                        {label}
                  </p>

                  <p className="mt-1 truncate text-xs font-bold text-gray-700 sm:text-sm">
                        {value}
                  </p>
            </div>
      );
};

/* ===================================================== */
/* ORDER DATE */
/* ===================================================== */

const OrderDate = ({ date }) => {
      if (!date) {
            return <span>N/A</span>;
      }

      const orderDate = new Date(date);

      if (Number.isNaN(orderDate.getTime())) {
            return <span>N/A</span>;
      }

      return (
            <div>
                  <p className="font-medium text-gray-600">
                        {orderDate.toLocaleDateString()}
                  </p>

                  <p className="mt-0.5 text-[11px] text-gray-400">
                        {orderDate.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                        })}
                  </p>
            </div>
      );
};

export default MyOrder;