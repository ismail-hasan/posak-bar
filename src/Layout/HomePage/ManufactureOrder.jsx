import React, { useEffect, useState } from "react";

const API_URL = "https://posak-bari-backend.vercel.app/manufacture";

// =========================
// Label Maps
// =========================
const jerseyStyleNames = {
      kolarHalf: "কলার হাফ",
      kolarFull: "কলার ফুল",
      golGolaHalf: "গোল গলা হাফ",
      golGolaFull: "গোল গলা ফুল",
};

const typeNames = {
      manufacturing: "Manufacturing",
      readymade: "Readymade",
};

const deliveryTypeNames = {
      courier: "কুরিয়ার",
      home: "হোম ডেলিভারি",
      office: "অফিস থেকে",
};

const payerNames = {
      customer: "গ্রাহক",
      company: "কোম্পানি",
};

const SIZE_ORDER = ["S", "M", "L", "XL", "XXL", "3XL", "4XL", "5XL"];

const TABS = [
      { key: "all", label: "All Orders" },
      { key: "pending", label: "Pending" },
      { key: "processing", label: "Processing" },
      { key: "completed", label: "Completed" },
      { key: "cancelled", label: "Cancelled", danger: true },
];

// =========================
// Status Helper
// =========================
const normalizeStatus = (status) => {
      if (!status) return "pending";
      const value = String(status).toLowerCase();
      if (value === "complete" || value === "completed") return "completed";
      if (value === "processing") return "processing";
      if (value === "cancel" || value === "cancelled") return "cancelled";
      return "pending";
};

// =========================
// Data Normalizers (নতুন + পুরনো format দুটোই support করে)
// =========================

// Adult sizes -> [{ label: "M", quantity: 5 }]
const getAdultSizes = (manufacturing) => {
      if (Array.isArray(manufacturing.adultSizes)) {
            return manufacturing.adultSizes
                  .filter((i) => Number(i.quantity) > 0)
                  .map((i) => ({ label: i.size, quantity: Number(i.quantity) }));
      }

      // পুরনো format: sizes = { M: "5", L: "2" }
      if (
            manufacturing.sizes &&
            !Array.isArray(manufacturing.sizes) &&
            typeof manufacturing.sizes === "object"
      ) {
            return Object.entries(manufacturing.sizes)
                  .filter(([, q]) => Number(q) > 0)
                  .sort(([a], [b]) => SIZE_ORDER.indexOf(a) - SIZE_ORDER.indexOf(b))
                  .map(([size, q]) => ({ label: size, quantity: Number(q) }));
      }

      return [];
};

// Kids sizes -> [{ label: "3 বছর", quantity: 1 }]
const getKidsSizes = (manufacturing) => {
      if (Array.isArray(manufacturing.kidsSizes)) {
            return manufacturing.kidsSizes
                  .filter((i) => Number(i.quantity) > 0)
                  .map((i) => ({ label: `${i.age} বছর`, quantity: Number(i.quantity) }));
      }

      // পুরনো format: kids = { 3: "1", 7: "10" }
      if (
            manufacturing.kids &&
            typeof manufacturing.kids === "object" &&
            !Array.isArray(manufacturing.kids)
      ) {
            return Object.entries(manufacturing.kids)
                  .filter(([, q]) => Number(q) > 0)
                  .sort(([a], [b]) => Number(a) - Number(b))
                  .map(([age, q]) => ({ label: `${age} বছর`, quantity: Number(q) }));
      }

      return [];
};

// Readymade -> [{ name, quantity }]
const getReadymadeItems = (readymade) => {
      if (!readymade) return [];

      if (Array.isArray(readymade.items)) {
            return readymade.items
                  .filter((i) => Number(i.quantity) > 0)
                  .map((i) => ({ name: i.name, quantity: Number(i.quantity) }));
      }

      // পুরনো format: { "টাই": "5" }
      if (typeof readymade === "object") {
            return Object.entries(readymade)
                  .filter(([key, q]) => key !== "totalQuantity" && Number(q) > 0)
                  .map(([name, q]) => ({ name, quantity: Number(q) }));
      }

      return [];
};

