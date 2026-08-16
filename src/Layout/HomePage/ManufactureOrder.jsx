import React, { useEffect, useState } from "react";

const API_URL = "https://posak-bari-backend.vercel.app/manufacture";

const ManufactureOrder = () => {
      const [orders, setOrders] = useState([]);
      const [activeTab, setActiveTab] = useState("all");
      const [loading, setLoading] = useState(true);
      const [actionLoading, setActionLoading] = useState(null);

      // =========================
      // Jersey Style Bengali Names
      // =========================
      const jerseyStyleNames = {
            kolarHalf: "কলার হাফ",
            kolarFull: "কলার ফুল",
            golGolaFull: "গোল গলা ফুল",
            golGolaHalf: "গোল গলা হাফ",
      };

      // =========================
      // Status Helpers
      // =========================
      const normalizeStatus = (status) => {
            if (!status) return "pending";

            const value = String(status).toLowerCase();

            if (value === "complete") return "completed";
            if (value === "completed") return "completed";
            if (value === "processing") return "processing";

            return "pending";
      };

      // =========================
      // Fetch Orders
      // =========================
      const fetchOrders = async () => {
            try {
                  setLoading(true);

                  const res = await fetch(API_URL);

                  if (!res.ok) {
                        throw new Error("Failed to fetch orders");
                  }

                  const data = await res.json();

                  setOrders(Array.isArray(data) ? data : []);
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
      // Change Status
      // =========================
      const handleStatusChange = async (id, newStatus) => {
            try {
                  setActionLoading(`${id}-${newStatus}`);

                  const res = await fetch(`${API_URL}/${id}`, {
                        method: "PATCH",
                        headers: {
                              "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                              status: newStatus,
                        }),
                  });

                  if (!res.ok) {
                        throw new Error(
                              `Failed to change status to ${newStatus}`
                        );
                  }

                  await res.json();

                  setOrders((prevOrders) =>
                        prevOrders.map((order) =>
                              order._id === id
                                    ? {
                                          ...order,
                                          status: newStatus,
                                    }
                                    : order
                        )
                  );

                  if (newStatus === "processing") {
                        setActiveTab("processing");
                  }

                  if (newStatus === "completed") {
                        setActiveTab("completed");
                  }
            } catch (error) {
                  console.error("Status change failed:", error);
                  alert("Failed to update order status");
            } finally {
                  setActionLoading(null);
            }
      };

      // =========================
      // Delete Handler
      // =========================
      const handleDelete = async (id) => {
            const confirmDelete = window.confirm(
                  "Are you sure you want to delete this order?"
            );

            if (!confirmDelete) return;

            try {
                  setActionLoading(`${id}-delete`);

                  const res = await fetch(`${API_URL}/${id}`, {
                        method: "DELETE",
                  });

                  if (!res.ok) {
                        throw new Error("Failed to delete order");
                  }

                  await res.json();

                  setOrders((prevOrders) =>
                        prevOrders.filter((order) => order._id !== id)
                  );
            } catch (error) {
                  console.error("Delete failed:", error);
                  alert("Failed to delete order");
            } finally {
                  setActionLoading(null);
            }
      };

      // =========================
      // Counts
      // =========================
      const allCount = orders.length;

      const pendingCount = orders.filter(
            (order) =>
                  normalizeStatus(order.status) === "pending"
      ).length;

      const processingCount = orders.filter(
            (order) =>
                  normalizeStatus(order.status) === "processing"
      ).length;

      const completedCount = orders.filter(
            (order) =>
                  normalizeStatus(order.status) === "completed"
      ).length;

      // =========================
      // Filter Orders
      // =========================
      const filteredOrders = orders.filter((order) => {
            const status = normalizeStatus(order.status);

            if (activeTab === "pending") {
                  return status === "pending";
            }

            if (activeTab === "processing") {
                  return status === "processing";
            }

            if (activeTab === "completed") {
                  return status === "completed";
            }

            return true;
      });

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
                  <div className="mx-auto w-full max-w-[1900px]">

                        {/* =========================
                            TABS
                        ========================= */}
                        <div className="mb-5 grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4">

                              {/* ALL */}
                              <button
                                    type="button"
                                    onClick={() =>
                                          setActiveTab("all")
                                    }
                                    className={`flex min-h-[58px] w-full items-center justify-center gap-2 rounded-xl border px-2 transition-all duration-200 sm:px-3 ${activeTab === "all"
                                          ? "border-purple-600 bg-purple-600 text-white shadow-lg shadow-purple-200"
                                          : "border-purple-100 bg-white text-gray-600 hover:border-purple-300 hover:bg-purple-50"
                                          }`}
                              >
                                    <span className="whitespace-nowrap text-xs font-bold sm:text-sm md:text-base">
                                          All Orders
                                    </span>

                                    <span
                                          className={`flex h-6 min-w-6 items-center justify-center rounded-full px-2 text-xs font-bold ${activeTab === "all"
                                                ? "bg-white/20 text-white"
                                                : "bg-purple-100 text-purple-700"
                                                }`}
                                    >
                                          {allCount}
                                    </span>
                              </button>

                              {/* PENDING */}
                              <button
                                    type="button"
                                    onClick={() =>
                                          setActiveTab("pending")
                                    }
                                    className={`flex min-h-[58px] w-full items-center justify-center gap-2 rounded-xl border px-2 transition-all duration-200 sm:px-3 ${activeTab === "pending"
                                          ? "border-purple-600 bg-purple-600 text-white shadow-lg shadow-purple-200"
                                          : "border-purple-100 bg-white text-gray-600 hover:border-purple-300 hover:bg-purple-50"
                                          }`}
                              >
                                    <span className="whitespace-nowrap text-xs font-bold sm:text-sm md:text-base">
                                          Pending
                                    </span>

                                    <span
                                          className={`flex h-6 min-w-6 items-center justify-center rounded-full px-2 text-xs font-bold ${activeTab === "pending"
                                                ? "bg-white/20 text-white"
                                                : "bg-purple-100 text-purple-700"
                                                }`}
                                    >
                                          {pendingCount}
                                    </span>
                              </button>

                              {/* PROCESSING */}
                              <button
                                    type="button"
                                    onClick={() =>
                                          setActiveTab("processing")
                                    }
                                    className={`flex min-h-[58px] w-full items-center justify-center gap-2 rounded-xl border px-2 transition-all duration-200 sm:px-3 ${activeTab === "processing"
                                          ? "border-purple-600 bg-purple-600 text-white shadow-lg shadow-purple-200"
                                          : "border-purple-100 bg-white text-gray-600 hover:border-purple-300 hover:bg-purple-50"
                                          }`}
                              >
                                    <span className="whitespace-nowrap text-xs font-bold sm:text-sm md:text-base">
                                          Processing
                                    </span>

                                    <span
                                          className={`flex h-6 min-w-6 items-center justify-center rounded-full px-2 text-xs font-bold ${activeTab === "processing"
                                                ? "bg-white/20 text-white"
                                                : "bg-purple-100 text-purple-700"
                                                }`}
                                    >
                                          {processingCount}
                                    </span>
                              </button>

                              {/* COMPLETED */}
                              <button
                                    type="button"
                                    onClick={() =>
                                          setActiveTab("completed")
                                    }
                                    className={`flex min-h-[58px] w-full items-center justify-center gap-2 rounded-xl border px-2 transition-all duration-200 sm:px-3 ${activeTab === "completed"
                                          ? "border-purple-600 bg-purple-600 text-white shadow-lg shadow-purple-200"
                                          : "border-purple-100 bg-white text-gray-600 hover:border-purple-300 hover:bg-purple-50"
                                          }`}
                              >
                                    <span className="whitespace-nowrap text-xs font-bold sm:text-sm md:text-base">
                                          Completed
                                    </span>

                                    <span
                                          className={`flex h-6 min-w-6 items-center justify-center rounded-full px-2 text-xs font-bold ${activeTab === "completed"
                                                ? "bg-white/20 text-white"
                                                : "bg-purple-100 text-purple-700"
                                                }`}
                                    >
                                          {completedCount}
                                    </span>
                              </button>
                        </div>

                        {/* =========================
                            EMPTY STATE
                        ========================= */}
                        {filteredOrders.length === 0 && (
                              <div className="rounded-xl border border-purple-100 bg-white px-4 py-14 text-center shadow-sm sm:px-5">
                                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-purple-50 text-2xl">
                                          📦
                                    </div>

                                    <h3 className="text-lg font-bold text-gray-800">
                                          No Orders Found
                                    </h3>

                                    <p className="mt-1 text-sm text-gray-500">
                                          There are no{" "}
                                          {activeTab === "all"
                                                ? ""
                                                : activeTab}{" "}
                                          orders available.
                                    </p>
                              </div>
                        )}

                        {/* =========================
                            TABLE
                        ========================= */}
                        {filteredOrders.length > 0 && (
                              <div className="w-full overflow-hidden rounded-xl border border-purple-100 bg-white shadow-sm">

                                    {/* Horizontal Scroll Container */}
                                    <div className="w-full overflow-x-auto">
                                          <table className="w-max min-w-[2050px] border-collapse">

                                                {/* =========================
                                                    HEADER
                                                ========================= */}
                                                <thead>
                                                      <tr className="bg-purple-700">

                                                            <th className="sticky left-0 z-30 w-[65px] min-w-[65px] border-r border-purple-600 bg-purple-700 px-3 py-4 text-center text-xs font-bold uppercase tracking-wide text-white">
                                                                  #
                                                            </th>

                                                            <th className="w-[220px] min-w-[220px] border-r border-purple-600 px-3 py-4 text-center text-xs font-bold uppercase tracking-wide text-white">
                                                                  Customer
                                                            </th>

                                                            <th className="w-[180px] min-w-[180px] border-r border-purple-600 px-3 py-4 text-center text-xs font-bold uppercase tracking-wide text-white">
                                                                  Product
                                                            </th>

                                                            <th className="w-[130px] min-w-[130px] border-r border-purple-600 px-3 py-4 text-center text-xs font-bold uppercase tracking-wide text-white">
                                                                  Type
                                                            </th>

                                                            <th className="w-[150px] min-w-[150px] border-r border-purple-600 px-3 py-4 text-center text-xs font-bold uppercase tracking-wide text-white">
                                                                  Fabric
                                                            </th>

                                                            <th className="w-[200px] min-w-[200px] border-r border-purple-600 px-3 py-4 text-center text-xs font-bold uppercase tracking-wide text-white">
                                                                  Sizes
                                                            </th>

                                                            <th className="w-[230px] min-w-[230px] border-r border-purple-600 px-3 py-4 text-center text-xs font-bold uppercase tracking-wide text-white">
                                                                  Jersey Style
                                                            </th>

                                                            <th className="w-[190px] min-w-[190px] border-r border-purple-600 px-3 py-4 text-center text-xs font-bold uppercase tracking-wide text-white">
                                                                  Readymade
                                                            </th>

                                                            <th className="w-[150px] min-w-[150px] border-r border-purple-600 px-3 py-4 text-center text-xs font-bold uppercase tracking-wide text-white">
                                                                  Delivery
                                                            </th>

                                                            <th className="w-[180px] min-w-[180px] border-r border-purple-600 px-3 py-4 text-center text-xs font-bold uppercase tracking-wide text-white">
                                                                  Terms
                                                            </th>

                                                            <th className="w-[125px] min-w-[125px] border-r border-purple-600 px-3 py-4 text-center text-xs font-bold uppercase tracking-wide text-white">
                                                                  Status
                                                            </th>

                                                            <th className="w-[330px] min-w-[330px] px-3 py-4 text-center text-xs font-bold uppercase tracking-wide text-white">
                                                                  Action
                                                            </th>
                                                      </tr>
                                                </thead>

                                                {/* =========================
                                                    BODY
                                                ========================= */}
                                                <tbody>
                                                      {filteredOrders.map(
                                                            (order, index) => {
                                                                  const customer =
                                                                        order.customer ||
                                                                        {};

                                                                  const manufacturing =
                                                                        order.manufacturing ||
                                                                        {};

                                                                  const fabric =
                                                                        manufacturing.fabric;

                                                                  const sizes =
                                                                        manufacturing.sizes ||
                                                                        {};

                                                                  const jerseyStyle =
                                                                        manufacturing.jerseyStyle ||
                                                                        {};

                                                                  const readymade =
                                                                        order.readymade ||
                                                                        {};

                                                                  const delivery =
                                                                        order.delivery ||
                                                                        {};

                                                                  const terms =
                                                                        order.terms;

                                                                  const status =
                                                                        normalizeStatus(
                                                                              order.status
                                                                        );

                                                                  const processingLoading =
                                                                        actionLoading ===
                                                                        `${order._id}-processing`;

                                                                  const completeLoading =
                                                                        actionLoading ===
                                                                        `${order._id}-completed`;

                                                                  const deleteLoading =
                                                                        actionLoading ===
                                                                        `${order._id}-delete`;

                                                                  const rowLoading =
                                                                        actionLoading?.startsWith(
                                                                              `${order._id}-`
                                                                        );

                                                                  return (
                                                                        <tr
                                                                              key={
                                                                                    order._id
                                                                              }
                                                                              className="border-b border-purple-50 transition-colors last:border-b-0 hover:bg-purple-50/40"
                                                                        >

                                                                              {/* # */}
                                                                              <td className="sticky left-0 z-20 bg-white px-3 py-4 text-center align-middle">
                                                                                    <span className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 text-sm font-bold text-purple-700">
                                                                                          {index +
                                                                                                1}
                                                                                    </span>
                                                                              </td>

                                                                              {/* CUSTOMER */}
                                                                              <td className="px-3 py-4 text-center align-middle">
                                                                                    <div className="mx-auto w-[190px]">
                                                                                          <p className="break-words text-sm font-bold leading-5 text-gray-900">
                                                                                                {customer.name ||
                                                                                                      "-"}
                                                                                          </p>

                                                                                          <p className="mt-1 text-xs font-medium text-gray-500">
                                                                                                {customer.phone ||
                                                                                                      "-"}
                                                                                          </p>

                                                                                          <p className="mt-1 break-words text-xs leading-4 text-gray-400">
                                                                                                {customer.address ||
                                                                                                      "-"}
                                                                                          </p>
                                                                                    </div>
                                                                              </td>

                                                                              {/* PRODUCT */}
                                                                              <td className="px-3 py-4 text-center align-middle">
                                                                                    <div className="mx-auto w-[150px]">
                                                                                          {order.products?.length >
                                                                                                0 ? (
                                                                                                order.products.map(
                                                                                                      (
                                                                                                            product,
                                                                                                            i
                                                                                                      ) => (
                                                                                                            <p
                                                                                                                  key={
                                                                                                                        i
                                                                                                                  }
                                                                                                                  className="mb-1 break-words text-sm font-semibold leading-5 text-gray-700 last:mb-0"
                                                                                                            >
                                                                                                                  {
                                                                                                                        product
                                                                                                                  }
                                                                                                            </p>
                                                                                                      )
                                                                                                )
                                                                                          ) : (
                                                                                                <span className="text-sm text-gray-400">
                                                                                                      -
                                                                                                </span>
                                                                                          )}
                                                                                    </div>
                                                                              </td>

                                                                              {/* TYPE */}
                                                                              <td className="px-3 py-4 text-center align-middle">
                                                                                    <span className="inline-flex rounded-full bg-purple-100 px-3 py-1.5 text-xs font-bold text-purple-700">
                                                                                          {order.productType ||
                                                                                                "-"}
                                                                                    </span>
                                                                              </td>

                                                                              {/* FABRIC */}
                                                                              <td className="px-3 py-4 text-center align-middle">
                                                                                    {fabric ? (
                                                                                          <div className="mx-auto w-[130px]">
                                                                                                <p className="break-words text-sm font-bold text-gray-800">
                                                                                                      {fabric.name ||
                                                                                                            "-"}
                                                                                                </p>

                                                                                                <p className="mt-1 text-xs text-gray-500">
                                                                                                      {fabric.gsm ||
                                                                                                            "-"}
                                                                                                </p>
                                                                                          </div>
                                                                                    ) : (
                                                                                          <span className="text-sm text-gray-400">
                                                                                                -
                                                                                          </span>
                                                                                    )}
                                                                              </td>

                                                                              {/* SIZES */}
                                                                              <td className="px-3 py-4 text-center align-middle">
                                                                                    {Object.keys(
                                                                                          sizes
                                                                                    ).length >
                                                                                          0 ? (
                                                                                          <div className="mx-auto flex w-[180px] flex-wrap justify-center gap-1.5">
                                                                                                {Object.entries(
                                                                                                      sizes
                                                                                                ).map(
                                                                                                      ([
                                                                                                            size,
                                                                                                            quantity,
                                                                                                      ]) => (
                                                                                                            <span
                                                                                                                  key={
                                                                                                                        size
                                                                                                                  }
                                                                                                                  className="rounded-md bg-purple-50 px-2.5 py-1.5 text-xs font-bold text-purple-700"
                                                                                                            >
                                                                                                                  {size}:{" "}
                                                                                                                  {
                                                                                                                        quantity
                                                                                                                  }
                                                                                                            </span>
                                                                                                      )
                                                                                                )}
                                                                                          </div>
                                                                                    ) : (
                                                                                          <span className="text-sm text-gray-400">
                                                                                                -
                                                                                          </span>
                                                                                    )}
                                                                              </td>

                                                                              {/* JERSEY STYLE */}
                                                                              <td className="px-3 py-4 text-center align-middle">
                                                                                    {Object.keys(
                                                                                          jerseyStyle
                                                                                    ).length >
                                                                                          0 ? (
                                                                                          <div className="mx-auto w-[205px] space-y-1.5">
                                                                                                {Object.entries(
                                                                                                      jerseyStyle
                                                                                                ).map(
                                                                                                      ([
                                                                                                            style,
                                                                                                            quantity,
                                                                                                      ]) => (
                                                                                                            <div
                                                                                                                  key={
                                                                                                                        style
                                                                                                                  }
                                                                                                                  className="flex items-center justify-between gap-2 rounded-md border border-purple-100 bg-purple-50/50 px-3 py-2"
                                                                                                            >
                                                                                                                  <span className="text-xs font-medium text-gray-600">
                                                                                                                        {jerseyStyleNames[
                                                                                                                              style
                                                                                                                        ] ||
                                                                                                                              style}
                                                                                                                  </span>

                                                                                                                  <span className="text-sm font-bold text-purple-700">
                                                                                                                        {
                                                                                                                              quantity
                                                                                                                        }
                                                                                                                  </span>
                                                                                                            </div>
                                                                                                      )
                                                                                                )}
                                                                                          </div>
                                                                                    ) : (
                                                                                          <span className="text-sm text-gray-400">
                                                                                                -
                                                                                          </span>
                                                                                    )}
                                                                              </td>

                                                                              {/* READYMADE */}
                                                                              <td className="px-3 py-4 text-center align-middle">
                                                                                    {Object.keys(
                                                                                          readymade
                                                                                    ).length >
                                                                                          0 ? (
                                                                                          <div className="mx-auto w-[170px] space-y-1.5">
                                                                                                {Object.entries(
                                                                                                      readymade
                                                                                                ).map(
                                                                                                      ([
                                                                                                            product,
                                                                                                            quantity,
                                                                                                      ]) => (
                                                                                                            <div
                                                                                                                  key={
                                                                                                                        product
                                                                                                                  }
                                                                                                                  className="rounded-md bg-gray-50 px-3 py-2"
                                                                                                            >
                                                                                                                  <p className="break-words text-xs font-semibold leading-4 text-gray-700">
                                                                                                                        {
                                                                                                                              product
                                                                                                                        }
                                                                                                                  </p>

                                                                                                                  <p className="mt-0.5 text-xs font-bold text-purple-600">
                                                                                                                        Qty:{" "}
                                                                                                                        {
                                                                                                                              quantity
                                                                                                                        }
                                                                                                                  </p>
                                                                                                            </div>
                                                                                                      )
                                                                                                )}
                                                                                          </div>
                                                                                    ) : (
                                                                                          <span className="text-sm text-gray-400">
                                                                                                -
                                                                                          </span>
                                                                                    )}
                                                                              </td>

                                                                              {/* DELIVERY */}
                                                                              <td className="px-3 py-4 text-center align-middle">
                                                                                    <div className="mx-auto w-[130px]">
                                                                                          <span className="inline-flex rounded-full bg-purple-50 px-3 py-1.5 text-xs font-bold text-purple-700">
                                                                                                {delivery.type ||
                                                                                                      "-"}
                                                                                          </span>

                                                                                          <p className="mt-1.5 text-xs text-gray-500">
                                                                                                Payer:{" "}
                                                                                                <span className="font-semibold text-gray-700">
                                                                                                      {delivery.payer ||
                                                                                                            "-"}
                                                                                                </span>
                                                                                          </p>
                                                                                    </div>
                                                                              </td>

                                                                              {/* TERMS */}
                                                                              <td className="px-3 py-4 text-center align-middle">
                                                                                    <div className="mx-auto w-[155px]">
                                                                                          {Array.isArray(
                                                                                                terms
                                                                                          ) ? (
                                                                                                <div className="space-y-1">
                                                                                                      {terms.map(
                                                                                                            (
                                                                                                                  term,
                                                                                                                  i
                                                                                                            ) => (
                                                                                                                  <p
                                                                                                                        key={
                                                                                                                              i
                                                                                                                        }
                                                                                                                        className="text-xs leading-4 text-gray-600"
                                                                                                                  >
                                                                                                                        {term}
                                                                                                                  </p>
                                                                                                            )
                                                                                                      )}
                                                                                                </div>
                                                                                          ) : (
                                                                                                <p className="break-words text-xs leading-4 text-gray-600">
                                                                                                      {terms ||
                                                                                                            "-"}
                                                                                                </p>
                                                                                          )}
                                                                                    </div>
                                                                              </td>

                                                                              {/* STATUS */}
                                                                              <td className="px-3 py-4 text-center align-middle">
                                                                                    <span
                                                                                          className={`inline-flex rounded-full px-3 py-1.5 text-xs font-bold uppercase ${status ===
                                                                                                "completed"
                                                                                                ? "bg-purple-100 text-purple-700"
                                                                                                : status ===
                                                                                                      "processing"
                                                                                                      ? "bg-blue-100 text-blue-700"
                                                                                                      : "bg-amber-100 text-amber-700"
                                                                                                }`}
                                                                                    >
                                                                                          {
                                                                                                status
                                                                                          }
                                                                                    </span>
                                                                              </td>

                                                                              {/* ACTION */}
                                                                              <td className="w-[330px] px-3 py-4 text-center align-middle">
                                                                                    <div className="flex items-center justify-center gap-2">

                                                                                          {/* PROCESSING */}
                                                                                          <button
                                                                                                type="button"
                                                                                                disabled={
                                                                                                      rowLoading ||
                                                                                                      status ===
                                                                                                      "processing" ||
                                                                                                      status ===
                                                                                                      "completed"
                                                                                                }
                                                                                                onClick={() =>
                                                                                                      handleStatusChange(
                                                                                                            order._id,
                                                                                                            "processing"
                                                                                                      )
                                                                                                }
                                                                                                className={`inline-flex min-w-[95px] items-center justify-center rounded-lg px-3 py-2 text-xs font-bold shadow-sm transition-all duration-200 ${status ===
                                                                                                      "processing"
                                                                                                      ? "cursor-not-allowed bg-blue-100 text-blue-400"
                                                                                                      : status ===
                                                                                                            "completed"
                                                                                                            ? "cursor-not-allowed bg-gray-100 text-gray-400"
                                                                                                            : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md"
                                                                                                      }`}
                                                                                          >
                                                                                                {processingLoading
                                                                                                      ? "..."
                                                                                                      : "Processing"}
                                                                                          </button>

                                                                                          {/* COMPLETE */}
                                                                                          <button
                                                                                                type="button"
                                                                                                disabled={
                                                                                                      rowLoading ||
                                                                                                      status ===
                                                                                                      "completed"
                                                                                                }
                                                                                                onClick={() =>
                                                                                                      handleStatusChange(
                                                                                                            order._id,
                                                                                                            "completed"
                                                                                                      )
                                                                                                }
                                                                                                className={`inline-flex min-w-[90px] items-center justify-center rounded-lg px-3 py-2 text-xs font-bold shadow-sm transition-all duration-200 ${status ===
                                                                                                      "completed"
                                                                                                      ? "cursor-not-allowed bg-purple-100 text-purple-400"
                                                                                                      : "bg-purple-600 text-white hover:bg-purple-700 hover:shadow-md"
                                                                                                      }`}
                                                                                          >
                                                                                                {completeLoading
                                                                                                      ? "..."
                                                                                                      : "✓ Complete"}
                                                                                          </button>

                                                                                          {/* DELETE */}
                                                                                          <button
                                                                                                type="button"
                                                                                                disabled={
                                                                                                      rowLoading
                                                                                                }
                                                                                                onClick={() =>
                                                                                                      handleDelete(
                                                                                                            order._id
                                                                                                      )
                                                                                                }
                                                                                                className="inline-flex min-w-[70px] items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-bold text-gray-600 shadow-sm transition-all duration-200 hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                                                                                          >
                                                                                                {deleteLoading
                                                                                                      ? "..."
                                                                                                      : "Delete"}
                                                                                          </button>
                                                                                    </div>
                                                                              </td>
                                                                        </tr>
                                                                  );
                                                            }
                                                      )}
                                                </tbody>
                                          </table>
                                    </div>

                                    {/* Mobile / Small Screen Hint */}
                                    <div className="border-t border-purple-50 bg-purple-50/30 px-4 py-2 text-center text-[11px] font-medium text-purple-500 sm:text-xs">
                                          ← Swipe left or right to view all
                                          columns →
                                    </div>
                              </div>
                        )}
                  </div>
            </div>
      );
};

export default ManufactureOrder;