// Jersey style -> [{ key, quantity }] (শুধু > 0)
const getJerseyItems = (jerseyStyle) =>
      Object.entries(jerseyStyle || {})
            .filter(([, q]) => Number(q) > 0)
            .map(([key, q]) => ({ key, quantity: Number(q) }));

const sumQty = (list) => list.reduce((s, i) => s + i.quantity, 0);

// =========================
// Small UI Parts
// =========================
const Dash = () => <span className="text-sm text-gray-400">-</span>;

const Th = ({ children, w, last }) => (
      <th
            className={`border-purple-600 px-3 py-4 text-center text-xs font-bold uppercase tracking-wide text-white ${last ? "" : "border-r"
                  }`}
            style={{ width: w, minWidth: w }}
      >
            {children}
      </th>
);

const ManufactureOrder = () => {
      const [orders, setOrders] = useState([]);
      const [activeTab, setActiveTab] = useState("all");
      const [loading, setLoading] = useState(true);
      const [actionLoading, setActionLoading] = useState(null);
      const [selectedPaymentImage, setSelectedPaymentImage] = useState(null);

      // =========================
      // Fetch Orders
      // =========================
      const fetchOrders = async () => {
            try {
                  setLoading(true);

                  const res = await fetch(API_URL);
                  if (!res.ok) throw new Error("Failed to fetch orders");

                  const data = await res.json();

                  const latestFirst = Array.isArray(data)
                        ? [...data].sort((a, b) => {
                              if (a.createdAt && b.createdAt) {
                                    return new Date(b.createdAt) - new Date(a.createdAt);
                              }
                              if (a._id && b._id) return b._id.localeCompare(a._id);
                              return 0;
                        })
                        : [];

                  setOrders(latestFirst);
            } catch (error) {
                  console.error("Failed to fetch orders:", error);
            } finally {
                  setLoading(false);
            }
      };

      useEffect(() => {
            fetchOrders();
      }, []);

      // =========================
      // Image Modal
      // =========================
      const closePaymentImage = () => setSelectedPaymentImage(null);

      useEffect(() => {
            const handleEscape = (e) => {
                  if (e.key === "Escape") closePaymentImage();
            };
            window.addEventListener("keydown", handleEscape);
            return () => window.removeEventListener("keydown", handleEscape);
      }, []);

      // =========================
      // Change Status
      // =========================
      const handleStatusChange = async (id, newStatus) => {
            try {
                  setActionLoading(`${id}-${newStatus}`);

                  const res = await fetch(`${API_URL}/${id}`, {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ status: newStatus }),
                  });

                  if (!res.ok) throw new Error(`Failed to change status to ${newStatus}`);
                  await res.json();

                  setOrders((prev) =>
                        prev.map((order) =>
                              order._id === id ? { ...order, status: newStatus } : order
                        )
                  );

                  setActiveTab(newStatus);
            } catch (error) {
                  console.error("Status change failed:", error);
                  alert("Failed to update order status");
            } finally {
                  setActionLoading(null);
            }
      };

      // =========================
      // Delete
      // =========================
      const handleDelete = async (id) => {
            if (!window.confirm("Are you sure you want to delete this order?")) return;

            try {
                  setActionLoading(`${id}-delete`);

                  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
                  if (!res.ok) throw new Error("Failed to delete order");
                  await res.json();

                  setOrders((prev) => prev.filter((order) => order._id !== id));
            } catch (error) {
                  console.error("Delete failed:", error);
                  alert("Failed to delete order");
            } finally {
                  setActionLoading(null);
            }
      };

      // =========================
      // Counts + Filter
      // =========================
      const countOf = (key) =>
            key === "all"
                  ? orders.length
                  : orders.filter((o) => normalizeStatus(o.status) === key).length;

      const filteredOrders = orders.filter((order) =>
            activeTab === "all" ? true : normalizeStatus(order.status) === activeTab
      );

      // =========================
      // Loading
      // =========================
      if (loading) {
            return (
                  <div className="flex min-h-[420px] items-center justify-center bg-[#faf9ff] px-4">
                        <div className="text-center">
                              <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-purple-100 border-t-purple-600"></div>
                              <p className="text-sm font-semibold text-gray-500">
                                    Loading orders...
                              </p>
                        </div>
                  </div>
            );
      }

      return (
            <div className="min-h-screen w-full overflow-x-hidden bg-[#faf9ff] p-3 sm:p-5 lg:p-6">
                  <div className="mb-6">
                        <h2 className="text-3xl font-bold text-gray-800">
                              Manufacturing Orders Management
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                              Total Orders Found:{" "}
                              <span className="font-semibold text-purple-900">{orders.length}</span>
                        </p>
                  </div>

                  <div className="mx-auto w-full max-w-[1900px]">
                        {/* TABS */}
                        <div className="mb-5 grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-5">
                              {TABS.map((tab) => {
                                    const active = activeTab === tab.key;

                                    return (
                                          <button
                                                key={tab.key}
                                                type="button"
                                                onClick={() => setActiveTab(tab.key)}
                                                className={`flex min-h-[58px] w-full items-center justify-center gap-2 rounded-xl border px-2 transition-all duration-200 sm:px-3 ${active
                                                      ? tab.danger
                                                            ? "border-red-600 bg-red-600 text-white shadow-lg shadow-red-200"
                                                            : "border-purple-600 bg-purple-600 text-white shadow-lg shadow-purple-200"
                                                      : tab.danger
                                                            ? "border-purple-100 bg-white text-gray-600 hover:border-red-300 hover:bg-red-50"
                                                            : "border-purple-100 bg-white text-gray-600 hover:border-purple-300 hover:bg-purple-50"
                                                      }`}
                                          >
                                                <span className="whitespace-nowrap text-xs font-bold sm:text-sm md:text-base">
                                                      {tab.label}
                                                </span>

                                                <span
                                                      className={`flex h-6 min-w-6 items-center justify-center rounded-full px-2 text-xs font-bold ${active
                                                            ? "bg-white/20 text-white"
                                                            : tab.danger
                                                                  ? "bg-red-100 text-red-700"
                                                                  : "bg-purple-100 text-purple-700"
                                                            }`}
                                                >
                                                      {countOf(tab.key)}
                                                </span>
                                          </button>
                                    );
                              })}
                        </div>

                        {/* EMPTY STATE */}
                        {filteredOrders.length === 0 && (
                              <div className="rounded-xl border border-purple-100 bg-white px-4 py-14 text-center shadow-sm sm:px-5">
                                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-purple-50 text-2xl">
                                          📦
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-800">No Orders Found</h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                          There are no {activeTab === "all" ? "" : activeTab} orders
                                          available.
                                    </p>
                              </div>
                        )}

                        {/* TABLE */}
                        {filteredOrders.length > 0 && (
                              <div className="w-full overflow-hidden rounded-xl border border-purple-100 bg-white shadow-sm">
                                    <div className="w-full overflow-x-auto">
                                          <table className="w-max min-w-[2450px] border-collapse">
                                                <thead>
                                                      <tr className="bg-purple-700">
                                                            <th className="sticky left-0 z-30 w-[65px] min-w-[65px] border-r border-purple-600 bg-purple-700 px-3 py-4 text-center text-xs font-bold uppercase tracking-wide text-white">
                                                                  #
                                                            </th>
                                                            <Th w={220}>Customer</Th>
                                                            <Th w={180}>Product</Th>
                                                            <Th w={130}>Type</Th>
                                                            <Th w={150}>Fabric</Th>
                                                            <Th w={240}>Sizes</Th>
                                                            <Th w={230}>Jersey Style</Th>
                                                            <Th w={190}>Readymade</Th>
                                                            <Th w={150}>Delivery</Th>
                                                            <Th w={180}>Transaction ID</Th>
                                                            <Th w={150}>Payment Proof</Th>
                                                            <Th w={125}>Status</Th>
                                                            <Th w={420} last>
                                                                  Action
                                                            </Th>
                                                      </tr>
                                                </thead>

                                                <tbody>
                                                      {filteredOrders.map((order, index) => {
                                                            const customer = order.customer || {};
                                                            const manufacturing = order.manufacturing || {};
                                                            const fabric = manufacturing.fabric;
                                                            const delivery = order.delivery || {};
                                                            const payment = order.payment || {};

                                                            // ✅ নতুন + পুরনো field দুটোই
                                                            const orderType = order.orderType || order.productType;

                                                            const adultSizes = getAdultSizes(manufacturing);
                                                            const kidsSizes = getKidsSizes(manufacturing);
                                                            const adultTotal = sumQty(adultSizes);
                                                            const kidsTotal = sumQty(kidsSizes);

                                                            const jerseyItems = getJerseyItems(manufacturing.jerseyStyle);
                                                            const jerseyTotal =
                                                                  manufacturing.totalQuantity || sumQty(jerseyItems);

                                                            const readymadeItems = getReadymadeItems(order.readymade);
                                                            const readymadeTotal = sumQty(readymadeItems);

                                                            const payer =
                                                                  delivery.courierChargePaidBy || delivery.payer;

                                                            const transactionId = payment.transactionId || "";
                                                            const paymentProof = payment.paymentProof || "";

                                                            const status = normalizeStatus(order.status);

                                                            const isLoading = (suffix) =>
                                                                  actionLoading === `${order._id}-${suffix}`;
                                                            const rowLoading = actionLoading?.startsWith(
                                                                  `${order._id}-`
                                                            );

                                                            return (
                                                                  <tr
                                                                        key={order._id}
                                                                        className="border-b border-purple-50 transition-colors last:border-b-0 hover:bg-purple-50/40"
                                                                  >
                                                                        {/* # */}
                                                                        <td className="sticky left-0 z-20 bg-white px-3 py-4 text-center align-middle">
                                                                              <span className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 text-sm font-bold text-purple-700">
                                                                                    {index + 1}
                                                                              </span>
                                                                        </td>

                                                                        {/* CUSTOMER */}
                                                                        <td className="px-3 py-4 text-center align-middle">
                                                                              <div className="mx-auto w-[190px]">
                                                                                    <p className="break-words text-sm font-bold leading-5 text-gray-900">
                                                                                          {customer.name || "-"}
                                                                                    </p>
                                                                                    <p className="mt-1 text-xs font-medium text-gray-500">
                                                                                          {customer.phone || "-"}
                                                                                    </p>
                                                                                    <p className="mt-1 break-words text-xs leading-4 text-gray-400">
                                                                                          {customer.address || "-"}
                                                                                    </p>
                                                                              </div>
                                                                        </td>

                                                                        {/* PRODUCT */}
                                                                        <td className="px-3 py-4 text-center align-middle">
                                                                              <div className="mx-auto w-[150px]">
                                                                                    {order.products?.length > 0 ? (
                                                                                          order.products.map((product, i) => (
                                                                                                <p
                                                                                                      key={i}
                                                                                                      className="mb-1 break-words text-sm font-semibold leading-5 text-gray-700 last:mb-0"
                                                                                                >
                                                                                                      {product}
                                                                                                </p>
                                                                                          ))
                                                                                    ) : (
                                                                                          <Dash />
                                                                                    )}
                                                                              </div>
                                                                        </td>

                                                                        {/* TYPE */}
                                                                        <td className="px-3 py-4 text-center align-middle">
                                                                              {orderType ? (
                                                                                    <span
                                                                                          className={`inline-flex rounded-full px-3 py-1.5 text-xs font-bold ${orderType === "readymade"
                                                                                                ? "bg-amber-100 text-amber-700"
                                                                                                : "bg-purple-100 text-purple-700"
                                                                                                }`}
                                                                                    >
                                                                                          {typeNames[orderType] || orderType}
                                                                                    </span>
                                                                              ) : (
                                                                                    <Dash />
                                                                              )}
                                                                        </td>

                                                                        {/* FABRIC */}
                                                                        <td className="px-3 py-4 text-center align-middle">
                                                                              {fabric ? (
                                                                                    <div className="mx-auto w-[130px]">
                                                                                          <p className="break-words text-sm font-bold text-gray-800">
                                                                                                {fabric.name || "-"}
                                                                                          </p>
                                                                                          <p className="mt-1 text-xs text-gray-500">
                                                                                                {fabric.gsm || "-"}
                                                                                          </p>
                                                                                    </div>
                                                                              ) : (
                                                                                    <Dash />
                                                                              )}
                                                                        </td>

                                                                        {/* SIZES */}
                                                                        <td className="px-3 py-4 text-center align-middle">
                                                                              {adultSizes.length > 0 || kidsSizes.length > 0 ? (
                                                                                    <div className="mx-auto w-[210px] space-y-2.5">
                                                                                          {adultSizes.length > 0 && (
                                                                                                <div>
                                                                                                      <p className="mb-1 text-[11px] font-bold text-gray-500">
                                                                                                            বড়দের ({adultTotal} পিস)
                                                                                                      </p>
                                                                                                      <div className="flex flex-wrap justify-center gap-1.5">
                                                                                                            {adultSizes.map((s) => (
                                                                                                                  <span
                                                                                                                        key={s.label}
                                                                                                                        className="rounded-md bg-purple-50 px-2.5 py-1.5 text-xs font-bold text-purple-700"
                                                                                                                  >
                                                                                                                        {s.label}: {s.quantity}
                                                                                                                  </span>
                                                                                                            ))}
                                                                                                      </div>
                                                                                                </div>
                                                                                          )}

                                                                                          {kidsSizes.length > 0 && (
                                                                                                <div>
                                                                                                      <p className="mb-1 text-[11px] font-bold text-gray-500">
                                                                                                            বাচ্চাদের ({kidsTotal} পিস)
                                                                                                      </p>
                                                                                                      <div className="flex flex-wrap justify-center gap-1.5">
                                                                                                            {kidsSizes.map((s) => (
                                                                                                                  <span
                                                                                                                        key={s.label}
                                                                                                                        className="rounded-md bg-pink-50 px-2.5 py-1.5 text-xs font-bold text-pink-700"
                                                                                                                  >
                                                                                                                        {s.label}: {s.quantity}
                                                                                                                  </span>
                                                                                                            ))}
                                                                                                      </div>
                                                                                                </div>
                                                                                          )}

                                                                                          <p className="border-t border-purple-100 pt-1.5 text-xs font-bold text-gray-700">
                                                                                                মোট: {adultTotal + kidsTotal} পিস
                                                                                          </p>
                                                                                    </div>
                                                                              ) : (
                                                                                    <Dash />
                                                                              )}
                                                                        </td>

                                                                        {/* JERSEY STYLE */}
                                                                        <td className="px-3 py-4 text-center align-middle">
                                                                              {jerseyItems.length > 0 ? (
                                                                                    <div className="mx-auto w-[205px] space-y-1.5">
                                                                                          {jerseyItems.map(({ key, quantity }) => (
                                                                                                <div
                                                                                                      key={key}
                                                                                                      className="flex items-center justify-between gap-2 rounded-md border border-purple-100 bg-purple-50/50 px-3 py-2"
                                                                                                >
                                                                                                      <span className="text-xs font-medium text-gray-600">
                                                                                                            {jerseyStyleNames[key] || key}
                                                                                                      </span>
                                                                                                      <span className="text-sm font-bold text-purple-700">
                                                                                                            {quantity}
                                                                                                      </span>
                                                                                                </div>
                                                                                          ))}

                                                                                          <p className="pt-1 text-xs font-bold text-gray-700">
                                                                                                মোট: {jerseyTotal} পিস
                                                                                          </p>
                                                                                    </div>
                                                                              ) : (
                                                                                    <Dash />
                                                                              )}
                                                                        </td>

                                                                        {/* READYMADE */}
                                                                        <td className="px-3 py-4 text-center align-middle">
                                                                              {readymadeItems.length > 0 ? (
                                                                                    <div className="mx-auto w-[170px] space-y-1.5">
                                                                                          {readymadeItems.map(({ name, quantity }) => (
                                                                                                <div
                                                                                                      key={name}
                                                                                                      className="rounded-md bg-gray-50 px-3 py-2"
                                                                                                >
                                                                                                      <p className="break-words text-xs font-semibold leading-4 text-gray-700">
                                                                                                            {name}
                                                                                                      </p>
                                                                                                      <p className="mt-0.5 text-xs font-bold text-purple-600">
                                                                                                            Qty: {quantity}
                                                                                                      </p>
                                                                                                </div>
                                                                                          ))}

                                                                                          <p className="pt-1 text-xs font-bold text-gray-700">
                                                                                                মোট: {readymadeTotal} পিস
                                                                                          </p>
                                                                                    </div>
                                                                              ) : (
                                                                                    <Dash />
                                                                              )}
                                                                        </td>

                                                                        {/* DELIVERY */}
                                                                        <td className="px-3 py-4 text-center align-middle">
                                                                              <div className="mx-auto w-[130px]">
                                                                                    <span className="inline-flex rounded-full bg-purple-50 px-3 py-1.5 text-xs font-bold text-purple-700">
                                                                                          {deliveryTypeNames[delivery.type] ||
                                                                                                delivery.type ||
                                                                                                "-"}
                                                                                    </span>

                                                                                    <p className="mt-1.5 text-xs text-gray-500">
                                                                                          Payer:{" "}
                                                                                          <span className="font-semibold text-gray-700">
                                                                                                {payerNames[payer] || payer || "-"}
                                                                                          </span>
                                                                                    </p>
                                                                              </div>
                                                                        </td>

                                                                        {/* TRANSACTION ID */}
                                                                        <td className="px-3 py-4 text-center align-middle">
                                                                              <div className="mx-auto w-[160px]">
                                                                                    {transactionId ? (
                                                                                          <>
                                                                                                <span className="block break-all rounded-lg border border-blue-100 bg-blue-50 px-3 py-2 text-xs font-bold text-blue-700">
                                                                                                      {transactionId}
                                                                                                </span>
                                                                                                {payment.advancePercentage ? (
                                                                                                      <p className="mt-1 text-[11px] font-semibold text-gray-500">
                                                                                                            অগ্রিম {payment.advancePercentage}%
                                                                                                      </p>
                                                                                                ) : null}
                                                                                          </>
                                                                                    ) : (
                                                                                          <Dash />
                                                                                    )}
                                                                              </div>
                                                                        </td>

                                                                        {/* PAYMENT PROOF */}
                                                                        <td className="px-3 py-4 text-center align-middle">
                                                                              {paymentProof ? (
                                                                                    <div className="flex justify-center">
                                                                                          <button
                                                                                                type="button"
                                                                                                onClick={() =>
                                                                                                      setSelectedPaymentImage(paymentProof)
                                                                                                }
                                                                                                className="group relative overflow-hidden rounded-lg border border-purple-100 bg-purple-50 p-1 shadow-sm transition-all duration-200 hover:border-purple-400 hover:shadow-md"
                                                                                          >
                                                                                                <img
                                                                                                      src={paymentProof}
                                                                                                      alt="Payment Proof"
                                                                                                      className="h-16 w-24 rounded-md object-cover transition-transform duration-200 group-hover:scale-105"
                                                                                                />
                                                                                                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all group-hover:bg-black/20">
                                                                                                      <span className="text-white opacity-0 transition-opacity group-hover:opacity-100">
                                                                                                            🔍
                                                                                                      </span>
                                                                                                </div>
                                                                                          </button>
                                                                                    </div>
                                                                              ) : (
                                                                                    <Dash />
                                                                              )}
                                                                        </td>

                                                                        {/* STATUS */}
                                                                        <td className="px-3 py-4 text-center align-middle">
                                                                              <span
                                                                                    className={`inline-flex rounded-full px-3 py-1.5 text-xs font-bold uppercase ${status === "completed"
                                                                                          ? "bg-purple-100 text-purple-700"
                                                                                          : status === "processing"
                                                                                                ? "bg-blue-100 text-blue-700"
                                                                                                : status === "cancelled"
                                                                                                      ? "bg-red-100 text-red-700"
                                                                                                      : "bg-amber-100 text-amber-700"
                                                                                          }`}
                                                                              >
                                                                                    {status}
                                                                              </span>
                                                                        </td>

                                                                        {/* ACTION */}
                                                                        <td className="w-[420px] px-3 py-4 text-center align-middle">
                                                                              <div className="flex items-center justify-center gap-2">
                                                                                    {/* PROCESSING */}
                                                                                    <button
                                                                                          type="button"
                                                                                          disabled={
                                                                                                rowLoading ||
                                                                                                status === "processing" ||
                                                                                                status === "completed" ||
                                                                                                status === "cancelled"
                                                                                          }
                                                                                          onClick={() =>
                                                                                                handleStatusChange(order._id, "processing")
                                                                                          }
                                                                                          className={`inline-flex min-w-[95px] items-center justify-center rounded-lg px-3 py-2 text-xs font-bold shadow-sm transition-all duration-200 ${status === "processing"
                                                                                                ? "cursor-not-allowed bg-blue-100 text-blue-400"
                                                                                                : status === "completed" ||
                                                                                                      status === "cancelled"
                                                                                                      ? "cursor-not-allowed bg-gray-100 text-gray-400"
                                                                                                      : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md"
                                                                                                }`}
                                                                                    >
                                                                                          {isLoading("processing") ? "..." : "Processing"}
                                                                                    </button>

                                                                                    {/* COMPLETE */}
                                                                                    <button
                                                                                          type="button"
                                                                                          disabled={
                                                                                                rowLoading ||
                                                                                                status === "completed" ||
                                                                                                status === "cancelled"
                                                                                          }
                                                                                          onClick={() =>
                                                                                                handleStatusChange(order._id, "completed")
                                                                                          }
                                                                                          className={`inline-flex min-w-[90px] items-center justify-center rounded-lg px-3 py-2 text-xs font-bold shadow-sm transition-all duration-200 ${status === "completed"
                                                                                                ? "cursor-not-allowed bg-purple-100 text-purple-400"
                                                                                                : status === "cancelled"
                                                                                                      ? "cursor-not-allowed bg-gray-100 text-gray-400"
                                                                                                      : "bg-purple-600 text-white hover:bg-purple-700 hover:shadow-md"
                                                                                                }`}
                                                                                    >
                                                                                          {isLoading("completed") ? "..." : "✓ Complete"}
                                                                                    </button>

                                                                                    {/* CANCEL */}
                                                                                    <button
                                                                                          type="button"
                                                                                          disabled={rowLoading || status === "cancelled"}
                                                                                          onClick={() =>
                                                                                                handleStatusChange(order._id, "cancelled")
                                                                                          }
                                                                                          className={`inline-flex min-w-[80px] items-center justify-center rounded-lg px-3 py-2 text-xs font-bold shadow-sm transition-all duration-200 ${status === "cancelled"
                                                                                                ? "cursor-not-allowed bg-red-100 text-red-400"
                                                                                                : "bg-red-600 text-white hover:bg-red-700 hover:shadow-md"
                                                                                                }`}
                                                                                    >
                                                                                          {isLoading("cancelled") ? "..." : "Cancel"}
                                                                                    </button>

                                                                                    {/* DELETE */}
                                                                                    <button
                                                                                          type="button"
                                                                                          disabled={rowLoading}
                                                                                          onClick={() => handleDelete(order._id)}
                                                                                          className="inline-flex min-w-[70px] items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-bold text-gray-600 shadow-sm transition-all duration-200 hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                                                                                    >
                                                                                          {isLoading("delete") ? "..." : "Delete"}
                                                                                    </button>
                                                                              </div>
                                                                        </td>
                                                                  </tr>
                                                            );
                                                      })}
                                                </tbody>
                                          </table>
                                    </div>

                                    <div className="border-t border-purple-50 bg-purple-50/30 px-4 py-2 text-center text-[11px] font-medium text-purple-500 sm:text-xs">
                                          ← Swipe left or right to view all columns →
                                    </div>
                              </div>
                        )}
                  </div>

                  {/* PAYMENT IMAGE MODAL */}
                  {selectedPaymentImage && (
                        <div
                              className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
                              onClick={closePaymentImage}
                        >
                              <div
                                    className="relative flex max-h-[92vh] max-w-[95vw] items-center justify-center"
                                    onClick={(e) => e.stopPropagation()}
                              >
                                    <button
                                          type="button"
                                          onClick={closePaymentImage}
                                          className="absolute -right-3 -top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl font-bold text-gray-700 shadow-lg transition hover:bg-red-500 hover:text-white"
                                    >
                                          ✕
                                    </button>

                                    <img
                                          src={selectedPaymentImage}
                                          alt="Payment Proof Preview"
                                          className="max-h-[90vh] max-w-[90vw] rounded-xl bg-white object-contain shadow-2xl"
                                    />
                              </div>
                        </div>
                  )}
            </div>
      );
};

export default ManufactureOrder;